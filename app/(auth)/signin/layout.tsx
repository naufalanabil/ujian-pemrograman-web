import DialogLayout from "./_components/DialogLayout";
import OTPForm from "./_components/OtpForm";
import ReOpenDialog from "./_components/ReOpenDialog";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className=" grid place-items-center min-h-screen">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Enter Your Email</h2>
          {children}
          <p className="text-center">
            Already have a code? <ReOpenDialog />
          </p>
        </div>
      </section>
      <DialogLayout>
        <OTPForm />
      </DialogLayout>
    </>
  );
}
