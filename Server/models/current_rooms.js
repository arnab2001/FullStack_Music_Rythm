import mongoose from "mongoose";
const RoomSchema = mongoose.Schema(
  {
    roomID: { type: String, trim: true },
    userOne: { type: String },
    userTwo: { type: string },
    SocketId: { type: String },
  },
  {
    timestamps: true,
  }
);
const Rooms = mongoose.model("Rooms", RoomSchema);
export default Rooms;
 