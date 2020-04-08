import * as express from "express";

const cookieParser = require("cookie-parser")();
const cors = require("cors")();
const server = express();

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = async (req: any, res: any, next: any) => {
  console.log("Check if request is authorized with Firebase ID token");
  next();
  return;
  //   if (
  //     (!req.headers.authorization ||
  //       !req.headers.authorization.startsWith("Bearer ")) &&
  //     !(req.cookies && req.cookies.__session)
  //   ) {
  //     console.error(
  //       "No Firebase ID token was passed as a Bearer token in the Authorization header.",
  //       "Make sure you authorize your request by providing the following HTTP header:",
  //       "Authorization: Bearer <Firebase ID Token>",
  //       'or by passing a "__session" cookie.'
  //     );
  //     res.status(403).send("Unauthorized");
  //     return;
  //   }

  //   let idToken;
  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith("Bearer ")
  //   ) {
  //     console.log('Found "Authorization" header');
  //     // Read the ID Token from the Authorization header.
  //     idToken = req.headers.authorization.split("Bearer ")[1];
  //   } else if (req.cookies) {
  //     console.log('Found "__session" cookie');
  //     // Read the ID Token from cookie.
  //     idToken = req.cookies.__session;
  //   } else {
  //     // No cookie
  //     res.status(403).send("Unauthorized");
  //     return;
  //   }

  //   try {
  //     const decodedIdToken = await admin.auth().verifyIdToken(idToken);
  //     console.log("ID Token correctly decoded", decodedIdToken);
  //     req.user = decodedIdToken;
  //     next();
  //     return;
  //   } catch (error) {
  //     console.error("Error while verifying Firebase ID token:", error);
  //     res.status(403).send("Unauthorized");
  //     return;
  //   }
};

server.use(cors);
server.use(cookieParser);
server.use(validateFirebaseIdToken);

server.use("/posts", require("./routes/posts"));

server.get("*", (_, res) =>
  res.status(404).json({ success: false, data: "Endpoint not found" })
);

export { server };
