const projects = [
  {
    title: "Community Integration",
    description: "Helping people settle and thrive in their new communities.",
  },
  {
    title: "Education & Training",
    description: "Providing skills, learning, and opportunities.",
  },
  {
    title: "Cultural Exchange",
    description: "Celebrating diversity and shared values.",
  },
];

export default function Projects() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-semibold mb-10 text-center">
          Our Projects
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="border rounded p-6 bg-white shadow-sm"
            >
              <h4 className="text-xl font-semibold mb-2">{p.title}</h4>
              <p className="text-gray-600">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
