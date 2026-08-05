"use client";

import React, {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { BookCTA } from "@/components/booking/book-cta";
import { useBooking } from "@/components/booking/booking-provider";
import { BOOKING_PATH } from "@/lib/booking";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const INDUSTRIES = [
  "Technology / SaaS",
  "Healthcare",
  "Finance",
  "E-commerce",
  "Professional services",
  "Other",
] as const;

const PROJECT_TYPES = [
  "Brand Strategy",
  "Performance Marketing",
  "AI Solutions",
  "Product Engineering",
  "Cloud & Infrastructure",
  "Search & Content",
  "Full Growth OS",
  "Other",
] as const;

const BUDGETS = [
  "Under $25k",
  "$25k – $75k",
  "$75k – $150k",
  "$150k – $300k",
  "$300k+",
  "Not sure yet",
] as const;

const TIMELINES = [
  "ASAP",
  "Within 30 days",
  "1 – 3 months",
  "3 – 6 months",
  "Exploring",
] as const;

type FormState = {
  name: string;
  email: string;
  company: string;
  website: string;
  industry: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  company: "",
  website: "",
  industry: "",
  projectType: "",
  budget: "",
  timeline: "",
  details: "",
};

const FIELD =
  "w-full h-14 rounded-[14px] border bg-[rgba(12,21,43,0.55)] px-4 text-[14px] leading-none text-[#F4F7FC] outline-none transition-[border-color,box-shadow,background] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[rgba(168,197,240,0.28)] hover:bg-[rgba(14,22,42,0.75)] focus:border-[rgba(184,164,255,0.5)] focus:bg-[rgba(16,26,50,0.92)] focus:shadow-[0_0_0_3px_rgba(124,92,255,0.14),0_8px_28px_rgba(124,92,255,0.06)]";

const FIELD_ERROR = "border-[rgba(232,120,140,0.45)]";
const FIELD_IDLE = "border-[rgba(168,196,240,0.12)]";

function RequiredDot() {
  return (
    <span
      className="ml-1.5 inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-[#7C5CFF]/75 align-middle"
      aria-hidden
    />
  );
}

type FloatingInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
};

function FloatingInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
  autoComplete,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${FIELD} ${error ? FIELD_ERROR : FIELD_IDLE} ${
          floated ? "pt-5 pb-2" : "pt-0 pb-0"
        }`}
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 flex items-center transition-[top,transform,font-size,letter-spacing,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          floated
            ? "top-2 text-[10px] uppercase tracking-[0.16em] text-[#A8C5F0]"
            : "top-1/2 -translate-y-1/2 text-[14px] tracking-[0.01em] text-[#6B7890]"
        }`}
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        {label}
        {required ? <RequiredDot /> : null}
      </label>
      {error && (
        <p
          id={`${id}-err`}
          className="mt-1.5 text-[12px] leading-snug text-[#E8788C]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

type FloatingSelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  required?: boolean;
  error?: string;
};

function FloatingSelect({
  id,
  label,
  value,
  onChange,
  options,
  required,
  error,
}: FloatingSelectProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const floated = focused || open || value.length > 0;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        onClick={() => setOpen((o) => !o)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${FIELD} ${error ? FIELD_ERROR : FIELD_IDLE} relative flex items-center text-left ${
          floated ? "pt-5 pb-2" : "pt-0 pb-0"
        } ${open ? "border-[rgba(184,164,255,0.5)] shadow-[0_0_0_3px_rgba(124,92,255,0.14)]" : ""}`}
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        <span
          className={`block truncate pr-8 ${
            value ? "text-[#F4F7FC]" : "text-transparent"
          }`}
        >
          {value || label}
        </span>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -mt-[6px] text-[#9AA8C0]"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 4.5L6 8l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 flex items-center transition-[top,transform,font-size,letter-spacing,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          floated
            ? "top-2 text-[10px] uppercase tracking-[0.16em] text-[#A8C5F0]"
            : "top-1/2 -translate-y-1/2 text-[14px] tracking-[0.01em] text-[#6B7890]"
        }`}
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        {label}
        {required ? <RequiredDot /> : null}
      </label>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-labelledby={id}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.28, ease: easeOutExpo }}
            className="absolute left-0 right-0 z-30 mt-2 max-h-56 overflow-y-auto rounded-[14px] border border-[rgba(168,196,240,0.18)] bg-[rgba(10,18,36,0.97)] py-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md"
          >
            {options.map((opt) => {
              const selected = value === opt;
              return (
                <li key={opt} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                    className={`flex w-full px-4 py-2.5 text-left text-[13px] transition-colors duration-200 ${
                      selected
                        ? "bg-[rgba(124,92,255,0.18)] text-[#F4F7FC]"
                        : "text-[#9AA8C0] hover:bg-[rgba(168,197,240,0.08)] hover:text-[#F4F7FC]"
                    }`}
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {opt}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && (
        <p
          id={`${id}-err`}
          className="mt-1.5 text-[12px] leading-snug text-[#E8788C]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

type FloatingTextareaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
};

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  required,
  error,
}: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        rows={6}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className={`w-full min-h-[168px] resize-y rounded-[14px] border bg-[rgba(12,21,43,0.55)] px-4 pb-4 pt-7 text-[14px] leading-[1.65] text-[#F4F7FC] outline-none transition-[border-color,box-shadow,background] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[rgba(168,197,240,0.28)] hover:bg-[rgba(14,22,42,0.75)] focus:border-[rgba(184,164,255,0.5)] focus:bg-[rgba(16,26,50,0.92)] focus:shadow-[0_0_0_3px_rgba(124,92,255,0.14),0_8px_28px_rgba(124,92,255,0.06)] ${
          error ? FIELD_ERROR : FIELD_IDLE
        }`}
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 flex items-center transition-[top,transform,font-size,letter-spacing,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          floated
            ? "top-2.5 text-[10px] uppercase tracking-[0.16em] text-[#A8C5F0]"
            : "top-5 text-[14px] tracking-[0.01em] text-[#6B7890]"
        }`}
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        {label}
        {required ? <RequiredDot /> : null}
      </label>
      {error && (
        <p
          id={`${id}-err`}
          className="mt-1.5 text-[12px] leading-snug text-[#E8788C]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function ContactForm() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const formId = useId();
  const { openBooking } = useBooking();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const set =
    (key: keyof FormState) =>
    (value: string) => {
      setForm((f) => ({ ...f, [key]: value }));
      if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Business email is required.";
    else if (!isEmail(form.email)) next.email = "Enter a valid email.";
    if (!form.company.trim()) next.company = "Company helps us prepare.";
    if (!form.industry) next.industry = "Select an industry.";
    if (!form.projectType) next.projectType = "Select a project type.";
    if (!form.details.trim() || form.details.trim().length < 20)
      next.details = "Share a little more (at least a sentence).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  return (
    <section
      ref={ref}
      id="project"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="contact-form-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.65, ease: easeEditorial }}
              className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Executive brief
            </motion.p>
            <motion.h2
              id="contact-form-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
              className="mt-4 max-w-[14ch] text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              Start your project with clarity.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
              className="mt-5 max-w-[26rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Tell us what you&apos;re building toward. We review every brief
              personally and reply with next steps — usually within one business
              day.
            </motion.p>

            <motion.ol
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
              className="mt-8 space-y-4"
            >
              {[
                "You submit the brief",
                "We review fit and approach",
                "You hear back with a clear next step",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-[14px] text-[#9AA8C0]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[rgba(168,197,240,0.28)] text-[11px] text-[#A8C5F0]">
                    0{i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </motion.ol>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.1)_0%,rgba(168,197,240,0.04)_40%,transparent_68%)]"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.75, delay: 0.1, ease: easeOutExpo }}
              className="relative overflow-hidden rounded-[28px] border border-[rgba(168,196,240,0.14)] bg-[rgba(10,18,36,0.78)] p-6 md:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(55%_80%_at_50%_0%,rgba(124,92,255,0.12),transparent_70%)]"
              />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.55, ease: easeEditorial }}
                    className="relative z-10 flex min-h-[480px] flex-col items-center justify-center px-2 py-12 text-center"
                    role="status"
                  >
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(168,197,240,0.35)] bg-[rgba(124,92,255,0.15)] text-xl text-[#B8A4FF] shadow-[0_0_32px_rgba(124,92,255,0.2)]"
                      aria-hidden
                    >
                      ✓
                    </motion.span>
                    <h3
                      className="mt-7 text-[1.85rem] tracking-[-0.03em] text-[#F4F7FC]"
                      style={{
                        fontFamily:
                          "var(--font-playfair), 'Playfair Display', serif",
                      }}
                    >
                      Project Brief Received
                    </h3>
                    <p
                      className="mt-2 text-[15px] text-[#B8A4FF]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      Thank you.
                    </p>
                    <p
                      className="mt-4 max-w-[24rem] text-[14px] leading-relaxed text-[#9AA8C0]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      Our team will review your brief carefully. You can expect
                      a response shortly
                      {form.email ? ` at ${form.email}` : ""}.
                    </p>
                    <p
                      className="mt-8 text-[12px] uppercase tracking-[0.2em] text-[#6B7890]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      Need to speak sooner?
                    </p>
                    <BookCTA
                      source="contact-form-success"
                      className="group mt-4 inline-flex items-center gap-2 text-[14px] font-medium tracking-[0.02em] text-[#B8A4FF] transition-colors hover:text-[#F4F7FC]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      Book a Strategy Call
                      <span
                        aria-hidden
                        className="transition-transform duration-400 group-hover:translate-x-[3px]"
                      >
                        →
                      </span>
                    </BookCTA>
                    <button
                      type="button"
                      onClick={() => {
                        setForm(INITIAL);
                        setStatus("idle");
                      }}
                      className="mt-10 text-[12px] tracking-[0.04em] text-[#6B7890] transition-colors hover:text-[#A8C5F0]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      Send another brief
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    id={formId}
                    onSubmit={onSubmit}
                    noValidate
                    className="relative z-10"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="mb-7 border-b border-[rgba(168,196,240,0.1)] pb-6">
                      <h3
                        className="text-[1.35rem] tracking-[-0.025em] text-[#F4F7FC]"
                        style={{
                          fontFamily:
                            "var(--font-playfair), 'Playfair Display', serif",
                        }}
                      >
                        Tell us about your project.
                      </h3>
                      <p
                        className="mt-2 max-w-[36rem] text-[13px] leading-relaxed text-[#9AA8C0]"
                        style={{
                          fontFamily: "var(--font-space-grotesk), sans-serif",
                        }}
                      >
                        Share your goals, timeline, and requirements. We&apos;ll
                        review everything personally and recommend the best next
                        step.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FloatingInput
                        id="name"
                        label="Full Name"
                        value={form.name}
                        onChange={set("name")}
                        required
                        error={errors.name}
                        autoComplete="name"
                      />
                      <FloatingInput
                        id="email"
                        label="Business Email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        required
                        error={errors.email}
                        autoComplete="email"
                      />
                      <FloatingInput
                        id="company"
                        label="Company"
                        value={form.company}
                        onChange={set("company")}
                        required
                        error={errors.company}
                        autoComplete="organization"
                      />
                      <FloatingInput
                        id="website"
                        label="Website"
                        type="url"
                        value={form.website}
                        onChange={set("website")}
                        autoComplete="url"
                      />
                      <FloatingSelect
                        id="industry"
                        label="Industry"
                        options={INDUSTRIES}
                        value={form.industry}
                        onChange={set("industry")}
                        required
                        error={errors.industry}
                      />
                      <FloatingSelect
                        id="projectType"
                        label="Project Type"
                        options={PROJECT_TYPES}
                        value={form.projectType}
                        onChange={set("projectType")}
                        required
                        error={errors.projectType}
                      />
                      <FloatingSelect
                        id="budget"
                        label="Budget Range"
                        options={BUDGETS}
                        value={form.budget}
                        onChange={set("budget")}
                      />
                      <FloatingSelect
                        id="timeline"
                        label="Timeline"
                        options={TIMELINES}
                        value={form.timeline}
                        onChange={set("timeline")}
                      />
                    </div>

                    <div className="mt-4">
                      <FloatingTextarea
                        id="details"
                        label="Project Details"
                        value={form.details}
                        onChange={set("details")}
                        required
                        error={errors.details}
                      />
                    </div>

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p
                        className="text-[12px] leading-relaxed text-[#6B7890]"
                        style={{
                          fontFamily: "var(--font-space-grotesk), sans-serif",
                        }}
                      >
                        Prefer to talk live?{" "}
                        <a
                          href={BOOKING_PATH}
                          className="text-[#A8C5F0] transition-colors hover:text-[#F4F7FC]"
                          onClick={(e) => {
                            e.preventDefault();
                            openBooking("contact-form-prefer-call");
                          }}
                        >
                          Book a strategy call
                        </a>
                      </p>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="group s12-btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] transition-[filter,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
                        style={{
                          fontFamily: "var(--font-space-grotesk), sans-serif",
                        }}
                      >
                        <span>
                          {status === "submitting"
                            ? "Sending…"
                            : "Send Project Brief"}
                        </span>
                        {status !== "submitting" && (
                          <span
                            aria-hidden
                            className="inline-block transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px]"
                          >
                            →
                          </span>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
