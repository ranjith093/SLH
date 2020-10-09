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
      id: "cpass",
      title: "Cpass",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Cpass",
          type: "item",
          url: "/cpass",
          icon: "feather icon-home",
          children: [
            {
              id: "dashboard",
              title: "Cpass id",
              type: "item",
              url: "/:id",
              icon: "feather icon-home",
            },
          ],
        },
      ],
    },
  ],
};
