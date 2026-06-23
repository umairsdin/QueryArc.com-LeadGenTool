import ReportPage from "@/views/ReportPage";
import { buildMetadata } from "@/lib/metadata";
import { getRoute } from "@/lib/route-registry";

type ReportRouteProps = {
  params: Promise<{ run_id: string }>;
};

export async function generateMetadata({ params }: ReportRouteProps) {
  const { run_id } = await params;
  return buildMetadata(getRoute("report"), `/report/${run_id}/`);
}

export default async function ReportRoute({ params }: ReportRouteProps) {
  const { run_id } = await params;
  return <ReportPage runId={run_id} />;
}
