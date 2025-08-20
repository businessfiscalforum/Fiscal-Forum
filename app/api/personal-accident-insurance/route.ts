// app/api/personal-accident-insurance/route.ts
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../config/db";
import { personalAccidentInsuranceRequests, usersTable } from "../../../config/schema"; // Ensure 'usersTable' is also exported from this file
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
	try {
		const form = await req.formData();

		// Personal details
		const name = (form.get("name") as string)?.trim() || "";
		const phone = (form.get("phone") as string)?.trim() || "";
		const email = ((form.get("email") as string) || "").trim();
		const dob = ((form.get("dob") as string) || "").trim();
		const occupation = ((form.get("occupation") as string) || "").trim();

		// Policy requirements
		const coverageTypeRaw = (form.get("coverageType") as string) || "[]";
		const sumInsuredRaw = ((form.get("sumInsured") as string) || "").trim();
		const policyTermYearsRaw = ((form.get("policyTermYears") as string) || "").trim();
		const coverageOptionsRaw = (form.get("coverageOptions") as string) || "[]";

		// Existing policy
		const hasExistingPolicyRaw = ((form.get("hasExistingPolicy") as string) || "").trim();
		const existingInsurer = ((form.get("existingInsurer") as string) || "").trim();
		const prevPolicyLink = ((form.get("prevPolicyLink") as string) || "").trim();

		// Insurer preference
		const insurerPrefsRaw = (form.get("insurerPrefs") as string) || "[]";
		const otherInsurer = ((form.get("otherInsurer") as string) || "").trim();

		// Basic validation
		if (!name) return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
		if (!/^\d{10}$/.test(phone)) return NextResponse.json({ success: false, error: "Phone must be 10 digits" }, { status: 400 });
		if (email && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
		if (dob && !/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) return NextResponse.json({ success: false, error: "DOB must be dd/mm/yyyy" }, { status: 400 });

		if (!sumInsuredRaw || isNaN(Number(sumInsuredRaw)) || Number(sumInsuredRaw) <= 0) {
			return NextResponse.json({ success: false, error: "Sum insured is required and must be positive" }, { status: 400 });
		}
		if (!policyTermYearsRaw || isNaN(Number(policyTermYearsRaw)) || Number(policyTermYearsRaw) <= 0) {
			return NextResponse.json({ success: false, error: "Policy term (years) is required and must be positive" }, { status: 400 });
		}

		// Validate link if provided
		const isDrive = (link: string) => /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(link);
		if (prevPolicyLink && !isDrive(prevPolicyLink)) {
			return NextResponse.json({ success: false, error: "Previous policy link must be a public Google Drive URL" }, { status: 400 });
		}

		// Parse arrays
		let coverageType: string[] = [];
		let coverageOptions: string[] = [];
		let insurerPrefs: string[] = [];
		try { coverageType = JSON.parse(coverageTypeRaw); if (!Array.isArray(coverageType)) coverageType = []; } catch (e) { console.error("Error parsing coverageType:", e); }
		try { coverageOptions = JSON.parse(coverageOptionsRaw); if (!Array.isArray(coverageOptions)) coverageOptions = []; } catch (e) { console.error("Error parsing coverageOptions:", e); }
		try { insurerPrefs = JSON.parse(insurerPrefsRaw); if (!Array.isArray(insurerPrefs)) insurerPrefs = []; } catch (e) { console.error("Error parsing insurerPrefs:", e); }

		const hasExistingPolicy = ["true", "1", "on", "yes"].includes(hasExistingPolicyRaw.toLowerCase());

		// Resolve Clerk user -> local usersTable UUID
		let userId: string | null = null;
		try {
			const cu = await currentUser();
			const clerkEmail = cu?.emailAddresses?.[0]?.emailAddress;
			const fullName = cu?.fullName ?? "Anonymous";
			if (clerkEmail) {
				const existing = await db.select().from(usersTable).where(eq(usersTable.email, clerkEmail));
				if (existing.length > 0) {
                     userId = existing[0].id as string; // Cast if needed based on your schema definition
                } else {
					// Consider if you want to create a user automatically or handle unauthenticated users differently
					const [created] = await db.insert(usersTable).values({ name: fullName, email: clerkEmail, age: 18, password: "", role: "USER", status: "PENDING" }).returning();
					userId = created.id as string; // Cast if needed
				}
			}
		} catch (userError) {
             console.error("Error resolving user:", userError);
             // userId remains null if user resolution fails
        }

		// --- CORRECTIONS MADE HERE ---
		const [saved] = await db
			.insert(personalAccidentInsuranceRequests)
			.values({
                userId, // Include userId - Ensure your schema has this column
				name,
				email: email || null,
				phone,
				dob: dob || null,
				occupation: occupation || null,
				coverageType: JSON.stringify(coverageType),
                // --- Fix data types for varchar columns ---
				sumInsured: sumInsuredRaw, // Pass string directly for varchar column
				policyTermYears: policyTermYearsRaw, // Pass string directly for varchar column
				// --- End Fixes ---
				coverageOptions: JSON.stringify(coverageOptions),
				hasExistingPolicy,
				existingInsurer: existingInsurer || null,
				prevPolicyLink: prevPolicyLink || null,
				insurerPrefs: JSON.stringify(insurerPrefs),
				otherInsurer: otherInsurer || null,
			})
			.returning();

		return NextResponse.json({ success: true, data: saved }, { status: 201 });
	} catch (error: unknown) {
		// eslint-disable-next-line no-console
		console.error('Personal accident insurance POST error:', error);
		const message = error instanceof Error ? error.message : 'Internal error';
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}

export const config = { api: { bodyParser: false } };
