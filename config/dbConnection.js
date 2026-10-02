const mongoose=require('mongoose')
const connectDb= async()=>{
  try{
    const connect=await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database Connected:",connect.connection.host,connect.connection.name);
  }
  catch(err){// this is the part of error
    console.log(err);
    process.exit(1);


  }
};
module.exports = connectDb;