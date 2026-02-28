export const navItems = [
  {
    label: "HOME",
    href: "/",
    // children: [{ label: "Accessibility", href: "/pages/accessibility" }],
  },
  {
    label: "TEESSIDE",
    href: "/pages/teesside",
    children: [
      { label: "International Centre", href: "/pages/teesside/international-centre" },
      { label: "Gardening Project", href: "/pages/teesside/gardening-project" },
      { label: "CYCLE RE-CYCLING", href: "/pages/teesside/recycling" },
    ],
  },
  {
    label: "TYNESIDE", href: "/pages/tyneside", 
    children: [
      { label: "Community Football", href: "/pages/tyneside/community-football" },
      { label: "Capacity Building Programme", href: "/pages/tyneside/capacity-buildings" },
      { label: "Advice And Guidance", href: "/pages/tyneside/advice-and-guidance" }
    ]
  },
  { label: "OVERSEAS DOCTORS", href: "/pages/overseas-doctors" },
  { label: "BEFRIENDING", href: "/pages/befriending" },
  { label: "GALLERY", href: "/pages/gallery" },
  { label: "CONTACT", href: "/pages/contact" },
];
