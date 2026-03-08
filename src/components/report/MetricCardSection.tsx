import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Eye, Users, Target } from 'lucide-react';
import {
  CanonicalReport, CompetitorVisibilityItem,
  PiggybackRow, OpportunityEvent, CompetitorPresenceCard
} from '@/types/report';

interface Props {
  report: CanonicalReport;
}

export default function MetricCardSection({ report }: Props) {
  const sec = report.sections;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {sec.brand_visibility_card && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <VisibilityCard report={report} />
        </motion.div>
      )}
      {sec.competitor_presence_card && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <CompetitorCard report={report} />
        </motion.div>
      )}
      {sec.open_opportunity_card && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <OpportunityCard report={report} />
        </motion.div>
      )}
    </div>
  );
}

// --- Card 1: Brand Visibility ---
// Driven by: metrics.visibility_rate, metrics.competitor_visibility, narratives.top_insight
function VisibilityCard({ report }: { report: CanonicalReport }) {
  const [expanded, setExpanded] = useState(false);
  const vr = report.metrics?.visibility_rate;
  const cv = report.metrics?.competitor_visibility;
  const topInsight = report.narratives?.top_insight;

  if (!vr) return null;

  return (
    <div className="card-surface flex h-full flex-col p-5">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-foreground/60" />
        <h3 className="text-sm font-medium text-foreground">Brand visibility</h3>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">How often AI assistants mention your brand</p>

      <div className="mt-4">
        <div className="metric-large">{vr.percent}%</div>
        <div className="mt-1 text-xs text-muted-foreground">
          {vr.count} of {vr.total} answers mention {report.input.brand_name}
        </div>
      </div>

      {topInsight && (
        <p className="mt-3 rounded-md border border-border px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          {topInsight}
        </p>
      )}

      {cv && cv.length > 0 && (
        <ExpandableDetails expanded={expanded} onToggle={() => setExpanded(!expanded)} label="competitor visibility">
          {cv.map((c: CompetitorVisibilityItem, i: number) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{c.brand}</span>
              <span className="font-medium text-foreground">{c.percent}%</span>
            </div>
          ))}
        </ExpandableDetails>
      )}
    </div>
  );
}

// --- Card 2: Competitor Presence ---
// Driven by: data.competitor_presence_card, metrics.competitor_piggyback_rate
function CompetitorCard({ report }: { report: CanonicalReport }) {
  const [expanded, setExpanded] = useState(false);
  // Primary source: data.competitor_presence_card
  const cp: CompetitorPresenceCard | undefined = report.data?.competitor_presence_card as CompetitorPresenceCard | undefined;
  // Fallback: metrics.competitor_piggyback_rate
  const fallback = report.metrics?.competitor_piggyback_rate;

  const overall = cp?.piggyback_overall ?? fallback;
  if (!overall) return null;

  const pct = Math.round(overall.pct * 100);
  const topRival = cp?.top_rival ?? fallback?.top_rival;
  const rows = cp?.rows ?? fallback?.rows;

  return (
    <div className="card-surface flex h-full flex-col p-5">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-foreground/60" />
        <h3 className="text-sm font-medium text-foreground">Competitor presence</h3>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">Competitors appearing alongside your brand</p>

      <div className="mt-4">
        <div className="metric-large">{pct}%</div>
        <div className="mt-1 text-xs text-muted-foreground">
          {overall.num} of {overall.denom} eligible answers include a competitor
        </div>
      </div>

      {topRival && (
        <p className="mt-3 rounded-md border border-border px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          Top rival: <span className="font-medium text-foreground">{topRival.competitor}</span> — appears in {topRival.assistants_count} of {topRival.assistants_denom} assistants
        </p>
      )}

      {rows && rows.length > 0 && (
        <ExpandableDetails expanded={expanded} onToggle={() => setExpanded(!expanded)} label="model breakdown">
          {rows.map((row: PiggybackRow, i: number) => (
            <div key={i} className="text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{row.model}</span>
                <span className="text-muted-foreground">{Math.round(row.piggyback_pct * 100)}% piggyback</span>
              </div>
              {Object.entries(row.competitor_pct).some(([, v]) => v > 0) && (
                <div className="mt-0.5 flex flex-wrap gap-1.5 text-muted-foreground">
                  {Object.entries(row.competitor_pct).filter(([, v]) => v > 0).map(([name, val]) => (
                    <span key={name}>{name}: {Math.round((val as number) * 100)}%</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ExpandableDetails>
      )}
    </div>
  );
}

// --- Card 3: Open Opportunity ---
// Driven by: metrics.open_opportunity_rate, data.opportunity_events, data.opportunity_model_breakdown
function OpportunityCard({ report }: { report: CanonicalReport }) {
  const [expanded, setExpanded] = useState(false);
  const or = report.metrics?.open_opportunity_rate;
  const events = report.data?.opportunity_events;
  const breakdown = report.data?.opportunity_model_breakdown as Record<string, number> | undefined
    ?? report.metrics?.opportunity_model_breakdown;

  if (!or) return null;

  return (
    <div className="card-surface flex h-full flex-col p-5">
      <div className="flex items-center gap-2">
        <Target className="h-4 w-4 text-foreground/60" />
        <h3 className="text-sm font-medium text-foreground">Open opportunity</h3>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">Answers where no brand is recommended</p>

      <div className="mt-4">
        <div className="metric-large">{or.percent}%</div>
        <div className="mt-1 text-xs text-muted-foreground">{or.count} of {or.total} answers mention no brand</div>
      </div>

      {(breakdown || events) && (
        <ExpandableDetails expanded={expanded} onToggle={() => setExpanded(!expanded)} label="model breakdown">
          {breakdown && Object.entries(breakdown).map(([model, count]) => (
            <div key={model} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{model}</span>
              <span className="font-medium text-foreground">{count as number} open</span>
            </div>
          ))}

          {events && events.length > 0 && (
            <div className="mt-2 space-y-2 border-t border-border pt-2">
              <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Open answers</p>
              {events.map((ev: OpportunityEvent, i: number) => (
                <div key={i} className="rounded-md border border-border p-2.5 text-xs">
                  <div className="font-medium text-foreground">{ev.model}</div>
                  <p className="mt-0.5 text-muted-foreground line-clamp-2">{ev.buyer_label}</p>
                </div>
              ))}
            </div>
          )}
        </ExpandableDetails>
      )}
    </div>
  );
}

// --- Shared expandable wrapper ---
function ExpandableDetails({ expanded, onToggle, label, children }: {
  expanded: boolean;
  onToggle: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-auto pt-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-xs font-medium text-foreground/70 transition-colors hover:text-foreground"
      >
        <span>{expanded ? 'Hide' : 'View'} {label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2 border-t border-border pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
