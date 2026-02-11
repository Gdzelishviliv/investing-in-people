import { Twitter, Facebook } from "lucide-react";

export function SocialLinks() {
  return (
    <>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#dbb9b9] hover:text-[#8b1e1e] transition"
      >
        <Twitter className="h-5 w-5" />
      </a>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#dbb9b9] hover:text-[#8b1e1e] transition"
      >
        <Facebook className="h-5 w-5" />
      </a>
    </>
  );
}
