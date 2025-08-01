// app/api/send-quote/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ✅ Correct import
import LoanQuoteEmail from '../../emails/LoanQuoteEmail'; // ✅ Now works

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, loanAmount, tenure } = body;

    if (!name || !email || !loanAmount || !tenure) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const rate = 8.5 / 12 / 100;
    const time = tenure * 12;
    const emi = Math.round(loanAmount * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1));
    const totalPayment = emi * time;
    const totalInterest = totalPayment - loanAmount;

    const { data, error } = await resend.emails.send({
      from: `Fiscal Forum <${process.env.SENDER_EMAIL}>`,
      to: [email],
      subject: `Your Home Loan Quote - ₹${loanAmount.toLocaleString()} | EMI: ₹${emi.toLocaleString()}`,
      react: LoanQuoteEmail({
        name,
        loanAmount,
        tenure,
        emi,
        interestRate: 8.5,
        totalInterest,
        totalPayment,
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ message: 'Quote sent!', data }, { status: 200 });
  } catch (error: unknown) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}