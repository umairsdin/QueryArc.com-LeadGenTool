import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const META_DESCRIPTION =
  "QueryArc was built by an SEO and organic growth practitioner who noticed buyers were skipping Google and asking AI instead. Here's the full story and how the product works.";

const TIERS = [
  {
    label: 'Free',
    title: 'AI Visibility Snapshot',
    body:
      'Runs 3 questions across 5 AI engines in under 60 seconds. Shows whether your brand appears, which competitors dominate neutral queries, and how much open space exists in your category. No login, no card.',
    badge: 'Start here',
    badgeClass: 'bg-muted text-muted-foreground',
  },
  {
    label: '$199',
    title: 'AI Visibility Diagnostic',
    body:
      'Ten neutral prompts - none that name your brand - sent to ChatGPT and Gemini, 3 runs each, scored with fixed rules, diagnosed by a human. Executive scorecard, evidence excerpts from every lost prompt, top 5 prioritised fixes.',
    badge: 'Most popular',
    badgeClass: 'bg-primary text-primary-foreground',
  },
  {
    label: '$499',
    title: 'Growth Blueprint',
    body:
      'Everything in the Diagnostic, plus the exact execution plan. Which pages to create, what titles and H2 structures to use, copy blocks your team can paste directly. A priority roadmap and an internal handoff brief your marketing team can act on immediately.',
    badge: 'Best for teams',
    badgeClass: 'bg-primary/10 text-primary',
  },
  {
    label: '$4,900',
    title: 'Fix-in-a-Box Sprint',
    body:
      'QueryArc implements the work and proves it moved the needle. Up to 6 pages shipped, then the same stored audit recipe is rerun - same prompts, same engines, same scoring - to produce a before/after proof pack.',
    badge: 'Done for you',
    badgeClass: 'bg-foreground text-background',
  },
];

const PILLARS = [
  {
    title: 'Rule-based scoring',
    body: 'No human adjusts the numbers. Every metric is calculated from raw outputs using fixed detection rules.',
  },
  {
    title: 'Stored run recipes',
    body: 'Every audit stores its prompt pack, model selection, and timestamp. Reruns use the same configuration - before/after comparisons are valid.',
  },
  {
    title: 'Traceable to raw outputs',
    body: 'Reports include verbatim AI responses and scored datasets. Nothing is summarised before you can verify it.',
  },
];

const AUDIENCES = [
  {
    title: 'Founders & Operators',
    text: 'Are we visible when buyers ask AI for the best options? Are competitors being recommended instead of us?',
  },
  {
    title: 'B2B Marketing & Growth',
    text: 'Is AI visibility becoming a new acquisition layer? Where are competitors winning comparisons?',
  },
  {
    title: 'SEO & Content',
    text: 'Are category pages influencing AI summaries? Are comparison questions favouring competitors?',
  },
  {
    title: 'Agencies & Consultants',
    text: 'How do I measure AI visibility for clients? Can I show before and after with a repeatable methodology?',
  },
];

const NOT_FOR = [
  'Teams looking for a real-time monitoring dashboard',
  'Anyone expecting guaranteed rankings',
  'Ongoing managed SEO services',
];

export default function AboutPage() {
  const problemRef = useScrollReveal<HTMLElement>();
  const buildRef = useScrollReveal<HTMLElement>();
  const differentRef = useScrollReveal<HTMLElement>();
  const audienceRef = useScrollReveal<HTMLElement>();
  const closingRef = useScrollReveal<HTMLElement>();

  useEffect(() => {
    document.title = 'About — QueryArc';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = META_DESCRIPTION;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-xs font-semibold uppercase tracking-widest text-primary"
          >
            About QueryArc
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl"
          >
            Built by someone who watched AI eat organic traffic — and decided to measure it.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            QueryArc is an AI visibility audit service for B2B SaaS teams who want to know whether they appear when
            buyers ask AI assistants for recommendations — and what to do when they don&apos;t.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <a
              href="https://audit.queryarc.com/ai-visibility"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Run the free AI visibility audit
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              Free — no credit card · No login required · Results in under 60 seconds
            </p>
          </motion.div>
        </section>

        <section ref={problemRef} className="reveal-on-scroll border-t border-border py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">The Problem</p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            In 2023 something started breaking quietly across B2B SaaS.
          </h2>
          <div className="mt-5 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Organic traffic held steady. Rankings looked fine. But lead quality from search was softening - and the
              cause wasn&apos;t obvious in any dashboard.
            </p>
            <p>
              What was actually happening: buyers in certain categories were skipping Google entirely and asking
              ChatGPT, Gemini, or Perplexity instead. &quot;What&apos;s the best helpdesk tool for a startup?&quot; &quot;Alternatives to
              Zendesk?&quot; &quot;How do I choose a CRM for a sales team of 10?&quot;
            </p>
            <p>
              AI assistants were answering those questions directly - and recommending specific brands. The brands that
              showed up were getting invisible consideration before a buyer ever visited a website. The brands that
              didn&apos;t show up were losing deals they never knew existed.
            </p>
            <p>The problem was real. The measurement didn&apos;t exist yet.</p>
          </div>
        </section>

        <section ref={buildRef} className="reveal-on-scroll border-t border-border py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">What We Built</p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            A diagnostic that goes from measurement to execution - not just a dashboard.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            QueryArc runs controlled AI visibility audits and delivers three things depending on how deep you need to
            go.
          </p>

          <div className="product-tiers mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier, index) => (
              <div
                key={tier.title}
                className="tier-card-reveal card-surface relative flex flex-col p-5"
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <span
                  className={`absolute -top-3 left-4 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tier.badgeClass}`}
                >
                  {tier.badge}
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{tier.label}</p>
                <h3 className="mt-1 text-base font-semibold text-foreground">{tier.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{tier.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Diagnostic is 100% credited toward Blueprint. Blueprint is 100% credited toward Sprint. Upgrade within 14
            days.
          </p>
        </section>

        <section id="methodology" ref={differentRef} className="reveal-on-scroll border-t border-border py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Why We Built It This Way</p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Most tools track prompts and show you a dashboard. That&apos;s measurement without diagnosis.
          </h2>
          <div className="mt-5 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>You see the number but not the reason, and certainly not what to ship next.</p>
            <p>
              QueryArc is built differently because the problem requires different thinking. AI visibility isn&apos;t an SEO
              metric - it&apos;s a content structure and positioning problem. The reason Zendesk dominates helpdesk
              recommendations isn&apos;t because they paid for placement. It&apos;s because they have more structured comparison
              content, more explicit category signals, and more prompt-aligned FAQ content than most of their
              competitors.
            </p>
            <p>
              The Diagnostic identifies exactly which of those signals are missing for your brand. The Growth Blueprint
              tells you exactly which pages to create and what to put on them.
            </p>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {PILLARS.map(pillar => (
                <div key={pillar.title} className="flex flex-col gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={audienceRef} className="reveal-on-scroll border-t border-border py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Who This Is For</p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            B2B SaaS teams who want to know whether AI is recommending them - and what to do if it isn&apos;t.
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {AUDIENCES.map(audience => (
              <div key={audience.title} className="card-surface p-5">
                <h3 className="text-sm font-semibold text-foreground">{audience.title}</h3>
                <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">&quot;{audience.text}&quot;</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
            <span className="text-xs text-muted-foreground">Not for:</span>
            {NOT_FOR.map(item => (
              <span key={item} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section ref={closingRef} className="reveal-on-scroll border-t border-border py-16">
          <div className="mt-2 rounded-2xl bg-muted p-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Start with the free audit. Upgrade only if you need the fix plan.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground">
              The free audit is the fastest way to know whether you have a problem. If competitors are winning answers
              in your category, the Diagnostic shows you why. The Blueprint tells you exactly what to build.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://audit.queryarc.com/ai-visibility"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Run the free AI visibility audit
                <ArrowRight className="h-4 w-4" />
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Link to="/ai-visibility" className="underline underline-offset-4 transition-colors hover:text-foreground">
                  See how it works →
                </Link>
                <span className="text-muted-foreground/60">|</span>
                <a href="#methodology" className="underline underline-offset-4 transition-colors hover:text-foreground">
                  Review the methodology →
                </a>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Free — no credit card · No login required · Results in under 60 seconds
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
