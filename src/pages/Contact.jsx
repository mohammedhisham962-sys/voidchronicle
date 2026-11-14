import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export const Contact = () => {
  const { addToast } = useShop();

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Order & Allocation Inquiry',
    orderId: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      addToast('Please fill out all required fields', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Your concierge inquiry has been transmitted to our client desk', 'success');
  };

  const faqs = [
    {
      q: "HOW DOES ARCHIVAL ALLOCATION AND LIMITED DROPS WORK?",
      a: "Every piece in the VØID Atelier catalog is produced in a strict run of 150 numbered units worldwide. Once an edition is marked depleted, patterns are locked and archived permanently. We never participate in mass restocks or third-party liquidations."
    },
    {
      q: "ARE IMPORT DUTIES AND LOCAL TAXES FULLY INCLUDED?",
      a: "Yes. All international duties, VAT, and customs clearing fees are 100% prepaid by VØID Atelier at dispatch. You will never receive an unexpected fee from DHL upon delivery."
    },
    {
      q: "WHAT IS YOUR RETURN AND EXCHANGE TIMELINE?",
      a: "We offer a 14-day global return window from the moment your parcel is signed for. Each delivery box includes a pre-printed, pre-paid DHL return label. Items must be unworn with original serial tags and dust bags intact."
    },
    {
      q: "HOW SHOULD I CARE FOR HEAVYWEIGHT 480 GSM COTTON?",
      a: "Because all VØID cottons are pre-shrunk during artisanal enzyme washing, wash cold inside-out on gentle cycle with neutral detergent. Reshape while damp and dry flat in shaded air. Never tumble dry on high heat."
    },
    {
      q: "WHAT FUNCTION DOES THE ENCRYPTED NFC TAG SERVE?",
      a: "Each garment contains a micro-encrypted NFC plaque sewn inside the collar seam. Tap your smartphone to authenticate the garment's unique archival serial number, production timestamp, and verify genuine ownership."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="p-6 sm:p-12 border-b border-white/10 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40 block mb-1">
            CLIENT SERVICES // DIRECT DESK
          </span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-wider font-extrabold">
            Client Concierge
          </h1>
          <p className="font-editorial text-sm sm:text-base text-white/60 max-w-xl mt-2">
            Our atelier advisors are available 24/7 across our Tokyo, New York and Paris desks to assist with sizing specs, orders, or private fitting appointments.
          </p>
        </div>
      </div>

      {/* Main Grid: Form + Contact Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#121212] border border-white/15 p-6 sm:p-10">
            <h2 className="font-display text-xl uppercase tracking-wider mb-2">
              Transmit An Inquiry
            </h2>
            <p className="font-editorial text-xs text-white/50 mb-6">
              Average response time from our Tokyo & New York client teams is under 3 hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-white/5 border border-white/20 space-y-3">
                <CheckCircle className="w-12 h-12 text-white mx-auto" />
                <h3 className="font-display text-lg uppercase tracking-wider">Transmission Received</h3>
                <p className="font-editorial text-xs text-white/60 max-w-md mx-auto">
                  A client advisor has been assigned to your ticket. You will receive an encrypted dispatch response shortly at {contactForm.email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setContactForm({
                      name: '',
                      email: '',
                      subject: 'Order & Allocation Inquiry',
                      orderId: '',
                      message: ''
                    });
                  }}
                  className="mt-4 px-6 py-2.5 bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-wider cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono-tech text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-white/50 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Julian Vance"
                      className="w-full bg-[#181818] border border-white/15 px-3.5 py-2.5 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-white/50 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="julian@domain.com"
                      className="w-full bg-[#181818] border border-white/15 px-3.5 py-2.5 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-white/50 mb-1">Inquiry Nature</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full bg-[#181818] border border-white/15 px-3.5 py-2.5 text-white focus:outline-none focus:border-white cursor-pointer"
                    >
                      <option value="Order & Allocation Inquiry">Order & Allocation Inquiry</option>
                      <option value="Sizing & Fit Consultation">Sizing & Fit Consultation</option>
                      <option value="Press & Archival Loans">Press & Archival Loans</option>
                      <option value="Private Atelier Appointment">Private Atelier Appointment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-white/50 mb-1">Order # (Optional)</label>
                    <input
                      type="text"
                      value={contactForm.orderId}
                      onChange={(e) => setContactForm(prev => ({ ...prev, orderId: e.target.value }))}
                      placeholder="E.g. VD-89241"
                      className="w-full bg-[#181818] border border-white/15 px-3.5 py-2.5 text-white focus:outline-none focus:border-white uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-white/50 mb-1">Inquiry Details *</label>
                  <textarea
                    rows="4"
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Provide details regarding measurements, garment care, or order dispatch..."
                    className="w-full bg-[#181818] border border-white/15 px-3.5 py-2.5 text-white focus:outline-none focus:border-white font-editorial text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-mono-tech text-xs uppercase font-extrabold tracking-widest hover:bg-[#E5E5E0] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <Send className="w-3.5 h-3.5" /> Transmit Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Desks & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border border-white/15 p-6 sm:p-8 bg-[#121212] space-y-6">
              <h3 className="font-display text-base uppercase tracking-wider pb-3 border-b border-white/10">
                Direct Communication Channels
              </h3>

              <div className="space-y-4 font-mono-tech text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-white/70 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase text-white/40 block">CLIENT DESK</span>
                    <a href="mailto:concierge@voidatelier.com" className="text-white hover:underline">
                      concierge@voidatelier.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-white/70 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase text-white/40 block">PRESS & ARCHIVE LOANS</span>
                    <a href="mailto:press@voidatelier.com" className="text-white hover:underline">
                      press@voidatelier.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-white/70 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase text-white/40 block">ACTIVE DESK HOURS</span>
                    <p className="text-white">Tokyo Desk: 09:00 - 21:00 JST</p>
                    <p className="text-white/60">New York Desk: 09:00 - 18:00 EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Policy Box */}
            <div className="border border-white/10 p-6 bg-[#0E0E0E] space-y-2 font-mono-tech text-xs">
              <span className="text-[10px] text-white/40 uppercase block">DIRECT COMMITMENT</span>
              <p className="text-white font-semibold">Priority Concierge Escalation</p>
              <p className="font-editorial text-xs text-white/60">
                All client tickets are reviewed by dedicated fashion atelier specialists, never automated chatbots.
              </p>
            </div>
          </div>

        </div>

        {/* Live FAQ Accordion */}
        <div className="mt-20 pt-12 border-t border-white/10 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <span className="font-mono-tech text-xs uppercase tracking-widest text-white/40">
              FREQUENT INQUIRIES
            </span>
            <h2 className="font-display text-3xl uppercase tracking-wider">
              Atelier Knowledge Base
            </h2>
          </div>

          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left font-display text-sm uppercase tracking-wider hover:text-white/80 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <p className="mt-3 font-editorial text-xs sm:text-sm text-white/60 leading-relaxed animate-in fade-in duration-200">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
