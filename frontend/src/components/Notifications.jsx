import React, { useContext } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { NotificationContext } from '../contexts/NotificationContext';
import './Notifications.css';

const Notifications = () => {
    const { notifications, removeNotification } = useContext(NotificationContext);

    return (
        <ToastContainer position="top-end" className="p-3">
            {notifications.map((notification) => (
                <Toast
                    key={notification.id}
                    onClose={() => removeNotification(notification.id)}
                    show={true}
                    delay={3000}
                    autohide
                    bg={notification.type}
                    className="text-white"
                >
                    <Toast.Header>
                        <strong className="me-auto">Notificación</strong>
                    </Toast.Header>
                    <Toast.Body>{notification.message}</Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    );
};

export default Notifications;