// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxWfdd8w0NdEk_Qb8JtBcuIE7i1yZUVw0",
  authDomain: "jobboard-fdc74.firebaseapp.com",
  projectId: "jobboard-fdc74",
  storageBucket: "jobboard-fdc74.appspot.com",
  messagingSenderId: "906587617988",
  appId: "1:906587617988:web:83ac3831270eb5e1666791"
};

// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read;
//         allow write: if
//         request.resource.size < 10 * 1024 * 1024 &&
//         request.resource.contentType.matches('image/.*')
//       }
//     }
//   }

// Initialize Firebase
export const app = initializeApp(firebaseConfig);