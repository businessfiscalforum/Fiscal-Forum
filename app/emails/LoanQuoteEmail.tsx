// app/emails/LoanQuoteEmail.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Section,
  Img,
} from '@react-email/components';

type LoanQuoteEmailProps = {
  name: string;
  loanAmount: number;
  tenure: number;
  emi: number;
  interestRate: number;
  totalInterest: number;
  totalPayment: number;
};

export default function LoanQuoteEmail({
  name,
  loanAmount,
  tenure,
  emi,
  interestRate = 8.5,
  totalInterest,
  totalPayment,
}: LoanQuoteEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Img src="https://fiscal-forum.com/logo.png" width="120" alt="Fiscal Forum" />
            <Heading style={headingStyle}>Your Home Loan Quote</Heading>
          </Section>

          <Text style={textStyle}>Hi {name},</Text>
          <Text style={textStyle}>
            Thank you for requesting a home loan quote. Here are your personalized details:
          </Text>

          <Section style={quoteStyle}>
            <Text><strong>Loan Amount:</strong> ₹{loanAmount.toLocaleString()}</Text>
            <Text><strong>Tenure:</strong> {tenure} years</Text>
            <Text><strong>Interest Rate:</strong> {interestRate}% p.a.</Text>
            <Text><strong>Monthly EMI:</strong> ₹{emi.toLocaleString()}</Text>
            <Text><strong>Total Interest:</strong> ₹{totalInterest.toLocaleString()}</Text>
            <Text><strong>Total Payment:</strong> ₹{totalPayment.toLocaleString()}</Text>
          </Section>

          <Text style={textStyle}>
            <strong>Next Steps:</strong>
          </Text>
          <Text style={textStyle}>
            1. <a href="https://fiscal-forum.com/services/loan/home/apply" style={linkStyle}>
                Apply Now
              </a> to get pre-approved.<br />
            2. Upload documents via our secure portal.<br />
            3. Get disbursal in 72 hours.
          </Text>

          <Button style={buttonStyle} href="https://fiscal-forum.com/services/loan/home/apply">
            Apply Now
          </Button>

          <Section style={footerStyle}>
            <Text style={textStyle}>
              Need help? Call us at +91 XXXXXXXXXX or reply to this email.
            </Text>
            <Text style={textStyle}>
              Best regards,<br />
              <strong>Fiscal Forum Team</strong>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ✅ Use inline styles only
const bodyStyle: React.CSSProperties = { backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif' };
const containerStyle: React.CSSProperties = { maxWidth: '600px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' };
const headerStyle: React.CSSProperties = { textAlign: 'center', marginBottom: '20px' };
const headingStyle: React.CSSProperties = { color: '#005EA4' };
const textStyle: React.CSSProperties = { fontSize: '16px', lineHeight: '1.5', color: '#333' };
const linkStyle: React.CSSProperties = { color: '#005EA4', textDecoration: 'none' };
const quoteStyle: React.CSSProperties = { backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', margin: '20px 0' };
const buttonStyle: React.CSSProperties = { backgroundColor: '#005EA4', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', display: 'inline-block', margin: '20px 0' };
const footerStyle: React.CSSProperties = { marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee', textAlign: 'center' };