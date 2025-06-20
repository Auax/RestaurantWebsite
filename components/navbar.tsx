"use client"

import Link from "next/link"
import {usePathname} from "next/navigation" // Import usePathname
import {Button} from "@/components/ui/button"
import Image from "next/image";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import {Menu} from "lucide-react"
import {useEffect, useRef, useState} from "react"

// Import GSAP and register ScrollTrigger
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
    {href: "/", label: "Inicio"},
    {href: "/menu", label: "Menú"},
    {href: "/sobre-nosotros", label: "Sobre Nosotros"},
    {href: "/contacto", label: "Reserva"},
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const headerRef = useRef(null) // Ref for the header element
    const pathname = usePathname() // Get the current pathname
    const isHomePage = pathname === "/";

    useEffect(() => {
        if (!headerRef.current) return;

        // Define colors/styles for consistency and easier modification
        const initialHomePageBg = "transparent"; // Transparent
        const scrolledAndOtherPagesBg = "rgba(255, 255, 255, 0.8)"; // White 80% opacity

        const noBlur = "blur(0px)";
        const blurred = "blur(8px)";

        const initialHomePageBorder = "rgba(0, 0, 0, 0)"; // Transparent border
        const scrolledAndOtherPagesBorder = "rgba(214, 211, 209, 1)"; // stone-200

        const initialHomePageTextColor = "#fff"; // White text for homepage transparent state
        const otherPagesTextColor = "#232323"; // Dark text for white background

        // --- Initial GSAP setup (runs on mount and path change) ---
        // Kill any existing ScrollTriggers before setting up new ones or initial states
        // This is crucial for cleanup when navigating between pages.
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.timeline().kill(); // Also kill any active timelines

        if (isHomePage) {
            // Set initial state for homepage (transparent, white text)
            gsap.set(headerRef.current, {
                backgroundColor: initialHomePageBg,
                backdropFilter: noBlur,
                position: "fixed",
                borderBottomColor: initialHomePageBorder
            });
            gsap.set(".links-nav-container, .logo-text", { // Apply to both links and brand text
                color: initialHomePageTextColor
            });

            // --- Setup ScrollTrigger animation only for homepage ---
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: "top -1px", // Trigger when scrolled 1px down
                    toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
                    // markers: true, // Uncomment for debugging
                }
            });

            // Animate header background, blur, and border
            tl.to(headerRef.current, {
                backgroundColor: scrolledAndOtherPagesBg,
                backdropFilter: blurred,
                borderBottomColor: scrolledAndOtherPagesBorder,
                duration: 0.3,
                ease: "power1.out"
            });

            // Animate text color (overlapping with header animation)
            tl.to(".links-nav-container, .logo-text", {
                color: otherPagesTextColor,
                duration: 0.1,
                ease: "power1.out"
            }, "<"); // Start at the same time as the previous animation

            // Cleanup function specifically for the homepage ScrollTrigger timeline
            // This will run when the component unmounts or when `pathname` changes to a non-home page
            return () => {
                tl.kill(); // Kill the timeline and its ScrollTrigger
            };

        } else {
            // --- For all other pages (non-homepage) ---
            // Set the navbar to be immediately white with blur and dark text
            gsap.set(headerRef.current, {
                backgroundColor: scrolledAndOtherPagesBg,
                backdropFilter: blurred,
                position: "sticky",
                borderBottomColor: scrolledAndOtherPagesBorder
            });
            gsap.set(".links-nav-container, .logo-text", {
                color: otherPagesTextColor
            });
            // No ScrollTrigger is needed or created for these pages, so no special cleanup for a timeline.
        }

        // General cleanup: Ensure no rogue ScrollTriggers remain from previous renders
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }

    }, [pathname]); // Re-run this effect whenever the pathname changes

    return (
        // Reverted to `sticky` from `fixed` as `fixed` wouldn't allow content to scroll *under* it.
        // Also removed `transition-all` as GSAP handles the animation.
        <header ref={headerRef} className="top-0 z-50 w-full">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <span className="font-bold text-xl logo-text">Dolce Vita Ristorante</span>

                </Link>
                <nav className="links-nav-container hidden md:flex gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            // Added navbar-item-text for GSAP targeting for desktop links
                            className="text-sm font-medium hover:text-red-400 transition-colors navbar-item-text"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            {/* Keep the hamburger menu icon color consistent or adjust based on header state if desired */}
                            <Button variant="outline" size="icon" className="logo-text hover:bg-white/50 hover:border-white/2pnpm i @vercel/analytics0">
                                <Menu className="h-6 w-6"/>
                                <span className="sr-only">Abrir menú de navegación</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
                            <SheetTitle className="sr-only">Menu</SheetTitle>
                            <div className="p-6">
                                <Link href="/" className="flex items-center gap-2 mb-8"
                                      onClick={() => setIsOpen(false)}>
                                    <span className="font-bold text-xl text-stone-800">Dolce Vita Ristorante</span>
                                </Link>
                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            // Mobile sheet links are inside a white background sheet,
                                            // so their color should be consistent (e.g., text-stone-700)
                                            // and not change with the main navbar's scroll animation.
                                            className="text-lg font-medium text-stone-700 hover:text-red-400 transition-colors py-2"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}