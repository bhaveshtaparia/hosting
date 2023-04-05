const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
const databaseConnection=()=>{
    mongoose.connect(process.env.DB_URI,{
    }).then((data)=>{
    console.log('Mogodb connected with server: '+data.connection.host);
    })
}
module.exports=databaseConnection;
