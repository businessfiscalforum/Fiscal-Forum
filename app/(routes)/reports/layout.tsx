import "./Reports.css";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user || !user.emailAddresses?.[0]?.emailAddress) {
    redirect("/sign-in?redirect_url=" + encodeURIComponent("/reports"));
  }

  return <div className="reports-portal-container">{children}</div>;
}
