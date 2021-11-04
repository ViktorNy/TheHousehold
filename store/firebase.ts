import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';

export default function firebaseInit() {
    const firebaseConfig = {
        apiKey: 'AIzaSyASaIZumbQ6_02Q2wE_zfRWdkwZLrzofm0',
        authDomain: 'thehousehold-5c185.firebaseapp.com',
        databaseURL: 'https://thehousehold-5c185-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'thehousehold-5c185',
        storageBucket: 'thehousehold-5c185.appspot.com',
        messagingSenderId: '855025599285',
        appId: '1:855025599285:web:ed46d90ad93f5c05f3027c',
        measurementId: 'G-KW6GR0CRQG'
    };

    const app = initializeApp(firebaseConfig);

    const db = getDatabase(app);
    return db;
}
