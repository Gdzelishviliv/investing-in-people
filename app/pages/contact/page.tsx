"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            content: "info@i-p-c.org",
            link: "mailto:info@i-p-c.org",
        },
        {
            icon: Phone,
            title: "Phone",
            content: "+44 (0) 1642 123456",
            link: "tel:+441642123456",
        },
        {
            icon: MapPin,
            title: "Address",
            content: "Teesside & Tyneside, North East England",
            link: null,
        },
        {
            icon: Clock,
            title: "Office Hours",
            content: "Monday - Friday: 9:00 AM - 5:00 PM",
            link: null,
        },
    ];

    return (
        <div className="w-full">
            <section className="relative py-20 sm:py-28 lg:py-36 bg-linear-to-br from-[#8b1e1e] to-[#631515] text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-white/90">
                            Get in touch with our team
                        </p>
                    </motion.div>
                </div>
            </section>
            <section className="py-16 sm:py-20 lg:py-24 bg-[#f5f7fa]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8b1e1e] text-white mb-4">
                                    <info.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-[#1a1a1a]">{info.title}</h3>
                                {info.link ? (
                                    <a
                                        href={info.link}
                                        className="text-[#6b7280] hover:text-[#8b1e1e] transition-colors duration-300"
                                    >
                                        {info.content}
                                    </a>
                                ) : (
                                    <p className="text-[#6b7280]">{info.content}</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12">
                            <h2 className="text-3xl font-bold mb-8 text-center text-[#1a1a1a]">
                                Send us a Message
                            </h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#8b1e1e] transition-all duration-300"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#8b1e1e] transition-all duration-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#8b1e1e] transition-all duration-300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#8b1e1e] transition-all duration-300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#8b1e1e] transition-all duration-300 resize-none"
                                        required
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-8 py-4 bg-[#8b1e1e] hover:bg-[#631515] text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Send Message
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
