export interface CheckoutFormProps {
  clientSecret: string;
  handlePaymentSuccess?: (value: boolean) => void;
}
