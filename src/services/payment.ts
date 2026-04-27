/**
 * Payment Gateway Service
 * Handles fetching payment config and loading gateway SDKs
 */

import apiClient from '@/lib/apiClient';

export type PaymentGateway = 'stripe' | 'razorpay' | 'manual';

export interface PaymentConfig {
  payment_gateway: PaymentGateway;
}

export interface RazorpayPaymentData {
  gateway: 'razorpay';
  razorpay_order_id: string;
  key_id: string;
  amount: number;
  currency: string;
}

export interface StripePaymentData {
  gateway: 'stripe';
  client_secret: string;
  payment_intent_id: string;
}

export interface ManualPaymentData {
  gateway: 'manual';
  message?: string;
}

export type PaymentData = RazorpayPaymentData | StripePaymentData | ManualPaymentData | null;

/**
 * Fetch the store's configured payment gateway type
 */
export const getPaymentConfig = async (): Promise<PaymentConfig> => {
  const response = await apiClient.get<PaymentConfig>('/public/payment-config');
  return response.data;
};

/**
 * Load the Razorpay Checkout.js SDK dynamically
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Open Razorpay Checkout modal
 * storeName and themeColor are configurable per client
 */
export const openRazorpayCheckout = (
  paymentData: RazorpayPaymentData,
  orderInfo: { order_number: string; customer_name: string; customer_email: string; customer_phone: string },
  storeName = 'Store',
  themeColor = '#4f46e5'
): Promise<{ razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }> => {
  return new Promise((resolve, reject) => {
    const options = {
      key: paymentData.key_id,
      amount: paymentData.amount,
      currency: paymentData.currency,
      name: storeName,
      description: `Order ${orderInfo.order_number}`,
      order_id: paymentData.razorpay_order_id,
      prefill: {
        name: orderInfo.customer_name,
        email: orderInfo.customer_email,
        contact: orderInfo.customer_phone,
      },
      theme: { color: themeColor },
      handler: (response: any) => resolve(response),
      modal: {
        ondismiss: () => reject(new Error('Payment cancelled by user')),
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
      reject(new Error(response.error?.description || 'Payment failed'));
    });
    rzp.open();
  });
};
