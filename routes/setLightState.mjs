import express from 'express';
import { lightControl } from '../remotebutton.mjs';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/:state',  (request, response) => {

  let state = request.params.state;

  if (state == "on"){
    lightControl.on();
  }

  if (state == "off"){
    lightControl.off();
  }
  response.redirect('/index.html');
});

export { router as setLightState };
 