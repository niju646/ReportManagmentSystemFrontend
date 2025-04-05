// src/utils/csv.ts
import { saveAs } from "file-saver";
import { type NotificationReport, type NotificationStatus } from "../types";

export const downloadReportAsCSV = (report: NotificationReport) => {
  const headers = [
    "Type",
    "Recipient",
    "Recipient Name",
    "Message SID",
    "Status",
    "Date Updated",
    "Error Message",
  ];

  const rows = report.statuses.map((status: NotificationStatus) => [
    status.type,
    status.recipient,
    status.recipientName,
    status.messageSid || "N/A",
    status.status,
    new Date(status.dateUpdated).toLocaleString(), // Format date for CSV
    status.errorMessage || "N/A",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `notification_report_${report.notificationId}.csv`);
};