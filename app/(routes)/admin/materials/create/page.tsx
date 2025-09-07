"use client";

import MaterialForm from "../../../_components/MaterialForm";

export default function CreateMaterialsPage() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/materials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create material");
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Material</h1>
      <div className="bg-white shadow sm:rounded-lg p-6">
        <MaterialForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
