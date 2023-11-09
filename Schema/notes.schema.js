import mongoose from "mongoose";


const schema = new mongoose.Schema({
    note: {
        type: String
    },
    userId: {
        type: String
    }
});

export default mongoose.model.Notes || mongoose.model("Note", schema);