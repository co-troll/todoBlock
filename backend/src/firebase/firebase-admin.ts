import * as admin from 'firebase-admin';

const serviceAccount = require('../../serviceAccountKey.json'); // JSON 파일 경로

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAdmin = admin;