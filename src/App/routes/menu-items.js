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
      title: "Create",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "create",
          title: "Create User",
          type: "item",
          url: "/createUser",
          icon: "feather icon-user",
        },
      ],
    },
  ],
};
