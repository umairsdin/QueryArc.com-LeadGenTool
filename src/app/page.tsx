import { redirect } from "next/navigation";
import { getRoute } from "@/lib/route-registry";

export default function HomePage() {
  redirect(getRoute("aiVisibility").path);
}
