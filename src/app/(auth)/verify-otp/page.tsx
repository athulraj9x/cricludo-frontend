import { Suspense } from 'react';
import VerifyOtpForm from './VerifyOTPForm';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div><Spinner /></div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}