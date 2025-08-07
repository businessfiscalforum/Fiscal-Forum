// app/(routes)/admin/reports/create/page.tsx
import { db } from "../../../../../config/db";
import { researchReportsTable } from "../../../../../config/schema";
import { redirect } from "next/navigation";

// ✅ Define valid enums
const reportTypeOptions = [
  'Quarterly Results',
  'Industry Analysis',
  'Thematic Report',
  'Company Analysis',
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

    const title = formData.get("title") as string;
    const stock = formData.get("stock") as string;
    const company = formData.get("company") as string;
    const author = formData.get("author") as string;
    const authorFirm = formData.get("authorFirm") as string;
    const date = formData.get("date") as string;
    const sector = formData.get("sector") as string;
    const rawReportType = formData.get("reportType") as string;
    const rawRating = formData.get("rating") as string;
    const targetPrice = formData.get("targetPrice") as string;
    const currentPrice = formData.get("currentPrice") as string;
    const upside = formData.get("upside") as string;
    const pages = parseInt(formData.get("pages") as string);
    const views = parseInt(formData.get("views") as string);
    const recommendation = formData.get("recommendation") as string;
    const tags = (formData.get("tags") as string)
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);
    const summary = formData.get("summary") as string;
    const pdfUrl = formData.get("pdfUrl") as string;

    // ✅ Validate enums
    if (!isValidReportType(rawReportType)) {
      throw new Error(`Invalid report type: ${rawReportType}`);
    }
    if (!isValidRating(rawRating)) {
      throw new Error(`Invalid rating: ${rawRating}`);
    }

    const reportType = rawReportType;
    const rating = rawRating;

    // ✅ Insert with correct types
    await db.insert(researchReportsTable).values({
      title,
      stock,
      company,
      author,
      authorFirm,
      date,
      sector,
      reportType,
      rating,
      targetPrice,
      currentPrice,
      upside,
      pages,
      views,
      recommendation,
      tags,
      summary,
      pdfUrl,
    });

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
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock Symbol</label>
          <input
            name="stock"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            name="company"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            name="author"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Author Firm</label>
          <input
            name="authorFirm"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            name="date"
            type="date"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sector</label>
          <input
            name="sector"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Report Type</label>
          <select
            name="reportType"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="Quarterly Results">Quarterly Results</option>
            <option value="Industry Report">Industry Report</option>
            <option value="Thematic Report">Thematic Report</option>
            <option value="Company Analysis">Company Analysis</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <select
            name="rating"
            required
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
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Price (₹)</label>
          <input
            name="currentPrice"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upside (%)</label>
          <input
            name="upside"
            required
            placeholder="+8.6%"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pages</label>
          <input
            name="pages"
            type="number"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Views</label>
          <input
            name="views"
            type="number"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Recommendation</label>
          <input
            name="recommendation"
            required
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
            required
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">PDF URL</label>
          <input
            name="pdfUrl"
            type="url"
            required
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