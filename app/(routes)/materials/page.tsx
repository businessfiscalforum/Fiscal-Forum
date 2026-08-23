// app/(routes)/materials/page.tsx
import { db } from "../../../config/db";
import { materials } from "../../../config/schema"; 
import ClientMaterialsPage, { Materials } from "./ClientMaterialsPage";

export default async function MaterialsPage() {
  const rows = await db
    .select()
    .from(materials);

  // Serialize data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serializedMaterials: Materials[] = rows.map((item: any) => ({
    id: String(item.id),
    title: item.title,
    link: item.link ?? undefined,
  }));

  return <ClientMaterialsPage initialMaterials={serializedMaterials} />;
}
