import { ProgramPage } from "@/app/components/templates/ProgramPage";

export default function CycleRecyclingPage() {
  return (
    <ProgramPage
      heroTitle="Cycle Re-cycling"
      heroSubtitle="Refurbishing donated bikes and teaching cycling skills to give people a sustainable, affordable way to get around."
      heroImage="https://i-p-c.org/wp-content/uploads/2022/03/footy-pic-4_ipc-scaled.jpeg"
      intro={{
        label: "Teesside — Cycle Re-cycling",
        heading: "Bikes, Skills and Independence",
        body: "The IPC Cycle Re-cycling project collects donated bicycles, refurbishes them with support from volunteers and participants, and redistributes them to refugees and asylum seekers in the Teesside area. The project also runs cycling proficiency sessions so that people can get around safely and independently.",
      }}
      highlights={[
        { stat: "150+", label: "Bikes refurbished" },
        { stat: "80+", label: "Bikes donated to community" },
        { stat: "30+", label: "Cycling sessions delivered" },
        { stat: "0", label: "Cost to participants" },
      ]}
      sections={[
        {
          title: "How the Project Works",
          body: [
            "Bikes are donated by members of the public and local businesses. Our volunteers and project participants then work together to clean, repair, and refurbish them using tools and parts sourced through donations.",
            "Once a bike is roadworthy, it is given to someone who needs it — providing a vital, free, and environmentally friendly mode of transport.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg",
          imageAlt: "Volunteers refurbishing bikes",
          imagePosition: "right",
        },
        {
          title: "Learning New Skills",
          body: [
            "As well as receiving a bike, participants are encouraged to take part in our bike maintenance workshops where they learn how to carry out basic repairs and keep their bike in good condition.",
            "We also partner with local cycling organisations to deliver road safety and cycling proficiency sessions, helping people gain confidence on the road.",
          ],
          image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg",
          imageAlt: "Participants learning bike maintenance",
          imagePosition: "left",
        },
      ]}
      relatedLinks={[
        { label: "International Centre", href: "/pages/teesside/international-centre" },
        { label: "Gardening Project", href: "/pages/teesside/gardening-project" },
        { label: "All Teesside Programmes", href: "/pages/teesside" },
      ]}
      cta={{
        heading: "Donate a Bike or Get Involved",
        body: "Got a bike gathering dust? We would love to give it a new lease of life. Or volunteer your time to help us keep wheels turning.",
        buttonLabel: "Contact Us",
        buttonHref: "/pages/contact",
      }}
      backHref="/pages/teesside"
      backLabel="Teesside"
    />
  );
}
