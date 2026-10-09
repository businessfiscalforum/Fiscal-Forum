import "../reports/Reports.css";

export default function ScreenerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="reports-portal-container">{children}</div>;
}
