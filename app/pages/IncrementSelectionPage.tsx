'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, CheckCircle, Info } from 'lucide-react'
import { useAppDispatch } from '@/store/hooks'
import { setSelectedIncrementAmount, setIncrementType } from '@/store/incrementSlice'
import { getFeeAndRate } from '@/utils/increment'

const INCREMENT_CATEGORY = 'Fuliza Increment'

const INCREMENT_OPTIONS = [
  { amount: 3000, label: 'KSh 3,000' },
  { amount: 4000, label: 'KSh 4,000' },
  { amount: 5000, label: 'KSh 5,000' },
  { amount: 8000, label: 'KSh 8,000' },
  { amount: 10000, label: 'KSh 10,000' },
  { amount: 11000, label: 'KSh 11,000' },
  { amount: 13000, label: 'KSh 13,000' },
  { amount: 15000, label: 'KSh 15,000' },
  { amount: 20000, label: 'KSh 20,000' },
  { amount: 23000, label: 'KSh 23,000' },
  { amount: 25000, label: 'KSh 25,000' },
  { amount: 30000, label: 'KSh 30,000' },
  { amount: 38000, label: 'KSh 38,000' },
  { amount: 40000, label: 'KSh 40,000' },
  { amount: 45000, label: 'KSh 45,000' },
  { amount: 50000, label: 'KSh 50,000' },
  { amount: 60000, label: 'KSh 60,000' },
  { amount: 75000, label: 'KSh 75,000' },
  { amount: 100000, label: 'KSh 100,000' },
  { amount: 150000, label: 'KSh 150,000' },
  { amount: 200000, label: 'KSh 200,000' },
  { amount: 300000, label: 'KSh 300,000' },
  { amount: 400000, label: 'KSh 400,000' },
  { amount: 500000, label: 'KSh 500,000' },
  { amount: 750000, label: 'KSh 750,000' },
  { amount: 1000000, label: 'KSh 1,000,000' },
  { amount: 1500000, label: 'KSh 1,500,000' },
  { amount: 2000000, label: 'KSh 2,000,000' },
  { amount: 2500000, label: 'KSh 2,500,000' },
  { amount: 3000000, label: 'KSh 3,000,000' },
  { amount: 4000000, label: 'KSh 4,000,000' },
  { amount: 5000000, label: 'KSh 5,000,000' },
  { amount: 7500000, label: 'KSh 7,500,000' },
  { amount: 10000000, label: 'KSh 10,000,000' },
  { amount: 15000000, label: 'KSh 15,000,000' },
]

interface IncrementSelectionPageProps {
  userName: string
  phoneNumber: string
  onBack: () => void
  onSelectIncrement: (amount: number) => void
}

export default function IncrementSelectionPage({
  userName,
  phoneNumber,
  onBack,
  onSelectIncrement
}: IncrementSelectionPageProps) {
  const dispatch = useAppDispatch()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const handleSelect = (amount: number) => {
    setSelectedAmount(amount)
    dispatch(setSelectedIncrementAmount(amount))
    dispatch(setIncrementType(INCREMENT_CATEGORY))

    setTimeout(() => {
      onSelectIncrement(amount)
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container-custom py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/image.png"
                  alt="Fuliza Increment logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">Fuliza Increment</span>
            </div>
          </div>
          <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Help
          </button>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0f766e] mb-2">
            You&apos;re approved!
          </h1>
          <p className="text-gray-600">
            Great news, <span className="font-semibold text-[#0f766e]">{userName}</span>! Pick the increment amount that works best for you.
          </p>
        </div>

        {/* Increment Options */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#0f766e] mb-3 flex items-center gap-2">
            <span className="bg-[#0f766e] w-1 h-6 rounded-full"></span>
            {INCREMENT_CATEGORY}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {INCREMENT_OPTIONS.map((option) => {
              const { fee } = getFeeAndRate(option.amount)
              return (
              <div
                key={option.amount}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-4 text-center border-2 ${
                  selectedAmount === option.amount
                    ? 'border-[#0f766e] ring-2 ring-[#0f766e]/20'
                    : 'border-transparent hover:border-gray-200'
                }`}
                onClick={() => handleSelect(option.amount)}
              >
                <p className="text-lg font-bold text-[#0f766e]">{option.label}</p>
                <p className="text-xs text-gray-500 mt-1">Repay over 6 months</p>
                <p className="text-xs font-medium text-amber-700 mt-1">
                  Fee: KSh {fee.toLocaleString()}
                </p>
                <button
                  className={`mt-3 w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                    selectedAmount === option.amount
                      ? 'bg-[#0f766e] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {selectedAmount === option.amount ? '✓ SELECTED' : 'SELECT'}
                </button>
              </div>
              )
            })}
          </div>
        </div>

        {/* Info Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            Tap an amount to see the full breakdown, including any processing fee.
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="text-[#0f766e] hover:text-[#2a4c7e] font-medium text-sm transition-colors"
          >
            ← Back to form
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0f766e] text-white py-6 mt-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors text-sm">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors text-sm">
                Terms
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors text-sm">
                Contact
              </a>
            </div>
            <p className="text-sm text-blue-300">
              &copy; 2026 Fuliza Increment Kenya. Licensed by CBK.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
