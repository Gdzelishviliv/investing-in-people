import { ProgramPage } from "@/app/components/templates/ProgramPage";

export default function CapacityBuildingPage() {
  return (
    <ProgramPage
      heroTitle="Capacity Building Programme"
      heroSubtitle="Equipping refugee-led organisations and community groups with the skills and resources to grow and sustain their work."
      heroImage="https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg"
      intro={{
        label: "Tyneside — Capacity Building",
        heading: "Strengthening Communities from Within",
        body: "IPC's Capacity Building Programme supports refugee-led and emerging community organisations across Tyneside to develop their governance, fundraising, communications, and project management skills. We believe that strong, self-sufficient community organisations are the foundation of lasting integration.",
      }}
      highlights={[
        { stat: "25+", label: "Organisations supported" },
        { stat: "£500k+", label: "Funding secured by partners" },
        { stat: "50+", label: "Training sessions delivered" },
        { stat: "100%", label: "Volunteer-led training" },
      ]}
      sections={[
        {
          title: "What the Programme Covers",
          body: [
            "The programme offers tailored one-to-one support as well as group training sessions covering a wide range of topics, including: writing a constitution, applying for charitable status, applying for grants, managing finances, and recruiting and managing volunteers.",
            "We also connect organisations with a network of experienced mentors who can provide ongoing support and advice as they grow.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_internationalwomensday-scaled.jpg",
          imageAlt: "Capacity building training session",
          imagePosition: "right",
        },
        {
          title: "Why Capacity Building Matters",
          body: [
            "Refugee-led organisations often have deep roots in their communities and a detailed understanding of the challenges their members face. By helping these organisations to grow, we amplify the impact of community leadership.",
            "Our programme has helped dozens of groups across Tyneside to secure funding, improve their governance, and expand their reach — all of which benefits the wider community.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg",
          imageAlt: "Community organisation meeting",
          imagePosition: "left",
        },
      ]}
      relatedLinks={[
        { label: "Community Football", href: "/pages/tyneside/community-football" },
        { label: "Advice and Guidance", href: "/pages/tyneside/advice-and-guidance" },
        { label: "All Tyneside Programmes", href: "/pages/tyneside" },
      ]}
      cta={{
        heading: "Is Your Organisation Ready to Grow?",
        body: "If you run or are involved in a refugee-led or community organisation in Tyneside, we would love to help you develop.",
        buttonLabel: "Get in Touch",
        buttonHref: "/pages/contact",
      }}
      backHref="/pages/tyneside"
      backLabel="Tyneside"
    />
  );
}
