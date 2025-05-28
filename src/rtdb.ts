// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref } from 'firebase/database';

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "ArMRyrUYPEDazUrRaZuixQE9O4HrmqpOVouqVt3E",
    authDomain: "proyect-ald.firebaseapp.com",
    databaseURL: "https://proyect-ald-default-rtdb.firebaseio.com",
    projectId: "proyect-ald",
    storageBucket: "proyect-ald.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore
const rtdb = getDatabase(app); // Realtime Database
export { rtdb, db }; // Exporta ambas bases de datos
