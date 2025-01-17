export default function NewBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative">
      <div className="mb-3">
        {" "}
        <h1 className="text-3xl font-bold text-primary ">Create New Book</h1>
        <p className="text-muted-foreground">
          Fill out the form below to create a new book
        </p>
      </div>
      {children}
    </section>
  );
}
