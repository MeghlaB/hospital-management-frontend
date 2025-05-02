import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("https://hospital-server-peach.vercel.app/notifications");
        setNotifications(response.data); // Store fetched notifications in state
      } catch (error) {
        console.error("Error fetching notifications", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchNotifications(); // Call the fetch function
  }, []);

  // Loading spinner or message
  if (loading) {
    return <div className="text-center py-10">Loading notifications...</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl font-medium mb-4">Notifications</h3>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification, index) => (
            <li
              key={index}
              className={`p-4 border rounded-md shadow-sm ${
                notification.type === "reminder"
                  ? "bg-yellow-100"
                  : notification.type === "confirmation"
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              <p className="font-semibold">{notification.message}</p>
              <p className="text-sm text-gray-600">{notification.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default Notifications;
