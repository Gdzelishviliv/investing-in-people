import { Mail, Phone, MapPin, Heart } from "lucide-react";

export const FOOTER_CTA = {
  title: "Your donations can change someone's life",
  button: {
    label: "DONATE NOW",
    icon: Heart,
    href: "/donate", 
  },
};

export const FOOTER_CONTACT = {
  title: "Contact",
  items: [
    {
      id: "email",
      icon: Mail,
      text: "info@i-p-c.org",
      href: "mailto:info@i-p-c.org",
    },
    {
      id: "phone",
      icon: Phone,
      text: "+44 7411157589",
      href: "tel:+447411157589",
    },
    {
      id: "address-1",
      icon: MapPin,
      text:
        "Unit 5, Cruddas Park Centre, Westmorland Rd, Newcastle upon Tyne, NE4 7RW",
    },
    {
      id: "address-2",
      icon: MapPin,
      text:
        "International Centre, 7 Abingdon Rd, Middlesbrough TS1 2DP",
    },
  ],
};

export const FOOTER_META = {
  charityName: "Investing in People and Culture",
  charityNumber: "1160482",
  registeredOffice:
    "Unit 5, Cruddas Park Centre, Westmorland Road, Newcastle upon Tyne, NE4 7RW",
};
