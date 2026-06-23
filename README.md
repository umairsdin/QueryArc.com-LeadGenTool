# QueryArc Lead Generation Tool

Next.js App Router site for QueryArc's free AI visibility audit and report flow.

## Routes

- `/` permanently redirects to `/ai-visibility/`
- `/ai-visibility/` is the indexable audit landing/tool page
- `/report/[run_id]/` is a noindex, client-polled report page

Canonical URLs, metadata, sitemap inclusion, and legacy redirects are centralized in `src/lib/route-registry.ts`.

## Development

```bash
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` for the canonical production host and `NEXT_PUBLIC_QUERYARC_API_URL` for the audit API origin.
