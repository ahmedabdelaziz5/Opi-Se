const firebaseAdmin = require('firebase-admin');
const fireBaseObj = require('./opi-se-firebase-adminsdk-p8nln-8f757a9c0b.json');

const connectToFireBase = () => {
    try {
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(fireBaseObj),
        })
        console.log("Firebase connected");
    }   
    catch (err) {
        console.log(err);
    }

};


module.exports = {
    connectToFireBase,
    firebaseAdmin
}
