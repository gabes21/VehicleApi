import express from "express"
import authRoute from "./router/auth.js";
import vehicleRoute from "./router/vehicle-route.js";
import {handleError} from "./middlewares/handle-error.js"
import { notFound } from "./middlewares/not-found.js";

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());


app.use("/api/auth", authRoute);
// API routes
app.use("/api/vehicles", vehicleRoute);

app.use(notFound);
app.use(handleError);


app.listen(port, () => {
    console.log("Server is running on port " + port);
})
