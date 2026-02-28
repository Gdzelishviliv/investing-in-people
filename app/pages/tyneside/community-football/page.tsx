import { ProgramPage } from "@/app/components/templates/ProgramPage";

export default function CommunityFootballPage() {
  return (
    <ProgramPage
      heroTitle="Community Football"
      heroSubtitle="Using the power of football to bring people together, build friendships, and promote wellbeing across Newcastle."
      heroImage="https://i-p-c.org/wp-content/uploads/2022/03/footy-pic-4_ipc-scaled.jpeg"
      intro={{
        label: "Tyneside — Community Football",
        heading: "Football as a Force for Integration",
        body: "IPC's Community Football programme uses the universal language of sport to bring refugees, asylum seekers, and local community members together on the pitch. Regular sessions are held across Newcastle, with everyone welcome regardless of ability or experience.",
      }}
      highlights={[
        { stat: "100+", label: "Regular participants" },
        { stat: "Weekly", label: "Sessions running" },
        { stat: "10+", label: "Nationalities represented" },
        { stat: "Free", label: "To all participants" },
      ]}
      sections={[
        {
          title: "More Than Just a Game",
          body: [
            "Football provides a natural and accessible way for people from different backgrounds to connect, communicate, and build trust. Our sessions are friendly and inclusive, welcoming players of all abilities.",
            "Beyond the physical benefits, participants report improved confidence, reduced isolation, and stronger friendships as a result of taking part in the programme.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/footy-pic-4_ipc-scaled.jpeg",
          imageAlt: "Community football session in Newcastle",
          imagePosition: "right",
        },
        {
          title: "Pathways to Opportunity",
          body: [
            "For some participants, the football programme has opened doors to coaching qualifications, volunteering, and employment. We work with local FA affiliates to support participants who want to progress in football.",
            "The social networks formed through the programme also support people in other areas of their life, from finding housing to accessing healthcare and education.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg",
          imageAlt: "Football participants celebrating",
          imagePosition: "left",
        },
      ]}
      relatedLinks={[
        { label: "Capacity Building Programme", href: "/pages/tyneside/capacity-building" },
        { label: "Advice and Guidance", href: "/pages/tyneside/advice-and-guidance" },
        { label: "All Tyneside Programmes", href: "/pages/tyneside" },
      ]}
      cta={{
        heading: "Join the Next Session",
        body: "Sessions are open to everyone — no experience necessary. Come and join us on the pitch.",
        buttonLabel: "Find Out More",
        buttonHref: "/pages/contact",
      }}
      backHref="/pages/tyneside"
      backLabel="Tyneside"
    />
  );
}
