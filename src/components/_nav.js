export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavItem",
        name: "Home",
        to: "/",
        icon: "cil-home",
        badge: {
          color: "primary",
          text: "Alpha"
        }
      },
      {
        _name: "CSidebarNavTitle",
        _children: ["Catalogue"]
      },
      {
        _name: "CSidebarNavItem",
        name: "Service",
        to: "/catalogue/service",
        icon: "cil-layers"
      },
      {
        _name: "CSidebarNavItem",
        name: "Process",
        to: "/catalogue/process",
        icon: "cil-layers"
      },
      {
        _name: "CSidebarNavItem",
        name: "Session",
        to: "/catalogue/session",
        icon: "cil-layers"
      }
    ]
  }
];
