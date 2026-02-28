import { ProgramPage } from "@/app/components/templates/ProgramPage";

export default function BefriendingPage() {
  return (
    <ProgramPage
      heroTitle="Befriend a Refugee"
      heroSubtitle="Building lasting friendships between refugees and local community members to reduce isolation and promote a sense of belonging."
      heroImage="https://i-p-c.org/wp-content/uploads/2022/03/0_ATR_MGA_300421mgaBini.jpg"
      intro={{
        label: "Befriending Programme",
        heading: "A Friend Can Change Everything",
        body: "IPC's Befriending Programme matches refugees and asylum seekers with local volunteer befrienders for regular one-to-one meetups. These friendships help reduce isolation, build confidence, and support integration — and they benefit both the refugee and the volunteer in equal measure.",
      }}
      highlights={[
        { stat: "200+", label: "Matches made" },
        { stat: "95%", label: "Participants report reduced isolation" },
        { stat: "12 months", label: "Minimum match commitment" },
        { stat: "2 hrs", label: "Per week on average" },
      ]}
      sections={[
        {
          title: "How the Programme Works",
          body: [
            "Volunteer befrienders are carefully matched with a refugee or asylum seeker based on shared interests, location, and availability. The pair then meet regularly — usually for a few hours each week — to socialise, explore their local area, and simply spend time together.",
            "IPC provides full training and ongoing support for all befrienders, as well as regular check-ins and group events for both befrienders and their matched friends.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/0_ATR_MGA_300421mgaBini.jpg",
          imageAlt: "Befriending pair spending time together",
          imagePosition: "right",
        },
        {
          title: "The Impact of a Friendship",
          body: [
            "For many refugees and asylum seekers, loneliness and isolation are among the biggest challenges they face. A genuine friendship with a local person can make an enormous difference — helping people to feel at home, learn about life in the UK, and build the confidence to engage with their wider community.",
            "For volunteers, the programme is equally rewarding. Befrienders consistently report that the friendship has broadened their perspective, improved their own wellbeing, and given them a deeper understanding of the refugee experience.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg",
          imageAlt: "Befriending participants at a community event",
          imagePosition: "left",
        },
        {
          title: "Become a Befriender",
          body: [
            "We are always looking for warm, friendly, and committed volunteers to join the programme. You do not need any special qualifications or experience — just a willingness to give your time and an open heart.",
            "All volunteers receive a full induction, DBS check, and ongoing training. We also offer regular supervision and support to ensure you feel confident and well-equipped throughout.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg",
          imageAlt: "Volunteer befrienders at training",
          imagePosition: "right",
        },
      ]}
      relatedLinks={[
        { label: "Overseas Doctors Programme", href: "/pages/overseas-doctors" },
        { label: "Teesside Programmes", href: "/pages/teesside" },
        { label: "Tyneside Programmes", href: "/pages/tyneside" },
      ]}
      cta={{
        heading: "Ready to Make a Difference?",
        body: "Sign up as a befriender today and help a refugee build a new life in the North East. It only takes a few hours a week — but it can mean the world.",
        buttonLabel: "Become a Befriender",
        buttonHref: "/pages/contact",
      }}
      backHref="/"
      backLabel="Home"
    />
  );
}
