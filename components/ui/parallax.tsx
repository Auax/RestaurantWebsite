'use client';

// A drop‑in parallax section powered by GSAP + ScrollTrigger.
// ----------------------------------------------------------
// Props
// -----
// imageSrc       – path / URL to the hero image (required)
// alt            – alt text for the image
// speed          – parallax intensity (0–1). 0.35 ≈ subtle; 0.7 ≈ dramatic
// coverGap       – *true* (default) automatically scales the image so it never
//                  shows blank space, even in super‑short sections.
// className      – extra classes for the outer container (Tailwind‑ready)
// imgClassName   – extra classes for the <Image>
// overlay        – optional CSS color/gradient string to tint the photo
// children       – foreground React children rendered above the image
//
// Usage
// -----
// <Parallax imageSrc="/restaurant.jpg" alt="Dining room" speed={0.4}
//           overlay="rgba(0,0,0,.35)">
//   <h2 className="text-4xl font-bold text-white text-center">Visit Us</h2>
// </Parallax>
//
// Install dependencies:  npm i gsap
// ----------------------------------------------------------
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Parallax = ({
                      imageSrc,
                      alt = '',
                      speed = 0.35,
                      children,
                      className = '',
                      imgClassName = '',
                      overlay = null,
                      coverGap = true, // prevents blank strips on very short sections
                  }) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // To keep the image covering the container throughout its travel we
            // upscale it. Formula: required scale = 1 + 2 × speed
            const requiredScale = coverGap ? 1 + 2 * speed : 1;

            gsap.set(imageRef.current, {
                yPercent: -speed * 100,
                scale: requiredScale,
            });

            gsap.to(imageRef.current, {
                yPercent: speed * 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',  // when container enters viewport bottom
                    end: 'bottom top',    // when it exits via top
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [speed, coverGap]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
        >
            {/* Optional color / gradient overlay */}
            {overlay && (
                <span
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{ background: overlay, mixBlendMode: 'multiply' }}
                />
            )}

            {/* Background image animated by GSAP */}
            <Image
                ref={imageRef}
                src={imageSrc}
                alt={alt}
                fill
                sizes="100vw"
                // Tailwind utilities + will-change for smoother scrolling
                className={`absolute inset-0 object-cover select-none pointer-events-none will-change-transform ${imgClassName}`}
                priority
            />

            {/* Foreground content */}
            <div className="relative z-20">{children}</div>
        </div>
    );
};

export default Parallax;
