// // src/components/MessageViewer.tsx
// import React, { useState, useEffect } from "react";
// import { getMessage,  } from "../utils/api";
// import { Message } from "postcss";

// interface MessageViewerProps {
//   notificationId: number;
//   recipient: string;
// }

// const MessageViewer: React.FC<MessageViewerProps> = ({ notificationId, recipient }) => {
//   const [message, setMessage] = useState<Message | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

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

//   if (loading) return <p>Loading message...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!message) return null;

//   return (
//     <div className="mt-4 p-4 bg-gray-100 rounded-md">
//       <h4 className="font-semibold">Message Sent to {recipient}</h4>
//       <p className="mt-2">{message.message}</p>
//     </div>
//   );
// };

// export default MessageViewer;



// src/components/MessageViewer.tsx
import React, { useState, useEffect } from "react";
import { getMessage } from "../utils/api";
import { Message } from "postcss";
import { Loader2, AlertCircle, MessageSquare, Copy, CheckCircle } from "lucide-react";

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
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        <span className="ml-2 text-gray-600">Loading message...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!message) return null;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <MessageSquare size={16} className="mr-2" />
          <span>Message sent to </span>
          <span className="font-medium text-gray-900 ml-1">{recipient}</span>
        </div>
        <button
          onClick={handleCopyMessage}
          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
          title="Copy message content"
        >
          {copied ? (
            <>
              <CheckCircle size={14} className="mr-1 text-green-500" /> Copied
            </>
          ) : (
            <>
              <Copy size={14} className="mr-1" /> Copy
            </>
          )}
        </button>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-md p-4 whitespace-pre-wrap text-gray-800">
        {message.message}
      </div>
      
      {message.metadata && Object.keys(message.metadata).length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Message Metadata:</div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
            <pre className="text-xs text-gray-600 overflow-auto">
              {JSON.stringify(message.metadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageViewer;