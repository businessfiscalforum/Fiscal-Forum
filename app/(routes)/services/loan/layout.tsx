// This is a Server Component by default (no "use client")
export default function LoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* Wrap children with common styles */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <main>{children}</main>
      </div>
    </div>
  );
}