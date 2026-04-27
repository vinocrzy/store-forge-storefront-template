/**
 * PaymentStep — Overlay component for handling payment after order creation.
 * Supports Razorpay (modal) and Stripe (placeholder for future).
 * Uses CSS variables for brand-neutral styling.
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  type PaymentData,
  type RazorpayPaymentData,
  loadRazorpayScript,
  openRazorpayCheckout,
} from '@/services/payment';
import { Button } from '@/components/ui/Button';

interface PaymentStepProps {
  paymentData: PaymentData;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  total: number;
  currency?: string;
  storeName?: string;
  onPaymentComplete: () => void;
  onPaymentFailed: (error: string) => void;
}

export function PaymentStep({
  paymentData,
  orderNumber,
  customerName,
  customerEmail,
  customerPhone,
  total,
  currency = 'USD',
  storeName = 'Store',
  onPaymentComplete,
  onPaymentFailed,
}: PaymentStepProps) {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'processing' | 'success' | 'failed'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);

  useEffect(() => {
    if (!paymentData || paymentData.gateway === 'manual') {
      onPaymentComplete();
      return;
    }

    if (paymentData.gateway === 'razorpay') {
      loadRazorpayScript().then((loaded) => {
        if (!loaded) {
          setStatus('failed');
          setErrorMessage('Failed to load payment gateway. Please try again.');
          return;
        }
        setStatus('ready');
        handleRazorpayPayment(paymentData);
      });
    } else if (paymentData.gateway === 'stripe') {
      setStatus('ready');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentData]);

  const handleRazorpayPayment = async (data: RazorpayPaymentData) => {
    setStatus('processing');
    setProcessing(true);
    try {
      await openRazorpayCheckout(
        data,
        { order_number: orderNumber, customer_name: customerName, customer_email: customerEmail, customer_phone: customerPhone },
        storeName,
      );
      setStatus('success');
      onPaymentComplete();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      if (message === 'Payment cancelled by user') {
        setStatus('ready');
        setProcessing(false);
        setErrorMessage('Payment was cancelled. You can retry or pay later.');
      } else {
        setStatus('failed');
        setErrorMessage(message);
        onPaymentFailed(message);
      }
    }
  };

  if (!paymentData || paymentData.gateway === 'manual') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background border border-border rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 space-y-6 text-center">
        {/* Loading / Processing */}
        {(status === 'loading' || status === 'processing') && (
          <>
            <div className="w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin mx-auto" />
            <h2 className="text-2xl font-bold text-foreground">
              {status === 'loading' ? 'Loading Payment...' : 'Processing Payment...'}
            </h2>
            <p className="text-muted-foreground text-sm">
              Please don&apos;t close this window.
            </p>
          </>
        )}

        {/* Success */}
        {status === 'success' && (
          <>
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto text-2xl">✓</div>
            <h2 className="text-2xl font-bold text-foreground">Payment Successful!</h2>
            <p className="text-muted-foreground text-sm">
              Your payment of {fmt(total)} for order {orderNumber} has been received.
            </p>
            <p className="text-muted-foreground text-xs">Redirecting...</p>
          </>
        )}

        {/* Ready — retry / pay */}
        {status === 'ready' && paymentData.gateway === 'razorpay' && (
          <>
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-2xl">💳</div>
            <h2 className="text-2xl font-bold text-foreground">Complete Your Payment</h2>
            <p className="text-muted-foreground text-sm">Order {orderNumber} — {fmt(total)}</p>
            {errorMessage && (
              <p className="text-sm text-[var(--color-error)] bg-[var(--color-error)]/10 rounded-lg px-4 py-2">{errorMessage}</p>
            )}
            <div className="space-y-3">
              <Button
                onClick={() => handleRazorpayPayment(paymentData)}
                disabled={processing}
                size="lg"
                fullWidth
              >
                Pay Now — {fmt(total)}
              </Button>
              <button
                onClick={() => router.push(`/orders/confirmation?order=${orderNumber}&payment=pending`)}
                className="w-full text-muted-foreground text-xs uppercase tracking-wider py-3 hover:text-primary transition-colors"
              >
                Pay Later
              </button>
            </div>
          </>
        )}

        {/* Failed */}
        {status === 'failed' && (
          <>
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-2xl">✕</div>
            <h2 className="text-2xl font-bold text-foreground">Payment Failed</h2>
            <p className="text-muted-foreground text-sm">{errorMessage}</p>
            <div className="space-y-3">
              {paymentData.gateway === 'razorpay' && (
                <Button
                  onClick={() => {
                    setStatus('ready');
                    setErrorMessage(null);
                    handleRazorpayPayment(paymentData);
                  }}
                  size="lg"
                  fullWidth
                >
                  Retry Payment
                </Button>
              )}
              <button
                onClick={() => router.push(`/orders/confirmation?order=${orderNumber}&payment=pending`)}
                className="w-full text-muted-foreground text-xs uppercase tracking-wider py-3 hover:text-primary transition-colors"
              >
                Skip — Pay Later
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
