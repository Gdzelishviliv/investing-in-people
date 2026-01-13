import Animate from "../components/atoms/Animate";

const items = Array.from({ length: 6 });

export default function GalleryPage() {
  return (
    <main className="py-20">
      <div className="container">
        <Animate>
          <h2 className="text-4xl font-semibold mb-10">Gallery</h2>
        </Animate>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((_, i) => (
            <Animate key={i}>
              <div className="bg-gray-200 h-56 rounded" />
            </Animate>
          ))}
        </div>
      </div>
    </main>
  );
}
