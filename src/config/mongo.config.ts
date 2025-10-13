import mongoose, { Collection } from "mongoose";




const connectDb = async function connectDb() {
    try{
    const connectionURI: string  = process.env.mongo_db_url || ''
    if(!connectionURI){
        console.log("DB connection failed, URI missing")
    }  

   const connection =  await mongoose.connect(connectionURI)
    console.log(`✅ MongoDB connected successfully to: ${connection.connection.host}`)

}catch(err:any){
    console.log(err)
    process.exit(1)
}
}

export default connectDb