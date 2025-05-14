import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true }, // ✅ ADD THIS
  role: { type: String, enum: ['student', 'teacher'] },
  booksIssued: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);
export default User;