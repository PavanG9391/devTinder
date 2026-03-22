const mongoose = require('mongoose');


const DBConnect = async ()=>{
    mongoose.connect('mongodb+srv://pawangundabathula_db_user:86l3icogzIIrg1Xp@namesthidev.ayv9mbf.mongodb.net/?appName=NamesthiDev');
}


module.exports = DBConnect;