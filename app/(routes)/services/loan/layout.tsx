// This is a Server Component by default (no "use client")
export default function LoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* Wrap children with common styles */}
      <div className="w-full mx-auto">
        <main>{children}</main>
      </div>
    </div>
  );
}