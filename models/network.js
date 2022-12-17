import mongoose from "mongoose";
const { Schema } = mongoose;

const NetworkSchema = new Schema({
  name: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  createdBy: {
    type: String,
  },
});

export default mongoose.models.Network ||
  mongoose.model("Network", NetworkSchema);
