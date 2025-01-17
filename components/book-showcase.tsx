import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "@prisma/client";

const BookShowcase = ({ books }: { books: Book[] }) => {
  return (
    <div id="showcase" className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Showcase
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Featured Books
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Explore some of our most popular titles.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <Card key={book.id}>
                <CardContent className="p-4">
                  <Image
                    src={book.imageUrl || "https://via.placeholder.com/150"}
                    alt={`Cover of ${book.name}`}
                    width={200}
                    height={300}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {book.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {book.author}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookShowcase;
