import { BookResponse } from '@/actions/books/get';
import React from 'react'
import DOMPurify from 'isomorphic-dompurify';
import { Calendar, User } from 'lucide-react';
import dateFormatter from '@/helper/dateFormatter';
import Image from 'next/image';

export default function BookDetails({ book }: BookResponse) {
    
  const sanitizedContent = DOMPurify.sanitize(book.content as string);
  return (
    <div className="max-w-4xl md:max-w-none w-full  mx-auto h-full bg-background overflow-hidden">
    <div className="md:flex flex-col lg:flex-row">
      <div className="md:flex-shrink-0">
        <Image
          className="rounded-md shadow-md m-3 h-40 md:h-72 w-full object-cover md:w-48"
          src={book.imageUrl || "https://via.placeholder.com/150"}
          alt={book.name}
          width={200}
          height={200}
        />
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {book.category}
        </div>
        <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {book.name}
        </h1>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
          <span>{book.author}</span>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
          <span>Updated on {dateFormatter(book.updatedAt)}</span>
        </div>
        <p className="mt-4 text-lg text-gray-500">{book.description}</p>
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-400 mb-2">
            Content Preview
          </h2>
          <div
            className="prose max-w-none prose-blockquote:text-primary prose-a:text-primary prose-a:dark:text-gray-400 prose-blockquote:dark:text-primary prose-lg text-gray-500 prose-headings:text-gray-900 prose-headings:dark:text-gray-100 dark:text-gray-400 "
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </div>
    </div>
  </div>
  )
}
