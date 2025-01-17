import rateFormatter from "@/helper/rateFormatter";
import prisma from "@/lib/db";

export default async function UpdateBookLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const book = await prisma.book.findFirst({
    where: { id: params.id },
    select: { name: true },
  });
  const ratings = await prisma.rating.findMany({
    where: { bookId: params.id },
  });
  const ratingsValues = await rateFormatter(ratings);
  return (
    <section className="relative ">
      <div className="mb-3 space-y-2">
        {" "}
        <div className="flex gap-x-2 items-end">
          <h1 className="text-3xl font-bold text-primary ">{book?.name}</h1>
          <p className="text-muted-foreground text-sm ml-2">
            {ratingsValues.toString()} / 10
          </p>
        </div>
        <p className="text-muted-foreground">
          You can Fill out the form below to Edit {book?.name}
        </p>
      </div>
      {children}
    </section>
  );
}
