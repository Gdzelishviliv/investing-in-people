import Animate from "../../atoms/Animate";

export default function AboutPage() {
  return (
    <main className="py-20">
      <div className="container">
        <Animate>
          <h2 className="text-4xl font-semibold mb-6">About Us</h2>
          <p className="max-w-3xl text-gray-700">
            IPC works with communities to promote inclusion, learning,
            wellbeing, and cultural exchange across the region.
          </p>
        </Animate>
      </div>
    </main>
  );
}
