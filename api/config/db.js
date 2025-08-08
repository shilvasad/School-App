import mongoose from "mongoose";
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
         const {host, port, name} = conn.connection
        console.log(`MongoDB is connected to ${host}:${port}/${name}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1) // Ensure graceful shutdown. 
    }
}

export default connectDB