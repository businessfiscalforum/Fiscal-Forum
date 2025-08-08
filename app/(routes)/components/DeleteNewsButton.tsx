// app/(routes)/admin/components/DeleteNewsButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteNewsButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (isDeleting) return;
    if (!confirm("Are you sure you want to delete this news article?")) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // ✅ Refresh the page to show updated list
        router.refresh();
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
      className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}