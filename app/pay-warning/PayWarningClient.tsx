'use client'

import React from 'react'
import PayWarning from '../pages/PayWarning'

interface PayWarningClientProps {
  userName: string
  processingFee: number
  totalRepayment: number
  phoneNumber: string
  incrementType: string
  nationalId: string
  onCancel: () => void
  onPaymentFailed?: (error: string) => void
  onPaymentComplete?: (data: Record<string, unknown>) => void
  onPaymentCancelled?: () => void
}

export default function PayWarningClient({ 
  userName,
  processingFee,
  totalRepayment,
  phoneNumber,
  incrementType,
  nationalId,
  onCancel,
  onPaymentFailed,
  onPaymentComplete,
  onPaymentCancelled
}: PayWarningClientProps) {
  return (
    <PayWarning
      userName={userName}
      processingFee={processingFee}
      totalRepayment={totalRepayment}
      phoneNumber={phoneNumber}
      incrementType={incrementType}
      nationalId={nationalId}
      onCancel={onCancel}
      onPaymentFailed={onPaymentFailed}
      onPaymentComplete={onPaymentComplete}
      onPaymentCancelled={onPaymentCancelled}
    />
  )
}