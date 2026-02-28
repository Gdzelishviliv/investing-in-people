import { ProgramPage } from "@/app/components/templates/ProgramPage";

export default function OverseasDoctorsPage() {
  return (
    <ProgramPage
      heroTitle="Overseas Doctors"
      heroSubtitle="Supporting internationally qualified doctors to retrain, re-register, and contribute to the NHS and wider healthcare sector."
      heroImage="https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg"
      intro={{
        label: "Overseas Doctors Programme",
        heading: "Unlocking the Potential of Overseas-Trained Medics",
        body: "Many refugees and asylum seekers who arrive in the North East are qualified and experienced doctors, but face significant barriers to practising medicine in the UK. IPC's Overseas Doctors programme helps these individuals navigate the complex pathway to GMC registration and NHS employment, benefiting both the individuals and the communities they will serve.",
      }}
      highlights={[
        { stat: "50+", label: "Doctors supported" },
        { stat: "30+", label: "Now working in the NHS" },
        { stat: "10+", label: "Nationalities represented" },
        { stat: "£0", label: "Cost to participants" },
      ]}
      sections={[
        {
          title: "The Challenge Facing Overseas Doctors",
          body: [
            "Internationally qualified doctors who arrive in the UK as refugees or asylum seekers often face a lengthy and complex process to have their qualifications recognised and to register with the General Medical Council (GMC).",
            "Language barriers, lack of familiarity with UK medical systems, financial pressures, and the psychological impact of displacement all make this journey particularly challenging without dedicated support.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg",
          imageAlt: "Overseas doctors in a training session",
          imagePosition: "right",
        },
        {
          title: "How We Help",
          body: [
            "IPC provides one-to-one mentoring, study support, exam preparation, and guidance on the GMC registration process. We also connect doctors with NHS trusts and GP practices for clinical placements and peer networking opportunities.",
            "Our programme has helped dozens of doctors to successfully register with the GMC and secure employment in the NHS — making a vital contribution to healthcare in the North East.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg",
          imageAlt: "Doctor mentoring session",
          imagePosition: "left",
        },
        {
          title: "A Programme That Works",
          body: [
            "IPC has been running the Overseas Doctors programme for over a decade and has built strong relationships with NHS trusts, medical schools, and the GMC. Our approach is holistic — we support the whole person, not just the professional journey.",
            "Participants often go on to become mentors themselves, creating a growing community of overseas-trained medics who support one another through the process.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_internationalwomensday-scaled.jpg",
          imageAlt: "Overseas doctors community event",
          imagePosition: "right",
        },
      ]}
      relatedLinks={[
        { label: "Befriending Programme", href: "/pages/befriending" },
        { label: "Teesside Programmes", href: "/pages/teesside" },
        { label: "Tyneside Programmes", href: "/pages/tyneside" },
      ]}
      cta={{
        heading: "Are You an Overseas-Trained Doctor?",
        body: "If you are a qualified doctor who has arrived in the UK as a refugee or asylum seeker, we are here to help you get back to doing what you do best.",
        buttonLabel: "Get in Touch",
        buttonHref: "/pages/contact",
      }}
      backHref="/"
      backLabel="Home"
    />
  );
}
