export default {
  items: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard/default",
          icon: "feather icon-home",
        },
      ],
    },
    {
      id: "create",
      title: "Customer",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "create",
          title: "Customer",
          type: "item",
          url: "/customers",
          icon: "feather icon-user",
        },
      ],
    },
    {
      id: "user",
      title: "User",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "user",
          title: "User",
          type: "item",
          url: "/users",
          icon: "feather icon-user",
        },
      ],
    },
    {
      id: "report",
      title: "Report",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "Report",
          title: "Report",
          type: "item",
          url: "/report",
          icon: "feather icon-user",
        },
      ],
    },
  ],
};
