"use client";

import NewsletterForm from "../../../_components/NewsletterForm";
// import { revalidatePath } from "next/cache";

export default function CreateNewsletterPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (data: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create newsletter");
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create Newsletter
      </h1>
      <div className="bg-white shadow sm:rounded-lg p-6">
        <NewsletterForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
