// src/types/index.ts
export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "teacher";
  }
  
  export interface AuthResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: User;
    error?: string;
  }
  
  export interface NotificationStatus {
    type: string;
    recipient: string;
    recipientName: string;
    messageSid: string | null;
    status: string;
    dateUpdated: string;
    errorMessage: string | null;
  }
  
  export interface NotificationSummary {
    delivered: number;
    sent: number;
    failed: number;
    pending: number;
  }
  
  export interface NotificationReport {
    notificationId: number;
    details:string,///
    type: string;
    template: string;
    sendingTime: string;
    sent: boolean;
    groups: number[];
    statuses: NotificationStatus[];
    total: number;
    summary: NotificationSummary;
  }
  
  export interface SummaryReport {
    notifications: {
      notificationId: number;
      type: string;
      template: string;
      sendingTime: string;
      sent: boolean;
      groups: number[];
      totalRecipients: number;
      studentNames?: string[];///////
      webinarTitle: string;////
      summary: NotificationSummary;
    }[];
    totalNotifications: number;
    totalMessages: number;
    overallSummary: NotificationSummary;
  }
  
  export interface Message {
    notificationId: number;
    type: string; 
    recipient: string;
    message: string;
  }