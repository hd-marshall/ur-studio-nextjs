import { CheckCircle, XCircle, Clock, AlertTriangle, DollarSign } from "lucide-react"

export default function BookingPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-black py-24 pt-36">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extralight text-black dark:text-white mb-6">
            BOOKING POLICY
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-400 font-light leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Please review our cancellation and booking policies to ensure the best experience for all clients.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-12">

          {/* Free Cancellation */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-light text-green-800 dark:text-green-200 mb-4">
                  Free Cancellation
                </h2>
                <p className="text-green-700 dark:text-green-300 text-md leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  <strong>Free cancellation</strong> is available as long as the appointment is cancelled{" "}
                  <strong>at least 6 hours before</strong> the appointment.
                </p>
              </div>
            </div>
          </div>

          {/* Late Cancellations */}
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-light text-orange-800 dark:text-orange-200 mb-4">
                  Late Cancellations
                </h2>
                <p className="text-orange-700 dark:text-orange-300 text-md leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  <strong>Late cancellations</strong> (within 6 hours of your booking) will incur a{" "}
                  <strong>100% fee</strong> of service booked.
                </p>
              </div>
            </div>
          </div>

          {/* No Shows */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-light text-red-800 dark:text-red-200 mb-4">
                  No Shows
                </h2>
                <p className="text-red-700 dark:text-red-300 text-md leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                  <strong>No shows</strong> will incur a <strong>100% fee</strong> of service booked.
                </p>
                <p className="text-red-700 dark:text-red-300 text-md leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  Customers arriving more than <strong>10 minutes late</strong> will be considered as a{" "}
                  <strong>no show</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Surcharges */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-light text-blue-800 dark:text-blue-200 mb-4">
                  Additional Charges
                </h2>
                <p className="text-blue-700 dark:text-blue-300 text-md leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  <strong>10% weekend surcharge</strong> | <strong>15% holiday surcharge</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-8 w-8 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-light text-gray-800 dark:text-gray-200 mb-4">
                  Our Commitment
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  We want to ensure that you have <strong>enough time to receive the best service</strong>, and at the 
                  same time, we do not want our <strong>upcoming clients being delayed</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-md mb-6" style={{ fontFamily: 'var(--font-body)' }}>
            Questions about our booking policy?
          </p>
          <div className="space-y-2">
            <p>
              <a 
                href="mailto:urstudiomelb@gmail.com" 
                className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-light"
              >
                urstudiomelb@gmail.com
              </a>
            </p>
            <p>
              <a 
                href="tel:+0435 342 989" 
                className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-light"
              >
                0435 342 989
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}