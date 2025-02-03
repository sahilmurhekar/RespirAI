const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "operator", "technician", "supervisor"],
      },
      {
        icon: "/technician.png",
        label: "Technicians",
        href: "/list/technicians",
        visible: ["admin", "supervisor"],
      },
      {
        icon: "/operator.png",
        label: "Operators",
        href: "/list/operators",
        visible: ["admin", "supervisor"],
      },
      {
        icon: "/supervisor.png",
        label: "Supervisors",
        href: "/list/supervisors",
        visible: ["admin"],
      },
      {
        icon: "/zones.png",
        label: "Zones",
        href: "/list/zones",
        visible: ["admin"],
      },
      {
        icon: "/devices.png",
        label: "Devices",
        href: "/list/devices",
        visible: ["admin", "technician"],
      },
      {
        icon: "/sensors.png",
        label: "Sensors",
        href: "/list/sensors",
        visible: ["admin", "technician"],
      },
      {
        icon: "/alerts.png",
        label: "Alerts",
        href: "/list/alerts",
        visible: ["admin", "operator", "technician", "supervisor"],
      },
      {
        icon: "/maintenance.png",
        label: "Maintenance",
        href: "/list/maintenance",
        visible: ["admin", "technician"],
      },
      {
        icon: "/reports.png",
        label: "Reports",
        href: "/list/reports",
        visible: ["admin", "operator", "technician", "supervisor"],
      },
      {
        icon: "/monitoring.png",
        label: "Monitoring",
        href: "/list/monitoring",
        visible: ["admin", "operator", "technician", "supervisor"],
      },
      {
        icon: "/calendar.png",
        label: "Schedule",
        href: "/list/schedule",
        visible: ["admin", "operator", "technician", "supervisor"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "operator", "technician", "supervisor"],
      },
      {
        icon: "/notification.png",
        label: "Notifications",
        href: "/list/notifications",
        visible: ["admin", "operator", "technician", "supervisor"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "operator", "technician", "supervisor"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "operator", "technician", "supervisor"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "operator", "technician", "supervisor"],
      },
    ],
  },
];
