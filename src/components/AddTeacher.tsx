// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";



// const AddTeacher: React.FC = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     // Basic client-side validation
//     if (!name.trim() || !email.trim() || !password.trim()) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:3001/api/users/add", { // Adjust URL to match your backend
//         name: name.trim(),
//         email: email.trim(),
//         role: "teacher",
//         password: password.trim(),
//       }, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 201) {
//         alert("Teacher added successfully!");
//         navigate("/dashboard");
//       }
//     } catch (err: any) {
//       console.error("Error adding teacher:", err); // Log full error for debugging
//       if (err.response) {
//         setError(err.response.data.error || "Failed to add teacher");
//       } else if (err.request) {
//         setError("No response from server. Check if the backend is running.");
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Teacher</h2>
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 flex items-center">
//             <span className="mr-2">⚠️</span> {error}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  hover:scale-105 transition-transform duration-300"
//           >
//             Add Teacher
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTeacher;





// //view teacher
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { Trash2 } from "lucide-react";

// const ViewTeachers: React.FC = () => {
//   const [teachers, setTeachers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const fetchTeachers = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get("http://localhost:3001/api/users/teachers", {
//         headers: { "Content-Type": "application/json" },
//       });
//       setTeachers(response.data);
//     } catch (err: any) {
//       console.error("Error fetching teachers:", err);
//       setError(err.response?.data?.error || "Failed to fetch teachers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteTeacher = async (teacherId: number) => {
//     if (!window.confirm("Are you sure you want to delete this teacher?")) return;

//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.delete(`http://localhost:3001/api/users/delete/${teacherId}`, {
//         headers: { "x-admin-role": user?.role || "", "Content-Type": "application/json" },
//       });
//       console.log("Delete response:", response); // Log the full response
//       if (response.status === 200) {
//         fetchTeachers(); // Refresh the list
//         alert("Teacher deleted successfully!");
//       } else {
//         throw new Error(`Unexpected status code: ${response.status}`);
//       }
//     } catch (err: any) {
//       console.error("Error deleting teacher:", err); // Log the full error
//       if (err.response) {
//         setError(err.response.data.error || `Failed to delete teacher (Status: ${err.response.status})`);
//       } else if (err.request) {
//         setError("No response from server. Check if the backend is running.");
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//   <h2 className="text-2xl font-bold text-gray-800">View Existing Teachers</h2>
//   <div className="flex space-x-4">
//     <button
//       onClick={() => navigate("/teachermanagment")}
//       className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105 transition-transform duration-300"
//     >
//       Add
//     </button>
//     <button
//       onClick={() => navigate("/dashboard")}
//       className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105 transition-transform duration-300"
//     >
//       Back to Dashboard
//     </button>
//   </div>
// </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 mx-6 mt-4 flex items-center">
//             <span className="mr-2">⚠️</span> {error}
//           </div>
//         )}
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Created At
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {teachers.map((teacher) => (
//                   <tr key={teacher.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       #{teacher.id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {teacher.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {teacher.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(teacher.created_at).toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <button
//                         onClick={() => handleDeleteTeacher(teacher.id)}
//                         className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50"
//                         disabled={user?.role !== "admin"}
//                       >
//                         <Trash2 size={14} className="mr-1" /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {teachers.length === 0 && (
//               <div className="text-center py-8 text-gray-500">No teachers found</div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewTeachers;


//resposive layout
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const ViewTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:3001/api/users/teachers", {
        headers: { "Content-Type": "application/json" },
      });
      setTeachers(response.data);
    } catch (err: any) {
      console.error("Error fetching teachers:", err);
      setError(err.response?.data?.error || "Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeacher = async (teacherId: number) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    toast.success("Deleted successfully")
    setLoading(true);
    setError("");
    try {
      const response = await axios.delete(`http://localhost:3001/api/users/delete/${teacherId}`, {
        headers: { "x-admin-role": user?.role || "", "Content-Type": "application/json" },
      });
      console.log("Delete response:", response);
      if (response.status === 200) {
        fetchTeachers();
        alert("Teacher deleted successfully!");
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err: any) {
      console.error("Error deleting teacher:", err);
      if (err.response) {
        setError(err.response.data.error || `Failed to delete teacher (Status: ${err.response.status})`);
      } else if (err.request) {
        setError("No response from server. Check if the backend is running.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-3 sm:px-6 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">View Existing Teachers</h2>
          <div className="flex flex-col xs:flex-row w-full sm:w-auto gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/teachermanagment")}
              className="bg-gray-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105 transition-transform duration-300 text-sm flex items-center justify-center"
            >
              <Plus size={16} className="mr-1.5" /> Add Teacher
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gray-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105 transition-transform duration-300 text-sm flex items-center justify-center"
            >
              <ArrowLeft size={16} className="mr-1.5" /> Back to Dashboard
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-4 mx-3 sm:mx-6 mt-3 text-sm flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {teachers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No teachers found</div>
            ) : (
              <div className="block sm:hidden">
                {/* Mobile card view */}
                <div className="divide-y divide-gray-200">
                  {teachers.map((teacher) => (
                    <div key={teacher.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{teacher.name}</p>
                          <p className="text-sm text-gray-500">{teacher.email}</p>
                        </div>
                        <span className="text-xs text-gray-500">#{teacher.id}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">{formatDate(teacher.created_at)}</p>
                        <button
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50"
                          disabled={user?.role !== "admin"}
                        >
                          <Trash2 size={12} className="mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Desktop table view - hidden on mobile */}
            <table className="hidden sm:table min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{teacher.id}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                      {teacher.name}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                      {teacher.email}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(teacher.created_at)}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="inline-flex items-center px-2 sm:px-3 py-1 border border-transparent text-xs sm:text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50"
                        disabled={user?.role !== "admin"}
                      >
                        <Trash2 size={14} className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTeachers;