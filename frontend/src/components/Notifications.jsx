// src/components/Notifications.jsx
import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import './Notifications.css';

function Notifications() {
    const { notifications } = useNotification();

    const typeToClass = {
        success: 'alert-success',
        error: 'alert-danger',
        info: 'alert-info',
    };

    return (
        <div className="notification-container">
            {notifications.map(notif => (
                <div key={notif.id} className={`alert ${typeToClass[notif.type] || 'alert-secondary'} notification-item`}>
                    {notif.message}
                </div>
            ))}
        </div>
    );
}

export default Notifications;