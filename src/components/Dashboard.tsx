

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { getSummary, getReport } from "../utils/api";
// import { type SummaryReport } from "../types";
// import NotificationReport from "./NotificationReport";
// import { Loader2, RefreshCw, LogOut, ArrowLeft, Eye, Download } from "lucide-react";
// import Papa from "papaparse";
// import Select from "react-select";

// const Dashboard: React.FC = () => {
//   const [summary, setSummary] = useState<SummaryReport | null>(null);
//   const [selectedReport, setSelectedReport] = useState<NotificationReport | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);
//   const { user, logoutUser } = useAuth();
//   const navigate = useNavigate();

//   // Filter states
//   const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
//   const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
//   const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
//   const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");
//   const [webinarFilter, setWebinarFilter] = useState<string>("");
//   const [studentFilter, setStudentFilter] = useState<string>("");

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
//       const response = await getReport(notificationId);
//       if (response.success) {
//         setSelectedReport(response.data);
//       } else {
//         throw new Error(response.error || "Failed to fetch report");
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch report");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const StatusCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
//     <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${color}`}>
//       <p className="text-gray-500 text-sm font-medium">{title}</p>
//       <p className="text-2xl font-bold mt-1">{value}</p>
//     </div>
//   );

//   const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const type = event.target.value;
//     setSelectedTypes((prev) =>
//       event.target.checked ? [...prev, type] : prev.filter((t) => t !== type)
//     );
//   };

//   const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const status = event.target.value;
//     setSelectedStatuses((prev) =>
//       event.target.checked ? [...prev, status] : prev.filter((s) => s !== status)
//     );
//   };

//   // // Filter notifications based on all criteria
//   // const filteredNotifications = summary?.notifications
//   //   .map((notification) => {
//   //     const filteredRecipients = notification.recipients.filter((recipient) => {
//   //       const matchesType = selectedTypes.length === 0 || selectedTypes.includes(notification.type);
//   //       const matchesStatus =
//   //         selectedStatuses.length === 0 || selectedStatuses.includes(recipient.status);
//   //       const notificationDate = new Date(notification.sendingTime);
//   //       const matchesStartDate = !startDate || notificationDate >= new Date(startDate);
//   //       const matchesEndDate = !endDate || notificationDate <= new Date(endDate);
//   //       const matchesWebinar =
//   //         !webinarFilter ||
//   //         notification.webinarTitle?.toLowerCase().includes(webinarFilter.toLowerCase());
//   //       const matchesStudent =
//   //         !studentFilter ||
//   //         recipient.recipientName?.toLowerCase().includes(studentFilter.toLowerCase());

//   //       return (
//   //         matchesType &&
//   //         matchesStatus &&
//   //         matchesStartDate &&
//   //         matchesEndDate &&
//   //         matchesWebinar &&
//   //         matchesStudent
//   //       );
//   //     });

//   //     return {
//   //       ...notification,
//   //       recipients: filteredRecipients,
//   //       totalRecipients: filteredRecipients.length,
//   //       summary: {
//   //         delivered: filteredRecipients.filter(r => r.status === "delivered" || r.status === "read").length,
//   //         sent: filteredRecipients.filter(r => r.status === "sent").length,
//   //         failed: filteredRecipients.filter(r => r.status === "failed").length,
//   //         pending: filteredRecipients.filter(r => ["queued", "sending"].includes(r.status)).length,
//   //       },
//   //     };
//   //   })
//   //   .filter((notification) => notification.recipients.length > 0) || [];

//   // Filter notifications based on all criteria
// const filteredNotifications = summary?.notifications
// .map((notification) => {
//   const filteredRecipients = notification.recipients.filter((recipient) => {
//     const matchesType = selectedTypes.length === 0 || selectedTypes.includes(notification.type);
//     const matchesStatus =
//       selectedStatuses.length === 0 || selectedStatuses.includes(recipient.status);
//     const notificationDate = new Date(notification.sendingTime);

//     // Convert startDate and endDate to Date objects, handling endDate as the end of the day
//     const start = startDate ? new Date(startDate) : null;
//     const end = endDate ? new Date(endDate) : null;
//     if (end) {
//       end.setHours(23, 59, 59, 999); // Set to end of the day
//     }

//     const matchesStartDate = !start || notificationDate >= start;
//     const matchesEndDate = !end || notificationDate <= end;

//     const matchesWebinar =
//       !webinarFilter ||
//       notification.webinarTitle?.toLowerCase().includes(webinarFilter.toLowerCase());
//     const matchesStudent =
//       !studentFilter ||
//       recipient.recipientName?.toLowerCase().includes(studentFilter.toLowerCase());

//     return (
//       matchesType &&
//       matchesStatus &&
//       matchesStartDate &&
//       matchesEndDate &&
//       matchesWebinar &&
//       matchesStudent
//     );
//   });

//   return {
//     ...notification,
//     recipients: filteredRecipients,
//     totalRecipients: filteredRecipients.length,
//     summary: {
//       delivered: filteredRecipients.filter(r => r.status === "delivered" || r.status === "read").length,
//       sent: filteredRecipients.filter(r => r.status === "sent").length,
//       failed: filteredRecipients.filter(r => r.status === "failed").length,
//       pending: filteredRecipients.filter(r => ["queued", "sending"].includes(r.status)).length,
//     },
//   };
// })
// .filter((notification) => notification.recipients.length > 0) || [];

//   const toggleTypeDropdown = () => setIsTypeDropdownOpen((prev) => !prev);
//   const toggleStatusDropdown = () => setIsStatusDropdownOpen((prev) => !prev);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const typeDropdown = document.querySelector(".type-dropdown-menu");
//       const statusDropdown = document.querySelector(".status-dropdown-menu");
//       if (typeDropdown && !typeDropdown.contains(event.target as Node) && isTypeDropdownOpen) {
//         setIsTypeDropdownOpen(false);
//       }
//       if (statusDropdown && !statusDropdown.contains(event.target as Node) && isStatusDropdownOpen) {
//         setIsStatusDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isTypeDropdownOpen, isStatusDropdownOpen]);

//   // Get unique webinar titles and student names for autocomplete
//   const webinarTitles = Array.from(
//     new Set(summary?.notifications.map((n) => n.webinarTitle).filter(Boolean))
//   ).map((title) => ({ value: title, label: title }));
//   const studentNames = Array.from(
//     new Set(
//       summary?.notifications
//         .flatMap((n) => n.recipients.map((r) => r.recipientName))
//         .filter(Boolean)
//     )
//   ).map((name) => ({ value: name, label: name }));

//   // Function to download filtered data as CSV
//   const downloadCSV = () => {
//     const csvData = filteredNotifications.flatMap((notification) =>
//       notification.recipients.map((recipient) => ({
//         NotificationID: notification.notificationId,
//         Type: notification.type,
//         WebinarTitle: notification.webinarTitle || "N/A",
//         SendingTime: new Date(notification.sendingTime).toLocaleString(),
//         StudentName: recipient.recipientName || "Unknown",
//         Email: recipient.recipientEmail || "N/A",
//         Phone: recipient.recipientPhone || "N/A",
//         Status: recipient.status,
//       }))
//     );

//     const csv = Papa.unparse(csvData);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute("download", `filtered_student_details_${new Date().toISOString()}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">Notification Report Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <div className="bg-blue-50 text-blue-700 py-1 px-3 rounded-full text-sm font-medium">
//               {user?.role}
//             </div>
//             <div className="text-gray-700">{user?.name}</div>
//             <button
//               onClick={handleLogout}
//               className="inline-flex items-center text-gray-700 hover:text-red-600 transition-colors"
//               title="Logout"
//             >
//               <LogOut size={20} />
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
//             <span className="mr-2">⚠️</span> {error}
//           </div>
//         )}

//         {selectedNotificationId && selectedReport ? (
//           <div>
//             <button
//               onClick={() => {
//                 setSelectedNotificationId(null);
//                 setSelectedReport(null);
//               }}
//               className="mb-6 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//             >
//               <ArrowLeft size={16} className="mr-2" /> Back to Summary
//             </button>
//             <NotificationReport report={selectedReport} />
//           </div>
//         ) : (
//           <div>
//             <div className="mb-6 flex justify-between items-center">
//               <button
//                 onClick={fetchSummary}
//                 disabled={loading}
//                 className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//               >
//                 {loading ? (
//                   <Loader2 size={16} className="mr-2 animate-spin" />
//                 ) : (
//                   <RefreshCw size={16} className="mr-2" />
//                 )}
//                 {loading ? "Refreshing..." : "Refresh Data"}
//               </button>
//               <div className="flex items-center space-x-4">
//                 <div className="text-sm text-gray-500">
//                   {summary && `Last updated: ${new Date().toLocaleString()}`}
//                 </div>
//                 {filteredNotifications.length > 0 && (
//                   <button
//                     onClick={downloadCSV}
//                     className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
//                   >
//                     <Download size={16} className="mr-2" /> Download CSV
//                   </button>
//                 )}
//               </div>
//             </div>

            

//             {loading && !summary ? (
//               <div className="flex justify-center items-center h-64">
//                 <Loader2 size={48} className="animate-spin text-blue-500" />
//               </div>
//             ) : summary ? (
//               <>
//                 {/* Stats Cards */}



//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//                   <div className="lg:col-span-1">
//                     <StatusCard
//                       title="Total Notifications"
//                       value={summary.totalNotifications}
//                       color="border-blue-500"
//                     />
//                   </div>
//                   <div className="lg:col-span-1">
//                     <StatusCard
//                       title="Total Messages"
//                       value={summary.totalMessages}
//                       color="border-purple-500"
//                     />
//                   </div>
//                   <div className="lg:col-span-3 grid grid-cols-4 gap-4">
//                     <StatusCard
//                       title="Delivered"
//                       value={summary.overallSummary.delivered}
//                       color="border-green-500"
//                     />
//                     <StatusCard
//                       title="Sent"
//                       value={summary.overallSummary.sent}
//                       color="border-blue-500"
//                     />
//                     <StatusCard
//                       title="Failed"
//                       value={summary.overallSummary.failed}
//                       color="border-red-500"
//                     />
//                     <StatusCard
//                       title="Pending"
//                       value={summary.overallSummary.pending}
//                       color="border-yellow-500"
//                     />
//                   </div>
//                 </div>

//                 {/* Filter Section  here starts*/}
//             <div className="flex flex-wrap gap-4 mb-6">
//               {/* Type Filter */}
//               <div className="w-full md:w-auto">
//                 <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
//                   Notification
//                 </label>
//                 <div className="relative inline-block w-full md:w-64">
//                   <button
//                     type="button"
//                     onClick={toggleTypeDropdown}
//                     className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none flex justify-between items-center"
//                   >
//                     <span>{selectedTypes.length > 0 ? selectedTypes.join(", ") : "Select Types"}</span>
//                     <svg
//                       className={`h-5 w-5 text-gray-400 ml-2 transform ${isTypeDropdownOpen ? "rotate-180" : ""}`}
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                   {isTypeDropdownOpen && (
//                     <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 type-dropdown-menu">
//                       <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                         <input
//                           type="checkbox"
//                           value="email"
//                           checked={selectedTypes.includes("email")}
//                           onChange={handleTypeChange}
//                           className="mr-2 leading-tight"
//                         />
//                         <span>Email</span>
//                       </label>
//                       <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                         <input
//                           type="checkbox"
//                           value="sms"
//                           checked={selectedTypes.includes("sms")}
//                           onChange={handleTypeChange}
//                           className="mr-2 leading-tight"
//                         />
//                         <span>SMS</span>
//                       </label>
//                       <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                         <input
//                           type="checkbox"
//                           value="whatsapp"
//                           checked={selectedTypes.includes("whatsapp")}
//                           onChange={handleTypeChange}
//                           className="mr-2 leading-tight"
//                         />
//                         <span>WhatsApp</span>
//                       </label>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Status Filter */}
//               <div className="w-full md:w-auto">
//                 <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
//                   Status
//                 </label>
//                 <div className="relative inline-block w-full md:w-64">
//                   <button
//                     type="button"
//                     onClick={toggleStatusDropdown}
//                     className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none flex justify-between items-center"
//                   >
//                     <span>{selectedStatuses.length > 0 ? selectedStatuses.join(", ") : "Select Status"}</span>
//                     <svg
//                       className={`h-5 w-5 text-gray-400 ml-2 transform ${isStatusDropdownOpen ? "rotate-180" : ""}`}
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                   {isStatusDropdownOpen && (
//                     <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 status-dropdown-menu">
//                       <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                         <input
//                           type="checkbox"
//                           value="sent"
//                           checked={selectedStatuses.includes("sent")}
//                           onChange={handleStatusChange}
//                           className="mr-2 leading-tight"
//                         />
//                         <span>Sent</span>
//                       </label>
//                       <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                         <input
//                           type="checkbox"
//                           value="delivered"
//                           checked={selectedStatuses.includes("delivered")}
//                           onChange={handleStatusChange}
//                           className="mr-2 leading-tight"
//                         />
//                         <span>Delivered</span>
//                       </label>
//                       <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                         <input
//                           type="checkbox"
//                           value="failed"
//                           checked={selectedStatuses.includes("failed")}
//                           onChange={handleStatusChange}
//                           className="mr-2 leading-tight"
//                         />
//                         <span>Failed</span>
//                       </label>
//                       <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                         <input
//                           type="checkbox"
//                           value="pending"
//                           checked={selectedStatuses.includes("pending")}
//                           onChange={handleStatusChange}
//                           className="mr-2 leading-tight"
//                         />
//                         <span>Pending</span>
//                       </label>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Date Filters */}
//               <div className="w-full md:w-auto">
//                 <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   id="start-date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="w-full md:w-40 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="w-full md:w-auto">
//                 <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-2">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   id="end-date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="w-full md:w-40 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               {/* Webinar Filter */}
//               <div className="w-full md:w-auto">
//                 <label htmlFor="webinar-filter" className="block text-sm font-medium text-gray-700 mb-2">
//                   Webinar
//                 </label>
//                 <Select
//                   options={webinarTitles}
//                   value={webinarFilter ? { value: webinarFilter, label: webinarFilter } : null}
//                   onChange={(option) => setWebinarFilter(option ? option.value : "")}
//                   placeholder="Type to filter webinars"
//                   className="w-full md:w-64"
//                   classNamePrefix="react-select"
//                   isClearable
//                   isSearchable
//                   menuPlacement="auto"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       borderRadius: "4px",
//                       borderColor: "#d1d5db",
//                       boxShadow: "none",
//                       "&:hover": { borderColor: "#93c5fd" },
//                     }),
//                     menu: (provided) => ({
//                       ...provided,
//                       marginTop: "0",
//                       borderRadius: "4px",
//                       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     }),
//                     option: (provided, state) => ({
//                       ...provided,
//                       backgroundColor: state.isFocused ? "#e0f2fe" : "white",
//                       color: state.isFocused ? "#1e40af" : "#374151",
//                     }),
//                   }}
//                 />
//               </div>

//               {/* Student Filter */}
//               <div className="w-full md:w-auto">
//                 <label htmlFor="student-filter" className="block text-sm font-medium text-gray-700 mb-2">
//                   Student
//                 </label>
//                 <Select
//                   options={studentNames}
//                   value={studentFilter ? { value: studentFilter, label: studentFilter } : null}
//                   onChange={(option) => setStudentFilter(option ? option.value : "")}
//                   placeholder="Type to filter students"
//                   className="w-full md:w-64"
//                   classNamePrefix="react-select"
//                   isClearable
//                   isSearchable
//                   menuPlacement="auto"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       borderRadius: "4px",
//                       borderColor: "#d1d5db",
//                       boxShadow: "none",
//                       "&:hover": { borderColor: "#93c5fd" },
//                     }),
//                     menu: (provided) => ({
//                       ...provided,
//                       marginTop: "0",
//                       borderRadius: "4px",
//                       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     }),
//                     option: (provided, state) => ({
//                       ...provided,
//                       backgroundColor: state.isFocused ? "#e0f2fe" : "white",
//                       color: state.isFocused ? "#1e40af" : "#374151",
//                     }),
//                   }}
//                 />
//               </div>
//             </div>




//                 {/* Notifications Table */}
//                 <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <div className="px-6 py-4 border-b border-gray-200">
//                     <h2 className="text-lg font-medium text-gray-900">Notification Reports</h2>
//                   </div>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             ID
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Type
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Webinar
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Sending Time
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Student Name
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Email
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Phone
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Status
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredNotifications.flatMap((notification) =>
//                           notification.recipients.map((recipient) => (
//                             <tr key={`${notification.notificationId}-${recipient.recipient}`} className="hover:bg-gray-50">
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 #{notification.notificationId}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                                   {notification.type}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {notification.webinarTitle || "N/A"}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {new Date(notification.sendingTime).toLocaleString()}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {recipient.recipientName || "Unknown"}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {recipient.recipientEmail || "N/A"}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {recipient.recipientPhone || "N/A"}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {recipient.status}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                 <button
//                                   onClick={() => handleViewReport(notification.notificationId)}
//                                   className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                                 >
//                                   <Eye size={14} className="mr-1" /> View
//                                 </button>
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                   {filteredNotifications.length === 0 && (
//                     <div className="text-center py-8 text-gray-500">
//                       No notifications found
//                     </div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
//                 No data available. Click "Refresh Data" to load summary.
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



//2
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { getSummary, getReport } from "../utils/api";
// import { type SummaryReport } from "../types";
// import NotificationReport from "./NotificationReport";
// import { Loader2, RefreshCw, LogOut, ArrowLeft, Eye, Download, Plus } from "lucide-react";
// import Papa from "papaparse";
// import Select from "react-select";
// import toast from "react-hot-toast";

// const Dashboard: React.FC = () => {
//   const [summary, setSummary] = useState<SummaryReport | null>(null);
//   const [selectedReport, setSelectedReport] = useState<NotificationReport | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);
//   const { user, logoutUser } = useAuth();
//   const navigate = useNavigate();

//   // Filter states
//   const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
//   const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
//   const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
//   const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");
//   const [webinarFilter, setWebinarFilter] = useState<string>("");
//   const [studentFilter, setStudentFilter] = useState<string>("");

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
//     toast.success("Successfully logged out");
//     navigate("/login");
//   };

//   const handleViewReport = async (notificationId: number) => {
//     setSelectedNotificationId(notificationId);
//     setLoading(true);
//     setError("");
//     try {
//       const response = await getReport(notificationId);
//       if (response.success) {
//         setSelectedReport(response.data);
//       } else {
//         throw new Error(response.error || "Failed to fetch report");
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch report");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const StatusCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
//     <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${color}`}>
//       <p className="text-gray-500 text-sm font-medium">{title}</p>
//       <p className="text-2xl font-bold mt-1">{value}</p>
//     </div>
//   );

//   const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const type = event.target.value;
//     setSelectedTypes((prev) =>
//       event.target.checked ? [...prev, type] : prev.filter((t) => t !== type)
//     );
//   };

//   const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const status = event.target.value;
//     setSelectedStatuses((prev) =>
//       event.target.checked ? [...prev, status] : prev.filter((s) => s !== status)
//     );
//   };

//   // Filter notifications based on all criteria
//   const filteredNotifications = summary?.notifications
//     .map((notification) => {
//       const filteredRecipients = notification.recipients.filter((recipient) => {
//         const matchesType = selectedTypes.length === 0 || selectedTypes.includes(notification.type);
//         const matchesStatus =
//           selectedStatuses.length === 0 || selectedStatuses.includes(recipient.status);
//         const notificationDate = new Date(notification.sendingTime);

//         // Convert startDate and endDate to Date objects, handling endDate as the end of the day
//         const start = startDate ? new Date(startDate) : null;
//         const end = endDate ? new Date(endDate) : null;
//         if (end) {
//           end.setHours(23, 59, 59, 999); // Set to end of the day
//         }

//         const matchesStartDate = !start || notificationDate >= start;
//         const matchesEndDate = !end || notificationDate <= end;

//         const matchesWebinar =
//           !webinarFilter ||
//           notification.webinarTitle?.toLowerCase().includes(webinarFilter.toLowerCase());
//         const matchesStudent =
//           !studentFilter ||
//           recipient.recipientName?.toLowerCase().includes(studentFilter.toLowerCase());

//         return (
//           matchesType &&
//           matchesStatus &&
//           matchesStartDate &&
//           matchesEndDate &&
//           matchesWebinar &&
//           matchesStudent
//         );
//       });

//       return {
//         ...notification,
//         recipients: filteredRecipients,
//         totalRecipients: filteredRecipients.length,
//         summary: {
//           delivered: filteredRecipients.filter(r => r.status === "delivered" || r.status === "read").length,
//           sent: filteredRecipients.filter(r => r.status === "sent").length,
//           failed: filteredRecipients.filter(r => r.status === "failed").length,
//           pending: filteredRecipients.filter(r => ["queued", "sending"].includes(r.status)).length,
//         },
//       };
//     })
//     .filter((notification) => notification.recipients.length > 0) || [];

//   const toggleTypeDropdown = () => setIsTypeDropdownOpen((prev) => !prev);
//   const toggleStatusDropdown = () => setIsStatusDropdownOpen((prev) => !prev);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const typeDropdown = document.querySelector(".type-dropdown-menu");
//       const statusDropdown = document.querySelector(".status-dropdown-menu");
//       if (typeDropdown && !typeDropdown.contains(event.target as Node) && isTypeDropdownOpen) {
//         setIsTypeDropdownOpen(false);
//       }
//       if (statusDropdown && !statusDropdown.contains(event.target as Node) && isStatusDropdownOpen) {
//         setIsStatusDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isTypeDropdownOpen, isStatusDropdownOpen]);

//   // Get unique webinar titles and student names for autocomplete
//   const webinarTitles = Array.from(
//     new Set(summary?.notifications.map((n) => n.webinarTitle).filter(Boolean))
//   ).map((title) => ({ value: title, label: title }));
//   const studentNames = Array.from(
//     new Set(
//       summary?.notifications
//         .flatMap((n) => n.recipients.map((r) => r.recipientName))
//         .filter(Boolean)
//     )
//   ).map((name) => ({ value: name, label: name }));

//   // Function to download filtered data as CSV
//   const downloadCSV = () => {
//     const csvData = filteredNotifications.flatMap((notification) =>
//       notification.recipients.map((recipient) => ({
//         NotificationID: notification.notificationId,
//         Type: notification.type,
//         WebinarTitle: notification.webinarTitle || "N/A",
//         SendingTime: new Date(notification.sendingTime).toLocaleString(),
//         StudentName: recipient.recipientName || "Unknown",
//         Email: recipient.recipientEmail || "N/A",
//         Phone: recipient.recipientPhone || "N/A",
//         Status: recipient.status,
//       })),
      
//     );

//     const csv = Papa.unparse(csvData);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute("download", `filtered_student_details_${new Date().toISOString()}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">Notification Report Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <div className="bg-blue-50 text-blue-700 py-1 px-3 rounded-full text-sm font-medium">
//               {user?.role}
//             </div>
//             <div className="text-gray-700">{user?.name}</div>
//             <button
//               onClick={handleLogout}
//               className="inline-flex items-center text-gray-700 hover:text-red-600 transition-colors"
//               title="Logout"
//             >
//               <LogOut size={20} />
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
//             <span className="mr-2">⚠️</span> {error}
//           </div>
//         )}

//         {selectedNotificationId && selectedReport ? (
//           <div>
//             <button
//               onClick={() => {
//                 setSelectedNotificationId(null);
//                 setSelectedReport(null);
//               }}
//               className="mb-6 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//             >
//               <ArrowLeft size={16} className="mr-2" /> Back to Summary
//             </button>
//             <NotificationReport report={selectedReport} />
//           </div>
//         ) : (
//           <div>
//             <div className="mb-6 flex justify-between items-center">
//               <button
//                 onClick={fetchSummary}
//                 disabled={loading}
//                 className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed  hover:scale-105 transition-transform duration-300"
//               >
//                 {loading ? (
//                   <Loader2 size={16} className="mr-2 animate-spin" />
//                 ) : (
//                   <RefreshCw size={16} className="mr-2" />
//                 )}
//                 {loading ? "Refreshing..." : "Refresh Data"}
//               </button>
//               <div className="flex items-center space-x-4">
//                 <div className="text-sm text-gray-500">
//                   {summary && `Last updated: ${new Date().toLocaleString()}`}
//                 </div>
//                 {filteredNotifications.length > 0 && (
//                   <button
//                     onClick={downloadCSV}
//                     className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500  hover:scale-105 transition-transform duration-300"
//                   >
//                     <Download size={16} className="mr-2" /> Download CSV
//                   </button>
//                 )}
//                {user?.role == "admin" && ( <button
//                   onClick={() => navigate("/add-teacher")}
//                   className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  hover:scale-105 transition-transform duration-300"
//                 >
//                   <Plus size={16} className="mr-2" /> Manage User
//                 </button>)}
//               </div>
//             </div>

//             {loading && !summary ? (
//               <div className="flex justify-center items-center h-64">
//                 <Loader2 size={48} className="animate-spin text-blue-500" />
//               </div>
//             ) : summary ? (
//               <>
//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//                   <div className="lg:col-span-1">
//                     <StatusCard
//                       title="Total Notifications"
//                       value={summary.totalNotifications}
//                       color="border-blue-500"
//                     />
//                   </div>
//                   <div className="lg:col-span-1">
//                     <StatusCard
//                       title="Total Messages"
//                       value={summary.totalMessages}
//                       color="border-purple-500"
//                     />
//                   </div>
//                   <div className="lg:col-span-3 grid grid-cols-4 gap-4">
//                     <StatusCard
//                       title="Delivered"
//                       value={summary.overallSummary.delivered}
//                       color="border-green-500"
//                     />
//                     <StatusCard
//                       title="Sent"
//                       value={summary.overallSummary.sent}
//                       color="border-blue-500"
//                     />
//                     <StatusCard
//                       title="Failed"
//                       value={summary.overallSummary.failed}
//                       color="border-red-500"
//                     />
//                     <StatusCard
//                       title="Pending"
//                       value={summary.overallSummary.pending}
//                       color="border-yellow-500"
//                     />
//                   </div>
//                 </div>

//                 {/* Filter Section */}
//                 <div className="flex flex-wrap gap-4 mb-6">
//                   {/* Type Filter */}
//                   <div className="w-full md:w-auto">
//                     <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
//                       Notification
//                     </label>
//                     <div className="relative inline-block w-full md:w-64">
//                       <button
//                         type="button"
//                         onClick={toggleTypeDropdown}
//                         className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none flex justify-between items-center"
//                       >
//                         <span>{selectedTypes.length > 0 ? selectedTypes.join(", ") : "Select Types"}</span>
//                         <svg
//                           className={`h-5 w-5 text-gray-400 ml-2 transform ${isTypeDropdownOpen ? "rotate-180" : ""}`}
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </button>
//                       {isTypeDropdownOpen && (
//                         <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 type-dropdown-menu">
//                           <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                             <input
//                               type="checkbox"
//                               value="email"
//                               checked={selectedTypes.includes("email")}
//                               onChange={handleTypeChange}
//                               className="mr-2 leading-tight"
//                             />
//                             <span>Email</span>
//                           </label>
//                           <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                             <input
//                               type="checkbox"
//                               value="sms"
//                               checked={selectedTypes.includes("sms")}
//                               onChange={handleTypeChange}
//                               className="mr-2 leading-tight"
//                             />
//                             <span>SMS</span>
//                           </label>
//                           <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                             <input
//                               type="checkbox"
//                               value="whatsapp"
//                               checked={selectedTypes.includes("whatsapp")}
//                               onChange={handleTypeChange}
//                               className="mr-2 leading-tight"
//                             />
//                             <span>WhatsApp</span>
//                           </label>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Status Filter */}
//                   <div className="w-full md:w-auto">
//                     <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
//                       Status
//                     </label>
//                     <div className="relative inline-block w-full md:w-64">
//                       <button
//                         type="button"
//                         onClick={toggleStatusDropdown}
//                         className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none flex justify-between items-center"
//                       >
//                         <span>{selectedStatuses.length > 0 ? selectedStatuses.join(", ") : "Select Status"}</span>
//                         <svg
//                           className={`h-5 w-5 text-gray-400 ml-2 transform ${isStatusDropdownOpen ? "rotate-180" : ""}`}
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </button>
//                       {isStatusDropdownOpen && (
//                         <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 status-dropdown-menu">
//                           <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                             <input
//                               type="checkbox"
//                               value="sent"
//                               checked={selectedStatuses.includes("sent")}
//                               onChange={handleStatusChange}
//                               className="mr-2 leading-tight"
//                             />
//                             <span>Sent</span>
//                           </label>
//                           <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                             <input
//                               type="checkbox"
//                               value="delivered"
//                               checked={selectedStatuses.includes("delivered")}
//                               onChange={handleStatusChange}
//                               className="mr-2 leading-tight"
//                             />
//                             <span>Delivered</span>
//                           </label>
//                           <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                             <input
//                               type="checkbox"
//                               value="failed"
//                               checked={selectedStatuses.includes("failed")}
//                               onChange={handleStatusChange}
//                               className="mr-2 leading-tight"
//                             />
//                             <span>Failed</span>
//                           </label>
//                           <label className="flex items-center px-4 py-2 text-sm text-gray-700">
//                             <input
//                               type="checkbox"
//                               value="pending"
//                               checked={selectedStatuses.includes("pending")}
//                               onChange={handleStatusChange}
//                               className="mr-2 leading-tight"
//                             />
//                             <span>Pending</span>
//                           </label>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Date Filters */}
//                   <div className="w-full md:w-auto">
//                     <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
//                       Start Date
//                     </label>
//                     <input
//                       type="date"
//                       id="start-date"
//                       value={startDate}
//                       onChange={(e) => setStartDate(e.target.value)}
//                       className="w-full md:w-40 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="w-full md:w-auto">
//                     <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-2">
//                       End Date
//                     </label>
//                     <input
//                       type="date"
//                       id="end-date"
//                       value={endDate}
//                       onChange={(e) => setEndDate(e.target.value)}
//                       className="w-full md:w-40 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>

//                   {/* Webinar Filter */}
//                   <div className="w-full md:w-auto">
//                     <label htmlFor="webinar-filter" className="block text-sm font-medium text-gray-700 mb-2">
//                       Webinar
//                     </label>
//                     <Select
//                       options={webinarTitles}
//                       value={webinarFilter ? { value: webinarFilter, label: webinarFilter } : null}
//                       onChange={(option) => setWebinarFilter(option ? option.value : "")}
//                       placeholder="Type to filter webinars"
//                       className="w-full md:w-64"
//                       classNamePrefix="react-select"
//                       isClearable
//                       isSearchable
//                       menuPlacement="auto"
//                       styles={{
//                         control: (provided) => ({
//                           ...provided,
//                           borderRadius: "4px",
//                           borderColor: "#d1d5db",
//                           boxShadow: "none",
//                           "&:hover": { borderColor: "#93c5fd" },
//                         }),
//                         menu: (provided) => ({
//                           ...provided,
//                           marginTop: "0",
//                           borderRadius: "4px",
//                           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                         }),
//                         option: (provided, state) => ({
//                           ...provided,
//                           backgroundColor: state.isFocused ? "#e0f2fe" : "white",
//                           color: state.isFocused ? "#1e40af" : "#374151",
//                         }),
//                       }}
//                     />
//                   </div>

//                   {/* Student Filter */}
//                   <div className="w-full md:w-auto">
//                     <label htmlFor="student-filter" className="block text-sm font-medium text-gray-700 mb-2">
//                       Student
//                     </label>
//                     <Select
//                       options={studentNames}
//                       value={studentFilter ? { value: studentFilter, label: studentFilter } : null}
//                       onChange={(option) => setStudentFilter(option ? option.value : "")}
//                       placeholder="Type to filter students"
//                       className="w-full md:w-64"
//                       classNamePrefix="react-select"
//                       isClearable
//                       isSearchable
//                       menuPlacement="auto"
//                       styles={{
//                         control: (provided) => ({
//                           ...provided,
//                           borderRadius: "4px",
//                           borderColor: "#d1d5db",
//                           boxShadow: "none",
//                           "&:hover": { borderColor: "#93c5fd" },
//                         }),
//                         menu: (provided) => ({
//                           ...provided,
//                           marginTop: "0",
//                           borderRadius: "4px",
//                           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                         }),
//                         option: (provided, state) => ({
//                           ...provided,
//                           backgroundColor: state.isFocused ? "#e0f2fe" : "white",
//                           color: state.isFocused ? "#1e40af" : "#374151",
//                         }),
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Notifications Table */}
//                 <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <div className="px-6 py-4 border-b border-gray-200">
//                     <h2 className="text-lg font-medium text-gray-900">Notification Reports</h2>
//                   </div>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             ID
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Type
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Webinar
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Sending Time
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Student Name
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Email
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Phone
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Status
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredNotifications.flatMap((notification) =>
//                           notification.recipients.map((recipient) => (
//                             <tr key={`${notification.notificationId}-${recipient.recipient}`} className="hover:bg-gray-50">
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 #{notification.notificationId}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                                   {notification.type}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {notification.webinarTitle || "N/A"}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {new Date(notification.sendingTime).toLocaleString()}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {recipient.recipientName || "Unknown"}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {recipient.recipientEmail || "N/A"}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {recipient.recipientPhone || "N/A"}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {recipient.status}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                 <button
//                                   onClick={() => handleViewReport(notification.notificationId)}
//                                   className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                                 >
//                                   <Eye size={14} className="mr-1" /> View
//                                 </button>
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                   {filteredNotifications.length === 0 && (
//                     <div className="text-center py-8 text-gray-500">
//                       No notifications found
//                     </div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
//                 No data available. Click "Refresh Data" to load summary.
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



//fetch button added
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSummary, getReport } from "../utils/api";
import { type SummaryReport } from "../types";
import NotificationReport from "./NotificationReport";
import { Loader2, RefreshCw, LogOut, ArrowLeft, Eye, Download, Plus } from "lucide-react";
import Papa from "papaparse";
import Select from "react-select";
import toast from "react-hot-toast";

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<SummaryReport | null>(null);
  const [selectedReport, setSelectedReport] = useState<NotificationReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [webinarFilter, setWebinarFilter] = useState<string>("");
  const [studentFilter, setStudentFilter] = useState<string>("");

  // New state for filtered notifications
  const [filteredNotifications, setFilteredNotifications] = useState<any[]>([]);

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
    toast.success("Successfully logged out");
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

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    setSelectedTypes((prev) =>
      event.target.checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.value;
    setSelectedStatuses((prev) =>
      event.target.checked ? [...prev, status] : prev.filter((s) => s !== status)
    );
  };

  // Function to apply filters when Fetch button is clicked
  const handleFetchFilteredData = () => {
    setLoading(true);
    setError("");
    try {
      const filtered = summary?.notifications
        .map((notification) => {
          const filteredRecipients = notification.recipients.filter((recipient) => {
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(notification.type);
            const matchesStatus =
              selectedStatuses.length === 0 || selectedStatuses.includes(recipient.status);
            const notificationDate = new Date(notification.sendingTime);

            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            if (end) {
              end.setHours(23, 59, 59, 999); // Set to end of the day
            }

            const matchesStartDate = !start || notificationDate >= start;
            const matchesEndDate = !end || notificationDate <= end;

            const matchesWebinar =
              !webinarFilter ||
              notification.webinarTitle?.toLowerCase().includes(webinarFilter.toLowerCase());
            const matchesStudent =
              !studentFilter ||
              recipient.recipientName?.toLowerCase().includes(studentFilter.toLowerCase());

            return (
              matchesType &&
              matchesStatus &&
              matchesStartDate &&
              matchesEndDate &&
              matchesWebinar &&
              matchesStudent
            );
          });

          return {
            ...notification,
            recipients: filteredRecipients,
            totalRecipients: filteredRecipients.length,
            summary: {
              delivered: filteredRecipients.filter(r => r.status === "delivered" || r.status === "read").length,
              sent: filteredRecipients.filter(r => r.status === "sent").length,
              failed: filteredRecipients.filter(r => r.status === "failed").length,
              pending: filteredRecipients.filter(r => ["queued", "sending"].includes(r.status)).length,
            },
          };
        })
        .filter((notification) => notification.recipients.length > 0) || [];
      setFilteredNotifications(filtered);
    } catch (err: any) {
      setError(err.message || "Failed to filter data");
    } finally {
      setLoading(false);
    }
  };

  const toggleTypeDropdown = () => setIsTypeDropdownOpen((prev) => !prev);
  const toggleStatusDropdown = () => setIsStatusDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const typeDropdown = document.querySelector(".type-dropdown-menu");
      const statusDropdown = document.querySelector(".status-dropdown-menu");
      if (typeDropdown && !typeDropdown.contains(event.target as Node) && isTypeDropdownOpen) {
        setIsTypeDropdownOpen(false);
      }
      if (statusDropdown && !statusDropdown.contains(event.target as Node) && isStatusDropdownOpen) {
        setIsStatusDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isTypeDropdownOpen, isStatusDropdownOpen]);

  const webinarTitles = Array.from(
    new Set(summary?.notifications.map((n) => n.webinarTitle).filter(Boolean))
  ).map((title) => ({ value: title, label: title }));
  const studentNames = Array.from(
    new Set(
      summary?.notifications
        .flatMap((n) => n.recipients.map((r) => r.recipientName))
        .filter(Boolean)
    )
  ).map((name) => ({ value: name, label: name }));

  const downloadCSV = () => {
    const csvData = filteredNotifications.flatMap((notification) =>
      notification.recipients.map((recipient: { recipientName: any; recipientEmail: any; recipientPhone: any; status: any; }) => ({
        NotificationID: notification.notificationId,
        Type: notification.type,
        WebinarTitle: notification.webinarTitle || "N/A",
        SendingTime: new Date(notification.sendingTime).toLocaleString(),
        StudentName: recipient.recipientName || "Unknown",
        Email: recipient.recipientEmail || "N/A",
        Phone: recipient.recipientPhone || "N/A",
        Status: recipient.status,
      }))
    );

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `filtered_student_details_${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        {selectedNotificationId && selectedReport ? (
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
          <div>
            <div className="mb-6 flex justify-between items-center flex-col sm:flex-row gap-4">
              <button
                onClick={fetchSummary}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300"
              >
                {loading ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <RefreshCw size={16} className="mr-2" />
                )}
                {loading ? "Refreshing..." : "Refresh Data"}
              </button>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {summary && `Last updated: ${new Date().toLocaleString()}`}
                </div>
                {filteredNotifications.length > 0 && (
                  <button
                    onClick={downloadCSV}
                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:scale-105 transition-transform duration-300"
                  >
                    <Download size={16} className="mr-2" /> Download CSV
                  </button>
                )}
                {user?.role === "admin" && (
                  <button
                    onClick={() => navigate("/add-teacher")}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:scale-105 transition-transform duration-300"
                  >
                    <Plus size={16} className="mr-2" /> Manage User
                  </button>
                )}
                <button
                  onClick={handleFetchFilteredData}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300"
                >
                  {loading ? (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  ) : (
                    <RefreshCw size={16} className="mr-2" />
                  )}
                  {loading ? "Fetching..." : "Fetch"}
                </button>
              </div>
            </div>

            {loading && !summary ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 size={48} className="animate-spin text-blue-500" />
              </div>
            ) : summary ? (
              <>
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

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="w-full md:w-auto">
                    <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
                      Notification
                    </label>
                    <div className="relative inline-block w-full md:w-64">
                      <button
                        type="button"
                        onClick={toggleTypeDropdown}
                        className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none flex justify-between items-center"
                      >
                        <span>{selectedTypes.length > 0 ? selectedTypes.join(", ") : "Select Types"}</span>
                        <svg
                          className={`h-5 w-5 text-gray-400 ml-2 transform ${isTypeDropdownOpen ? "rotate-180" : ""}`}
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
                      {isTypeDropdownOpen && (
                        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 type-dropdown-menu">
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

                  <div className="w-full md:w-auto">
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="relative inline-block w-full md:w-64">
                      <button
                        type="button"
                        onClick={toggleStatusDropdown}
                        className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none flex justify-between items-center"
                      >
                        <span>{selectedStatuses.length > 0 ? selectedStatuses.join(", ") : "Select Status"}</span>
                        <svg
                          className={`h-5 w-5 text-gray-400 ml-2 transform ${isStatusDropdownOpen ? "rotate-180" : ""}`}
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
                      {isStatusDropdownOpen && (
                        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 status-dropdown-menu">
                          <label className="flex items-center px-4 py-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              value="sent"
                              checked={selectedStatuses.includes("sent")}
                              onChange={handleStatusChange}
                              className="mr-2 leading-tight"
                            />
                            <span>Sent</span>
                          </label>
                          <label className="flex items-center px-4 py-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              value="delivered"
                              checked={selectedStatuses.includes("delivered")}
                              onChange={handleStatusChange}
                              className="mr-2 leading-tight"
                            />
                            <span>Delivered</span>
                          </label>
                          <label className="flex items-center px-4 py-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              value="failed"
                              checked={selectedStatuses.includes("failed")}
                              onChange={handleStatusChange}
                              className="mr-2 leading-tight"
                            />
                            <span>Failed</span>
                          </label>
                          <label className="flex items-center px-4 py-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              value="pending"
                              checked={selectedStatuses.includes("pending")}
                              onChange={handleStatusChange}
                              className="mr-2 leading-tight"
                            />
                            <span>Pending</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="start-date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full md:w-40 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="w-full md:w-auto">
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="end-date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full md:w-40 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="w-full md:w-auto">
                    <label htmlFor="webinar-filter" className="block text-sm font-medium text-gray-700 mb-2">
                      Webinar
                    </label>
                    <Select
                      options={webinarTitles}
                      value={webinarFilter ? { value: webinarFilter, label: webinarFilter } : null}
                      onChange={(option) => setWebinarFilter(option ? option.value : "")}
                      placeholder="Type to filter webinars"
                      className="w-full md:w-64"
                      classNamePrefix="react-select"
                      isClearable
                      isSearchable
                      menuPlacement="auto"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "4px",
                          borderColor: "#d1d5db",
                          boxShadow: "none",
                          "&:hover": { borderColor: "#93c5fd" },
                        }),
                        menu: (provided) => ({
                          ...provided,
                          marginTop: "0",
                          borderRadius: "4px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused ? "#e0f2fe" : "white",
                          color: state.isFocused ? "#1e40af" : "#374151",
                        }),
                      }}
                    />
                  </div>

                  <div className="w-full md:w-auto">
                    <label htmlFor="student-filter" className="block text-sm font-medium text-gray-700 mb-2">
                      Student
                    </label>
                    <Select
                      options={studentNames}
                      value={studentFilter ? { value: studentFilter, label: studentFilter } : null}
                      onChange={(option) => setStudentFilter(option ? option.value : "")}
                      placeholder="Type to filter students"
                      className="w-full md:w-64"
                      classNamePrefix="react-select"
                      isClearable
                      isSearchable
                      menuPlacement="auto"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "4px",
                          borderColor: "#d1d5db",
                          boxShadow: "none",
                          "&:hover": { borderColor: "#93c5fd" },
                        }),
                        menu: (provided) => ({
                          ...provided,
                          marginTop: "0",
                          borderRadius: "4px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused ? "#e0f2fe" : "white",
                          color: state.isFocused ? "#1e40af" : "#374151",
                        }),
                      }}
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
                            Webinar
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sending Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredNotifications.flatMap((notification) =>
                          notification.recipients.map((recipient: { recipient: any; recipientName: any; recipientEmail: any; recipientPhone: any; status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
                            <tr key={`${notification.notificationId}-${recipient.recipient}`} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                #{notification.notificationId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {notification.type}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {notification.webinarTitle || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(notification.sendingTime).toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {recipient.recipientName || "Unknown"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {recipient.recipientEmail || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {recipient.recipientPhone || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {recipient.status}
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
                          ))
                        )}
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