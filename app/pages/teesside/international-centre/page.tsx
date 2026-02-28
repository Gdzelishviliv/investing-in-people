import { ProgramPage } from "@/app/components/templates/ProgramPage";

export default function InternationalCentrePage() {
  return (
    <ProgramPage
      heroTitle="International Centre"
      heroSubtitle="A welcoming space in the heart of Middlesbrough for refugees, asylum seekers, and new communities."
      heroImage="https://i-p-c.org/wp-content/uploads/2022/03/ipc_internationalwomensday-scaled.jpg"
      intro={{
        label: "Teesside — International Centre",
        heading: "A Community Hub for Middlesbrough",
        body: "The International Centre at 7 Abingdon Road, Middlesbrough, is IPC's Teesside base. It provides a safe, friendly, and accessible space where people from refugee and asylum seeker backgrounds can access support, connect with others, and take part in a wide range of activities.",
      }}
      highlights={[
        { stat: "5 days", label: "Open per week" },
        { stat: "100+", label: "Visitors per month" },
        { stat: "10+", label: "Weekly sessions" },
        { stat: "20+", label: "Partner organisations" },
      ]}
      sections={[
        {
          title: "What Happens at the Centre",
          body: [
            "The centre hosts a variety of programmes including English language classes, employability workshops, health and wellbeing sessions, and social events that bring the community together.",
            "Our trained staff and dedicated volunteers are on hand to provide one-to-one support, signposting, and advocacy to help individuals navigate life in the UK.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg",
          imageAlt: "People gathered at the International Centre",
          imagePosition: "right",
        },
        {
          title: "A Place for Everyone",
          body: [
            "The International Centre is open to anyone from a refugee or asylum seeking background in the Teesside area. Sessions are free of charge and are run in a welcoming, inclusive environment.",
            "We work hard to ensure the centre reflects the diversity of the communities we serve, with sessions available in multiple languages and cultural celebrations held throughout the year.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg",
          imageAlt: "Cultural celebration at the International Centre",
          imagePosition: "left",
        },
      ]}
      relatedLinks={[
        { label: "Gardening Project", href: "/pages/teesside/gardening-project" },
        { label: "Cycle Re-cycling", href: "/pages/teesside/recycling" },
        { label: "All Teesside Programmes", href: "/pages/teesside" },
      ]}
      cta={{
        heading: "Visit the International Centre",
        body: "We are located at 7 Abingdon Road, Middlesbrough TS1 2DP. Come and see us — everyone is welcome.",
        buttonLabel: "Get in Touch",
        buttonHref: "/pages/contact",
      }}
      backHref="/pages/teesside"
      backLabel="Teesside"
    />
  );
}
