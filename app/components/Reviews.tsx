const placeholderReviews = [
  {
    name: "J.M.",
    text: "Best cut I've had in Melbourne. The attention to detail is next level — walked out feeling completely different. Will not go anywhere else.",
    rating: 5,
  },
  {
    name: "A.K.",
    text: "Award-winning for a reason. Milo knew exactly what I wanted before I even finished explaining. The atmosphere is clean, calm, and professional.",
    rating: 5,
  },
  {
    name: "T.L.",
    text: "Incredible experience from start to finish. The fade was immaculate and the hot towel shave was something else. Highly recommend to anyone.",
    rating: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: typeof placeholderReviews[0] }) {
  return (
    <div className="border border-white/10 p-8 flex flex-col">
      <StarRating count={review.rating} />
      <p className="text-white/80 font-light leading-relaxed text-sm flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-6 font-oswald">
        {review.name}
      </p>
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-[#0C0C0C]">
      <div className="container mx-auto px-6">

        <div className="mb-14">
          <p className="text-xs tracking-[0.3em] text-white/40 font-light mb-4 uppercase">
            Client Testimonials
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white uppercase font-oswald">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholderReviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>

      </div>
    </section>
  )
}
