"use client";

import Image from "next/image";
import {useEffect} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {ChefHat, HeartHandshake, Wheat, Heart} from "lucide-react";

export default function AboutUsPage() {
    useEffect(() => {
        // Ensure we're in the browser
        if (typeof window === "undefined") return;

        // Register ScrollTrigger once the component mounts
        gsap.registerPlugin(ScrollTrigger);

        // Fade‑in & slide‑up every section with the helper class
        gsap.utils.toArray<HTMLElement>(".gsap-section").forEach((section) => {
            gsap.fromTo(
                section,
                {opacity: 0, y: 60},
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%", // when section enters 80% from top
                        end: "top 60%",
                        toggleActions: "play none none reverse", // play on enter, reverse on leave
                    },
                },
            );
        });

        // Little bounce for the top icon on page load
        gsap.from(".hero-icon", {
            scale: 0,
            duration: 1,
            ease: "elastic.out(1, 0.4)",
        });

        // Cleanup on unmount
        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div className="py-12 md:py-20 bg-stone-50">
            <div className="container mx-auto max-w-7xl px-12 sm:px-12 lg:px-8">
                {/* Hero */}
                <header className="text-center mb-12 md:mb-16 gsap-section">
                    <HeartHandshake className="hero-icon h-12 w-12 mx-auto mb-4 text-red-400"/>
                    <h1 className="text-4xl sm:text-5xl font-bold text-stone-800">Nuestra Historia</h1>
                    <p className="mt-4 text-lg text-stone-700 max-w-2xl mx-auto">
                        Pasión por la cocina italiana, tradición familiar y amor por los ingredientes frescos.
                    </p>
                </header>

                {/* Sección 1 */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16 gsap-section">
                    <div>
                        <Image
                            src="/kitchen.jpg"
                            alt="Familia italiana cocinando junta en una cocina rústica"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-xl object-cover w-full"
                        />
                    </div>
                    <div className="text-stone-700 space-y-4 text-justify">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-stone-800">Desde Italia con Amor</h2>
                        <p className="text-sm sm:text-md text-stone-600">
                            Dolce Vita Ristorante nació del sueño de la Nonna Isabella, quien trajo consigo desde su
                            pequeño pueblo en
                            la Toscana las recetas que han pasado de generación en generación. Su amor por la cocina y
                            el deseo de
                            compartir los auténticos sabores de Italia son el corazón de nuestro restaurante.
                        </p>
                        <p className="text-sm sm:text-md text-stone-600">
                            Inaugurado en 2005, hemos crecido manteniendo siempre la esencia de la hospitalidad italiana
                            y el
                            compromiso con la calidad. Cada plato es un homenaje a nuestras raíces y una invitación a
                            disfrutar de la
                            buena mesa.
                        </p>
                    </div>
                </div>

                {/* Sección 2 */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16 gsap-section">
                    <div className="md:order-2">
                        <Image
                            src="/ingredients.jpg"
                            alt="Ingredientes frescos italianos como tomates, albahaca y aceite de oliva"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-xl object-cover w-full"
                        />
                    </div>
                    <div className="text-stone-700 space-y-4 md:order-1 text-justify">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-stone-800">Filosofía y Calidad</h2>
                        <p className="text-sm sm:text-md text-stone-600">
                            Creemos firmemente que la base de una gran comida reside en la calidad de sus ingredientes.
                            Por ello,
                            seleccionamos cuidadosamente productos frescos, locales y de temporada, así como auténticos
                            ingredientes
                            italianos importados directamente.
                        </p>
                        <p className="text-sm sm:text-md text-stone-600">
                            Nuestra cocina es un reflejo de la diversidad regional de Italia, ofreciendo desde los
                            robustos sabores
                            del norte hasta las soleadas delicias del sur. Todo preparado con técnicas tradicionales y
                            un toque de
                            creatividad de nuestro chef.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto max-w-7xl mb-0 px-0 sm:px-12 lg:px-8">
                {/* Chef */}
                <section className="bg-stone-900 sm:rounded-lg gsap-section">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-16 py-12 px-12 align-middle">
                        <div className="w-full justify-end flex gap-4">
                            <Image
                                src="/chef-wide.jpg"
                                alt="Retrato del Chef"
                                width={150}
                                height={150}
                                className="rounded shadow-md w-full h-full object-cover object-top"
                            />
                        </div>
                        <div className="content-center">

                            <h2 className="text-3xl font-semibold text-white mb-4">Chef Luigi Rossi</h2>
                            <p className="max-w-xl mx-auto mt-2 text-sm sm:text-md text-neutral-400">
                                Con más de 20 años de experiencia en cocinas de Italia y alrededor del mundo, el Chef
                                Luigi aporta su
                                pasión y maestría a cada plato, asegurando una experiencia culinaria auténtica y
                                memorable.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
