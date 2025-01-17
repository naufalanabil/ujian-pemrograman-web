import { Button } from '@/components/ui/button'

const CTA = () => {
  return (
    <div id="cta" className="bg-primary">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold  text-accent sm:text-4xl">
          <span className="block">Ready to start reading?</span>
          <span className="block">Sign up for Literasi today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-muted-foreground">
          Join thousands of readers who have already discovered the joy of digital reading with Literasi.
        </p>
        <Button size="lg" variant="secondary" className="mt-8">
          Get started for free
        </Button>
      </div>
    </div>
  )
}

export default CTA

