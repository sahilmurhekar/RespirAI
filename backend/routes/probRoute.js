import express from 'express';
import {probValue,gasValue} from '../controllers/probController.js'
const probRouter = express.Router();

probRouter.post("/value",probValue);
probRouter.post("/gas", gasValue);


export default probRouter;