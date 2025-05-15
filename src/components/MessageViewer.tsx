


// // src/components/MessageViewer.tsx
// import React, { useState, useEffect } from "react";
// import { getMessage } from "../utils/api";
// import { Message } from "postcss";
// import { Loader2, AlertCircle, MessageSquare, Copy, CheckCircle } from "lucide-react";

// interface MessageViewerProps {
//   notificationId: number;
//   recipient: string;
// }

// const MessageViewer: React.FC<MessageViewerProps> = ({ notificationId, recipient }) => {
//   const [message, setMessage] = useState<Message | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     const fetchMessage = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const data = await getMessage(notificationId, recipient);
//         setMessage(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load message");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMessage();
//   }, [notificationId, recipient]);

//   const handleCopyMessage = () => {
//     if (message) {
//       navigator.clipboard.writeText(message.message);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-8">
//         <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
//         <span className="ml-2 text-gray-600">Loading message...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <AlertCircle className="h-5 w-5 text-red-500" />
//           </div>
//           <div className="ml-3">
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!message) return null;

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-3">
//         <div className="flex items-center text-sm text-gray-600">
//           <MessageSquare size={16} className="mr-2" />
//           <span>Message sent to </span>
//           <span className="font-medium text-gray-900 ml-1">{recipient}</span>
//         </div>
//         <button
//           onClick={handleCopyMessage}
//           className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//           title="Copy message content"
//         >
//           {copied ? (
//             <>
//               <CheckCircle size={14} className="mr-1 text-green-500" /> Copied
//             </>
//           ) : (
//             <>
//               <Copy size={14} className="mr-1" /> Copy
//             </>
//           )}
//         </button>
//       </div>
      
//       <div className="bg-white border border-gray-200 rounded-md p-4 whitespace-pre-wrap text-gray-800">
//         {message.message}
//       </div>
      
//       {message.metadata && Object.keys(message.metadata).length > 0 && (
//         <div className="mt-4">
//           <div className="text-sm font-medium text-gray-700 mb-2">Message Metadata:</div>
//           <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
//             <pre className="text-xs text-gray-600 overflow-auto">
//               {JSON.stringify(message.metadata, null, 2)}
//             </pre>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageViewer;




import React, { useState, useEffect } from "react";
import { getMessage } from "../utils/api";
import { Message } from "postcss";
import { Loader2, AlertCircle, MessageSquare, Copy, CheckCircle, Clock, Tag } from "lucide-react";

interface MessageViewerProps {
  notificationId: number;
  recipient: string;
}

const MessageViewer: React.FC<MessageViewerProps> = ({ notificationId, recipient }) => {
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getMessage(notificationId, recipient);
        setMessage(data);
      } catch (err: any) {
        setError(err.message || "Failed to load message");
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [notificationId, recipient]);

  const handleCopyMessage = () => {
    if (message) {
      navigator.clipboard.writeText(message.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12 bg-gray-50 rounded-lg shadow-sm">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        <span className="ml-3 text-gray-600 font-medium">Loading message...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-5 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error Loading Message</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!message) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MessageSquare size={20} className="text-blue-600" />
            <h2 className="ml-2 text-lg font-semibold text-gray-800">Message Details</h2>
          </div>
          <button
            onClick={handleCopyMessage}
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            title="Copy message content"
          >
            {copied ? (
              <>
                <CheckCircle size={16} className="mr-2" /> Copied
              </>
            ) : (
              <>
                <Copy size={16} className="mr-2" /> Copy Text
              </>
            )}
          </button>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <span>Sent to </span>
          <span className="font-medium text-blue-800 ml-1">{recipient}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 whitespace-pre-wrap text-gray-800 leading-relaxed">
          {message.message}
        </div>

        {message.metadata && Object.keys(message.metadata).length > 0 && (
          <div className="mt-6">
            <div className="flex items-center mb-3">
              <Tag size={16} className="text-gray-600 mr-2" />
              <h3 className="text-sm font-semibold text-gray-700">Message Metadata</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(message.metadata, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <div className="text-xs text-gray-500 flex items-center">
            <Clock size={12} className="mr-1" />
            Notification ID: {notificationId}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageViewer;