'use client'

import Image from 'next/image'
import { Shield, Lock, CheckCircle, Loader2, TrendingUp, Zap, Clock } from 'lucide-react'
import { useState } from 'react'

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      window.location.href = '/apply'
    }, 2000)
  }

  return (
    <main className="min-h-screen relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#0f766e] rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/image.png"
                    alt="Fuliza logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#0f766e] mb-2">
                Checking your Fuliza eligibility...
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Secure connection established
              </p>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[#0f766e] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#0f766e] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 bg-[#0f766e] rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container-custom py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <Image
                src="/image.png"
                alt="Fuliza logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-sm font-bold text-[#0f766e] block leading-tight">Fuliza Limit</span>
              <span className="text-xs text-gray-500">Increment Service</span>
            </div>
          </div>
          <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Help
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f766e] to-[#065f46] text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                Increase your Fuliza limit today
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Get Up To <span className="text-[#fbbf24]">KSh 100,000</span> <span className="text-[#4ade80]">Fuliza Increment</span>
              </h1>
              <p className="text-lg text-white/80 mb-4">
                Running out of Fuliza? Increase your M-PESA Fuliza limit instantly. Pay a small processing fee and get a higher limit credited to your account.
              </p>
              <p className="text-sm text-white/60 mb-8">
                Available to all Safaricom M-PESA users with an active Fuliza account.
              </p>

              <div className="flex gap-6 mb-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-sm">1</div>
                  <span className="font-medium">Enter details</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-sm">2</div>
                  <span className="font-medium">Choose amount</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-sm">3</div>
                  <span className="font-medium">Pay &amp; activate</span>
                </div>
              </div>

              <button
                onClick={handleApplyClick}
                disabled={isLoading}
                className="bg-[#e31e24] hover:bg-[#c41a1f] text-white font-bold py-4 px-10 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 text-lg shadow-lg shadow-red-900/30"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Checking eligibility...
                  </>
                ) : (
                  'Increase My Fuliza Limit'
                )}
              </button>
            </div>

            <div className="relative hidden md:block">
              <Image
                src="/image.png"
                alt="Fuliza limit increment"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl w-full h-auto"
                priority
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#0f766e]">KSh 100K</p>
                    <p className="text-xs text-gray-600">Max Increment</p>
                  </div>
                  <div className="text-center border-l border-r border-gray-200">
                    <p className="text-2xl font-bold text-[#0f766e]">KSh 199</p>
                    <p className="text-xs text-gray-600">Starting Fee</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">Instant</p>
                    <p className="text-xs text-gray-600">Activation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-[#0f766e] mb-4">How Fuliza Limit Increment Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Increase your Fuliza overdraft limit in 3 simple steps. No paperwork, no branch visits.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-[#0f766e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-[#0f766e]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0f766e] mb-2">1. Check Eligibility</h3>
              <p className="text-gray-600">
                Enter your M-PESA phone number and ID. We verify your Fuliza account status instantly.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-[#0f766e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#0f766e]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0f766e] mb-2">2. Choose Your Increment</h3>
              <p className="text-gray-600">
                Select how much you want to increase your Fuliza limit — from KSh 3,000 up to KSh 15,000,000.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-[#0f766e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#0f766e]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0f766e] mb-2">3. Pay &amp; Activate</h3>
              <p className="text-gray-600">
                Pay the processing fee via M-PESA STK push. Your new Fuliza limit is activated immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-[#0f766e] mb-12">Why Choose Fuliza Limit Increment?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#0f766e]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0f766e] mb-2 text-center">Instant Processing</h3>
              <p className="text-gray-600 text-center">
                Your Fuliza limit is increased within minutes of payment confirmation. No waiting period.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#0f766e]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0f766e] mb-2 text-center">Secure M-PESA Payment</h3>
              <p className="text-gray-600 text-center">
                All payments are processed through Safaricom M-PESA STK push. Your money is safe.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#0f766e]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0f766e] mb-2 text-center">No Hidden Fees</h3>
              <p className="text-gray-600 text-center">
                Processing fee starts from KSh 199. You see the exact fee before you pay — no surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="container-custom py-12">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">CBK Licensed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">M-PESA Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">256-bit Encrypted</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f766e] text-white py-8 mt-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/image.png"
                  alt="Fuliza logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-semibold">Fuliza Limit Increment</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors text-sm">Privacy</a>
              <a href="#" className="hover:text-gray-300 transition-colors text-sm">Terms</a>
              <a href="#" className="hover:text-gray-300 transition-colors text-sm">Contact</a>
            </div>
            <p className="text-sm text-blue-300">
              &copy; 2026 Fuliza Limit Increment Kenya. Licensed by CBK.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
