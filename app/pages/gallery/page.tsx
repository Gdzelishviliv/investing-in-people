"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const images = [
        {
            src: "https://i-p-c.org/wp-content/uploads/2022/03/footy-pic-4_ipc-scaled.jpeg",
            alt: "Community Football Event",
            title: "Football Together",
        },
        {
            src: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg",
            alt: "Community Gathering",
            title: "Building Connections",
        },
        {
            src: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg",
            alt: "Cultural Event",
            title: "Celebrating Culture",
        },
    ];

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative py-20 sm:py-28 lg:py-36 bg-linear-to-br from-[#8b1e1e] to-[#631515] text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Gallery</h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-white/90">
                            Moments from our community programs and events
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16 sm:py-20 lg:py-24 bg-[#f5f7fa]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setSelectedImage(index)}
                                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 group"
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover filter grayscale-0 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-white font-bold text-xl">{image.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        className="relative max-w-6xl w-full aspect-video"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[selectedImage].src}
                            alt={images[selectedImage].alt}
                            fill
                            sizes="100vw"
                            className="object-contain"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
                        >
                            ✕
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
