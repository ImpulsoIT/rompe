/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Smartphone, 
  Monitor, 
  Tablet,
  Star,
  ArrowRight,
  Lock,
  Menu,
  X,
  Quote
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

const HOTMART_LINK = "https://pay.hotmart.com/R104750386A?off=7bhbhpbj&hotfeature=51&_hi=eyJzaWQiOiIwNDgwOTJlMDhkZDg0ZTM0YjdiMzk5N2M3ZTNkNDI5ZCJ9.1772747467743&bid=1772747473072";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gold-medium/20 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-serif text-xl text-brand-black hover:text-gold-medium transition-colors"
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-6 w-6 text-gold-medium" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-gray-600 leading-relaxed font-sans text-lg">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTAButton = ({ className = "", variant = "primary" }: { className?: string, variant?: "primary" | "secondary" }) => (
  <a 
    href={HOTMART_LINK}
    className={`
      inline-flex items-center justify-center gap-3 font-bold py-5 px-10 rounded-full shadow-2xl transform transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-sm
      ${variant === "primary" 
        ? "bg-gold-medium text-white hover:bg-gold-dark" 
        : "bg-white text-gold-dark border-2 border-gold-medium hover:bg-gold-light/10"}
      ${className}
    `}
  >
    Comprar Ahora
    <ArrowRight className="h-4 w-4" />
  </a>
);

const SectionTitle = ({ subtitle, title, centered = false }: { subtitle: string, title: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? "text-center" : ""}`}>
    <motion.p 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-gold-medium font-bold uppercase tracking-[0.3em] text-xs mb-4"
    >
      {subtitle}
    </motion.p>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-6xl font-black tracking-tight text-brand-black leading-[1.1]"
    >
      {title}
    </motion.h2>
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="min-h-screen bg-[#fdfcfb] font-sans text-brand-black selection:bg-gold-light/30 overflow-x-hidden">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gold-light/10 py-4 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/input_file_1.png" alt="Logo" className="h-8 w-auto grayscale" />
          <span className="font-serif font-bold text-lg md:text-xl tracking-tighter">Rompe el Silencio</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#beneficios" className="text-sm font-medium hover:text-gold-medium transition-colors">Beneficios</a>
          <a href="#sobre-mi" className="text-sm font-medium hover:text-gold-medium transition-colors">Sobre Mí</a>
          <a href="#garantia" className="text-sm font-medium hover:text-gold-medium transition-colors">Garantía</a>
          <CTAButton className="py-2 px-6 text-xs" />
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gold-dark hover:bg-gold-light/10 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              <a 
                href="#beneficios" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-serif font-bold text-brand-black hover:text-gold-medium"
              >
                Beneficios
              </a>
              <a 
                href="#sobre-mi" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-serif font-bold text-brand-black hover:text-gold-medium"
              >
                Sobre Mí
              </a>
              <a 
                href="#garantia" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-serif font-bold text-brand-black hover:text-gold-medium"
              >
                Garantía
              </a>
              <div className="pt-6 border-t border-gold-light/20">
                <CTAButton className="w-full py-6 text-base" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Editorial Style */}
      <section ref={heroRef} className="relative pt-32 pb-16 md:pt-48 md:pb-40 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-gold-medium font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 md:mb-6">Guía Práctica de Vida</p>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6 md:mb-8 text-brand-black">
                Encuentra tu <br />
                <span className="italic font-serif font-normal text-gold-medium">Propósito</span> <br />
                de Vida.
              </h1>
              <p className="text-lg md:text-2xl text-gray-500 font-light leading-relaxed mb-8 md:mb-12 max-w-xl mx-auto lg:mx-0">
                Despierta el sentido a tu existencia y deja de vivir en piloto automático. Una guía diseñada para reencontrarte.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <CTAButton className="w-full sm:w-auto" />
                <div className="flex flex-col items-center sm:items-start gap-1">
                  <div className="flex items-center gap-2 text-gold-medium font-bold text-sm">
                    <ShieldCheck className="h-4 w-4" />
                    <span>PAGO 100% SEGURO</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-gray-400">Garantía de devolución de 7 días</p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 max-w-sm mx-auto lg:max-w-none"
            >
              <img 
                src="/input_file_2.png" 
                alt="Book Cover" 
                className="w-full h-auto rounded-2xl shadow-[0_30px_60px_-12px_rgba(91,64,24,0.3)] md:shadow-[0_50px_100px_-20px_rgba(91,64,24,0.3)] border border-gold-light/20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white p-4 md:p-8 rounded-2xl shadow-2xl border border-gold-light/10 max-w-[200px] md:max-w-none">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 md:h-4 md:h-4 text-gold-medium fill-gold-medium" />)}
                </div>
                <p className="font-serif italic text-sm md:text-lg text-brand-black leading-tight">"Cambió mi perspectiva por completo."</p>
                <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">— María G.</p>
              </div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] md:w-[120%] md:h-[120%] bg-gold-light/10 rounded-full blur-[60px] md:blur-[100px] -z-10" />
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <div className="bg-brand-black py-8 overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-12 animate-marquee">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex items-center gap-4 text-gold-light/40 font-serif italic text-2xl">
              <span>Rompe el Silencio</span>
              <div className="h-2 w-2 rounded-full bg-gold-medium" />
            </div>
          ))}
        </div>
      </div>

      {/* Why Section - Bento Grid Style */}
      <section id="beneficios" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Transformación" title="¿Por qué este libro es para ti?" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Piloto Automático", desc: "Sientes que los días pasan sin que tú seas realmente el protagonista de tu historia." },
              { title: "Falta de Emoción", desc: "Has perdido la chispa por las cosas que antes te hacían vibrar y sentir vivo." },
              { title: "Comparación Constante", desc: "Sientes que vas tarde en comparación con los demás y te genera ansiedad." },
              { title: "Potencial Oculto", desc: "Sabes que tienes mucho que dar, pero no encuentras el canal adecuado para expresarlo." },
              { title: "Sensación de Vacío", desc: "Aunque todo parezca estar 'bien' por fuera, por dentro sientes que falta algo esencial." },
              { title: "Etapa de Cambio", desc: "Estás en un momento de transición y necesitas claridad para dar el siguiente paso." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-3xl bg-[#fdfcfb] border border-gold-light/10 hover:border-gold-medium/30 transition-all hover:shadow-xl"
              >
                <div className="h-12 w-12 rounded-2xl bg-gold-light/10 flex items-center justify-center mb-6 group-hover:bg-gold-medium group-hover:text-white transition-colors">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <CTAButton />
            <div className="mt-6 flex justify-center items-center gap-6 text-xs text-gray-400 font-bold tracking-widest uppercase">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold-medium" /> PAGO SEGURO</div>
              <div className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-gold-medium" /> 7 DÍAS DE GARANTÍA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive About Section */}
      <section id="sobre-mi" className="py-32 px-6 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-dark/5 -skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="order-2 lg:order-1">
            <p className="text-gold-light font-bold uppercase tracking-[0.4em] text-xs mb-6">La Creadora</p>
            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-tight">
              Rompe el <br />
              <span className="italic font-serif font-normal text-gold-light">Silencio.</span>
            </h2>
            <div className="space-y-8 text-xl text-gray-400 font-light leading-relaxed">
              <p>
                Soy <span className="text-white font-medium">Eliana</span>, alguien que conoce el vacío desde adentro. Ese silencio incómodo que te acompaña al final del día cuando todo "está bien" y aun así algo falta.
              </p>
              <p>
                Mi trabajo es ayudarte a pasar del "¿para qué existo?" al <span className="text-gold-light italic">"sé exactamente por qué me levanto hoy"</span>. Sin tecnicismos, sin promesas vacías.
              </p>
              <Quote className="h-12 w-12 text-gold-medium/30 mb-4" />
              <p className="text-white font-serif italic text-2xl leading-relaxed border-l-4 border-gold-medium pl-8">
                "He acompañado a mujeres a construir una versión de sí mismas que por fin se reconoce en el espejo."
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <img 
                  src="/input_file_1.png" 
                  alt="Eliana" 
                  className="w-full max-w-md rounded-[40px] shadow-2xl border-2 border-gold-light/20 grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -top-10 -right-10 w-40 h-40 border-4 border-gold-medium/20 rounded-full -z-10 animate-spin-slow" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gold-medium/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section - Premium Feel */}
      <section id="garantia" className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gold-light/10 mb-10">
            <RotateCcw className="h-10 w-10 text-gold-medium" />
          </div>
          <h2 className="text-6xl font-black mb-6 tracking-tighter uppercase text-brand-black">Tu satisfacción es mi prioridad</h2>
          <p className="text-2xl text-gray-500 font-light mb-12 leading-relaxed">
            Tienes <span className="text-brand-black font-bold">7 días completos</span> para explorar la guía. Si no sientes que es para ti, te devolvemos el 100% de tu inversión. Sin preguntas, sin complicaciones.
          </p>
          <div className="flex justify-center gap-12 mb-16 opacity-30">
            <div className="flex flex-col items-center gap-2">
              <Smartphone className="h-8 w-8" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Móvil</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Monitor className="h-8 w-8" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Desktop</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Tablet className="h-8 w-8" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Tablet</span>
            </div>
          </div>
          <CTAButton />
          <TrustBadge />
        </div>
      </section>

      {/* Testimonials Section - Editorial Style */}
      <section className="py-32 px-6 bg-[#fdfcfb]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Testimonios" title="Mujeres que ya rompieron el silencio" centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: "Camila R.", 
                location: "Colombia", 
                text: "Sentía que mi vida era una lista de tareas interminable. Esta guía me ayudó a detenerme y entender qué es lo que realmente me hace vibrar.",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200"
              },
              { 
                name: "Valeria M.", 
                location: "México", 
                text: "Estaba aterrada por los cambios en mi carrera, pero las reflexiones de Eliana me dieron la claridad que necesitaba para dar el salto.",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200"
              },
              { 
                name: "Lucía T.", 
                location: "Argentina", 
                text: "Por fin dejé de compararme con los demás. Entendí que mi camino es único y ahora vivo cada día con una intención real.",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200"
              },
              { 
                name: "Beatriz S.", 
                location: "Chile", 
                text: "El vacío que sentía se ha transformado en paz. No es magia, es autoconocimiento puro. Gracias por este regalo.",
                img: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=200&h=200"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[32px] shadow-xl border border-gold-light/10 flex flex-col items-center text-center"
              >
                <img 
                  src={t.img} 
                  alt={t.name} 
                  className="w-20 h-20 rounded-full mb-6 border-2 border-gold-medium p-1 object-cover"
                  referrerPolicy="no-referrer"
                />
                <Quote className="h-6 w-6 text-gold-medium/20 mb-4" />
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{t.text}"</p>
                <p className="font-serif font-bold text-brand-black">{t.name}</p>
                <p className="text-[10px] text-gold-medium uppercase tracking-widest font-bold mt-1">{t.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Luxury Dark Mode */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#b68633_0%,transparent_50%)]" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-gold-light font-bold uppercase tracking-[0.5em] text-xs mb-8">Inversión en ti mismo</p>
          <div className="mb-16">
            <p className="text-gray-500 line-through text-2xl mb-2">USD 27</p>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-serif italic text-gold-light mb-4">Por solo</span>
              <div className="text-8xl md:text-9xl font-black text-white tracking-tighter mb-4">
                <span className="text-4xl align-top mt-8 inline-block">USD</span> 11
              </div>
              <p className="text-gold-medium font-bold text-xl uppercase tracking-widest">Pago Único</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[40px] border border-white/10 mb-12">
            <h3 className="text-2xl font-serif italic mb-6">Disponible en tu moneda local</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {["Peso Argentino", "Peso Colombiano", "Peso Chileno", "Reales", "Peso Mexicano"].map((currency, i) => (
                <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase text-gold-light border border-white/5">
                  {currency}
                </span>
              ))}
            </div>
            <CTAButton className="w-full" />
          </div>
          <div className="flex items-center justify-center gap-3 text-gold-light/60 font-bold text-sm uppercase tracking-widest">
            <Lock className="h-4 w-4" />
            <span>Acceso inmediato tras el pago</span>
          </div>
        </div>
      </section>

      {/* FAQ - Clean & Elegant */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionTitle subtitle="Dudas" title="Preguntas Frecuentes" centered />
          <div className="mt-12">
            <FAQItem 
              question="¿Para quién es este producto?" 
              answer="Este ebook es para cualquier persona que sienta que su vida ha perdido el rumbo, que vive en piloto automático o que simplemente quiere profundizar en su autoconocimiento para vivir con más intención."
            />
            <FAQItem 
              question="¿En que te ayudara este libro?" 
              answer="Te proporcionará herramientas prácticas y reflexiones profundas para identificar qué es lo que realmente te importa, cómo superar el vacío existencial y cómo empezar a tomar decisiones alineadas con tu propósito."
            />
            <FAQItem 
              question="¿Cómo funciona el 'Plazo de Garantía'?" 
              answer="Tienes 7 días completos para revisar el material. Si por cualquier motivo sientes que no es para ti, puedes solicitar el reembolso total de tu dinero sin dar explicaciones."
            />
            <FAQItem 
              question="¿Cómo acceder al producto?" 
              answer="Inmediatamente después de que se confirme tu pago, recibirás un correo electrónico con los datos de acceso a la plataforma donde podrás descargar tu guía."
            />
            <FAQItem 
              question="¿Cómo hago para comprar?" 
              answer="Haz clic en cualquiera de los botones de 'Comprar Ahora', serás redirigido a la página de pago seguro de Hotmart, elige tu método de pago preferido y ¡listo!"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-gold-medium text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-10 leading-tight">¿Estás listo para romper el silencio?</h2>
          <p className="text-2xl mb-12 font-light opacity-90">No dejes para mañana la vida que puedes empezar a vivir hoy.</p>
          <CTAButton variant="secondary" className="bg-white text-gold-dark border-none hover:bg-gray-100" />
        </div>
      </section>

      {/* Footer - Minimalist */}
      <footer className="bg-white py-20 px-6 border-t border-gold-light/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <img src="/input_file_1.png" alt="Logo" className="h-10 grayscale" />
            <span className="font-serif font-bold text-2xl">Rompe el Silencio</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm mb-2">Copyright Rompe el silencio© Todos los derechos reservados.</p>
            <div className="flex justify-center md:justify-end gap-6 text-xs font-bold uppercase tracking-widest text-gold-medium">
              <a href="#" className="hover:text-gold-dark transition-colors">Privacidad</a>
              <a href="#" className="hover:text-gold-dark transition-colors">Términos</a>
              <a href="#" className="hover:text-gold-dark transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Trust Indicator (Mobile) */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <motion.a
          href={HOTMART_LINK}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="h-16 w-16 bg-gold-medium text-white rounded-full shadow-2xl flex items-center justify-center"
        >
          <ArrowRight className="h-8 w-8" />
        </motion.a>
      </div>
    </div>
  );
}

const TrustBadge = () => (
  <div className="flex flex-col items-center gap-1 text-[10px] text-gray-400 mt-6 font-bold tracking-widest uppercase">
    <div className="flex items-center gap-2">
      <ShieldCheck className="h-3 w-3 text-gold-medium" />
      <span>Pago 100% Seguro</span>
    </div>
    <div className="flex items-center gap-2">
      <RotateCcw className="h-3 w-3 text-gold-medium" />
      <span>Garantía de 7 días</span>
    </div>
  </div>
);
