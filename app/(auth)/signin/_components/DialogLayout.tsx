"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useManageOtp } from "../_hooks";
import { useShallow } from "zustand/react/shallow";
export default function DialogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showModal, setShowModal, email } = useManageOtp(
    useShallow((state) => state)
  );
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          {email && (
            <DialogTitle className="text-2xl text-center font-bold">
              Enter OTP
            </DialogTitle>
          )}
          <DialogDescription className="text-center">
            We&apos;ve sended you a one-time password (OTP) to your email
          </DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
