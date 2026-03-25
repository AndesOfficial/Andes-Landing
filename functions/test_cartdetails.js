const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Only initialize if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function test() {
  const db = admin.firestore();
  const idsToCheck = [
    "ftIj39EVylxXDPeCTSeK",
    "w3ar7Z28vWD5ZNEuWrmi",
    "w467k5Ja4ctparDJzi0k"
  ];

  for (const id of idsToCheck) {
    const doc = await db.collection("cartdetails").doc(id).get();
    if (doc.exists) {
      console.log(`FOUND in cartdetails: ${id}`);
      console.log(JSON.stringify(doc.data(), null, 2));
    } else {
      console.log(`NOT FOUND in cartdetails: ${id}`);
    }
  }
}
test().catch(console.error);
