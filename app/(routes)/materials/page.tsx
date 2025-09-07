"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Trash2, Edit, Eye } from 'lucide-react';

interface MaterialItem {
  id: number;
  title: string;
  link:string;
}

export default function MaterialPage() {
  const [materialItems, setMaterialItems] = useState<MaterialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterial();
  }, []);

  const fetchMaterial = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/materials`);
      const data = await res.json();
      setMaterialItems(data.materials);
    } catch (error) {
      console.error('Error fetching material:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-30 px-8">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Materials</h1>
      </div>

        <div>
            {loading? <p>Loading...</p>:
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Link
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {materialItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {item.link}
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                                <Link
                                href={`/materials/${item.id}`}
                                className="text-green-600 hover:text-green-900"
                                >
                                <Eye className="h-4 w-4" />
                                </Link>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            }
        </div>
    </div>
  );
}