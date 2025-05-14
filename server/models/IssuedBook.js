import mongoose from 'mongoose';

const issuedBookSchema = new mongoose.Schema({
  title: String,
  author: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  issueDate: Date,
  returnDate: Date
});

const IssuedBook = mongoose.model('IssuedBook', issuedBookSchema);
export default IssuedBook;