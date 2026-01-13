import Animate from "../../atoms/Animate";

export default function ContactPage() {
  return (
    <main className="py-20">
      <div className="container max-w-xl">
        <Animate>
          <h2 className="text-4xl font-semibold mb-6">Contact Us</h2>
          <form className="space-y-4">
            <input className="w-full border p-3" placeholder="Name" />
            <input className="w-full border p-3" placeholder="Email" />
            <textarea
              className="w-full border p-3"
              placeholder="Message"
              rows={5}
            />
            <button className="bg-primary text-white px-6 py-3 rounded">
              Send Message
            </button>
          </form>
        </Animate>
      </div>
    </main>
  );
}
