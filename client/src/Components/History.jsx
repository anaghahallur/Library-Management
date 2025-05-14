// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function History({ user }) {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?._id) return;

//     axios.get(`http://localhost:8800/api/books/history/${user._id}`)
//       .then(res => {
//         console.log("📚 Book history fetched:", res.data); // ✅ Debug log
//         setHistory(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("History fetch error:", err);
//         setLoading(false);
//       });
//   }, [user._id]);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Issued Books History</h2>

//       {loading ? (
//         <p>Loading history...</p>
//       ) : history.length === 0 ? (
//         <p>No book history found</p>
//       ) : (
//         <ul className="list-disc pl-5 space-y-4">
//           {history.map((record, index) => (
//             <li key={index} className="bg-gray-50 p-3 rounded shadow">
//               <div className="font-semibold text-lg">{record.title}</div>
//               <div className="text-sm text-gray-600">by {record.author}</div>
//               <div className="mt-1 text-sm">
//                 📤 <span className="font-medium">Issued:</span> {new Date(record.issueDate).toLocaleDateString()}<br />
//                 📥 <span className="font-medium">Returned:</span> {new Date(record.returnDate).toLocaleDateString()}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }