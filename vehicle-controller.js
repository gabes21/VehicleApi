// import {pool} from "./database.js"
import { tryCatchWrapper } from "./middlewares/try-catch-wrapper.js";
import { createCustomError } from "./errors/custom-error.js";
import Vehicle  from "./models/Vehicle.js"; 


//Inferior check exist function
// async function getVehicle(id) {
//     const [rows] = await Vehicle.findByPk(id)
//     return rows[0];
// }

// Function to display a listing of vehicles.
export const getVehicles = tryCatchWrapper(async function (req, res, next) {
    const rows = await Vehicle.findAll()
    if (!rows) {
        return next(createCustomError("empty list", 404));
    }
    return res.status(200).json({ vehicles: rows });
});

// Function to display a specific vehicle.
export const getSingleVehicle = tryCatchWrapper(async function (req, res, next) {
    const id = req.params.id
    const row = await Vehicle.findByPk(id);
    if (!row) {
        return next(createCustomError("vehicle not found", 404));
    }
    return res.status(200).json(row);
});

// Function to create a new vehicles.
export const createVehicle = tryCatchWrapper(async function (req, res, next) {
    const {type, lock_unlock_status, current_speed, battery_level, status, location}= req.body
    if (!type || !lock_unlock_status || !current_speed || !battery_level || !status || !location) {
        return next (createCustomError("All fields are required", 400));
    }
    
    const result = await Vehicle.create({
        type: type,
        lock_unlock_status: lock_unlock_status,
        current_speed: current_speed,
        battery_level: battery_level,
        status: status,
        location: location
      });
    const id = result.dataValues.vehicle_id
    const row = await Vehicle.findByPk(id);
    return res.status(201).json({ message: "vehicle has been created", row});
});

export const createVehicleBulk = tryCatchWrapper(async function (req, res, next) {
    const vehicles = req.body;
    console.log("Start")
    // Validate the input
    if (!Array.isArray(vehicles) || vehicles.length === 0) {
        return next (createCustomError("Invalid input: Expected an array of vehicles", 400));
    }
    console.log("Middle")
    // Validate each vehicle object
    for (const vehicle of vehicles) {
        const { type, lock_unlock_status, current_speed, battery_level, status, location } = vehicle;
        if (!type || !lock_unlock_status || !current_speed || !battery_level || !status || !location) {
            return next (createCustomError("All fields are required", 400));
        }
    }
    console.log("End")
    
    // Insert the vehicles into the database
    try {
        console.log("Trying to insert Bulk")
        const insertedVehicles = await Vehicle.bulkCreate(vehicles); 
        return res.status(201).json({ message: "vehicle has been created", row});

    } catch (error) {
        return next(createCustomError("Error inserting vehicles", 500));
    }
});

// Function to update a specific vehicle.
export const updateVehicle = tryCatchWrapper(async function (req, res, next) {
    const id = req.params.id
    const updates = req.body;
    
    if (!id) {
        return next(createCustomError("ID is required", 400));
    }

    if (Object.keys(updates).length === 0) {
        return next(createCustomError("No fields provided for update", 400));
    }

    const row = await Vehicle.findByPk(id);
    if (!row) {
        return next(createCustomError("Vehicle not found", 404));
    }

    await Vehicle.update(updates, {
        where: {
            vehicle_id: id
        }
    });

    return res.status(201).json({ message: "Vehicle has been updated" });
});


// Inferior update function
// export const updateVehicle = tryCatchWrapper(async function (req, res, next) {
//     const vehicleId = req.params.id;
//     const updates = req.body;
//     const fields = [];
//     const values = [];

//     const row = await getVehicle(vehicleId);
//     if (!row) {
//         return next(createCustomError("Vehicle not found", 404));
//     }
//     for (let key in updates) {
//         if (updates.hasOwnProperty(key)) {
//             fields.push(`${key} = ?`);
//             values.push(updates[key]);
//         }
//     }

//     if (fields.length > 0) {
//         const sql = `UPDATE vehicles SET ${fields.join(', ')} WHERE vehicle_id = ?`;
//         values.push(vehicleId); 
//         await pool.query(sql, values)
//         return res.status(201).json({ message: "vehicle has been updated" });
//     } else {
//         return next(createCustomError("No field to update", 400));
//     }
// });

// // Function to delete a specific vehicle.
export const deleteVehicle = tryCatchWrapper(async function (req, res, next) {
    const id = req.params.id;

    if (!id) {
        return next(createCustomError("ID is required", 400));
    }

    const row = await Vehicle.findByPk(id);
    if (!row) {
        return next(createCustomError("Vehicle not found", 404));
    }

    await Vehicle.destroy({
        where: {
            vehicle_id: id
        }
    });

    return res.status(200).json({ message: "Vehicle deleted successfully" });
});


// Inferior delete function
// export const deleteVehicle = tryCatchWrapper(async function (req, res, next) {
//     const id = req.params.id
//     if (!id) {
//         return next(createCustomError("ID is required", 400));
//     }
//     const row = await getVehicle(id);
//     if (!row) {
//         return next(createCustomError("Vehicle not found", 404));
//     }
//     await pool.query("DELETE FROM vehicles WHERE vehicle_id = ?", [id])
//     return res.status(200).json({ message: "Vehicle deleted successfully" });
// });

