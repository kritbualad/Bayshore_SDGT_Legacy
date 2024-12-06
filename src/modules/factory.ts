import { Application } from "express";
import { Module } from "module";
import { prisma } from "..";

// Import Util
import * as common from "./util/common";


export default class FactoryModule extends Module {
    register(app: Application): void {

        // Get Car Data
        app.post("/Factory/GetCarData", function(req, res) {

            // Get the Request Data
            var jsonString = '';

            req.on('data', function (data) {
                
                // Store the Request Data
                jsonString += data;
            });

            req.on('end', async function () {

                // Error Handling if it's null
                if(!(jsonString))
                {
                    jsonString = '{}';
                }

                // Parse the JSON
                let jsonData: any = JSON.parse(jsonString);

                // Response Data
                let resParams;

                // Try Catch
                try
                {
                    // Get the Session ID
                    let id = common.getHeader(req.rawHeaders);
                    
                    // Get Car Data
                    let car = await prisma.car.findMany({
                        where:{
                            user_id: Number(id)
                        },
                        orderBy:{
                            id: 'asc'
                        }
                    });

                    // Pick Up Car Data
                    let car_data = [];
                    for(let i=0; i<car.length; i++)
                    {
                        // Fix the parts_list format
                        let parts_list = [];
                        for(let j=0; j<car[i].parts_list.length; j++)
                        {
                            // Push the data
                            parts_list.push({ parts: car[i].parts_list[j] });
                        }

                        // Push the data
                        car_data.push({
                            ...car[i],
                            parts_list: parts_list
                        });
                    }

                    // Generate Success Response Data
                    resParams = {
                        status_code: "0",

                        // Car Data
                        car_data: car_data
                    }
                }
                catch(e)
                {
                    // Generate Failed Response Data
                    resParams = {
                        status_code: "1",
                    }

                    // Print the error
                    common.writeLog(`${common.getError(e, req.originalUrl)}`);
                }
    
                // Send the response to the client
                res.send(resParams);
            });
        });


        // Save Favorite Car
        app.post("/Factory/SaveFavoriteCar", function(req, res) {

            // Get the Request Data
            var jsonString = '';

            req.on('data', function (data) {
                
                // Store the Request Data
                jsonString += data;
            });

            req.on('end', async function () {

                // Error Handling if it's null
                if(!(jsonString))
                {
                    jsonString = '{}';
                }

                // Parse the JSON
                let jsonData: any = JSON.parse(jsonString);

                // Response Data
                let resParams;

                // Try Catch
                try
                {
                    // Get the Session ID
                    let id = common.getHeader(req.rawHeaders);

                    // Update Pick Up Sequence (Car Order)
                    for(let i=0; i<jsonData['pickup_on_car_ids'].length; i++)
                    {
                        await prisma.car.updateMany({
                            where:{
                                user_id: Number(id),
                                style_car_id: jsonData['pickup_on_car_ids'][i]['style_car_id']
                            },
                            data:{
                                pickup_seq: jsonData['pickup_on_car_ids'][i]['pickup_seq']
                            }
                        });
                    }

                    for(let i=0; i<jsonData['pickup_off_car_ids'].length; i++)
                    {
                        await prisma.car.updateMany({
                            where:{
                                user_id: Number(id),
                                style_car_id: jsonData['pickup_off_car_ids'][i]['style_car_id']
                            },
                            data:{
                                pickup_seq: 99
                            }
                        });
                    }

                    // Generate Success Response Data
                    resParams = {
                        status_code: "0"
                    }
                }
                catch(e)
                {
                    // Generate Failed Response Data
                    resParams = {
                        status_code: "1",
                    }

                    // Print the error
                    common.writeLog(`${common.getError(e, req.originalUrl)}`);
                }


                // Send the response to the client
                res.send(resParams);
            });
        });


        // Update Customize User
        app.post("/Factory/UpdateCustomizeUser", function(req, res) {

            // Get the Request Data
            var jsonString = '';

            req.on('data', function (data) {
                
                // Store the Request Data
                jsonString += data;
            });

            req.on('end', async function () {

                // Error Handling if it's null
                if(!(jsonString))
                {
                    jsonString = '{}';
                }

                // Parse the JSON
                let jsonData: any = JSON.parse(jsonString);

                // Response Data
                let resParams;

                // Try Catch
                try
                {
                    // Get the Session ID
                    let id = common.getHeader(req.rawHeaders);

                    // Update User Base
                    await prisma.userBase.update({
                        where:{
                            id: Number(id)
                        },
                        data:{
                            mytitle_id: Number(jsonData['mytitle_id']),
                            mytitle_efffect_id: Number(jsonData['mytitle_efffect_id']),
                            papercup_id: Number(jsonData['papercup_id']),
                            tachometer_id: Number(jsonData['tachometer_id']),
                            aura_id: Number(jsonData['aura_id']),
                            aura_color_id: Number(jsonData['aura_color_id']),
                            aura_line_id: Number(jsonData['aura_line_id']),
                            bgm_id:Number(jsonData['bgm_id']),
                            start_menu_bg_id: Number(jsonData['start_menu_bg_id']),
                            stamp_key_assign_0: Number(jsonData['stamp_key_assign_0']),
                            stamp_key_assign_1: Number(jsonData['stamp_key_assign_1']),
                            stamp_key_assign_2: Number(jsonData['stamp_key_assign_2']),
                            stamp_key_assign_3: Number(jsonData['stamp_key_assign_3']),
                        }
                    });

                    // Update Stock
                    await prisma.stock.update({
                        where:{
                            id: Number(id),
                        },
                        data: {
                            mytitle_list: common.sanitizeInput(jsonData['stock_obj']['mytitle_list']),
                            mytitle_new_list: common.sanitizeInput(jsonData['stock_obj']['mytitle_new_list']),
                            avatar_face_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_list']),
                            avatar_face_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_new_list']),
                            avatar_eye_list: common.sanitizeInput(jsonData['stock_obj']['avatar_eye_list']),
                            avatar_eye_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_eye_new_list']),
                            avatar_hair_list: common.sanitizeInput(jsonData['stock_obj']['avatar_hair_list']),
                            avatar_hair_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_hair_new_list']),
                            avatar_body_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_list']),
                            avatar_body_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_new_list']),
                            avatar_mouth_list: common.sanitizeInput(jsonData['stock_obj']['avatar_mouth_list']),
                            avatar_mouth_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_mouth_new_list']),
                            avatar_glasses_list: common.sanitizeInput(jsonData['stock_obj']['avatar_glasses_list']),
                            avatar_glasses_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_glasses_new_list']),
                            avatar_face_accessory_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_accessory_list']),
                            avatar_face_accessory_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_accessory_new_list']),
                            avatar_body_accessory_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_accessory_list']),
                            avatar_body_accessory_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_accessory_new_list']),
                            avatar_behind_list: common.sanitizeInput(jsonData['stock_obj']['avatar_behind_list']),
                            avatar_behind_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_behind_new_list']),
                            avatar_bg_list: common.sanitizeInput(jsonData['stock_obj']['avatar_bg_list']),
                            avatar_bg_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_bg_new_list']),
                            avatar_effect_list: common.sanitizeInput(jsonData['stock_obj']['avatar_effect_list']),
                            avatar_effect_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_effect_new_list']),
                            avatar_special_list: common.sanitizeInput(jsonData['stock_obj']['avatar_special_list']),
                            avatar_special_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_special_new_list']),
                            stamp_list: common.sanitizeInput(jsonData['stock_obj']['stamp_list']),
                            stamp_new_list: common.sanitizeInput(jsonData['stock_obj']['stamp_new_list']),
                            keyholder_list: common.sanitizeInput(jsonData['stock_obj']['keyholder_list']),
                            keyholder_new_list: common.sanitizeInput(jsonData['stock_obj']['keyholder_new_list']),
                            papercup_list: common.sanitizeInput(jsonData['stock_obj']['papercup_list']),
                            papercup_new_list: common.sanitizeInput(jsonData['stock_obj']['papercup_new_list']),
                            tachometer_list: common.sanitizeInput(jsonData['stock_obj']['tachometer_list']),
                            tachometer_new_list: common.sanitizeInput(jsonData['stock_obj']['tachometer_new_list']),
                            aura_list: common.sanitizeInput(jsonData['stock_obj']['aura_list']),
                            aura_new_list: common.sanitizeInput(jsonData['stock_obj']['aura_new_list']),
                            aura_color_list: common.sanitizeInput(jsonData['stock_obj']['aura_color_list']),
                            aura_color_new_list: common.sanitizeInput(jsonData['stock_obj']['aura_color_new_list']),
                            aura_line_list: common.sanitizeInput(jsonData['stock_obj']['aura_line_list']),
                            aura_line_new_list: common.sanitizeInput(jsonData['stock_obj']['aura_line_new_list']),
                            bgm_list: common.sanitizeInput(jsonData['stock_obj']['bgm_list']),
                            bgm_new_list: common.sanitizeInput(jsonData['stock_obj']['bgm_new_list']),
                            dx_color_list: common.sanitizeInput(jsonData['stock_obj']['dx_color_list']),
                            dx_color_new_list: common.sanitizeInput(jsonData['stock_obj']['dx_color_new_list']),
                            start_menu_bg_list: common.sanitizeInput(jsonData['stock_obj']['start_menu_bg_list']),
                            start_menu_bg_new_list: common.sanitizeInput(jsonData['stock_obj']['start_menu_bg_new_list']),
                            under_neon_list: common.sanitizeInput(jsonData['stock_obj']['under_neon_list']),
                        }
                    });

                    // Generate Success Response Data
                    resParams = {
                        status_code: "0"
                    }
                }
                catch(e)
                {
                    // Generate Failed Response Data
                    resParams = {
                        status_code: "1"
                    }

                    // Print the error
                    common.writeLog(`${common.getError(e, req.originalUrl)}`);
                }

                
    
                // Send the response to the client
                res.send(resParams);
            });
        });


        // Update Customize Avatar
        app.post("/Factory/UpdateCustomizeAvatar", function(req, res) {

            // Get the Request Data
            var jsonString = '';

            req.on('data', function (data) {
                
                // Store the Request Data
                jsonString += data;
            });

            req.on('end', async function () {

                // Error Handling if it's null
                if(!(jsonString))
                {
                    jsonString = '{}';
                }

                // Parse the JSON
                let jsonData: any = JSON.parse(jsonString);

                // Response Data
                let resParams;

                // Try Catch
                try
                {
                    // Get the Session ID
                    let id = common.getHeader(req.rawHeaders);

                    // Update Stock
                    await prisma.stock.update({
                        where:{
                            id: Number(id),
                        },
                        data: {
                            mytitle_list: common.sanitizeInput(jsonData['stock_obj']['mytitle_list']),
                            mytitle_new_list: common.sanitizeInput(jsonData['stock_obj']['mytitle_new_list']),
                            avatar_face_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_list']),
                            avatar_face_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_new_list']),
                            avatar_eye_list: common.sanitizeInput(jsonData['stock_obj']['avatar_eye_list']),
                            avatar_eye_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_eye_new_list']),
                            avatar_hair_list: common.sanitizeInput(jsonData['stock_obj']['avatar_hair_list']),
                            avatar_hair_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_hair_new_list']),
                            avatar_body_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_list']),
                            avatar_body_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_new_list']),
                            avatar_mouth_list: common.sanitizeInput(jsonData['stock_obj']['avatar_mouth_list']),
                            avatar_mouth_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_mouth_new_list']),
                            avatar_glasses_list: common.sanitizeInput(jsonData['stock_obj']['avatar_glasses_list']),
                            avatar_glasses_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_glasses_new_list']),
                            avatar_face_accessory_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_accessory_list']),
                            avatar_face_accessory_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_accessory_new_list']),
                            avatar_body_accessory_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_accessory_list']),
                            avatar_body_accessory_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_accessory_new_list']),
                            avatar_behind_list: common.sanitizeInput(jsonData['stock_obj']['avatar_behind_list']),
                            avatar_behind_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_behind_new_list']),
                            avatar_bg_list: common.sanitizeInput(jsonData['stock_obj']['avatar_bg_list']),
                            avatar_bg_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_bg_new_list']),
                            avatar_effect_list: common.sanitizeInput(jsonData['stock_obj']['avatar_effect_list']),
                            avatar_effect_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_effect_new_list']),
                            avatar_special_list: common.sanitizeInput(jsonData['stock_obj']['avatar_special_list']),
                            avatar_special_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_special_new_list']),
                            stamp_list: common.sanitizeInput(jsonData['stock_obj']['stamp_list']),
                            stamp_new_list: common.sanitizeInput(jsonData['stock_obj']['stamp_new_list']),
                            keyholder_list: common.sanitizeInput(jsonData['stock_obj']['keyholder_list']),
                            keyholder_new_list: common.sanitizeInput(jsonData['stock_obj']['keyholder_new_list']),
                            papercup_list: common.sanitizeInput(jsonData['stock_obj']['papercup_list']),
                            papercup_new_list: common.sanitizeInput(jsonData['stock_obj']['papercup_new_list']),
                            tachometer_list: common.sanitizeInput(jsonData['stock_obj']['tachometer_list']),
                            tachometer_new_list: common.sanitizeInput(jsonData['stock_obj']['tachometer_new_list']),
                            aura_list: common.sanitizeInput(jsonData['stock_obj']['aura_list']),
                            aura_new_list: common.sanitizeInput(jsonData['stock_obj']['aura_new_list']),
                            aura_color_list: common.sanitizeInput(jsonData['stock_obj']['aura_color_list']),
                            aura_color_new_list: common.sanitizeInput(jsonData['stock_obj']['aura_color_new_list']),
                            aura_line_list: common.sanitizeInput(jsonData['stock_obj']['aura_line_list']),
                            aura_line_new_list: common.sanitizeInput(jsonData['stock_obj']['aura_line_new_list']),
                            bgm_list: common.sanitizeInput(jsonData['stock_obj']['bgm_list']),
                            bgm_new_list: common.sanitizeInput(jsonData['stock_obj']['bgm_new_list']),
                            dx_color_list: common.sanitizeInput(jsonData['stock_obj']['dx_color_list']),
                            dx_color_new_list: common.sanitizeInput(jsonData['stock_obj']['dx_color_new_list']),
                            start_menu_bg_list: common.sanitizeInput(jsonData['stock_obj']['start_menu_bg_list']),
                            start_menu_bg_new_list: common.sanitizeInput(jsonData['stock_obj']['start_menu_bg_new_list']),
                            under_neon_list: common.sanitizeInput(jsonData['stock_obj']['under_neon_list']),
                        }
                    });


                    // Update Avatar
                    await prisma.avatar.update({
                        where:{
                            id: Number(id)
                        },
                        data:{
                            sex: Number(jsonData['avatar_obj']['sex']),
                            face: Number(jsonData['avatar_obj']['face']),
                            eye: Number(jsonData['avatar_obj']['eye']),
                            mouth: Number(jsonData['avatar_obj']['mouth']),
                            hair: Number(jsonData['avatar_obj']['hair']),
                            glasses: Number(jsonData['avatar_obj']['glasses']),
                            face_accessory: Number(jsonData['avatar_obj']['face_accessory']),
                            body: Number(jsonData['avatar_obj']['body']),
                            body_accessory: Number(jsonData['avatar_obj']['body_accessory']),
                            behind: Number(jsonData['avatar_obj']['behind']),
                            bg: Number(jsonData['avatar_obj']['bg']),
                            effect: Number(jsonData['avatar_obj']['effect']),
                            special: Number(jsonData['avatar_obj']['special'])
                        }
                    });

                    // Generate Success Response Data
                    resParams = {
                        status_code: "0"
                    }
                }
                catch(e)
                {
                    // Generate Failed Response Data
                    resParams = {
                        status_code: "1"
                    }

                    // Print the error
                    common.writeLog(`${common.getError(e, req.originalUrl)}`);
                }
    
                // Send the response to the client
                res.send(resParams);
            });
        });


        // Update Customize Result
        app.post("/Factory/UpdateCustomizeResult", function(req, res) {

            // Get the Request Data
            var jsonString = '';

            req.on('data', function (data) {
                
                // Store the Request Data
                jsonString += data;
            });

            req.on('end', async function () {

                // Error Handling if it's null
                if(!(jsonString))
                {
                    jsonString = '{}';
                }

                // Parse the JSON
                let jsonData: any = JSON.parse(jsonString);

                // Response Data
                let resParams;

                // Try Catch
                try
                {
                    // Get the Session ID
                    let id = common.getHeader(req.rawHeaders);

                    // Generate Part List
                    let parts_list = [];
                    for(let i=0; i<jsonData['parts_list'].length; i++)
                    {
                        parts_list.push(jsonData['parts_list'][i]['parts']);
                    }

                    // Update Car
                    await prisma.car.updateMany({
                        where:{
                            user_id: Number(id),
                            style_car_id: jsonData['style_car_id']
                        },
                        data:{
                            color: common.sanitizeInput(jsonData['color']),
                            color_stock_list: common.sanitizeInput(jsonData['color_stock_list']),
                            color_stock_new_list: common.sanitizeInput(jsonData['color_stock_new_list']),
                            parts_stock_list: common.sanitizeInput(jsonData['parts_stock_list']),
                            parts_stock_new_list: common.sanitizeInput(jsonData['parts_stock_new_list']),
                            parts_set_equip_list: common.sanitizeInput(jsonData['parts_set_equip_list']),
                            parts_list: parts_list,
                            equip_parts_count: common.sanitizeInput(jsonData['equip_parts_count']),
                        }
                    });

                    // Update User Base
                    await prisma.userBase.update({
                        where:{
                            id: Number(id)
                        },
                        data:{
                            total_car_parts_count: common.sanitizeInput(jsonData['total_car_parts_count']),
                        }
                    });

                    // Update Ticket Data
                    for(let i=0; i<jsonData['ticket_data'].length; i++)
                    {
                        await prisma.ticket.updateMany({
                            where:{
                                user_id: Number(id),
                                ticket_id: Number(jsonData['ticket_data'][i]['ticket_id'])
                            },
                            data:{
                                ticket_cnt: Number(jsonData['ticket_data'][i]['ticket_cnt'])
                            }
                        })
                    }

                    // Generate Success Response Data
                    resParams = {
                        status_code: "0"
                    }
                }
                catch(e)
                {
                    // Generate Failed Response Data
                    resParams = {
                        status_code: "1"
                    }

                    // Print the error
                    common.writeLog(`${common.getError(e, req.originalUrl)}`);
                }
    
                // Send the response to the client
                res.send(resParams);
            });
        });


        // Avatar Gacha Result
        app.post("/Factory/AvatarGachaResult", function(req, res) {

            // Get the Request Data
            var jsonString = '';

            req.on('data', function (data) {
                
                // Store the Request Data
                jsonString += data;
            });

            req.on('end', async function () {

                // Error Handling if it's null
                if(!(jsonString))
                {
                    jsonString = '{}';
                }

                // Parse the JSON
                let jsonData: any = JSON.parse(jsonString);

                // Response Data
                let resParams;

                // Try Catch
                try
                {
                    // Get the Session ID
                    let id = common.getHeader(req.rawHeaders);

                    let get_gacha_ticket = await prisma.ticket.findFirst({
                        where:{
                            user_id: Number(id),
                            ticket_id: Number(5)
                        }
                    });

                    if(get_gacha_ticket)
                    {
                        await prisma.ticket.update({
                            where:{
                                id: get_gacha_ticket.id
                            },
                            data:{
                                ticket_cnt: Number(get_gacha_ticket.ticket_cnt - jsonData['use_ticket_cnt'])
                            }
                        });
                    }

                    // Update Stock
                    await prisma.stock.update({
                        where:{
                            id: Number(id),
                        },
                        data: {
                            mytitle_list: common.sanitizeInput(jsonData['stock_obj']['mytitle_list']),
                            mytitle_new_list: common.sanitizeInput(jsonData['stock_obj']['mytitle_new_list']),
                            avatar_face_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_list']),
                            avatar_face_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_new_list']),
                            avatar_eye_list: common.sanitizeInput(jsonData['stock_obj']['avatar_eye_list']),
                            avatar_eye_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_eye_new_list']),
                            avatar_hair_list: common.sanitizeInput(jsonData['stock_obj']['avatar_hair_list']),
                            avatar_hair_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_hair_new_list']),
                            avatar_body_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_list']),
                            avatar_body_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_new_list']),
                            avatar_mouth_list: common.sanitizeInput(jsonData['stock_obj']['avatar_mouth_list']),
                            avatar_mouth_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_mouth_new_list']),
                            avatar_glasses_list: common.sanitizeInput(jsonData['stock_obj']['avatar_glasses_list']),
                            avatar_glasses_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_glasses_new_list']),
                            avatar_face_accessory_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_accessory_list']),
                            avatar_face_accessory_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_face_accessory_new_list']),
                            avatar_body_accessory_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_accessory_list']),
                            avatar_body_accessory_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_body_accessory_new_list']),
                            avatar_behind_list: common.sanitizeInput(jsonData['stock_obj']['avatar_behind_list']),
                            avatar_behind_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_behind_new_list']),
                            avatar_bg_list: common.sanitizeInput(jsonData['stock_obj']['avatar_bg_list']),
                            avatar_bg_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_bg_new_list']),
                            avatar_effect_list: common.sanitizeInput(jsonData['stock_obj']['avatar_effect_list']),
                            avatar_effect_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_effect_new_list']),
                            avatar_special_list: common.sanitizeInput(jsonData['stock_obj']['avatar_special_list']),
                            avatar_special_new_list: common.sanitizeInput(jsonData['stock_obj']['avatar_special_new_list']),
                            stamp_list: common.sanitizeInput(jsonData['stock_obj']['stamp_list']),
                            stamp_new_list: common.sanitizeInput(jsonData['stock_obj']['stamp_new_list']),
                            keyholder_list: common.sanitizeInput(jsonData['stock_obj']['keyholder_list']),
                            keyholder_new_list: common.sanitizeInput(jsonData['stock_obj']['keyholder_new_list']),
                            papercup_list: common.sanitizeInput(jsonData['stock_obj']['papercup_list']),
                            papercup_new_list: common.sanitizeInput(jsonData['stock_obj']['papercup_new_list']),
                            tachometer_list: common.sanitizeInput(jsonData['stock_obj']['tachometer_list']),
                            tachometer_new_list: common.sanitizeInput(jsonData['stock_obj']['tachometer_new_list']),
                            aura_list: common.sanitizeInput(jsonData['stock_obj']['aura_list']),
                            aura_new_list: common.sanitizeInput(jsonData['stock_obj']['aura_new_list']),
                            aura_color_list: common.sanitizeInput(jsonData['stock_obj']['aura_color_list']),
                            aura_color_new_list: common.sanitizeInput(jsonData['stock_obj']['aura_color_new_list']),
                            aura_line_list: common.sanitizeInput(jsonData['stock_obj']['aura_line_list']),
                            aura_line_new_list: common.sanitizeInput(jsonData['stock_obj']['aura_line_new_list']),
                            bgm_list: common.sanitizeInput(jsonData['stock_obj']['bgm_list']),
                            bgm_new_list: common.sanitizeInput(jsonData['stock_obj']['bgm_new_list']),
                            dx_color_list: common.sanitizeInput(jsonData['stock_obj']['dx_color_list']),
                            dx_color_new_list: common.sanitizeInput(jsonData['stock_obj']['dx_color_new_list']),
                            start_menu_bg_list: common.sanitizeInput(jsonData['stock_obj']['start_menu_bg_list']),
                            start_menu_bg_new_list: common.sanitizeInput(jsonData['stock_obj']['start_menu_bg_new_list']),
                            under_neon_list: common.sanitizeInput(jsonData['stock_obj']['under_neon_list']),
                        }
                    });

                    // Generate Success Response Data
                    resParams = {
                        status_code: "0"
                    }
                }
                catch(e)
                {
                    // Generate Failed Response Data
                    resParams = {
                        status_code: "1"
                    }

                    // Print the error
                    common.writeLog(`${common.getError(e, req.originalUrl)}`);
                }
    
                // Send the response to the client
                res.send(resParams);
            });
        });


        // Buy Car Result
        app.post("/Factory/BuyCarResult", function(req, res) {

            // Get the Request Data
            var jsonString = '';

            req.on('data', function (data) {
                
                // Store the Request Data
                jsonString += data;
            });

            req.on('end', async function () {

                // Error Handling if it's null
                if(!(jsonString))
                {
                    jsonString = '{}';
                }

                // Parse the JSON
                let jsonData: any = JSON.parse(jsonString);

                // Response Data
                let resParams;

                // Try Catch
                try
                {
                    // Get the Session ID
                    let id = common.getHeader(req.rawHeaders);

                    // Generate Part List
                    let parts_list = [];
                    for(let i=0; i<jsonData['parts_list'].length; i++)
                    {
                        parts_list.push(jsonData['parts_list'][i]['parts']);
                    }

                    let purchase_seq = await prisma.car.findFirst({
                        where:{
                            user_id: Number(id),
                        },
                        orderBy:{
                            purchase_seq: 'desc'
                        },
                        select:{
                            purchase_seq: true
                        }
                    });

                    // Additional Tune if Using Full Tune Ticket
                    let additinal_tune = {};
                    if(jsonData['use_ticket'] === 1)
                    {
                        additinal_tune = {
                            tune_level: Number(16),
                            tune_parts: Number(131068),
                        }

                        let getTicket = await prisma.ticket.findFirst({
                            where:{
                                user_id: Number(id),
                                ticket_id: Number(25)
                            }
                        });

                        await prisma.ticket.updateMany({
                            where:{
                                id: getTicket!.id
                            },
                            data:{
                                ticket_cnt: Number(getTicket!.ticket_cnt - 1)
                            }
                        });
                    }

                    // Generate First Car
                    await prisma.car.create({
                        data:{
                            user_id: Number(id),
                            car_id: Number(jsonData['car_id']),
                            style_car_id: Number(jsonData['style_car_id']),
                            color: Number(jsonData['color']),
                            bureau: Number(jsonData['bureau']),
                            kana: Number(jsonData['kana']),
                            s_no: Number(jsonData['s_no']),
                            l_no: Number(jsonData['l_no']),
                            car_flag: Number(jsonData['car_flag']),
                            tune_point: Number(0),
                            tune_level: Number(16),
                            tune_parts: Number(131068),
                            color_stock_list: common.sanitizeInput(jsonData['color_stock_list']),
                            color_stock_new_list: common.sanitizeInput(jsonData['color_stock_new_list']),
                            parts_stock_list: common.sanitizeInput(jsonData['parts_stock_list']),
                            parts_stock_new_list: common.sanitizeInput(jsonData['parts_stock_new_list']),
                            parts_set_equip_list: common.sanitizeInput(jsonData['parts_set_equip_list']),
                            purchase_seq: Number(purchase_seq!.purchase_seq + 1),
                            parts_list: parts_list,
                            equip_parts_count: Number(jsonData['equip_parts_count']),
                            pickup_seq: Number(99),

                            // Additional Tune
                            ...additinal_tune
                        }
                    });

                    // Update Pick Up Sequence (Car Order)
                    for(let i=0; i<jsonData['pickup_on_car_ids'].length; i++)
                    {
                        await prisma.car.updateMany({
                            where:{
                                user_id: Number(id),
                                style_car_id: jsonData['pickup_on_car_ids'][i]['style_car_id']
                            },
                            data:{
                                pickup_seq: jsonData['pickup_on_car_ids'][i]['pickup_seq']
                            }
                        });
                    }

                    for(let i=0; i<jsonData['pickup_off_car_ids'].length; i++)
                    {
                        await prisma.car.updateMany({
                            where:{
                                user_id: Number(id),
                                style_car_id: jsonData['pickup_off_car_ids'][i]['style_car_id']
                            },
                            data:{
                                pickup_seq: 99
                            }
                        });
                    }

                    // Get Car Data
                    let car = await prisma.car.count({
                        where:{
                            user_id: Number(id)
                        }
                    });

                    // Update User Base
                    await prisma.userBase.update({
                        where:{
                            id: Number(id)
                        },
                        data:{
                            cash: Number(jsonData['cash']),
                            total_cash: Number(jsonData['total_cash']),
                            have_car_cnt: Number(car)
                        }
                    });
                    
                    // Generate Success Response Data
                    resParams = {
                        status_code: "0"
                    }
                }
                catch(e)
                {
                    // Generate Failed Response Data
                    resParams = {
                        status_code: "1"
                    }

                    // Print the error
                    common.writeLog(`${common.getError(e, req.originalUrl)}`);
                }

                // Send the response to the client
                res.send(resParams);
            });
        });


        // Update Multiple Customize Result
        app.post("/Factory/UpdateMultipleCustomizeResult", function(req, res) {

            // Get the Request Data
            var jsonString = '';

            req.on('data', function (data) {
                
                // Store the Request Data
                jsonString += data;
            });

            req.on('end', async function () {

                // Error Handling if it's null
                if(!(jsonString))
                {
                    jsonString = '{}';
                }

                // Parse the JSON
                let jsonData: any = JSON.parse(jsonString);

                // Response Data
                let resParams;
                
                // Try Catch
                try
                {
                    // Get the Session ID
                    let id = common.getHeader(req.rawHeaders);

                    for(let i=0; i<jsonData['car_list'].length; i++)
                    {
                        // Generate Part List
                        let additional_parts_list = {};

                        if(jsonData['car_list'][i]['parts_list'].length > 0)
                        {
                            let parts_list = [];

                            for(let j=0; j<jsonData['car_list'][i]['parts_list'].length; j++)
                            {
                                parts_list.push(jsonData['car_list'][i]['parts_list'][j]['parts']);
                            }

                            additional_parts_list = {
                                parts_list: parts_list
                            }
                        }

                        // Update Car
                        await prisma.car.updateMany({
                            where:{
                                user_id: Number(id),
                                style_car_id: Number(jsonData['car_list'][i]['style_car_id'])
                            },
                            data:{
                                color: common.sanitizeInput(jsonData['car_list'][i]['color']),
                                color_stock_list: common.sanitizeInput(jsonData['car_list'][i]['color_stock_list']),
                                color_stock_new_list: common.sanitizeInput(jsonData['car_list'][i]['color_stock_new_list']),
                                parts_stock_list: common.sanitizeInput(jsonData['car_list'][i]['parts_stock_list']),
                                parts_stock_new_list: common.sanitizeInput(jsonData['car_list'][i]['parts_stock_new_list']),
                                parts_set_equip_list: common.sanitizeInput(jsonData['car_list'][i]['parts_set_equip_list']),
                                equip_parts_count: common.sanitizeInput(jsonData['car_list'][i]['equip_parts_count']),
                                
                                ...additional_parts_list
                            }
                        });
                    }

                    // Update User Base
                    await prisma.userBase.update({
                        where:{
                            id: Number(id)
                        },
                        data:{
                            total_car_parts_count: common.sanitizeInput(jsonData['total_car_parts_count']),
                        }
                    });

                    // Update Ticket Data
                    for(let i=0; i<jsonData['ticket_data'].length; i++)
                    {
                        await prisma.ticket.updateMany({
                            where:{
                                user_id: Number(id),
                                ticket_id: Number(jsonData['ticket_data'][i]['ticket_id'])
                            },
                            data:{
                                ticket_cnt: Number(jsonData['ticket_data'][i]['ticket_cnt'])
                            }
                        })
                    }

                    // Generate Success Response Data
                    resParams = {
                        status_code: "0"
                    }
                }
                catch(e)
                {
                    // Generate Failed Response Data
                    resParams = {
                        status_code: "1"
                    }

                    // Print the error
                    common.writeLog(`${common.getError(e, req.originalUrl)}`);
                }
    
                // Send the response to the client
                res.send(resParams);
            });
        });


        // Rename Before
        app.post("/Factory/RenameBefore", function(req, res) {

            // Get the Request Data
            var jsonString = '';

            req.on('data', function (data) {
                
                // Store the Request Data
                jsonString += data;
            });

            req.on('end', function () {

                // Parse the JSON
                let jsonData: any = JSON.parse(jsonString);

                // Response Data
                let resParams

                // Try Catch
                try
                {
                    // Generate Success Response Data
                    resParams = {
                        status_code: "0"
                    }
                }
                catch(e)
                {
                    // Generate Failed Response Data
                    resParams = {
                        status_code: "1"
                    }

                    // Print the error
                    common.writeLog(`${common.getError(e, req.originalUrl)}`);
                }
    
                // Send the response to the client
                res.send(resParams);
            });
        });


        // Rename Result
        app.post("/Factory/RenameResult", function(req, res) {

            // Get the Request Data
            var jsonString = '';

            req.on('data', function (data) {
                
                // Store the Request Data
                jsonString += data;
            });

            req.on('end', async function () {

                // Error Handling if it's null
                if(!(jsonString))
                {
                    jsonString = '{}';
                }

                // Parse the JSON
                let jsonData: any = JSON.parse(jsonString);

                // Response Data
                let resParams;

                // Try Catch
                try
                {
                    // Get the Session ID
                    let id = common.getHeader(req.rawHeaders);

                    // Update User Base
                    await prisma.userBase.update({
                        where:{
                            id: Number(id)
                        },
                        data:{
                            username: jsonData['username'],
                        }
                    });

                    // Generate Success Response Data
                    resParams = {
                        status_code: "0"
                    }
                }
                catch(e)
                {
                    // Generate Failed Response Data
                    resParams = {
                        status_code: "1"
                    }

                    // Print the error
                    common.writeLog(`${common.getError(e, req.originalUrl)}`);
                }
    
                // Send the response to the client
                res.send(resParams);
            });
        });
    }
    
}