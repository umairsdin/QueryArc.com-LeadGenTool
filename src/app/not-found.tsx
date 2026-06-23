import Link from "next/link";
import { getRoute } from "@/lib/route-registry";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Page not found</p>
        <Link href={getRoute("aiVisibility").path} className="text-primary underline hover:text-primary/90">
          Return to QueryArc
        </Link>
      </div>
    </div>
  );
}
