"use client";

import {useEffect, useRef} from "react";
import {gsap} from "gsap";
// Import necessary GSAP types
import type {ScrollTrigger as ScrollTriggerType} from "gsap/ScrollTrigger";
import {ScrollTrigger} from "gsap/ScrollTrigger";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {MapPin} from "lucide-react";
import Parallax from "@/components/ui/parallax";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
    const heroContentRef = useRef<HTMLDivElement>(null);
    const heroButtonsContainerRef = useRef<HTMLDivElement>(null);
    const aboutSectionRef = useRef<HTMLElement>(null);
    const dishesSectionRef = useRef<HTMLElement>(null);
    const ctaSectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const animations: ScrollTriggerType[] = [];

        // --- Hero Section Animation (on load) ---
        if (heroContentRef.current && heroButtonsContainerRef.current) {
            const heroTl = gsap.timeline({defaults: {ease: "power3.out"}});

            const heroTitle = heroContentRef.current.querySelector("h1");
            const heroParagraph = heroContentRef.current.querySelector("p.italic");
            const heroButtons = gsap.utils.toArray<HTMLElement>(heroButtonsContainerRef.current.children);

            if (heroTitle) {
                heroTl.fromTo(heroTitle,
                    {opacity: 0, y: 50}, // From state
                    {opacity: 1, y: 0, duration: 1} // To state & other tween properties
                );
            }

            if (heroParagraph) {
                heroTl.fromTo(heroParagraph,
                    {opacity: 0, y: 30}, // From state
                    {opacity: 1, y: 0, duration: 1}, // To state & other tween properties
                    "-=0.7"
                );
            }

            if (heroButtons.length > 0) {
                heroTl.fromTo(heroButtons,
                    {opacity: 0, y: 20}, // From state
                    {opacity: 1, y: 0, duration: 0.8, stagger: 0.2}, // To state & other tween properties
                    "-=0.7"
                );
            }
        }

        // --- About Us Section Animation (on scroll) ---
        if (aboutSectionRef.current) {
            const aboutElements = aboutSectionRef.current;
            const aboutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: aboutElements,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    // Add markers for debugging if needed
                    // markers: true,
                },
            });

            const aboutTitle = aboutElements.querySelector("h2");
            const aboutParagraph = aboutElements.querySelector("p");
            const aboutLink = aboutElements.querySelector("a");

            if (aboutTitle) aboutTl.fromTo(aboutTitle, {opacity: 0, y: 50}, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            });
            if (aboutParagraph) aboutTl.fromTo(aboutParagraph, {opacity: 0, y: 30}, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.5");
            if (aboutLink) aboutTl.fromTo(aboutLink, {opacity: 0, y: 20}, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.5");


            if (aboutTl.scrollTrigger) {
                // If the ScrollTrigger has already passed its 'start' point when the page loads/returns,
                // it will immediately fire the 'play' action. Using fromTo ensures
                // the element is set to the 'from' state *before* the animation starts.
                // To further ensure elements are hidden *before* the animation on first load/back navigation,
                // you could initially set their visibility with CSS or gsap.set *before* creating the timeline.
                // However, fromTo usually handles this correctly with ScrollTrigger.
                animations.push(aboutTl.scrollTrigger as ScrollTriggerType);
            }
        }

        // --- Featured Dishes Section Animation (on scroll) ---
        if (dishesSectionRef.current) {
            const dishesElements = dishesSectionRef.current;
            const dishesTitle = dishesElements.querySelector("h2");
            const dishCards = gsap.utils.toArray<HTMLElement>(dishesElements.querySelectorAll(".dish-card"));

            const dishesTl = gsap.timeline({
                scrollTrigger: {
                    trigger: dishesElements,
                    start: "top 75%",
                    toggleActions: "play none none none",
                    // markers: true,
                }
            });

            if (dishesTitle) {
                dishesTl.fromTo(dishesTitle, {opacity: 0, y: 50}, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
            if (dishCards.length > 0) {
                dishesTl.fromTo(dishCards,
                    {opacity: 0, y: 50}, // From state
                    {opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out"}, // To state & other tween properties
                    "-=0.4"
                );
            }

            if (dishesTl.scrollTrigger) {
                animations.push(dishesTl.scrollTrigger as ScrollTriggerType);
            }
        }

        // --- Call to Action Section Animation (on scroll) ---
        if (ctaSectionRef.current) {
            const ctaElements = ctaSectionRef.current;
            const ctaTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ctaElements,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    // markers: true,
                },
            });

            const ctaIcon = ctaElements.querySelector(".lucide-map-pin"); // Could be SVGElement
            const ctaTitle = ctaElements.querySelector("h2");
            const ctaParagraphs = gsap.utils.toArray<HTMLParagraphElement>(ctaElements.querySelectorAll("p"));
            const ctaLink = ctaElements.querySelector("a");

            if (ctaIcon) ctaTl.fromTo(ctaIcon, { // Targets the MapPin icon
                opacity: 0, scale: 0.5
            }, {
                opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" // A bouncy effect for the icon
            });

            if (ctaTitle) ctaTl.fromTo(ctaTitle, {opacity: 0, y: 30}, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.5");

            if (ctaParagraphs.length > 0) ctaTl.fromTo(ctaParagraphs, {
                opacity: 0, y: 20
            }, {
                opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out"
            }, "-=0.5");

            if (ctaLink) ctaTl.fromTo(ctaLink, {opacity: 0, y: 20}, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4");


            if (ctaTl.scrollTrigger) {
                animations.push(ctaTl.scrollTrigger as ScrollTriggerType);
            }
        }

        // Cleanup function
        return () => {
            animations.forEach((st: ScrollTriggerType) => st && st.kill());

            // Killing tweens directly on elements as a failsafe
            if (heroContentRef.current) {
                gsap.killTweensOf(heroContentRef.current.querySelector("h1"));
                gsap.killTweensOf(heroContentRef.current.querySelector("p.italic"));
            }
            if (heroButtonsContainerRef.current) {
                // Kill tweens on individual children obtained by toArray previously
                const heroButtons = gsap.utils.toArray<HTMLElement>(heroButtonsContainerRef.current.children);
                gsap.killTweensOf(heroButtons);
            }
            if (aboutSectionRef.current) {
                gsap.killTweensOf(aboutSectionRef.current.querySelectorAll("h2, p, a"));
            }
            if (dishesSectionRef.current) {
                gsap.killTweensOf(dishesSectionRef.current.querySelector("h2"));
                gsap.killTweensOf(dishesSectionRef.current.querySelectorAll(".dish-card"));
            }
            if (ctaSectionRef.current) {
                gsap.killTweensOf(ctaSectionRef.current.querySelectorAll(".lucide-map-pin, h2, p, a"));
            }
        };
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section>
                <Parallax
                    imageSrc="/hero.jpg"
                    alt="Pizza hero image"
                    speed={0.45}
                    overlay="rgba(0,0,0,.4)"
                    coverGap={false}
                    className="w-full h-screen min-h-[500px] sm:min-h-[600px] relative text-center text-white overflow-hidden items-center justify-center flex"
                >
                    <div ref={heroContentRef} className="relative z-10 p-4 sm:p-6">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                            Dolce Vita Ristorante
                        </h1>
                        <p className="mt-4 sm:text-xl md:text-lg text-white/80 max-w-2xl mx-auto italic tracking-tight">
                            Vive una verdadera experiencia italiana con nuestros platos tradicionales preparados con los
                            ingredientes más frescos.
                        </p>
                        <div ref={heroButtonsContainerRef}
                             className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg"
                                    className="bg-red-400 hover:bg-red-500 text-white text-md px-8 py-6">
                                <Link href="/menu">Ver Menú</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white hover:text-red-400 text-md px-8 py-6"
                            >
                                <Link href="/contacto#reservas">Reservar Mesa</Link>
                            </Button>
                        </div>
                    </div>
                </Parallax>
                {/* Scroll down label */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
                     onClick={() => {
                         if (aboutSectionRef.current) {
                             aboutSectionRef.current.scrollIntoView({behavior: "smooth"});
                         }
                     }}>
                    <p className="text-sm">Descubre más</p>
                    <svg
                        className="w-6 h-6 mt-2 animate-bounce mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-4-4m4 4l4-4"/>
                    </svg>
                </div>
            </section>

            {/* About Us Snippet */}
            <section ref={aboutSectionRef} className="py-16 md:py-24 bg-stone-100 overflow-hidden">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-6">Dolce Vita Ristorante</h2>
                    <p className="text-md sm:text-lg text-stone-700 max-w-3xl mb-8 mx-auto">
                        En Dolce Vita Ristorante, cada plato cuenta una historia de tradición, pasión y los
                        ingredientes
                        más
                        frescos. Nuestro objetivo es transportarte a Italia con cada bocado.
                    </p>
                    <Button asChild variant="link" className="text-red-400 hover:text-red-500 text-lg">
                        <Link href="/sobre-nosotros">Conoce Nuestra Historia →</Link>
                    </Button>
                </div>
            </section>


            {/* Featured Dishes Section */}
            <section ref={dishesSectionRef} className="py-16 md:py-32 overflow-hidden bg-white">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 text-center mb-12">Nuestras
                        Especialidades</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Pasta Carbonara Clásica",
                                description: "Auténtica Carbonara con guanciale, huevo, Pecorino Romano y pimienta negra.",
                                imgSrc: "/pasta-carbonara.jpg",
                                price: "€14.50",
                            },
                            {
                                title: "Pizza Margherita",
                                description:
                                    "Tomate San Marzano, mozzarella de búfala, albahaca fresca y aceite de oliva virgen extra.",
                                imgSrc: "/pizza.jpg",
                                price: "€12.00",
                            },
                            {
                                title: "Tiramisú Casero",
                                description: "El postre italiano por excelencia, suave y cremoso, hecho con amor.",
                                imgSrc: "/tiramisu.jpg",
                                price: "€7.50",
                            },
                        ].map((dish) => (
                            <Card
                                key={dish.title}
                                className="dish-card flex flex-col h-full overflow-hidden shadow-lg"
                            >
                                <CardHeader className="p-0">
                                    <Image
                                        src={dish.imgSrc || "/placeholder.svg"}
                                        alt={dish.title}
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover"
                                    />
                                </CardHeader>
                                <CardContent className="p-6 flex-grow">
                                    <CardTitle className="text-2xl font-bold text-stone-800 mb-2">
                                        {dish.title}
                                    </CardTitle>
                                    <CardDescription className="text-stone-600 mb-3 italic text-sm">
                                        {dish.description}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 mt-auto justify-between flex">
                                    {/*<Button asChild className=" bg-red-400 hover:bg-red-500 text-white">*/}
                                    {/*    <Link href="/menu">Ver en Menú</Link>*/}
                                    {/*</Button>*/}
                                    <p className="text-md font-bold text-red-400">{dish.price}</p>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="flex mx-auto mt-8 items-center gap-4">
                        <hr className="w-full bg-red-200 border-red-200 hidden sm:block"/>
                        <Button asChild className="bg-red-400 hover:bg-red-500 text-white w-full sm:w-auto">
                            <Link href="/menu">Menú completo </Link>
                        </Button>
                        <hr className="w-full bg-red-200 border-red-200 hidden sm:block"/>
                    </div>
                </div>
            </section>

            <Parallax
                imageSrc="/restaurant.jpg"
                alt="Restaurante por fuera"
                speed={0.45}
                overlay="rgba(0,0,0,.8)"
                className="py-16 md:py-24"
            >
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-red-400 lucide-map-pin animate-pulse"/>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Visítanos</h2>
                    <p className="text-md sm:text-lg mb-2 italic">Carrer de Montcada 42, 08003 Barcelona, España</p>
                    <p className="text-md sm:text-lg mb-8">Lunes a Domingo: 12:00 PM - 11:00 PM</p>
                    <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-black text-sm sm:text-md px-8 py-6"
                    >
                        <Link href="/contacto">Cómo Llegar</Link>
                    </Button>
                </div>
            </Parallax>

        </>
    );
}