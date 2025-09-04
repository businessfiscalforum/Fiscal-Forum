// app/(routes)/admin/reports/create/page.tsx
import { revalidatePath } from "next/cache";
import { db } from "../../../../../config/db";
import { researchReportsTable } from "../../../../../config/schema";
import { redirect } from "next/navigation";

// ✅ Define valid enums
const reportTypeOptions = [
  'Pre-Market Research Report',
  'Quarterly Results',
  'Industry Analysis',
  'Thematic Research Report',
  'Company Analysis',
  'Equity Research Report'
] as const;

const ratingOptions = ["BUY", "HOLD", "SELL"] as const;

// ✅ Type guards
function isValidReportType(value: string): value is (typeof reportTypeOptions)[number] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return reportTypeOptions.includes(value as any);
}

function isValidRating(value: string): value is (typeof ratingOptions)[number] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ratingOptions.includes(value as any);
}

export default async function CreateReportPage() {
  async function create(formData: FormData) {
    "use server";

    const title = (formData.get("title") as string) || undefined;
    const stock = (formData.get("stock") as string) || undefined;
    const company = (formData.get("company") as string) || undefined;
    const author = (formData.get("author") as string) || undefined;
    const authorFirm = (formData.get("authorFirm") as string) || undefined;
    const publishDate = (formData.get("date") as string) || undefined;
    const sector = (formData.get("sector") as string) || undefined;
    const rawReportType = (formData.get("reportType") as string) || undefined;
    const rawRating = (formData.get("rating") as string) || undefined;
    const targetPrice = (formData.get("targetPrice") as string) || undefined;
    const currentPrice = (formData.get("currentPrice") as string) || undefined;
    const upside = (formData.get("upside") as string) || undefined;
    const pagesStr = formData.get("pages") as string;
    const pages = pagesStr ? parseInt(pagesStr) : undefined;
    const recommendation = (formData.get("recommendation") as string) || undefined;
    const tagsStr = formData.get("tags") as string | null;
    const tags = tagsStr ? tagsStr.split(",").map(tag => tag.trim()).filter(Boolean) : undefined;
    const summary = (formData.get("summary") as string) || undefined;
    const pdfUrl = (formData.get("pdfUrl") as string) || undefined;

    // ✅ Validate enums only if provided
    const reportType = rawReportType && isValidReportType(rawReportType) ? rawReportType : undefined;
    const rating = rawRating && isValidRating(rawRating) ? rawRating : undefined;

    // ✅ Insert only provided fields
    await db.insert(researchReportsTable).values({
      title,
      stock,
      company,
      author,
      authorFirm,
      publishDate,
      sector,
      reportType,
      rating,
      targetPrice,
      currentPrice,
      upside,
      pages,
      recommendation,
      tags,
      summary,
      pdfUrl,
    });
    revalidatePath("/reports");
    revalidatePath("/admin/reports");
    redirect("/admin/reports");

  }

  return (
    <div className="max-w-4xl mx-auto p-6 py-20">
      <h1 className="text-2xl font-bold mb-6">Create Research Report</h1>
      <form action={create} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock Symbol</label>
          <input
            name="stock"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            name="company"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            name="author"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Author Firm</label>
          <input
            name="authorFirm"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Publish Date</label>
          <input
            name="date"
            type="date"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sector</label>
          <input
            name="sector"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Report Type</label>
          <select
            name="reportType"
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="Pre-Market Research Report">Pre-Market Report</option>
            <option value="Industry Report">Industry Report</option>
            <option value="Thematic Research Report">Thematic Research Report</option>
            <option value="Company Analysis">Company Analysis</option>
            <option value="Equity Research Report">Equity Reearch Report</option>
            <option value="Quarterly Results">Quarterly Results</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <select
            name="rating"
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="BUY">BUY</option>
            <option value="HOLD">HOLD</option>
            <option value="SELL">SELL</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Target Price (₹)</label>
          <input
            name="targetPrice"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Price (₹)</label>
          <input
            name="currentPrice"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upside (%)</label>
          <input
            name="upside"
            placeholder="+8.6%"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pages</label>
          <input
            name="pages"
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Recommendation</label>
          <input
            name="recommendation"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
          <input
            name="tags"
            placeholder="Banking, NPA Analysis"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <textarea
            name="summary"
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">PDF URL</label>
          <input
            name="pdfUrl"
            type="url"
            placeholder="https://example.com/report.pdf"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Publish Report
        </button>
      </form>
    </div>
  );
}