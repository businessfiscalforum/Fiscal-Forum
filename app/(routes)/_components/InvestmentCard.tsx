
// components/InvestmentCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface InvestmentCardProps {
  title: string;
  description: string;
  iconSrc: string;
  link: string;
  highlighted?: boolean;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  title,
  description,
  iconSrc,
  link,
  highlighted = false,
}) => {
  const cardClassName = highlighted
    ? 'bg-primary text-white'
    : 'bg-white border-2 border-green-500';
  const buttonClassName = highlighted
    ? 'bg-primary hover:bg-primary-dark text-white'
    : 'bg-white hover:bg-gray-100';

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${cardClassName} transition-colors duration-300 cursor-pointer`}
    >
      <div className="flex items-center mb-2">
        <Image
          src={iconSrc}
          alt={title}
          width={40}
          height={40}
          className="mr-2"
        />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link href={link}>
        <button
          className={`${buttonClassName} px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors duration-300`}
        >
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default InvestmentCard;