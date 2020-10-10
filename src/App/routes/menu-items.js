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
    {
      id: "cloud",
      title: "Cloud",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Clod",
          type: "item",
          url: "/cloud",
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
    {
      id: "billing",
      title: "Billing",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "billing",
          title: "Billing",
          type: "item",
          url: "/billing",
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
    {
      id: "phone",
      title: "Phone",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "phone",
          title: "Phone",
          type: "item",
          url: "/phone",
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
