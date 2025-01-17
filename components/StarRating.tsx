import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number | string
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= Number(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
          }`}
        />
      ))}
    </div>
  )
}

