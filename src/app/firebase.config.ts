import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBcU3RtNc4GYgHOAG--9faA9rHe4jhvJgQ",
    authDomain: "giphy-api-8c48e.firebaseapp.com",
    projectId: "giphy-api-8c48e",
    storageBucket: "giphy-api-8c48e.firebasestorage.app",
    messagingSenderId: "887734393072",
    appId: "1:887734393072:web:26793a6f008e39d2ebca35",
    measurementId: "G-MPYKX36M0M"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Firebase Auth para usarlo en la app
export const auth = getAuth(app);
