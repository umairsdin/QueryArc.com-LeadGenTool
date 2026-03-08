const API_BASE = 'https://queryarc-mini-audit-production.up.railway.app';

export async function submitRun(payload: {
  brand_name: string;
  website: string;
  competitors: string[];
}): Promise<{ run_id: string }> {
  const res = await fetch(`${API_BASE}/api/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('submitRun failed:', res.status, res.statusText, text);
    throw new Error(`Failed to submit run: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchRun(runId: string) {
  const res = await fetch(`${API_BASE}/api/run/${runId}`);
  if (!res.ok) throw new Error('Failed to fetch run');
  return res.json();
}
