import { ProgramPage } from "@/app/components/templates/ProgramPage";

export default function TynesidePage() {
  return (
    <ProgramPage
      heroTitle="Tyneside"
      heroSubtitle="Working with refugee and asylum seeker communities across Newcastle and the wider Tyneside area."
      heroImage="https://i-p-c.org/wp-content/uploads/2022/03/footy-pic-4_ipc-scaled.jpeg"
      intro={{
        label: "Our Tyneside Work",
        heading: "Supporting Communities in Newcastle",
        body: "IPC's Tyneside operations are based at our Newcastle hub at Unit 5, Crudas Park Centre, and serve refugees, asylum seekers, and new communities across the city and surrounding area. We deliver a range of programmes focused on sport, capacity building, and practical advice and guidance.",
      }}
      highlights={[
        { stat: "300+", label: "People supported annually" },
        { stat: "3", label: "Active programmes" },
        { stat: "15+", label: "Partner organisations" },
        { stat: "60+", label: "Active volunteers" },
      ]}
      sections={[
        {
          title: "Community-Led Programmes",
          body: [
            "Our Tyneside team designs and delivers programmes that are shaped by the needs and interests of the communities we work with. Refugees and asylum seekers are not just recipients of our support — they are active partners in designing and running our activities.",
            "From community football to capacity building, each programme creates opportunities for people to develop skills, build relationships, and contribute to their local community.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg",
          imageAlt: "IPC Tyneside community event",
          imagePosition: "right",
        },
      ]}
      relatedLinks={[
        { label: "Community Football", href: "/pages/tyneside/community-football" },
        { label: "Capacity Building Programme", href: "/pages/tyneside/capacity-building" },
        { label: "Advice and Guidance", href: "/pages/tyneside/advice-and-guidance" },
      ]}
      cta={{
        heading: "Get Involved in Tyneside",
        body: "We are always looking for volunteers, partners, and supporters. Get in touch to find out how you can help.",
        buttonLabel: "Contact Us",
        buttonHref: "/pages/contact",
      }}
      backHref="/"
      backLabel="Home"
    />
  );
}
