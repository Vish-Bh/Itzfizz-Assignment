"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const statsRef = useRef([])
  const carRef = useRef(null)
  const trailRef = useRef(null)
  const countRefs = useRef([])

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .bg-gray-100.h-\\[200vh\\] { display: none !important; }
      body, html { 
        background-color: #050505 !important; 
        color-scheme: dark; 
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);

    const mm = gsap.matchMedia()

    gsap.from(headlineRef.current.querySelectorAll(".letter"), {
      y: 50,
      opacity: 0,
      rotateX: -90,
      stagger: 0.02,
      duration: 1,
      ease: "expo.out"
    })

    // SCROLL TRIGGER
    mm.add("(min-width: 768px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%", 
          scrub: 1.5, 
          pin: true,
          pinSpacing: true,
        }
      })

      scrollTl.to(carRef.current, { x: "65vw", ease: "none" }, 0)
      scrollTl.fromTo(trailRef.current, { width: "0%" }, { width: "80vw", opacity: 0.8, ease: "none" }, 0)

      statsData.forEach((stat, i) => {
        const targetValue = parseFloat(stat.value);
        const obj = { val: 0 };
        const isDecimal = stat.value.includes('.');

        scrollTl.fromTo(statsRef.current[i], 
          { opacity: 0, y: 20, filter: "blur(8px)", color: "#ffffff" },
          { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)", 
            color: "#2563eb", 
            duration: 0.3 
          }, 
          0.1 + (i * 0.1)
        )

        scrollTl.to(obj, {
          val: targetValue,
          duration: 0.3, 
          ease: "power3.out", 
          onUpdate: () => {
            const displayVal = isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val);
            countRefs.current[i].innerText = displayVal + stat.suffix;
          }
        }, "<")
      })
    })

    return () => {
      mm.revert()
      document.head.removeChild(style);
    }
  }, [])

  const splitText = (text) => text.split("").map((char, i) => (
    <span key={i} className="letter inline-block">
      {char}
    </span>
  ))

  const statsData = [
    { value: "95", suffix: "%", label: "Accuracy" },
    { value: "120", suffix: "+", label: "Projects" },
    { value: "5.0", suffix: "M", label: "Impressions" }
  ]

  return (
    <div className="bg-[#050505] w-full min-h-screen">
      <section
        ref={sectionRef}
        className="relative h-screen bg-[#050505] text-white flex flex-col justify-between py-12 overflow-hidden"
      >
        <div ref={headlineRef} className="relative z-10 text-center mt-[-2vh] px-6 perspective-1000">
          <h1 className="text-6xl md:text-[9rem] font-black italic tracking-tighter uppercase leading-[0.8] overflow-hidden">
            {splitText("Welcome")}<br />
            <span className="text-blue-600 inline-block">{splitText("ITZFIZZ")}</span>
          </h1>
        </div>

        <div className="relative w-full h-32 flex items-center justify-start pointer-events-none my-auto">
          <div ref={trailRef} className="absolute h-[2px] bg-blue-600 shadow-[0_0_20px_#2563eb] z-10" style={{ left: 0, transformOrigin: "left" }} />
          <div ref={carRef} className="relative w-[280px] md:w-[500px] aspect-[2/1] flex items-center z-20">
            <img src="/car.png" alt="Car" className="w-full h-full object-contain" style={{ transform: "scaleX(-1)" }} />
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full border-t border-white/10 pt-10 mb-6 px-6">
          {statsData.map((stat, i) => (
            <div key={i} ref={(el) => (statsRef.current[i] = el)} className="text-center md:text-left opacity-0 transition-colors duration-300">
              <p ref={(el) => (countRefs.current[i] = el)} className="text-4xl md:text-6xl font-black italic tracking-tighter">
                0{stat.suffix}
              </p>
              <p className="text-[10px] tracking-[0.4em] font-bold text-gray-500 uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}