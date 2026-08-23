import NewsletterList from '../../_components/NewsletterList';
import Link from 'next/link';

export default function AdminNewslettersPage() {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Newsletters</h1>
        <Link
          href="/admin/newsletter/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Create Newsletters
        </Link>
      </div>
      <NewsletterList />
    </div>
  );
}