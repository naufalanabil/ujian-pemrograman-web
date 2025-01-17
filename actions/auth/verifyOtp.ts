interface VerifyOTPParams {
  otp: string;
  email: string;
  callbackUrl: string;
}
const baseUrl =  "http://localhost:3000"

export default async function verifyOTP({
  otp,
  email,
  callbackUrl,
}: VerifyOTPParams) {
  const url = `${baseUrl}/api/auth/callback/email?callbackUrl=${baseUrl}${callbackUrl}&token=${otp}&email=${email}`;
  if (!email) throw new Error("Email not found");
  try {
    window.location.href = url;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
