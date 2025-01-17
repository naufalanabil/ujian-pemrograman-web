import { Book, Prisma } from "@prisma/client"

export function BookCardGrid({children}:{  children: React.ReactNode}) {
  
  return (
    <div className=" mx-auto px-4 py-5">
      <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
   {children}
      </div>
    </div>
  )
}

