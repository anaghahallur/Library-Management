import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  issueDate: Date,
  returnDate: Date,
//   history: [
//     {
//       user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       issueDate: Date,
//       returnDate: Date
    // }
//   ]
});

const Book = mongoose.model('Book', bookSchema);
export default Book;