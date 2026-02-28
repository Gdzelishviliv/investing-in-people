import { ProgramPage } from "@/app/components/templates/ProgramPage";

export default function TeessidePage() {
  return (
    <ProgramPage
      heroTitle="Teesside"
      heroSubtitle="Empowering refugee and asylum seeker communities across Middlesbrough and the wider Teesside area."
      heroImage="https://i-p-c.org/wp-content/uploads/2022/03/ipc_internationalwomensday-scaled.jpg"
      intro={{
        label: "Our Teesside Work",
        heading: "Supporting Communities in Middlesbrough",
        body: "IPC has been working in Teesside since our founding, delivering a range of services and programmes that support refugees and people seeking asylum to settle, integrate, and thrive in the North East. Our Teesside hub is based at the International Centre in Middlesbrough and runs several community-led projects throughout the year.",
      }}
      highlights={[
        { stat: "200+", label: "People supported annually" },
        { stat: "3", label: "Active programmes" },
        { stat: "10+", label: "Years in Teesside" },
        { stat: "50+", label: "Volunteers involved" },
      ]}
      sections={[
        {
          title: "A Hub for Integration",
          body: [
            "The Teesside team works closely with statutory services, local authorities, and community organisations to ensure that newly arrived refugees and asylum seekers receive the support they need from day one.",
            "From language support and employability coaching to social events and cultural programmes, our Teesside activities are designed to help people build confidence and connections in their new home.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg",
          imageAlt: "IPC Teesside community gathering",
          imagePosition: "right",
        },
      ]}
      relatedLinks={[
        { label: "International Centre", href: "/pages/teesside/international-centre" },
        { label: "Gardening Project", href: "/pages/teesside/gardening-project" },
        { label: "Cycle Re-cycling", href: "/pages/teesside/recycling" },
      ]}
      cta={{
        heading: "Get Involved in Teesside",
        body: "Whether you want to volunteer, donate, or find out more about our programmes, we would love to hear from you.",
        buttonLabel: "Contact Us",
        buttonHref: "/pages/contact",
      }}
      backHref="/"
      backLabel="Home"
    />
  );
}
