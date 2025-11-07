import * as functions from "firebase-functions";
import next from "next";

// Initialize the Next.js app
const nextApp = next({
  dev: false,
  conf: { distDir: ".next" },
});

// Create a request handler
const handle = nextApp.getRequestHandler();

// Export the function that Firebase Hosting will route to
export const nextServer = functions.https.onRequest(async (req, res) => {
  await nextApp.prepare();
  handle(req, res);
});
