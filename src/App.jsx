import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, LazyMotion, domAnimation } from "motion/react";
import * as THREE from "three";
import { MacbookScroll } from "./components/MacbookScroll";
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from "./components/TextRevealCard";
import deloitte from './assets/deloitte.png';
import oai from './assets/oai.png';
import ntu from './assets/ntu.png';
import omni from './assets/omni.png';

// Three.js Animation Component - Mobile responsive with user interaction
const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Responsive shape sizing based on screen size
    const isMobile = window.innerWidth < 768;
    const shapeScale = isMobile ? 0.6 : 1;
    
    // Create geometric shapes with responsive sizing
    const geometries = [
      new THREE.SphereGeometry(0.6 * shapeScale, 16, 16),
      new THREE.BoxGeometry(0.8 * shapeScale, 0.8 * shapeScale, 0.8 * shapeScale),
      new THREE.OctahedronGeometry(0.7 * shapeScale),
      new THREE.TetrahedronGeometry(0.8 * shapeScale),
      new THREE.IcosahedronGeometry(0.6 * shapeScale),
      new THREE.DodecahedronGeometry(0.6 * shapeScale),
      new THREE.ConeGeometry(0.5 * shapeScale, 1.2 * shapeScale, 8),
      new THREE.TorusGeometry(0.5 * shapeScale, 0.15 * shapeScale, 8, 24),
      new THREE.CylinderGeometry(0.4 * shapeScale, 0.4 * shapeScale, 1.0 * shapeScale, 8),
      new THREE.RingGeometry(0.4 * shapeScale, 0.8 * shapeScale, 8),
      new THREE.SphereGeometry(0.5 * shapeScale, 12, 12),
      new THREE.BoxGeometry(0.7 * shapeScale, 0.7 * shapeScale, 0.7 * shapeScale),
      new THREE.OctahedronGeometry(0.6 * shapeScale),
      new THREE.TetrahedronGeometry(0.7 * shapeScale),
      new THREE.TorusGeometry(0.4 * shapeScale, 0.12 * shapeScale, 6, 16),
      new THREE.ConeGeometry(0.4 * shapeScale, 1.0 * shapeScale, 6)
    ];
    
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.4 }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.35 }),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.38 }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.36 }),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.33 }),
      new THREE.MeshBasicMaterial({ color: 0xef4444, wireframe: true, transparent: true, opacity: 0.32 }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.37 }),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.34 }),
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.39 }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.31 }),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.36 }),
      new THREE.MeshBasicMaterial({ color: 0xef4444, wireframe: true, transparent: true, opacity: 0.35 }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.33 }),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.38 }),
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.34 }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.37 })
    ];

    const shapes = [];
    
    // Responsive positioning - closer on mobile
    const positionScale = isMobile ? 0.7 : 1;
    const zOffset = isMobile ? -6 : -8;
    
    const positions = [
      // Adjusted positions for mobile responsiveness
      [-8 * positionScale, 4 * positionScale, zOffset], [-9 * positionScale, 2 * positionScale, zOffset - 2], 
      [-7 * positionScale, -1 * positionScale, zOffset - 4], [-10 * positionScale, 0 * positionScale, zOffset - 1], 
      [-8 * positionScale, -3 * positionScale, zOffset - 3], [8 * positionScale, 3 * positionScale, zOffset - 1], 
      [9 * positionScale, 1 * positionScale, zOffset - 3], [7 * positionScale, -2 * positionScale, zOffset], 
      [10 * positionScale, -1 * positionScale, zOffset - 2], [8 * positionScale, 4 * positionScale, zOffset - 4],
      [-6 * positionScale, 5 * positionScale, zOffset], [6 * positionScale, 5 * positionScale, zOffset - 1], 
      [-5 * positionScale, 6 * positionScale, zOffset - 2], [5 * positionScale, 6 * positionScale, zOffset - 3],
      [-6 * positionScale, -4 * positionScale, zOffset - 1], [6 * positionScale, -4 * positionScale, zOffset - 2]
    ];

    for (let i = 0; i < Math.min(geometries.length, positions.length); i++) {
      const shape = new THREE.Mesh(geometries[i], materials[i % materials.length]);
      shape.position.set(...positions[i]);
      // Add random initial rotation
      shape.rotation.x = Math.random() * Math.PI;
      shape.rotation.y = Math.random() * Math.PI;
      shape.rotation.z = Math.random() * Math.PI;
      shapes.push(shape);
      scene.add(shape);
    }

    camera.position.z = isMobile ? 3 : 5;

    // Enhanced mouse/touch interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    const handleMouseMove = (event) => {
      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);
      
      targetMouseX = (clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(clientY / window.innerHeight) * 2 + 1;
    };

    const handleClick = (event) => {
      // Create ripple effect on click/touch
      shapes.forEach((shape, index) => {
        const delay = index * 50;
        setTimeout(() => {
          const originalScale = shape.scale.x;
          shape.scale.setScalar(originalScale * 1.3);
          setTimeout(() => {
            shape.scale.setScalar(originalScale);
          }, 200);
        }, delay);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleClick, { passive: true });

    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth mouse following
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Animate all shapes with varying speeds and enhanced interaction
      shapes.forEach((shape, index) => {
        // Continuous rotation with different speeds
        const baseSpeed = 0.002 + (index * 0.0003);
        shape.rotation.x += baseSpeed;
        shape.rotation.y += baseSpeed * 1.3;
        shape.rotation.z += baseSpeed * 0.9;
        
        // Enhanced floating motion (subtle up/down only)
        const time = Date.now() * 0.0003;
        const floatOffset = Math.sin(time + index * 0.5) * 0.01;
        // Reset to base position and add small float
        const baseY = positions[index][1];
        shape.position.y = baseY + floatOffset;
        
        // Stronger mouse interaction
        const interactionStrength = isMobile ? 0.003 : 0.002;
        shape.rotation.x += mouseY * interactionStrength;
        shape.rotation.y += mouseX * interactionStrength;
        
        // Keep shapes in their original X and Z positions (no drift)
        shape.position.x = positions[index][0];
        shape.position.z = positions[index][2];
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera.position.z = newIsMobile ? 3 : 5;
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

// Auto-sliding Logo Carousel - EXACTLY like Aerospike with proper alignment
const GoogleGeminiEffectWrapper = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLengths = [
    useTransform(scrollYProgress, [0, 0.8], [0, 1]),
    useTransform(scrollYProgress, [0.1, 0.8], [0, 1]),
    useTransform(scrollYProgress, [0.2, 0.8], [0, 1]),
    useTransform(scrollYProgress, [0.3, 0.8], [0, 1]),
    useTransform(scrollYProgress, [0.4, 0.8], [0, 1]),
  ];

  return (
    <div ref={ref} className="relative min-h-[200vh] bg-gradient-to-br from-blue-50 to-purple-50">
      <GoogleGeminiEffect
        pathLengths={pathLengths}
        title="Build with APEX_AI"
        description="Scroll this component and see the neural networks come to life. Experience the power of intelligent automation that adapts and learns in real-time."
        className=""
      />
    </div>
  );
};

const LogoCarousel = () => {
  // Logo data with imported images
  const logos = [
    { name: "DELOITTE", src: deloitte },
    { name: "OMNI OFFSHORE", src: omni },
    { name: "OAI", src: oai },
    { name: "NTU", src: ntu }
  ];
  // Double the logos for true seamless infinite loop
  const infiniteLogos = [...logos, ...logos];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 relative overflow-hidden min-h-[200px] flex items-center">
          {/* Text positioned and centered vertically */}
          <div className="relative z-10 flex-shrink-0 w-1/3">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Why leading companies
              </h3>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                choose APEX_AI
              </h3>
              <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                See all customer stories 
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Auto-sliding carousel container - centered and properly sized */}
          <div className="flex-1 overflow-hidden ml-8">
            <div className="flex animate-scroll items-center h-20" style={{ width: '200%' }}>
              {infiniteLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 flex items-center justify-center h-20 px-6"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-16 max-w-[160px] object-contain transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

// Main App Component
function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* Navigation - Standardized blue color scheme */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">APEX_AI</div>
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Services</a>
            <a href="#clients" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Clients</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Animation - Clean and modern */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        <ThreeScene />
        <motion.div 
          style={{ y: backgroundY }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900"
          >
            AI solutions that scale,
            <span className="block text-blue-600">accelerate, and deliver</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-600 leading-relaxed"
          >
            Enterprise AI consultancy that transforms businesses through intelligent automation, 
            custom LLM solutions, and strategic AI implementation. We build systems that work.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:shadow-lg">
              Start Your AI Transformation
            </button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:shadow-lg">
              Free Consultation
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8"
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-lg text-gray-600">AI projects delivered</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8"
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-lg text-gray-600">Cost reduction average</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8"
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">30</div>
              <div className="text-lg text-gray-600">Days to deployment</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating logo carousel overlay */}
      <div className="relative z-30 -mt-16 -mb-16">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg mx-6 max-w-7xl lg:mx-auto py-8">
          <div className="flex items-center justify-between px-10">
            <div className="text-left flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Why leading companies
              </h3>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                choose APEX_AI
              </h3>
              <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                See all customer stories 
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            <div className="flex-1 overflow-hidden ml-10">
              <div className="flex animate-scroll items-center h-16" style={{ width: '400%' }}>
                {[...Array(4)].map((_, setIndex) => 
                  [deloitte, omni, oai, ntu].map((logo, logoIndex) => (
                    <div
                      key={`${setIndex}-${logoIndex}`}
                      className="flex-shrink-0 w-40 flex items-center justify-center h-16 px-4"
                    >
                      <img
                        src={logo}
                        alt={`Company logo ${logoIndex + 1}`}
                        className="max-h-12 max-w-[120px] object-contain"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-25%);
            }
          }
          
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        `}</style>
      </div>

      {/* AI Impact Text Reveal Section */}
      <section className="py-24 bg-slate-900 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our AI Can Do For You
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Move your cursor across the cards to discover how we'll transform your business
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 justify-items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <TextRevealCard
                text="Time Saved"
                revealText="80% Faster"
                className="w-full max-w-lg"
              >
                <TextRevealCardTitle>Work Smarter, Not Harder</TextRevealCardTitle>
                <TextRevealCardDescription>
                  Cut your manual work by 80%. Our AI handles the boring stuff so you can focus on what matters - growing your business and making strategic decisions.
                </TextRevealCardDescription>
              </TextRevealCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TextRevealCard
                text="Cost Reduction"
                revealText="60% Savings"
                className="w-full max-w-lg"
              >
                <TextRevealCardTitle>More Profit, Less Overhead</TextRevealCardTitle>
                <TextRevealCardDescription>
                  Stop paying for repetitive tasks. Our AI solutions typically save clients 60% on operational costs while boosting productivity and accuracy.
                </TextRevealCardDescription>
              </TextRevealCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TextRevealCard
                text="Revenue Growth"
                revealText="+150%"
                className="w-full max-w-lg"
              >
                <TextRevealCardTitle>Scale Without Limits</TextRevealCardTitle>
                <TextRevealCardDescription>
                  Our clients see an average 150% revenue increase within 12 months. AI-powered insights help you make better decisions and capture opportunities faster.
                </TextRevealCardDescription>
              </TextRevealCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <TextRevealCard
                text="Time to Results"
                revealText="30 Days"
                className="w-full max-w-lg"
              >
                <TextRevealCardTitle>Fast Results, Real Impact</TextRevealCardTitle>
                <TextRevealCardDescription>
                  See measurable improvements in just 30 days. We don't believe in endless consulting - we deliver working AI solutions that start paying for themselves immediately.
                </TextRevealCardDescription>
              </TextRevealCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MacBook Scroll Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white">
        <MacbookScroll
          title={
            <span className="text-gray-900">
              Experience our AI solutions <br /> 
              <span className="text-blue-600">in action</span>
            </span>
          }
          src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&crop=entropy&auto=format&fm=jpg&q=60"
          showGradient={false}
        />
      </section>

      {/* Services Section - Clean Aerospike style */}
      <section className="relative py-24 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What APEX_AI can do for you
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: "🤖", 
                title: "AI & Intelligent Agents", 
                desc: "Advanced AI agents, custom LLMs, MCP (Model Context Protocol) implementations, and intelligent automation systems that understand context and make autonomous decisions."
              },
              { 
                icon: "⚡", 
                title: "Cloud & Automation", 
                desc: "Azure cloud deployments, RPA (Robotic Process Automation), infrastructure automation, and scalable cloud architectures that grow with your business."
              },
              { 
                icon: "🎯", 
                title: "Full-Stack Development", 
                desc: "Complete web development, backend systems, API integrations, and enterprise software solutions built with modern technologies and best practices."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-200">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI AGENTS & LLMs", desc: "Custom AI agents with MCP protocol support, fine-tuned language models, and intelligent automation systems." },
              { title: "AZURE & CLOUD", desc: "Full Azure cloud deployments, infrastructure automation, scalable architectures, and cloud-native solutions." },
              { title: "RPA & AUTOMATION", desc: "Robotic Process Automation, workflow optimization, and intelligent document processing systems." },
              { title: "WEB DEVELOPMENT", desc: "Modern web applications, responsive frontends, progressive web apps, and user experience design." },
              { title: "BACKEND SYSTEMS", desc: "Scalable APIs, microservices architecture, database optimization, and enterprise integrations." },
              { title: "STRATEGY CONSULTING", desc: "Digital transformation roadmaps, technology assessments, and implementation planning for enterprises." }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Team Experience Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built by industry veterans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team brings decades of experience from the world's most innovative tech companies
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-gray-500 hover:text-gray-700 transition-colors"
            >
              PayPal
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl font-bold text-gray-500 hover:text-gray-700 transition-colors"
            >
              SAP
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl font-bold text-gray-500 hover:text-gray-700 transition-colors"
            >
              Dell
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl font-bold text-gray-500 hover:text-gray-700 transition-colors"
            >
              Syntaxe
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl font-bold text-gray-500 hover:text-gray-700 transition-colors"
            >
              Accenture
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Section - Updated blue theme */}
      <section className="relative py-24 bg-blue-600 text-white" id="clients">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20"
          >
            Built for Modern Enterprises
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: "🏭", title: "ENTERPRISES", desc: "SMEs ready to dominate their markets with AI-powered competitive advantages" },
              { icon: "⚡", title: "INNOVATORS", desc: "Entrepreneurs and individuals who refuse to accept outdated workflows" },
              { icon: "🎯", title: "STUDENTS", desc: "IB scholars determined to create projects that stand out from the crowd" }
            ].map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <span className="text-2xl">{client.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{client.title}</h3>
                <p className="text-blue-100 leading-relaxed">{client.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Modern and clean */}
      <section className="relative py-24 bg-white" id="contact">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to build?
            </h2>
            <p className="text-xl text-gray-600">
              Tell us what you need. We'll make it happen.
            </p>
          </motion.div>
          
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert('MESSAGE RECEIVED. WE\'LL CONTACT YOU WITHIN 24 HOURS.');
              e.target.reset();
            }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                required
              />
            </div>
            <select
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              required
            >
              <option value="">Select Project Type</option>
              <option value="automation">AI AUTOMATION</option>
              <option value="chatbot">INTELLIGENT BOTS</option>
              <option value="rag">RAG SYSTEMS</option>
              <option value="student">STUDENT PROJECT</option>
              <option value="software">CUSTOM SOFTWARE</option>
              <option value="strategy">AI STRATEGY</option>
            </select>
            <textarea
              placeholder="Describe your project. Be specific."
              rows="6"
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
              required
            />
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 text-lg font-semibold rounded-lg transition-all duration-200"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer - Clean and minimal */}
      <footer className="bg-gray-900 text-center py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gray-400">
            © 2025 APEX_AI. Building the future, one project at a time.
          </p>
        </div>
      </footer>
    </div>
    </LazyMotion>
  );
}

export default App;
