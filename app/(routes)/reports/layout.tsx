import "./Reports.css";

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="reports-portal-container">{children}</div>;
}
