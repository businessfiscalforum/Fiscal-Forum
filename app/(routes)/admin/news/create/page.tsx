"use client";

import NewsForm from "../../../_components/NewsForm";
// import { revalidatePath } from "next/cache";

export default function CreateNewsPage() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (data: any) => {
    const response = await fetch("/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create news");
    }
    // revalidatePath("/news");
    // revalidatePath("/admin/news");
    // redirect("/admin/news");
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create News</h1>
      <div className="bg-white shadow sm:rounded-lg p-6">
        <NewsForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
