import { ProgramPage } from "@/app/components/templates/ProgramPage";

export default function AdviceAndGuidancePage() {
  return (
    <ProgramPage
      heroTitle="Advice and Guidance"
      heroSubtitle="Providing clear, accessible information and one-to-one support to help people navigate life in the UK."
      heroImage="https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg"
      intro={{
        label: "Tyneside — Advice and Guidance",
        heading: "Practical Support When You Need It Most",
        body: "IPC's Advice and Guidance service in Tyneside provides refugees, asylum seekers, and new communities with access to clear, reliable information and one-to-one support across a wide range of topics. Our experienced advisers help people understand their rights and navigate complex systems.",
      }}
      highlights={[
        { stat: "500+", label: "Individuals advised per year" },
        { stat: "10+", label: "Topic areas covered" },
        { stat: "Free", label: "And confidential" },
        { stat: "Multi-lingual", label: "Support available" },
      ]}
      sections={[
        {
          title: "Areas We Cover",
          body: [
            "Our advisers can provide information and signposting on a wide range of topics including: housing and homelessness, employment rights and job searching, benefits and financial support, health and mental health services, education and training, and family reunification.",
            "We do not provide legal advice, but we work closely with specialist legal organisations and can refer people to the right support when needed.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg",
          imageAlt: "One-to-one advice session",
          imagePosition: "right",
        },
        {
          title: "Accessible and Confidential",
          body: [
            "All of our advice sessions are free of charge and confidential. We have access to interpreters and can provide information in a range of languages to ensure that language is never a barrier to getting help.",
            "Drop-in sessions are available at our Crudas Park Centre base, and we can also arrange appointments for those who cannot attend in person.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_internationalwomensday-scaled.jpg",
          imageAlt: "Group advice session",
          imagePosition: "left",
        },
      ]}
      relatedLinks={[
        { label: "Community Football", href: "/pages/tyneside/community-football" },
        { label: "Capacity Building Programme", href: "/pages/tyneside/capacity-building" },
        { label: "All Tyneside Programmes", href: "/pages/tyneside" },
      ]}
      cta={{
        heading: "Need Advice or Guidance?",
        body: "Do not struggle alone. Our team is here to help. Contact us to arrange a session or simply drop in.",
        buttonLabel: "Contact Us",
        buttonHref: "/pages/contact",
      }}
      backHref="/pages/tyneside"
      backLabel="Tyneside"
    />
  );
}
