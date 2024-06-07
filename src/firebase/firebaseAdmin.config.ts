import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY || ''
);

if (!admin.apps.length) {
  initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
    },
    'ADMIN'
  );
}

export const authAdmin = getAuth(admin.app('ADMIN'));
