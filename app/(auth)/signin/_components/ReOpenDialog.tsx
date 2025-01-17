"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useManageOtp } from "../_hooks";

export default function ReOpenDialog() {
  const setShowModal = useManageOtp(state => state.setShowModal);
  return (
    <Button
      variant={"link"}
      onClick={() => setShowModal(true)}
      className="text-blue-600"
    >
      Enter OTP
    </Button>
  );
}
