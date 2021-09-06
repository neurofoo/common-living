/**
 * Create the Firebase client and freeze it to use a (pseudo) singleton pattern
 * NB: this is now using the new v9 firebase interfaces
 * TODO: port this new interface to the mobile app
 */
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Functions, getFunctions } from 'firebase/functions';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DOMAIN_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_GA_MEASUREMENT_ID,
};

export interface FireBaseClientInterface {
  app: FirebaseApp;
  functions: Functions;
}

class FirebaseClient implements FireBaseClientInterface {
  app: FirebaseApp;
  functions: Functions;

  constructor() {
    this.app = initializeApp(config);
    this.functions = getFunctions(this.app);
  }
}

// Use freeze for a singleton pattern
const instance = new FirebaseClient();
Object.freeze(instance);

export default instance;
