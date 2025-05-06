import mongoose from "mongoose";

export const dbConnection = mongoose.connect("mongodb+srv://aldennour741:FBYzHnFTVJP2dPcC@cluster0.bhllnte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('database connected succssfully')
}).catch((err) => {
    console.log('database not connected',err)
})