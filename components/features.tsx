import { Book, Users, Zap } from 'lucide-react'

const features = [
  {
    name: 'Extensive Library',
    description: 'Access thousands of books across various genres and languages.',
    icon: Book,
  },
  {
    name: 'Social Reading',
    description: 'Connect with friends, join book clubs, and share your reading journey.',
    icon: Users,
  },
  {
    name: 'Smart Recommendations',
    description: 'Get personalized book recommendations based on your reading habits.',
    icon: Zap,
  },
]

const Features = () => {
  return (
    <div id="features" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            A better way to read
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Literasi offers a range of features to enhance your reading experience.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md border bg-border ">
                    <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Features

