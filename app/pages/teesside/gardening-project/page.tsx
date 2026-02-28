import { ProgramPage } from "@/app/components/templates/ProgramPage";

export default function GardeningProjectPage() {
  return (
    <ProgramPage
      heroTitle="Gardening Project"
      heroSubtitle="Bringing communities together through the shared joy of growing, learning, and connecting with the land."
      heroImage="https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg"
      intro={{
        label: "Teesside — Gardening Project",
        heading: "Growing Together in Teesside",
        body: "Our Teesside Gardening Project provides refugees and asylum seekers with the opportunity to grow their own food, learn horticultural skills, and build friendships through working together outdoors. Gardening has proven therapeutic and social benefits, and our project harnesses these to support the wellbeing of participants.",
      }}
      highlights={[
        { stat: "40+", label: "Regular participants" },
        { stat: "Year-round", label: "Sessions available" },
        { stat: "3", label: "Growing sites" },
        { stat: "100%", label: "Free to join" },
      ]}
      sections={[
        {
          title: "What the Project Offers",
          body: [
            "Participants learn practical gardening skills from experienced volunteers and facilitators, with sessions covering everything from sowing seeds and composting to harvesting and cooking with fresh produce.",
            "The project runs throughout the year, with both indoor and outdoor sessions ensuring that participants can take part whatever the weather.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_internationalwomensday-scaled.jpg",
          imageAlt: "Participants in the gardening project",
          imagePosition: "right",
        },
        {
          title: "Health, Wellbeing and Community",
          body: [
            "Beyond the practical skills, the Gardening Project creates a safe and supportive space where people can relax, connect with others, and improve their mental and physical health.",
            "Many participants say that the project has helped them feel more at home in the UK and has given them the confidence to take the next steps in their integration journey.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg",
          imageAlt: "Community members enjoying the gardening project",
          imagePosition: "left",
        },
      ]}
      relatedLinks={[
        { label: "International Centre", href: "/pages/teesside/international-centre" },
        { label: "Cycle Re-cycling", href: "/pages/teesside/recycling" },
        { label: "All Teesside Programmes", href: "/pages/teesside" },
      ]}
      cta={{
        heading: "Join the Gardening Project",
        body: "Whether you have green fingers or have never picked up a trowel, you are welcome to join us. Get in touch to find out when the next session is.",
        buttonLabel: "Get Involved",
        buttonHref: "/pages/contact",
      }}
      backHref="/pages/teesside"
      backLabel="Teesside"
    />
  );
}
