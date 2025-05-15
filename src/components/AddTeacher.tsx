


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { 
  Trash2, 
  Plus, 
  ArrowLeft, 
  Search, 
  Users, 
  AlertCircle, 
  Calendar, 
  Mail, 
  User,
  RefreshCw
} from "lucide-react";
import toast from "react-hot-toast";

const ViewTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.id.toString().includes(searchTerm)
      );
      setFilteredTeachers(filtered);
    }
  }, [searchTerm, teachers]);

  const fetchTeachers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:3001/api/users/teachers", {
        headers: { "Content-Type": "application/json" },
      });
      setTeachers(response.data);
      setFilteredTeachers(response.data);
    } catch (err: any) {
      console.error("Error fetching teachers:", err);
      setError(err.response?.data?.error || "Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeacher = async (teacherId: number, teacherName: string) => {
    // if (!window.confirm(`Are you sure you want to delete ${teacherName}?`)) return;
    
    setLoading(true);
    setError("");
    try {
      const response = await axios.delete(`http://localhost:3001/api/users/delete/${teacherId}`, {
        headers: { "x-admin-role": user?.role || "", "Content-Type": "application/json" },
      });
      
      if (response.status === 200) {
        // toast.success(`${teacherName} has been deleted successfully`);
        toast.success(`teacher deleted successfully`);
        fetchTeachers();
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err: any) {
      console.error("Error deleting teacher:", err);
      toast.error("Failed to delete teacher");
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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center">
                <Users size={24} className="text-white mr-3" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Teacher Management</h2>
              </div>
              
              <div className="flex flex-col xs:flex-row w-full sm:w-auto gap-2 sm:gap-3">
                <button
                  onClick={() => navigate("/teachermanagment")}
                  className="bg-white text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white shadow-sm font-medium text-sm flex items-center justify-center transition-all duration-200"
                >
                  <Plus size={16} className="mr-1.5" /> Add Teacher
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-indigo-700 bg-opacity-20 text-white py-2 px-4 rounded-lg hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white shadow-sm font-medium text-sm flex items-center justify-center transition-all duration-200"
                >
                  <ArrowLeft size={16} className="mr-1.5" /> Back to Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Search and summary section */}
          <div className="border-b border-gray-200 p-4 sm:p-6 bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search teachers..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={fetchTeachers}
                  className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                >
                  <RefreshCw size={16} className="mr-1" />
                  Refresh
                </button>
                
                <span className="text-gray-500 text-sm hidden sm:inline-flex items-center ml-4">
                  <Users size={16} className="mr-1 text-gray-400" />
                  {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mx-4 sm:mx-6 mt-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
                <AlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {filteredTeachers.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <Users size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No teachers found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {searchTerm ? 
                      `No results match "${searchTerm}". Try a different search term or clear your search.` : 
                      "There are no teachers in the system yet. Add a new teacher to get started."}
                  </p>
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Mobile card view */}
                  <div className="block sm:hidden">
                    <div className="grid gap-4 p-4">
                      {filteredTeachers.map((teacher) => (
                        <div key={teacher.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                                  <User size={18} />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-900">{teacher.name}</h3>
                                  <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Mail size={14} className="mr-1" />
                                    {teacher.email}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs font-medium bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full">ID: {teacher.id}</span>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar size={14} className="mr-1" />
                                Added {formatDate(teacher.created_at)}
                              </div>
                              <button
                                onClick={() => handleDeleteTeacher(teacher.id, teacher.name)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50"
                                disabled={user?.role !== "admin"}
                              >
                                <Trash2 size={14} className="mr-1" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Desktop table view */}
                  <div className="hidden sm:block">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
                      <thead>
                        <tr>
                          <th className="w-16 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                            Email
                          </th>
                          <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                            Created At
                          </th>
                          <th className="w-32 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTeachers.map((teacher, index) => (
                          <tr key={teacher.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{teacher.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                                  <User size={14} />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{teacher.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <Mail size={14} className="mr-2 text-gray-400" />
                                {teacher.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar size={14} className="mr-2 text-gray-400" />
                                {formatDate(teacher.created_at)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <button
                                onClick={() => handleDeleteTeacher(teacher.id, teacher.name)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50"
                                disabled={user?.role !== "admin"}
                                title={user?.role !== "admin" ? "Only admins can delete teachers" : "Delete teacher"}
                              >
                                <Trash2 size={14} className="mr-1" /> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Footer */}
          <div className="border-t border-gray-200 px-4 py-3 sm:px-6 text-xs text-gray-500 flex justify-between items-center bg-gray-50">
            <div>
              <span>Total: {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="text-right">
              {searchTerm && (
                <span>Showing filtered results for "{searchTerm}"</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeachers;