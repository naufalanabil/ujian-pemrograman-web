import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Features from '@/components/features'
import BookShowcase from '@/components/book-showcase'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import prisma from '@/lib/db'

export default async function Home() {
  const books = await prisma.book.findMany();
  return (
    <main className="min-h-screen bg-background">
      
      <Hero />
      <Features />
      <BookShowcase books={books}  />
      <CTA />
    </main>
  )
}

