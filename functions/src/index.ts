import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const serviceAccount = require("./../../../cultivando-ideias-0e2e6b9341e9.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
// admin.initializeApp();

import { server } from "./server";

const api = functions.https.onRequest(server);

module.exports = {
  api,
};
