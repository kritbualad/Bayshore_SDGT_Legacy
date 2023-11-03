import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import sql from "sql-bricks-postgres";

import { DataSource, Transaction } from "./sql";

const scripts = [
  // Order matters! Later scripts reference schema instantiated earlier.
  "meta.sql",
  "aime.sql",
  "cm.sql",
  "idz.sql",
];

const initPath = "./schema/init";
const migratePath = "./schema/migrate";
const migrateRx = new RegExp("^M([0-9]{4})-.+\\.sql$");

async function initdb(txn: Transaction): Promise<void> {
  // Get latest schemaver from migration script filenames

  const migrations = readdirSync(migratePath);
  let schemaver = 0;

  for (const filename of migrations) {
    const captures = filename.match(migrateRx);

    if (captures === null) {
      continue;
    }

    const migrationNo = parseInt(captures[1]);

    if (schemaver < migrationNo) {
      schemaver = migrationNo;
    }
  }

  // Run init scripts

  console.log("Initializing database");

  for (const script of scripts) {
    console.log("Executing " + script);

    const scriptPath = resolve(initPath, script);
    const scriptSql = readFileSync(scriptPath, "utf-8");

    await txn.raw(scriptSql);
  }

  // Set up metadata table

  const metaInsert = sql.insert("meta", { schemaver });

  await txn.modify(metaInsert);

  console.log("Initialized new database to schema version " + schemaver);
}

async function migratedb(
  txn: Transaction,
  schemaver: number
): Promise<number | undefined> {
  const filenames = readdirSync(migratePath);
  let lastMigrationNo: number | undefined;

  filenames.sort();

  for (const filename of filenames) {
    const captures = filename.match(migrateRx);

    if (captures === null) {
      console.log("Warning: Unexpected file " +filename+ " in SQL migrations dir");

      continue;
    }

    const migrationNo = parseInt(captures[1]);

    if (migrationNo <= schemaver) {
      continue;
    }

    console.log("Executing database upgrade: " + filename);

    const scriptPath = resolve(migratePath, filename);
    const scriptSql = readFileSync(scriptPath, "utf-8");

    await txn.raw(scriptSql);

    lastMigrationNo = migrationNo;
  }

  if (lastMigrationNo !== undefined) {
    const metaUpdate = sql.update("meta", { schemaver: lastMigrationNo });

    await txn.modify(metaUpdate);
  }

  return lastMigrationNo;
}

export default async function checkdb(db: DataSource): Promise<void> {
  let schemaver: number | undefined;

  await db.maintenance(async txn => {
    const stmt = sql.select("schemaver").from("meta");

    try {
      const row = await txn.fetchRow(stmt);

      if (row !== undefined) {
        schemaver = parseInt(row.schemaver!);
      }
    } catch (e) {
      return await initdb(txn);
    }

    if (schemaver === undefined) {
      throw new Error(
        "Database corrupted: `meta` table singleton row is missing"
      );
    }

    schemaver = await migratedb(txn, schemaver);
  });

  if (schemaver !== undefined) {
    console.log("Upgraded database to version " + schemaver);

    await db.vacuum();

    console.log("Post-upgrade housekeeping complete");
  }
}
