// // src/components/NotificationReport.tsx
// import { type NotificationReport, type NotificationStatus } from "../types";
// import React, { useState } from "react";
// import { downloadReportAsCSV } from "../utils/csv";
// import MessageViewer from "./MessageViewer";

// interface NotificationReportProps {
//   report: NotificationReport;
// }

// const NotificationReport: React.FC<NotificationReportProps> = ({ report }) => {
//   const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);

//   const handleDownloadCSV = () => {
//     downloadReportAsCSV(report);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-4">
//       <h3 className="text-lg font-semibold mb-2">
//         Notification ID: {report.notificationId} ({report.type})
//       </h3>
//       {/* <p><strong>Template:</strong> {report.template}</p>
//       <p><strong>Sending Time:</strong> {new Date(report.sendingTime).toLocaleString()}</p>
//       <p><strong>Status:</strong> {report.sent ? "Sent" : "Pending"}</p>
//       <p><strong>Groups:</strong> {report.groups.join(", ")}</p>
//       <p><strong>Total Recipients:</strong> {report.total}</p> */}
//       <div className="mt-2">
//         <h4 className="font-semibold">Summary:</h4>
//         <ul className="list-disc list-inside">
//           <li>Delivered: {report.summary.delivered}</li>
//           <li>Sent: {report.summary.sent}</li>
//           <li>Failed: {report.summary.failed}</li>
//           <li>Pending: {report.summary.pending}</li>
//         </ul>
//       </div>
//       <div className="mt-4">
//         <h4 className="font-semibold">Statuses:</h4>
//         {report.statuses.length === 0 ? (
//           <p>No status records available.</p>
//         ) : (
//           <>
//             <table className="w-full mt-2 border-collapse">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border p-2">Type</th>
//                   <th className="border p-2">Recipient</th>
//                   <th className="border p-2">Recipient Name</th>
//                   <th className="border p-2">Status</th>
//                   <th className="border p-2">Date Updated</th>
//                   <th className="border p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {report.statuses.map((status: NotificationStatus, index: number) => (
//                   <tr key={index} className="hover:bg-gray-100">
//                     <td className="border p-2">{status.type}</td>
//                     <td className="border p-2">{status.recipient}</td>
//                     <td className="border p-2">{status.recipientName}</td>
//                     <td className="border p-2">{status.status}</td>
//                     <td className="border p-2">{new Date(status.dateUpdated).toLocaleString()}</td>
//                     <td className="border p-2">
//                       <button
//                         onClick={() => setSelectedRecipient(status.recipient === selectedRecipient ? null : status.recipient)}
//                         className="text-blue-500 hover:underline   hover:scale-105 transition-transform duration-300"
//                       >
//                         {selectedRecipient === status.recipient ? "Hide Message" : "View Message"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {selectedRecipient && (
//               <MessageViewer notificationId={report.notificationId} recipient={selectedRecipient} />
//             )}
//           </>
//         )}
//       </div>
//       <button
//         onClick={handleDownloadCSV}
//         className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600  hover:scale-105 transition-transform duration-300"
//         disabled={report.statuses.length === 0} // Disable if no statuses
//       >
//         Download as CSV
//       </button>
//     </div>
//   );
// };

// export default NotificationReport;


// src/components/NotificationReport.tsx
import { type NotificationReport, type NotificationStatus } from "../types";
import React, { useState } from "react";
import { downloadReportAsCSV } from "../utils/csv";
import MessageViewer from "./MessageViewer";
import { Download, ChevronDown, ChevronUp, Eye, EyeOff, FileText, Calendar, Users, CheckCircle } from "lucide-react";

interface NotificationReportProps {
  report: NotificationReport;
}

const NotificationReport: React.FC<NotificationReportProps> = ({ report }) => {
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleDownloadCSV = () => {
    downloadReportAsCSV(report);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Notification #{report.notificationId}
            </h2>
            <div className="mt-1 flex items-center">
              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                {report.type}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {report.sent ? "Sent" : "Pending"}
              </span>
            </div>
          </div>
          <button
            onClick={handleDownloadCSV}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={report.statuses.length === 0}
          >
            <Download size={16} className="mr-2" /> Download CSV
          </button>
        </div>

        <button
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 focus:outline-none transition-colors"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <ChevronUp size={16} className="mr-1" />
          ) : (
            <ChevronDown size={16} className="mr-1" />
          )}
          {showDetails ? "Hide details" : "Show details"}
        </button>

        {showDetails && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <FileText size={18} className="text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Template</p>
                <p className="text-sm font-medium">{report.template}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar size={18} className="text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Sending Time</p>
                <p className="text-sm font-medium">{new Date(report.sendingTime).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users size={18} className="text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Groups</p>
                <p className="text-sm font-medium">{report.groups.join(", ")}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-4 gap-0 border-b border-gray-200">
        <div className="p-4 text-center border-r border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Total</div>
          <div className="text-2xl font-bold">{report.total}</div>
        </div>
        <div className="p-4 text-center border-r border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Delivered</div>
          <div className="text-2xl font-bold text-green-600">{report.summary.delivered}</div>
        </div>
        <div className="p-4 text-center border-r border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Failed</div>
          <div className="text-2xl font-bold text-red-600">{report.summary.failed}</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-sm text-gray-500 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{report.summary.pending}</div>
        </div>
      </div>

      {/* Status Table */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recipient Statuses</h3>
        {report.statuses.length === 0 ? (
          <div className="bg-gray-50 p-6 text-center rounded-lg border border-gray-200">
            <p className="text-gray-500">No status records available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.statuses.map((status: NotificationStatus, index: number) => (
                  <tr key={index} className={`hover:bg-gray-50 ${selectedRecipient === status.recipient ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{status.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{status.recipient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{status.recipientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(status.status)}`}>
                        {status.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(status.dateUpdated).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedRecipient(status.recipient === selectedRecipient ? null : status.recipient)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                      >
                        {selectedRecipient === status.recipient ? (
                          <>
                            <EyeOff size={14} className="mr-1" /> Hide
                          </>
                        ) : (
                          <>
                            <Eye size={14} className="mr-1" /> View
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Viewer */}
      {selectedRecipient && (
        <div className="border-t border-gray-200 mt-4">
          <div className="p-6 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <CheckCircle size={20} className="text-blue-500 mr-2" />
              Message Content for {selectedRecipient}
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <MessageViewer notificationId={report.notificationId} recipient={selectedRecipient} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationReport;