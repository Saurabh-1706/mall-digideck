'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPONSORSHIP_TIERS, CONTACT_INFO } from '../../lib/constants';
import { X, Check } from 'lucide-react';

interface SponsorshipModuleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SponsorshipModule({ isOpen, onClose }: SponsorshipModuleProps) {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm overflow-y-auto"
          data-lenis-prevent="true"
        >
          <div className="min-h-screen px-6 py-20">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="fixed top-6 right-6 p-3 text-white hover:text-accent transition-colors"
              aria-label="Close sponsorship module"
            >
              <X size={32} />
            </button>

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Sponsorship <span className="text-accent">Partnerships</span>
              </h2>
              <p className="text-xl text-text-muted max-w-3xl">
                Elevate your brand through strategic partnerships with West Edmonton Mall
              </p>
            </div>

            {/* Tiers Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {SPONSORSHIP_TIERS.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 border transition-all duration-300 cursor-pointer ${
                    selectedTier === index
                      ? 'border-accent bg-surface scale-105'
                      : 'border-border bg-surface/50 hover:border-accent'
                  }`}
                  onClick={() => setSelectedTier(selectedTier === index ? null : index)}
                >
                  {/* Tier Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.tier}</h3>
                  
                  {/* Price */}
                  <div className="text-3xl font-bold text-accent mb-6">{tier.price}</div>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-8">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span className="text-text-muted text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-3 font-semibold transition-colors ${
                      selectedTier === index
                        ? 'bg-accent text-primary hover:bg-accent-hover'
                        : 'border-2 border-accent text-accent hover:bg-accent hover:text-primary'
                    }`}
                  >
                    Select {tier.tier}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="p-10 bg-surface border border-border">
                <h3 className="text-2xl font-bold text-white mb-4">Custom Partnerships</h3>
                <p className="text-text-muted leading-relaxed mb-6">
                  Don't see the perfect fit? We work with brands to create custom sponsorship 
                  packages tailored to your specific goals, budget, and target audience. Let's 
                  discuss how we can maximize your brand's impact at West Edmonton Mall.
                </p>
                <a
                  href={`mailto:${CONTACT_INFO.sponsorship.email}?subject=Custom Partnership Inquiry`}
                  className="inline-block px-8 py-4 bg-accent text-primary font-semibold hover:bg-accent-hover transition-colors"
                >
                  Request Custom Proposal
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-text-muted mb-6">
                Ready to partner with West Edmonton Mall?
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${CONTACT_INFO.sponsorship.email}`}
                  className="px-8 py-4 bg-accent text-primary font-semibold hover:bg-accent-hover transition-colors"
                >
                  {CONTACT_INFO.sponsorship.email}
                </a>
                <a
                  href={`tel:${CONTACT_INFO.sponsorship.phone}`}
                  className="px-8 py-4 border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.sponsorship.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
