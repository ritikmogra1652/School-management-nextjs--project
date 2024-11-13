import mongoose from "mongoose";
export interface User extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
