'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEASING_PATHS, CONTACT_INFO } from '../../lib/constants';
import { ChevronDown, X } from 'lucide-react';

interface LeasingModuleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeasingModule({ isOpen, onClose }: LeasingModuleProps) {
  const [selectedPath, setSelectedPath] = useState<number | null>(null);

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
              aria-label="Close leasing module"
            >
              <X size={32} />
            </button>

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Leasing <span className="text-accent">Opportunities</span>
              </h2>
              <p className="text-xl text-text-muted max-w-3xl">
                Find the perfect space for your brand at West Edmonton Mall
              </p>
            </div>

            {/* Leasing Paths */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {LEASING_PATHS.map((path, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 border cursor-pointer transition-all duration-300 ${
                    selectedPath === index
                      ? 'border-accent bg-surface'
                      : 'border-border bg-surface/50 hover:border-accent'
                  }`}
                  onClick={() => setSelectedPath(selectedPath === index ? null : index)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">{path.category}</h3>
                    <ChevronDown
                      className={`text-accent transition-transform duration-300 ${
                        selectedPath === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  <p className="text-text-muted mb-6">{path.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Average Space:</span>
                      <span className="text-white font-semibold">{path.avgSpace}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Foot Traffic:</span>
                      <span className="text-accent font-semibold">{path.footTraffic}</span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedPath === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-6 border-t border-border"
                      >
                        <p className="text-text-muted mb-4">
                          <span className="text-white font-semibold">Ideal for:</span> {path.idealFor}
                        </p>
                        <a
                          href={`mailto:${CONTACT_INFO.leasing.email}?subject=Leasing Inquiry - ${path.category}`}
                          className="inline-block px-6 py-3 bg-accent text-primary font-semibold hover:bg-accent-hover transition-colors"
                        >
                          Inquire About {path.category}
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-text-muted mb-6">
                Need more information? Our leasing team is here to help.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${CONTACT_INFO.leasing.email}`}
                  className="px-8 py-4 bg-accent text-primary font-semibold hover:bg-accent-hover transition-colors"
                >
                  Email: {CONTACT_INFO.leasing.email}
                </a>
                <a
                  href={`tel:${CONTACT_INFO.leasing.phone}`}
                  className="px-8 py-4 border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-primary transition-colors"
                >
                  Call: {CONTACT_INFO.leasing.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
