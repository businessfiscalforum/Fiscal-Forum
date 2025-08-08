// app/(routes)/admin/components/DeleteReportButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteReportButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (isDeleting) return;
    if (!confirm("Are you sure you want to delete this report?")) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/reports/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // ✅ Revalidate and refresh
        router.refresh(); // Refresh the current page
        // Or use: window.location.reload();
      } else {
        const data = await res.json();
        alert(`Delete failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };
  

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:underline text-sm font-medium transition-colors"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}