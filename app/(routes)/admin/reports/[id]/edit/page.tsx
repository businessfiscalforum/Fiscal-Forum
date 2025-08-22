// app/(routes)/admin/reports/[id]/edit/page.tsx
import { revalidatePath } from "next/cache";
import { db } from "../../../../../../config/db";
import { researchReportsTable } from "../../../../../../config/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

// ✅ Define valid enum values
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
  return reportTypeOptions.includes(value as (typeof reportTypeOptions)[number]);
}

function isValidRating(value: string): value is (typeof ratingOptions)[number] {
  return ratingOptions.includes(value as (typeof ratingOptions)[number]);
}

export default async function EditReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [report] = await db
    .select()
    .from(researchReportsTable)
    .where(eq(researchReportsTable.id, id));

  if (!report) {
    redirect("/admin/reports");
  }

  async function update(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const stock = formData.get("stock") as string;
    const company = formData.get("company") as string;
    const author = formData.get("author") as string;
    const authorFirm = formData.get("authorFirm") as string;
    const publishDate = formData.get("date") as string;
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
      .map((tag) => tag.trim())
      .filter(Boolean);
    const summary = formData.get("summary") as string;
    const pdfUrl = formData.get("pdfUrl") as string;
    const published = formData.get("published") === "on";

    // ✅ Validate enums
    if (!isValidReportType(rawReportType)) {
      throw new Error(`Invalid report type: ${rawReportType}`);
    }
    if (!isValidRating(rawRating)) {
      throw new Error(`Invalid rating: ${rawRating}`);
    }

    const reportType = rawReportType;
    const rating = rawRating;

    await db
      .update(researchReportsTable)
      .set({
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
        views,
        recommendation,
        tags,
        summary,
        pdfUrl,
        published,
      })
      .where(eq(researchReportsTable.id, id));

      revalidatePath("/reports");
      revalidatePath(`/reports/${id}`); 
      revalidatePath("/admin/reports");

      redirect("/admin/reports");
  }

  return (
    <div className="max-w-4xl mx-auto p-6 py-20">
      <h1 className="text-2xl font-bold mb-6">Edit Research Report</h1>
      <form action={update} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            defaultValue={report.title}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock Symbol</label>
          <input
            name="stock"
            defaultValue={report.stock}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            name="company"
            defaultValue={report.company}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            name="author"
            defaultValue={report.author}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Author Firm</label>
          <input
            name="authorFirm"
            defaultValue={report.authorFirm}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Publish Date</label>
          <input
            name="date"
            type="date"
            defaultValue={report.publishDate}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sector</label>
          <input
            name="sector"
            defaultValue={report.sector}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Report Type</label>
          <select
            name="reportType"
            defaultValue={report.reportType}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            {reportTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <select
            name="rating"
            defaultValue={report.rating}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            {ratingOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Target Price (₹)</label>
          <input
            name="targetPrice"
            defaultValue={report.targetPrice}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Price (₹)</label>
          <input
            name="currentPrice"
            defaultValue={report.currentPrice}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upside (%)</label>
          <input
            name="upside"
            defaultValue={report.upside}
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
            defaultValue={report.pages}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Views</label>
          <input
            name="views"
            type="number"
            defaultValue={report.views}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Recommendation</label>
          <input
            name="recommendation"
            defaultValue={report.recommendation}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <input
            name="tags"
            defaultValue={report.tags?.join(", ") || ""}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <textarea
            name="summary"
            defaultValue={report.summary}
            required
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">PDF URL</label>
          <input
            name="pdfUrl"
            defaultValue={report.pdfUrl}
            type="url"
            required
            placeholder="https://example.com/report.pdf"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            id="published"
            defaultChecked={report.published ?? false}
          />
          <label htmlFor="published">Published</label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Update Report
        </button>
      </form>
    </div>
  );
}