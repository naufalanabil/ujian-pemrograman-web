import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Your Digital</span>{' '}
              <span className="block text-primary xl:inline">Reading Companion</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Discover, read, and share your favorite books with Literasi. Our platform makes reading more engaging and social than ever before.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md ">
                <Button size="lg" asChild>
                  <Link href="/books">Get started</Link>
                </Button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/books">Learn more</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <Image
                className="w-full rounded-lg"
                src="https://res.cloudinary.com/da6hciwjn/image/upload/v1737113889/samples/outdoor-woman.jpg"
                alt="Reading app showcase"
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

