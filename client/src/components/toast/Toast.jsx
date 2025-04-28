import React, { useEffect } from 'react';
import './Toast.css';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../store/toastSlice';
import { CheckCircledIcon, InfoCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"

const Toast = () => {
  const dispatch = useDispatch();
  const { message, type, isvisible } = useSelector((state) => state.toast);
  useEffect(() => {
    if (isvisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isvisible, dispatch]);

  if (!isvisible) return null;

  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircledIcon className="toast-icon success" />;
      case 'error':
        return <CrossCircledIcon className="toast-icon error" />;
      case 'info':
      default:
        return <InfoCircledIcon className="toast-icon info" />;
    }
  };

  return (
    <div className={`toast toast-${type}`}>
        {renderIcon()}
        <span>{message}</span>
    </div>
  );
};


export default Toast;
