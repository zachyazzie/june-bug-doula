import type { ImageMetadata } from "astro";
import layingOnSide from "../assets/images/woman-laying-on-side.jpg";
import receivingSupport from "../assets/images/woman-receiving-support.jpg";
import onlineMeeting from "../assets/images/woman-in-online-meeting.jpg";

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  image: ImageMetadata;
  servicePageHref: string;
}

export const packages: Package[] = [
  {
    id: "basic-birth-package",
    name: "Basic Birth Package",
    price: 800,
    description:
      "Two prenatal appointments, on-call labor support two weeks before your due date, birth attendance and coaching, birth plan template and information packets, one postpartum follow up",
    image: layingOnSide,
    servicePageHref: "/services/birth-doula/",
  },
  {
    id: "premium-birth-package",
    name: "Premium Birth Package",
    price: 950,
    description:
      "Three prenatal appointments, on-call labor support three weeks before your due date, calming birth package, hypno-birth training, birth attendance and coaching, birth plan template, two postpartum follow ups",
    image: receivingSupport,
    servicePageHref: "/services/birth-doula/",
  },
  {
    id: "online-consultation",
    name: "Online Consultation",
    price: 100,
    description:
      "One hour online video consultation to formulate a custom birth plan, answer all of your birth questions, and educate you on the stages of labor, along with techniques for pain management and relaxation",
    image: onlineMeeting,
    servicePageHref: "/services/online-consultation/",
  },
];
