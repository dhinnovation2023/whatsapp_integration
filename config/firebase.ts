// import { initializeApp, cert, getApps } from "firebase-admin/app";
// import { getStorage } from "firebase-admin/storage";

// export async function getBucket() {
//     return new Promise((resolve, reject) => {
//         try {

//             const FIREBASE_SERVICE_ACCOUNT_KEY = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

//             if (!FIREBASE_SERVICE_ACCOUNT_KEY) {
//                 throw new Error("FIREBASE credentials is required");
//             }

//             if (!getApps().length) {
//                 initializeApp({
//                     credential: cert(JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY)),
//                     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//                 });
//             }

//             const bucket = getStorage().bucket();
//             return resolve(bucket);

//         } catch (err) {
//             return reject(err);
//         }
//     })
// }



import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {

    const FIREBASE_SERVICE_ACCOUNT_KEY = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!FIREBASE_SERVICE_ACCOUNT_KEY) {
        throw new Error("FIREBASE credentials is required");
    }

    initializeApp({
        credential: cert(JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY)),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
}

export const bucket = getStorage().bucket();
