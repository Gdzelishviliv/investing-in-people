"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export interface ProgramSection {
  title: string;
  body: string[];
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
}

export interface RelatedLink {
  label: string;
  href: string;
}

export interface ProgramPageProps {
  /** Hero banner */
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;

  /** Intro block (appears right under hero) */
  intro?: {
    label?: string;
    heading: string;
    body: string;
  };

  /** Content sections with optional alternating images */
  sections?: ProgramSection[];

  /** Highlight cards / key facts */
  highlights?: { stat: string; label: string }[];

  /** Linked child / related pages */
  relatedLinks?: RelatedLink[];

  /** CTA at bottom */
  cta?: {
    heading: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
  };

  /** Back navigation */
  backHref?: string;
  backLabel?: string;
}

export function ProgramPage({
  heroTitle,
  heroSubtitle,
  heroImage,
  intro,
  sections = [],
  highlights = [],
  relatedLinks = [],
  cta,
  backHref,
  backLabel = "Back",
}: ProgramPageProps) {
  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={heroTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          {backHref && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                {backLabel}
              </Link>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-3">
              {heroTitle}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl text-pretty">
              {heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Intro ── */}
      {intro && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              {intro.label && (
                <p className="text-sm font-semibold text-[#8b1e1e] uppercase tracking-widest mb-4">
                  {intro.label}
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight text-balance">
                {intro.heading}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed text-pretty">
                {intro.body}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Highlights / Stats ── */}
      {highlights.length > 0 && (
        <section className="py-12 bg-[#8b1e1e]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center text-white"
                >
                  <p className="text-3xl md:text-4xl font-bold mb-1">{h.stat}</p>
                  <p className="text-sm text-white/70 uppercase tracking-wide">{h.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Content Sections ── */}
      {sections.length > 0 && (
        <div className="bg-[#f5f5f4]">
          {sections.map((section, i) => {
            const isReverse = section.imagePosition === "right";
            return (
              <section
                key={i}
                className={`py-16 md:py-24 ${i % 2 === 0 ? "bg-[#f5f5f4]" : "bg-white"}`}
              >
                <div className="max-w-7xl mx-auto px-6">
                  <div
                    className={`grid md:grid-cols-2 gap-12 items-center ${
                      isReverse ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Text */}
                    <motion.div
                      initial={{ opacity: 0, x: isReverse ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7 }}
                      className="space-y-5"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight text-balance">
                        {section.title}
                      </h2>
                      <div className="h-1 w-12 bg-[#8b1e1e] rounded-full" />
                      {section.body.map((para, pi) => (
                        <p key={pi} className="text-gray-700 leading-relaxed text-pretty">
                          {para}
                        </p>
                      ))}
                    </motion.div>

                    {/* Image */}
                    {section.image ? (
                      <motion.div
                        initial={{ opacity: 0, x: isReverse ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                        className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl"
                      >
                        <Image
                          src={section.image}
                          alt={section.imageAlt ?? section.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </motion.div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* ── Related Links ── */}
      {relatedLinks.length > 0 && (
        <section className="py-16 md:py-20 bg-[#e3e4e4]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-black mb-10 text-center"
            >
              Explore More
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedLinks.map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between p-6 bg-white rounded-xl border border-gray-200 hover:border-[#8b1e1e] hover:shadow-lg transition-all duration-300"
                  >
                    <span className="font-semibold text-black group-hover:text-[#8b1e1e] transition-colors duration-300">
                      {link.label}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#8b1e1e] group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      {cta && (
        <section className="py-16 md:py-24 bg-neutral-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl mx-auto text-center space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-balance">
                {cta.heading}
              </h2>
              <p className="text-gray-400 leading-relaxed text-pretty">{cta.body}</p>
              <Link
                href={cta.buttonHref}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#8b1e1e] hover:bg-[#631515] text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                {cta.buttonLabel}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
