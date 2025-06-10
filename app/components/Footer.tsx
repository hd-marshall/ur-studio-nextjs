import { Scissors, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-full">
                <Scissors className="h-6 w-6 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-light tracking-wider">PRECISION</span>
                <span className="text-xs tracking-[0.2em] text-gray-400">BARBER STUDIO</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed font-light">
              Where traditional craftsmanship meets contemporary sophistication in the heart of Melbourne.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-light tracking-wide mb-6">SERVICES</h3>
            <ul className="space-y-3 text-gray-400 font-light">
              <li className="hover:text-white cursor-pointer transition-colors">Signature Cuts</li>
              <li className="hover:text-white cursor-pointer transition-colors">Traditional Shaves</li>
              <li className="hover:text-white cursor-pointer transition-colors">Beard Sculpting</li>
              <li className="hover:text-white cursor-pointer transition-colors">Premium Packages</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-light tracking-wide mb-6">QUICK LINKS</h3>
            <ul className="space-y-3 text-gray-400 font-light">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Portfolio</li>
              <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-light tracking-wide mb-6">CONTACT</h3>
            <div className="space-y-3 text-gray-400 font-light">
              <p>123 Collins Street</p>
              <p>Melbourne CBD, VIC 3000</p>
              <p className="hover:text-white cursor-pointer transition-colors">(03) 9123 4567</p>
              <p className="hover:text-white cursor-pointer transition-colors">hello@precisionbarber.com.au</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 font-light">
          <p>&copy; 2024 Precision Barber Studio. All rights reserved. | Crafted with precision in Melbourne.</p>
        </div>
      </div>
    </footer>
  )
}
