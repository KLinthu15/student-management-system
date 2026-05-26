// import { useState } from "react";
// import { Bell, Check, Trash2, Info, AlertTriangle, CheckCircle } from "lucide-react";
// import AdminLayout from "../layout/AdminLayout";

// const notificationsData = [
//   { id: 1, type: "info", title: "New Student Enrolled", message: "Arun Kumar has enrolled in the React Course.", time: "2 mins ago", read: false },
//   { id: 2, type: "success", title: "Assignment Submitted", message: "Priya Sharma submitted Assignment 3 on time.", time: "15 mins ago", read: false },
//   { id: 3, type: "warning", title: "Attendance Alert", message: "5 students have below 75% attendance this week.", time: "1 hour ago", read: false },
//   { id: 4, type: "info", title: "Course Updated", message: "Node.js course syllabus has been updated.", time: "3 hours ago", read: true },
//   { id: 5, type: "success", title: "Result Published", message: "Semester 2 results have been published successfully.", time: "1 day ago", read: true },
  
// ];

// const iconMap = {
//   info:    { icon: Info,          bg: "#dbeafe", color: "#2563eb" },
//   success: { icon: CheckCircle,   bg: "#dcfce7", color: "#16a34a" },
//   warning: { icon: AlertTriangle, bg: "#fef9c3", color: "#ca8a04" },
// };

// export default function Notifications() {
//   const [notifications, setNotifications] = useState(notificationsData);
//   const [filter, setFilter] = useState("all");

//   const markAllRead = () => {
//     setNotifications(notifications.map(n => ({ ...n, read: true })));
//   };

//   const markRead = (id) => {
//     setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
//   };

//   const deleteOne = (id) => {
//     setNotifications(notifications.filter(n => n.id !== id));
//   };

//   const filtered = notifications.filter(n => {
//     if (filter === "unread") return !n.read;
//     if (filter === "read")   return n.read;
//     return true;
//   });

//   const unreadCount = notifications.filter(n => !n.read).length;

//   return (
//     <div style={{ maxWidth: "750px", margin: "0 auto" }}>

//       {/* HEADER */}
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//           <div style={{ width: "48px", height: "48px", background: "#2563eb", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <Bell size={24} color="white" />
//           </div>
//           <div>
//             <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#1e293b" }}>Notifications</h1>
//             <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>
//               {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
//             </p>
//           </div>
//         </div>

//         {/* MARK ALL READ */}
//         {unreadCount > 0 && (
//           <button onClick={markAllRead} style={{
//             display: "flex", alignItems: "center", gap: "6px",
//             padding: "10px 18px", borderRadius: "10px", border: "none",
//             background: "#2563eb", color: "white", cursor: "pointer",
//             fontWeight: "600", fontSize: "14px",
//           }}>
//             <Check size={16} />
//             Mark all as read
//           </button>
//         )}
//       </div>

//       {/* FILTER TABS */}
//       <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
//         {["all", "unread", "read"].map(tab => (
//           <button key={tab} onClick={() => setFilter(tab)} style={{
//             padding: "8px 20px", borderRadius: "20px", border: "none",
//             cursor: "pointer", fontWeight: "600", fontSize: "14px",
//             background: filter === tab ? "#2563eb" : "#f1f5f9",
//             color: filter === tab ? "white" : "#64748b",
//             transition: "all 0.2s",
//           }}>
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             {tab === "unread" && unreadCount > 0 && (
//               <span style={{
//                 marginLeft: "6px", background: "white", color: "#2563eb",
//                 borderRadius: "10px", padding: "1px 7px", fontSize: "12px",
//               }}>
//                 {unreadCount}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* NOTIFICATION LIST */}
//       <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//         {filtered.length === 0 ? (
//           <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
//             <Bell size={48} style={{ marginBottom: "12px", opacity: 0.3 }} />
//             <p style={{ fontSize: "16px" }}>No notifications found</p>
//           </div>
//         ) : (
//           filtered.map(n => {
//             const { icon: Icon, bg, color } = iconMap[n.type];
//             return (
//               <div key={n.id} style={{
//                 display: "flex", alignItems: "flex-start", gap: "16px",
//                 background: n.read ? "#ffffff" : "#eff6ff",
//                 border: n.read ? "1px solid #e2e8f0" : "1px solid #bfdbfe",
//                 borderRadius: "14px", padding: "18px",
//                 transition: "all 0.2s",
//               }}>

//                 {/* ICON */}
//                 <div style={{ width: "44px", height: "44px", background: bg, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                   <Icon size={22} color={color} />
//                 </div>

//                 {/* CONTENT */}
//                 <div style={{ flex: 1 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#1e293b" }}>
//                       {n.title}
//                       {!n.read && (
//                         <span style={{ marginLeft: "8px", width: "8px", height: "8px", background: "#2563eb", borderRadius: "50%", display: "inline-block" }} />
//                       )}
//                     </h3>
//                     <span style={{ fontSize: "12px", color: "#94a3b8" }}>{n.time}</span>
//                   </div>
//                   <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#64748b" }}>{n.message}</p>
//                 </div>

//                 {/* ACTIONS */}
//                 <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
//                   {!n.read && (
//                     <button onClick={() => markRead(n.id)} title="Mark as read" style={{
//                       width: "34px", height: "34px", borderRadius: "8px", border: "none",
//                       background: "#dcfce7", color: "#16a34a", cursor: "pointer",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                     }}>
//                       <Check size={16} />
//                     </button>
//                   )}
//                   <button onClick={() => deleteOne(n.id)} title="Delete" style={{
//                     width: "34px", height: "34px", borderRadius: "8px", border: "none",
//                     background: "#fee2e2", color: "#ef4444", cursor: "pointer",
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                   }}>
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";
import {
  Bell,
  Check,
  Trash2,
  Info,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const API_URL = "http://localhost:5001/api/notifications";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const iconMap = {
    info: {
      icon: Info,
      bg: "#dbeafe",
      color: "#2563eb",
    },
    success: {
      icon: CheckCircle,
      bg: "#dcfce7",
      color: "#16a34a",
    },
    warning: {
      icon: AlertTriangle,
      bg: "#fef9c3",
      color: "#ca8a04",
    },
  };

  // Fetch Notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);

      const notificationsData = res.data?.data || [];

      const formatted = notificationsData.map((item) => ({
        id: item.id,
        type: item.type,
        title: item.title,
        message: item.message,
        read: item.is_read,
        time: new Date(item.created_at).toLocaleString(),
      }));

      setNotifications(formatted);
    } catch (error) {
      console.error("Fetch Notification Error:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark One Read
  const markRead = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/read`);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, read: true }
            : item
        )
      );
    } catch (error) {
      console.error("Mark Read Error:", error);
    }
  };

  // Mark All Read
  const markAllRead = async () => {
    try {
      await axios.put(`${API_URL}/read-all`);

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          read: true,
        }))
      );
    } catch (error) {
      console.error("Mark All Read Error:", error);
    }
  };

  // Delete
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setNotifications((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const filteredNotifications = notifications.filter(
    (item) => {
      if (filter === "read") return item.read;
      if (filter === "unread") return !item.read;
      return true;
    }
  );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "#2563eb",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Bell size={24} color="#fff" />
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                color: "#1e293b",
              }}
            >
              Notifications
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
              }}
            >
              {unreadCount} unread notification
              {unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{
              border: "none",
              background: "#2563eb",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Mark All Read
          </button>
        )}
      </div>

      {/* Filter */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {["all", "unread", "read"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              border: "none",
              cursor: "pointer",
              padding: "8px 18px",
              borderRadius: "20px",
              background:
                filter === tab
                  ? "#2563eb"
                  : "#e2e8f0",
              color:
                filter === tab
                  ? "#fff"
                  : "#475569",
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
          }}
        >
          Loading...
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#64748b",
          }}
        >
          No Notifications Found
        </div>
      ) : (
        filteredNotifications.map((item) => {
          const {
            icon: Icon,
            bg,
            color,
          } = iconMap[item.type] || iconMap.info;

          return (
            <div
              key={item.id}
              style={{
                background: item.read
                  ? "#fff"
                  : "#eff6ff",
                border: item.read
                  ? "1px solid #e2e8f0"
                  : "1px solid #bfdbfe",
                borderRadius: "14px",
                padding: "18px",
                marginBottom: "12px",
                display: "flex",
                gap: "15px",
                alignItems: "flex-start",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  background: bg,
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon size={22} color={color} />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: "#1e293b",
                    }}
                  >
                    {item.title}
                  </h3>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                    }}
                  >
                    {item.time}
                  </span>
                </div>

                <p
                  style={{
                    marginTop: "8px",
                    color: "#64748b",
                  }}
                >
                  {item.message}
                </p>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                {!item.read && (
                  <button
                    onClick={() =>
                      markRead(item.id)
                    }
                    style={{
                      border: "none",
                      width: "36px",
                      height: "36px",
                      cursor: "pointer",
                      borderRadius: "8px",
                      background: "#dcfce7",
                    }}
                  >
                    <Check
                      size={18}
                      color="#16a34a"
                    />
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteNotification(item.id)
                  }
                  style={{
                    border: "none",
                    width: "36px",
                    height: "36px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    background: "#fee2e2",
                  }}
                >
                  <Trash2
                    size={18}
                    color="#ef4444"
                  />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}