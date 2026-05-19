"use client";

import { useState } from "react";
import Link from "next/link";

type Lang = "zh" | "en";

const T = {
  zh: {
    lang: "English",
    backLabel: "返回归档",
    brand: "Transamerica · WFG",
    subtitle: "荣耀启航 · 共襄盛举",
    title: "全新办公室开业典礼",
    divider: "✦ GRAND OPENING CELEBRATION ✦",
    tagline: "新办公室 · 新起点 · 新高度",
    invitation:
      "诚挚邀请您莅临现场，与我们共同见证这一重要里程碑，开启新的成长、新的合作与新的未来。",
    dateLabel: "日期",
    date: "2026年5月30日（星期六）",
    timeLabel: "时间",
    reception: "入场接待：9:30 AM",
    ceremony: "开业典礼：10:00 AM",
    addressLabel: "活动地址",
    address: "37-20 Prince St. Suite 2A, Flushing, NY 11354",
    highlightsTitle: "活动亮点",
    highlights: [
      "开业剪彩",
      "公司愿景分享",
      "贵宾致辞",
      "团队荣耀表彰",
      "幸运抽奖",
      "精美茶点与交流",
    ],
    rsvpTitle: "报名出席",
    firstNameLabel: "名字 *",
    firstNamePh: "名",
    lastNameLabel: "姓氏 *",
    lastNamePh: "姓",
    phoneLabel: "联系电话 *",
    emailLabel: "电子邮箱",
    guestsLabel: "随行总人数（含您自己）*",
    submit: "我会出席",
    submitting: "提交中…",
    successTitle: "感谢您的回复！",
    successMsg:
      "我们已经收到您的 RSVP 信息，期待在开业典礼上与您相见。",
    successBack: "提交另一份回复",
    footer: "携手同行，感谢有您",
    footerSub: "Transamerica & WFG Grand Opening",
    errorMsg: "提交失败，请稍后再试。",
    required: "请填写所有必填项。",
  },
  en: {
    lang: "中文",
    backLabel: "Back to Archive",
    brand: "Transamerica · WFG",
    subtitle: "GRAND OPENING",
    title: "CELEBRATION",
    divider: "✦ 全新办公室开业典礼 ✦",
    tagline: "NEW BEGINNING · NEW HEIGHTS · NEW FUTURE",
    invitation:
      "We sincerely invite you to join us as we celebrate this important milestone and witness the beginning of a new journey, new opportunities, and new success together.",
    dateLabel: "Date",
    date: "Saturday, May 30, 2026",
    timeLabel: "Time",
    reception: "Reception: 9:30 AM",
    ceremony: "Ceremony: 10:00 AM",
    addressLabel: "Location",
    address: "37-20 Prince St. Suite 2A, Flushing, NY 11354",
    highlightsTitle: "Event Highlights",
    highlights: [
      "Ribbon Cutting Ceremony",
      "Vision Sharing",
      "Guest Remarks",
      "Team Recognition",
      "Lucky Draw",
      "Networking & Refreshments",
    ],
    rsvpTitle: "RSVP Now",
    firstNameLabel: "First Name *",
    firstNamePh: "John",
    lastNameLabel: "Last Name *",
    lastNamePh: "Doe",
    phoneLabel: "Phone Number *",
    emailLabel: "Email Address",
    guestsLabel: "Total Number of Guests (incl. yourself) *",
    submit: "I Will Attend",
    submitting: "Submitting…",
    successTitle: "Thank You!",
    successMsg:
      "Your RSVP has been successfully received. We look forward to celebrating with you!",
    successBack: "Submit another response",
    footer: "Together, thank you for your support",
    footerSub: "Transamerica & WFG Grand Opening",
    errorMsg: "Submission failed. Please try again.",
    required: "Please fill in all required fields.",
  },
} as const;

const HIGHLIGHT_ICONS = [
  // scissors – ribbon cutting
  <svg key="sc" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/></svg>,
  // bar-chart – vision sharing
  <svg key="bc" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/></svg>,
  // mic – guest remarks
  <svg key="mc" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8"/></svg>,
  // trophy – team recognition
  <svg key="tr" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>,
  // gift – lucky draw
  <svg key="gi" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>,
  // coffee – networking
  <svg key="cf" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>,
];

const INPUT_CLS =
  "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition-all text-sm";

export default function GrandOpeningPage() {
  const [lang, setLang] = useState<Lang>("zh");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const t = T[lang];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !guests) {
      setError(t.required);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: "GrandOpening20260530",
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          guests: parseInt(guests, 10),
        }),
      });
      if (!res.ok) throw new Error("API error");
      setSubmitted(true);
    } catch {
      setError(t.errorMsg);
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setGuests("1");
    setSubmitted(false);
    setError("");
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 pb-16 selection:bg-red-800 selection:text-white">
      {/* Back link */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-800 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          {t.backLabel}
        </Link>
      </div>

      {/* Language toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLang(lang === "zh" ? "en" : "zh")}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-red-900 border border-red-200 px-4 py-2 rounded-full shadow-lg text-sm font-semibold hover:bg-red-50 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {t.lang}
        </button>
      </div>

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-red-950 via-red-900 to-red-800 text-white overflow-hidden rounded-b-3xl shadow-xl">
        {/* Decorative rings */}
        <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] border border-yellow-500/20 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] border border-yellow-500/20 rounded-full pointer-events-none" />

        <div className="relative z-10 px-6 pt-16 pb-14 max-w-2xl mx-auto text-center">
          <p className="text-yellow-400/80 font-semibold tracking-[0.3em] text-[11px] uppercase mb-3">
            {t.brand}
          </p>
          <p className="text-yellow-300 font-serif tracking-widest text-sm md:text-base uppercase mb-3">
            {t.subtitle}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-3 tracking-wide bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 text-transparent bg-clip-text leading-tight">
            {t.title}
          </h1>
          <p className="text-yellow-600/70 text-[11px] tracking-widest mb-4">{t.divider}</p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-5 rounded-full" />
          <p className="text-base md:text-lg font-medium text-red-100 mb-4">{t.tagline}</p>
          <p className="text-sm text-red-200 leading-relaxed max-w-md mx-auto font-light">
            {t.invitation}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 -mt-6 relative z-20 space-y-5">

        {/* Info card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-yellow-500">
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center md:items-start mb-5">
            <div className="text-center md:text-left">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">{t.dateLabel}</p>
              <p className="text-red-900 font-bold text-lg leading-tight">{t.date}</p>
            </div>
            <div className="hidden md:block w-px h-14 bg-gray-200" />
            <div className="text-center md:text-left space-y-2">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">{t.timeLabel}</p>
              <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <svg className="w-4 h-4 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {t.reception}
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <svg className="w-4 h-4 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {t.ceremony}
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 my-4" />

          <a
            href="https://maps.google.com/?q=37-20+Prince+St.+Suite+2A,+Flushing,+NY+11354"
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="mt-0.5 flex-shrink-0 text-red-800 bg-red-50 p-2 rounded-full group-hover:bg-red-100 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">{t.addressLabel}</p>
              <p className="text-sm font-semibold text-gray-800 group-hover:text-red-800 transition-colors underline decoration-gray-300 underline-offset-4 group-hover:decoration-red-800">
                {t.address}
              </p>
            </div>
          </a>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px bg-gray-200 flex-1" />
            <h2 className="text-sm font-serif font-bold text-red-900 px-2 text-center tracking-wide whitespace-nowrap">
              {t.highlightsTitle}
            </h2>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {t.highlights.map((label, i) => (
              <div
                key={i}
                className="bg-white px-3 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 hover:shadow-md transition-shadow"
              >
                <span className="text-yellow-600">{HIGHLIGHT_ICONS[i]}</span>
                <span className="text-xs font-medium text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RSVP form */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-red-950 to-red-800 text-white p-5 text-center">
            <h2 className="text-xl font-serif font-bold tracking-wide">{t.rsvpTitle}</h2>
          </div>

          <div className="p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.successTitle}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t.successMsg}</p>
                <button
                  onClick={reset}
                  className="mt-6 text-sm text-red-700 underline underline-offset-2 cursor-pointer bg-transparent border-none hover:text-red-900 transition-colors"
                >
                  {t.successBack}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t.firstNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={t.firstNamePh}
                      className={INPUT_CLS}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t.lastNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={t.lastNamePh}
                      className={INPUT_CLS}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(646) 288-7870"
                      className={INPUT_CLS}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className={INPUT_CLS}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t.guestsLabel}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="20"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={`${INPUT_CLS} font-semibold text-gray-900 bg-gray-50`}
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:-translate-y-0.5 mt-2 text-sm tracking-wide"
                >
                  {submitting ? t.submitting : t.submit}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-2 pb-4">
          <p className="text-red-900 font-serif text-sm mb-2">{t.footer}</p>
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-px bg-yellow-500" />
            <span className="text-[11px] text-gray-400">{t.footerSub}</span>
            <div className="w-8 h-px bg-yellow-500" />
          </div>
        </footer>
      </div>
    </div>
  );
}
