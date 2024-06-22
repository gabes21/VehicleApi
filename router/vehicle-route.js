import express from "express";
import { getVehicles, getSingleVehicle, createVehicle, updateVehicle, deleteVehicle } from "../vehicle-controller.js";
import { auth } from "../middlewares/auth-middleware.js";
import { admin, editor, viewer } from "../middlewares/roles.js";

const router = express.Router();

router.route("/")
  .get(auth, viewer, getVehicles)
  .post(auth, editor, createVehicle);

router.route("/:id")
  .get(auth, viewer, getSingleVehicle)
  .patch(auth, editor, updateVehicle)
  .delete(auth, admin, deleteVehicle);

export default router;