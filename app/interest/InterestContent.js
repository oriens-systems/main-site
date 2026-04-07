"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function InterestContent() {
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    problem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const audienceTypes = [
    {
      id: "student",
      label: "Design Team",
    },
    {
      id: "professor",
      label: "Professor / Researcher",
    },
    {
      id: "shop",
      label: "Machine Shop",
    },
  ];

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedType) {
      setError("Please select your audience type");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type: selectedType,
        }),
      });

      if (!response.ok) {
        let message = "Failed to submit form";
        try {
          const payload = await response.json();
          if (payload?.detail) {
            message = `${payload.error || message} (${payload.detail})`;
          } else if (payload?.error) {
            message = payload.error;
          }
        } catch {
          // Ignore JSON parse failures and use default message.
        }
        throw new Error(message);
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        `${err?.message || "Something went wrong."} Please try again or email us directly at hello@oriens.systems`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[var(--background)]">
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        aria-hidden
      >
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--accent-rgb), 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--accent-rgb), 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0",
          }}
        />
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--accent-rgb), 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--accent-rgb), 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px",
            backgroundPosition: "0 0",
          }}
        />
      </div>

      <Header />

      <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-16">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent)]/8 rounded-full blur-[120px]"
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent-light)]/10 rounded-full blur-[100px]"
          aria-hidden
        />

        <motion.div
          className="relative z-10 max-w-[700px] mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Register Your Interest
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto">
            this isnt a commitment, just a signal that you'd like to follow our progress and be first in line.
            <br/>
            <br/>
            we'll be in touch when we have more information to share.
          </p>
        </motion.div>
      </section>

      <section className="relative py-16">
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Audience Selector */}
              <div className="mb-12">
                <h2 className="text-xl font-semibold text-white mb-6 text-center">
                  I am a...
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {audienceTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleTypeSelect(type.id)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedType === type.id
                          ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)]"
                          : "border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <div className="text-white font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm text-white/70 mb-2">
                      First Name <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm text-white/70 mb-2">
                      Last Name <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-white/70 mb-2">
                    Email <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                    placeholder="john.doe@university.edu"
                  />
                </div>

                <div>
                  <label htmlFor="institution" className="block text-sm text-white/70 mb-2">
                    Institution / Organization <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    required
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                    placeholder="University Name or Company"
                  />
                </div>

                <div>
                  <label htmlFor="problem" className="block text-sm text-white/70 mb-2">
                    What machining problem are you trying to solve?
                  </label>
                  <textarea
                    id="problem"
                    name="problem"
                    rows="4"
                    value={formData.problem}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all resize-none"
                    placeholder="Tell us about your machining challenges, capacity needs, or what you're trying to manufacture..."
                  />
                </div>

                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-button-hover)] disabled:bg-[var(--accent)]/50 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.4)] disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Register Interest"}
                </button>
              </form>

              {/* Credibility Line */}
              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-white/50">
                  Backed by the Chair of Mechanical Engineering, Western University · 100K+ invested in our own machine shop
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mx-auto mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                You're on the list.
              </h2>
              <p className="text-lg text-white/60">
                We'll be in touch.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
