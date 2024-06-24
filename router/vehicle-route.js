import express from "express";
import { getVehicles, getSingleVehicle, createVehicle, createVehicleBulk, updateVehicle, deleteVehicle } from "../vehicle-controller.js";
import { auth } from "../middlewares/auth-middleware.js";
import { admin, editor, viewer } from "../middlewares/roles.js";
import {validateVehicleCreate} from "../middlewares/validate-vehicle-create.js";
import {validateVehicleUpdate} from "../middlewares/validate-vehicle-update.js";
import {validateVehicleBulkCreate} from "../middlewares/validate-vehicle-bulkCreate.js"


const router = express.Router();

router.route("/")
  .get(auth, viewer, getVehicles)
  .post(auth, editor, validateVehicleCreate, createVehicle);

router.route("/:id")
  .get(auth, viewer, getSingleVehicle)
  .patch(auth, editor, validateVehicleUpdate, updateVehicle)
  .delete(auth, admin, deleteVehicle);

router.route("/bulk")
  .post(auth, editor, validateVehicleBulkCreate, createVehicleBulk);

export default router;