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
      id: "settings",
      title: "Settings",
      type: "group",
      icon: "icon-settings",
      children: [
        {
          id: "settings",
          title: "Settings",
          type: "item",
          url: "/settings",
          icon: "feather icon-settings",
        },
      ],
    },
    {
      id: "nlp",
      title: "Nlp",
      type: "group",
      icon: "icon-settings",
      children: [
        {
          id: "nlp",
          title: "Nlp",
          type: "item",
          url: "/nlp",
          icon: "feather icon-settings",
        },
      ],
    },
    {
      id: "mediaServer",
      title: "Media Server",
      type: "group",
      icon: "icon-settings",
      children: [
        {
          id: "mediaServer",
          title: "mediaServer",
          type: "item",
          url: "/mediaServer",
          icon: "feather icon-settings",
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
          icon: "feather icon-cloud",
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
      id: "curd",
      title: "CURD",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "curd",
          title: "Curd",
          type: "item",
          url: "/curd",
          icon: "feather icon-cloud",
          children: [
            {
              id: "dashboard",
              title: "curd id",
              type: "item",
              url: "/:id",
              icon: "feather icon-home",
            },
          ],
        },
      ],
    },
    // {
    //   id: "cloud",
    //   title: "Cloud",
    //   type: "group",
    //   icon: "icon-navigation",
    //   children: [
    //     {
    //       id: "dashboard",
    //       title: "Cloud",
    //       type: "item",
    //       url: "/cloud",
    //       icon: "feather icon-cloud",
    //       children: [
    //         {
    //           id: "dashboard",
    //           title: "Cpass id",
    //           type: "item",
    //           url: "/:id",
    //           icon: "feather icon-home",
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      id: "server",
      title: "Server",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "server",
          title: "Server",
          type: "item",
          url: "/server",
          icon: "feather icon-server",
          children: [
            {
              id: "dashboard",
              title: "server id",
              type: "item",
              url: "/:id",
              icon: "feather icon-home",
            },
          ],
        },
      ],
    },
    {
      id: "carrier",
      title: "Carrier",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "did",
          title: "Carrier",
          type: "item",
          url: "/dip",
          icon: "feather icon-phone",
          children: [
            {
              id: "dashboard",
              title: "dip id",
              type: "item",
              url: "/:id",
              icon: "feather icon-home",
            },
          ],
        },
      ],
    },
    // {
    //   id: "billing",
    //   title: "Billing",
    //   type: "group",
    //   icon: "icon-navigation",
    //   children: [
    //     {
    //       id: "billing",
    //       title: "Billing",
    //       type: "item",
    //       url: "/billing",
    //       icon: "feather icon-home",
    //       children: [
    //         {
    //           id: "dashboard",
    //           title: "Cpass id",
    //           type: "item",
    //           url: "/:id",
    //           icon: "feather icon-home",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   id: "phone",
    //   title: "Phone",
    //   type: "group",
    //   icon: "icon-navigation",
    //   children: [
    //     {
    //       id: "phone",
    //       title: "Phone",
    //       type: "item",
    //       url: "/phone",
    //       icon: "feather icon-home",
    //       children: [
    //         {
    //           id: "dashboard",
    //           title: "Cpass id",
    //           type: "item",
    //           url: "/:id",
    //           icon: "feather icon-home",
    //         },
    //       ],
    //     },
    //   ],
    // },

    {
      id: "create",
      title: "Create",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "create",
          title: "Customers",
          type: "item",
          url: "/createUser",
          icon: "feather icon-user",
        },
      ],
    },
  ],
};
