// // src/components/Dashboard.tsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { getSummary, getReport } from "../utils/api"; // Import getReport
// import { type SummaryReport } from "../types"; // Use type-only imports
// import NotificationReport from "./NotificationReport";



// const Dashboard: React.FC = () => {
//   const [summary, setSummary] = useState<SummaryReport | null>(null);
//   const [selectedReport, setSelectedReport] = useState<NotificationReport | null>(null); // Store the full report
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);
//   const { user, logoutUser } = useAuth();
//   const navigate = useNavigate();

//   const fetchSummary = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await getSummary();
//       if (response.success) {
//         setSummary(response.data);
//       } else {
//         throw new Error(response.error || "Failed to fetch summary");
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch summary");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummary();
//   }, []);

//   const handleLogout = async () => {
//     await logoutUser();
//     navigate("/login");
//   };

//   const handleViewReport = async (notificationId: number) => {
//     setSelectedNotificationId(notificationId);
//     setLoading(true);
//     setError("");
//     try {
//       // Fetch the full report for the selected notification
//       const response = await getReport(notificationId);
//       if (response.success) {
//         setSelectedReport(response.data); // Store the full report
//       } else {
//         throw new Error(response.error || "Failed to fetch report");
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch report");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Notification Report Dashboard</h1>
//         <div className="flex items-center space-x-4">
//           <p className="text-lg">Welcome, {user?.name} ({user?.role})</p>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600  hover:scale-105 transition-transform duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="mb-6">
//         <button
//           onClick={fetchSummary}
//           className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600  hover:scale-105 transition-transform duration-300"
//           disabled={loading}
//         >
//           {loading ? "Refreshing..." : "Refresh Data"}
//         </button>
//       </div>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {loading && !selectedNotificationId && <p>Loading summary...</p>}

//       {summary && !selectedNotificationId && (
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <h2 className="text-xl font-semibold mb-4">Summary</h2>
//           <p><strong>Total Notifications:</strong> {summary.totalNotifications}</p>
//           <p><strong>Total Messages:</strong> {summary.totalMessages}</p>
//           <div className="mt-2">
//             <h3 className="font-semibold">Overall Summary:</h3>
//             <ul className="list-disc list-inside">
//               <li>Delivered: {summary.overallSummary.delivered}</li>
//               <li>Sent: {summary.overallSummary.sent}</li>
//               <li>Failed: {summary.overallSummary.failed}</li>
//               <li>Pending: {summary.overallSummary.pending}</li>
//             </ul>
//           </div>
//           <div className="mt-4">
//             <h3 className="font-semibold">Notifications:</h3>
//             <table className="w-full mt-2 border-collapse">
//               {/* <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border p-2">ID</th>
//                   <th className="border p-2">Type</th>
//                   <th className="border p-2">Sending Time</th>
//                   <th className="border p-2">Total Recipients</th>
//                   <th className="border p-2">Actions</th>
//                 </tr>
//               </thead> */}
//               <tbody>
//                 {summary.notifications.map((notification) => (
//                   <tr key={notification.notificationId} className="hover:bg-gray-100">
//                     <td className="border p-2">{notification.notificationId}</td>
//                     <td className="border p-2">{notification.type}</td>
//                     <td className="border p-2">{new Date(notification.sendingTime).toLocaleString()}</td>
//                     <td className="border p-2">{notification.totalRecipients}</td>
//                     <td className="border p-2">
//                       <button
//                         onClick={() => handleViewReport(notification.notificationId)}
//                         className="text-blue-500 hover:underline hover:scale-105 transition-transform duration-300"
//                       >
//                         View Report
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {selectedNotificationId && selectedReport && (
//         <div>
//           <button
//             onClick={() => {
//               setSelectedNotificationId(null);
//               setSelectedReport(null);
//             }}
//             className="mb-4 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600  hover:scale-105 transition-transform duration-300"
//           >
//             Back to Summary
//           </button>
//           <NotificationReport report={selectedReport} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// src/components/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSummary, getReport } from "../utils/api";
import { type SummaryReport } from "../types";
import NotificationReport from "./NotificationReport";
import { Loader2, RefreshCw, LogOut, ArrowLeft, Eye } from "lucide-react";

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<SummaryReport | null>(null);
  const [selectedReport, setSelectedReport] = useState<NotificationReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // State to manage selected notification types for filtering
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  // State to control the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchSummary = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getSummary();
      if (response.success) {
        setSummary(response.data);
      } else {
        throw new Error(response.error || "Failed to fetch summary");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const handleViewReport = async (notificationId: number) => {
    setSelectedNotificationId(notificationId);
    setLoading(true);
    setError("");
    try {
      const response = await getReport(notificationId);
      if (response.success) {
        setSelectedReport(response.data);
      } else {
        throw new Error(response.error || "Failed to fetch report");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  const StatusCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${color}`}>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );

  // Handle checkbox change for type filtering
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    setSelectedTypes((prev) =>
      event.target.checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  // Filter notifications based on selected types
  const filteredNotifications = summary?.notifications.filter((notification) =>
    selectedTypes.length === 0 || selectedTypes.includes(notification.type)
  ) || [];

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside (optional enhancement)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".dropdown-menu");
      if (dropdown && !dropdown.contains(event.target as Node) && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Notification Report Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 text-blue-700 py-1 px-3 rounded-full text-sm font-medium">
              {user?.role}
            </div>
            <div className="text-gray-700">{user?.name}</div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center text-gray-700 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        {selectedNotificationId && selectedReport ? (
          /* Detailed Report View */
          <div>
            <button
              onClick={() => {
                setSelectedNotificationId(null);
                setSelectedReport(null);
              }}
              className="mb-6 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Summary
            </button>
            <NotificationReport report={selectedReport} />
          </div>
        ) : (
          /* Summary View */
          <div>
            <div className="mb-6 flex justify-between items-center">
              <button
                onClick={fetchSummary}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <RefreshCw size={16} className="mr-2" />
                )}
                {loading ? "Refreshing..." : "Refresh Data"}
              </button>
              
              <div className="text-sm text-gray-500">
                {summary && `Last updated: ${new Date().toLocaleString()}`}
              </div>
            </div>

            {/* Filter Dropdown with Checkboxes */}
            <div className="mb-6">
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Notification Type
              </label>
              <div className="relative inline-block w-full md:w-64">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none flex justify-between items-center"
                >
                  <span>{selectedTypes.length > 0 ? selectedTypes.join(", ") : "Select Types"}</span>
                  <svg
                    className={`h-5 w-5 text-gray-400 ml-2 transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 dropdown-menu">
                    <label className="flex items-center px-4 py-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value="email"
                        checked={selectedTypes.includes("email")}
                        onChange={handleTypeChange}
                        className="mr-2 leading-tight"
                      />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center px-4 py-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value="sms"
                        checked={selectedTypes.includes("sms")}
                        onChange={handleTypeChange}
                        className="mr-2 leading-tight"
                      />
                      <span>SMS</span>
                    </label>
                    <label className="flex items-center px-4 py-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value="whatsapp"
                        checked={selectedTypes.includes("whatsapp")}
                        onChange={handleTypeChange}
                        className="mr-2 leading-tight"
                      />
                      <span>WhatsApp</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {loading && !summary ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 size={48} className="animate-spin text-blue-500" />
              </div>
            ) : summary ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  <div className="lg:col-span-1">
                    <StatusCard
                      title="Total Notifications"
                      value={summary.totalNotifications}
                      color="border-blue-500"
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <StatusCard
                      title="Total Messages"
                      value={summary.totalMessages}
                      color="border-purple-500"
                    />
                  </div>
                  <div className="lg:col-span-3 grid grid-cols-4 gap-4">
                    <StatusCard
                      title="Delivered"
                      value={summary.overallSummary.delivered}
                      color="border-green-500"
                    />
                    <StatusCard
                      title="Sent"
                      value={summary.overallSummary.sent}
                      color="border-blue-500"
                    />
                    <StatusCard
                      title="Failed"
                      value={summary.overallSummary.failed}
                      color="border-red-500"
                    />
                    <StatusCard
                      title="Pending"
                      value={summary.overallSummary.pending}
                      color="border-yellow-500"
                    />
                  </div>
                </div>

                {/* Notifications Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Notification Reports</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sending Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Recipients
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredNotifications.map((notification) => (
                          <tr key={notification.notificationId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{notification.notificationId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {notification.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(notification.sendingTime).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {notification.totalRecipients}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => handleViewReport(notification.notificationId)}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                              >
                                <Eye size={14} className="mr-1" /> View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No notifications found
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
                No data available. Click "Refresh Data" to load summary.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;