'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, CheckCircle, Info, Loader2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchIncrementTypes, setSelectedIncrementAmount, setIncrementType } from '@/store/incrementSlice'
import { getFeeAndRate } from '@/utils/increment'

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
  const { incrementTypes, status, error } = useAppSelector((state) => state.increment)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [selectedIncrementType, setSelectedIncrementType] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  // Fetch increment types when component mounts
  useEffect(() => {
    const loadIncrementTypes = async () => {
      try {
        await dispatch(fetchIncrementTypes()).unwrap()
      } catch (err) {
        console.error('Failed to fetch increment types:', err)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadIncrementTypes()
  }, [dispatch])

  // Generate increment options from API data
  const generateIncrementOptions = () => {
    const options: Array<{
      amount: number
      label: string
      incrementType: string
      description?: string
    }> = []

    incrementTypes.forEach((increment) => {
      // Use max_amount if available, otherwise generate amounts based on increment type
      if (increment.max_amount) {
        options.push({
          amount: increment.max_amount,
          label: `KSh ${increment.max_amount.toLocaleString()}`,
          incrementType: increment.name,
          description: increment.description
        })
      } else {
        // Generate dynamic amounts based on increment type name
        const baseAmount = getBaseAmountForIncrementType(increment.name)
        const amounts = generateAmounts(baseAmount)
        
        amounts.forEach(amount => {
          options.push({
            amount: amount,
            label: `KSh ${amount.toLocaleString()}`,
            incrementType: increment.name,
            description: increment.description
          })
        })
      }
    })

    return options
  }

  // Helper: Get base amount based on increment type
  const getBaseAmountForIncrementType = (incrementName: string): number => {
    const name = incrementName.toLowerCase()
    if (name.includes('business') || name.includes('enterprise')) return 50000
    if (name.includes('education') || name.includes('school')) return 20000
    if (name.includes('emergency') || name.includes('urgent')) return 10000
    if (name.includes('home') || name.includes('mortgage')) return 100000
    if (name.includes('personal')) return 15000
    if (name.includes('auto') || name.includes('car')) return 30000
    if (name.includes('agriculture') || name.includes('farm')) return 25000
    return 20000 // Default
  }

  // Helper: Generate multiple amounts from base amount
  const generateAmounts = (baseAmount: number): number[] => {
    const multipliers = [0.25, 0.5, 0.75, 1, 1.5, 2, 3]
    const amounts = multipliers.map(m => Math.round(baseAmount * m / 1000) * 1000)
    // Remove duplicates and sort
    return [...new Set(amounts)].sort((a, b) => a - b)
  }

  // Fallback options if API fails
  const fallbackOptions: Array<{
    amount: number
    label: string
    incrementType: string
    description?: string
  }> = [
    { amount: 5000, label: 'KSh 5,000', incrementType: 'Personal' },
    { amount: 10000, label: 'KSh 10,000', incrementType: 'Personal' },
    { amount: 20000, label: 'KSh 20,000', incrementType: 'Personal' },
    { amount: 30000, label: 'KSh 30,000', incrementType: 'Business' },
    { amount: 50000, label: 'KSh 50,000', incrementType: 'Business' },
    { amount: 75000, label: 'KSh 75,000', incrementType: 'Education' },
    { amount: 100000, label: 'KSh 100,000', incrementType: 'Education' },
  ]

  const displayOptions = incrementTypes.length > 0 ? generateIncrementOptions() : fallbackOptions

  // Group options by increment type
  const groupedOptions = displayOptions.reduce((acc, option) => {
    if (!acc[option.incrementType]) {
      acc[option.incrementType] = []
    }
    acc[option.incrementType].push(option)
    return acc
  }, {} as Record<string, typeof displayOptions>)

  const handleSelect = (amount: number, incrementType: string) => {
    setSelectedAmount(amount)
    setSelectedIncrementType(incrementType)
    dispatch(setSelectedIncrementAmount(amount))
    dispatch(setIncrementType(incrementType))
    
    // Navigate to confirmation after a brief delay
    setTimeout(() => {
      onSelectIncrement(amount)
    }, 500)
  }

  // Show loading state
  if (isLoading || status === 'loading') {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-[#0f766e] mx-auto" />
            <p className="mt-4 text-gray-600">Loading increment options...</p>
          </div>
        </div>
      </main>
    )
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
                  src="/logo.svg" 
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
          {incrementTypes.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {incrementTypes.length} increment types available
            </p>
          )}
        </div>

        {/* Increment Options - Grouped by Type */}
        {Object.entries(groupedOptions).map(([incrementType, options]) => (
          <div key={incrementType} className="mb-8">
            <h2 className="text-lg font-semibold text-[#0f766e] mb-3 flex items-center gap-2">
              <span className="bg-[#0f766e] w-1 h-6 rounded-full"></span>
              {incrementType} Increments
              {options[0]?.description && (
                <span className="text-sm font-normal text-gray-500">
                  - {options[0].description}
                </span>
              )}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {options.map((option) => {
                const { fee } = getFeeAndRate(option.amount)
                return (
                <div
                  key={`${option.incrementType}-${option.amount}`}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-4 text-center border-2 ${
                    selectedAmount === option.amount && selectedIncrementType === option.incrementType
                      ? 'border-[#0f766e] ring-2 ring-[#0f766e]/20'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                  onClick={() => handleSelect(option.amount, option.incrementType)}
                >
                  <p className="text-lg font-bold text-[#0f766e]">{option.label}</p>
                  <p className="text-xs text-gray-500 mt-1">Repay over 6 months</p>
                  <p className="text-xs font-medium text-amber-700 mt-1">
                    Fee: KSh {fee.toLocaleString()}
                  </p>
                  <button
                    className={`mt-3 w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                      selectedAmount === option.amount && selectedIncrementType === option.incrementType
                        ? 'bg-[#0f766e] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {selectedAmount === option.amount && selectedIncrementType === option.incrementType 
                      ? '✓ SELECTED' 
                      : 'SELECT'}
                  </button>
                </div>
                )
              })}
            </div>
          </div>
        ))}

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