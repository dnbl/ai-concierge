import React from 'react';
import { useToast } from '../atoms/Toast';
import { useAppStore } from '../../store/useAppStore';

// Component to handle toast notifications for various app events
const ToastNotificationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const { fleet } = useAppStore();
  
  // This would typically use useEffect to listen for events
  // For now, we'll export functions that can be called directly
  
  return <>{children}</>;
};

// Export utility functions for showing toasts
export const showVehicleAddedToast = (showToast: ReturnType<typeof useToast>['showToast']) => {
  showToast({
    type: 'success',
    title: 'Vehicle Added',
    message: 'Vehicle has been successfully added to your fleet.',
    duration: 3000
  });
};

export const showServiceBookedToast = (showToast: ReturnType<typeof useToast>['showToast']) => {
  showToast({
    type: 'success',
    title: 'Service Booked',
    message: 'Your service appointment has been scheduled successfully.',
    duration: 3000
  });
};

export const showTestDriveScheduledToast = (showToast: ReturnType<typeof useToast>['showToast']) => {
  showToast({
    type: 'success',
    title: 'Test Drive Scheduled',
    message: 'Your test drive appointment has been confirmed.',
    duration: 3000
  });
};

export const showAttachmentUploadedToast = (showToast: ReturnType<typeof useToast>['showToast']) => {
  showToast({
    type: 'success',
    title: 'File Attached',
    message: 'Your file has been attached successfully.',
    duration: 2000
  });
};

export const showErrorToast = (showToast: ReturnType<typeof useToast>['showToast'], message?: string) => {
  showToast({
    type: 'error',
    title: 'Error',
    message: message || 'Something went wrong. Please try again.',
    duration: 5000
  });
};

export default ToastNotificationWrapper;