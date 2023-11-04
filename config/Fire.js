import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  onValue,
  off,
  serverTimestamp,
} from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5qUsEywK-fs-I-zE12Ye1XTPvDm1gYhY",
  authDomain: "firestore-crud-fbe3e.firebaseapp.com",
  projectId: "firestore-crud-fbe3e",
  storageBucket: "firestore-crud-fbe3e.appspot.com",
  messagingSenderId: "884780609269",
  appId: "1:884780609269:web:977e16c56dd121ebbb9fbc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

class Fire {
  constructor() {
    this.checkAuth();
  }

  checkAuth = () => {
    onValue(ref(database, "auth"), (snapshot) => {
      if (!snapshot.exists()) {
        signInAnonymously(auth);
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: serverTimestamp(), // Utilize serverTimestamp() para gravar o timestamp corretamente
        user: item.user,
      };
      push(ref(database, "messages"), message);
    });
  };

  parse = (snapshot) => {
    const messages = [];
    snapshot.forEach((childSnapshot) => {
      const { text, timestamp, user } = childSnapshot.val();
      const createdAt = new Date(timestamp);
      const _id = childSnapshot.key;

      messages.push({
        _id,
        text,
        user,
        createdAt,
      });
    });
    return messages;
  };

  get = (callback) => {
    onValue(ref(database, "messages"), (snapshot) =>
      callback(this.parse(snapshot))
    );
  };

  off() {
    off(ref(database, "messages"));
  }

  uid() {
    return (auth.currentUser || {}).uid;
  }
}

export default new Fire();
