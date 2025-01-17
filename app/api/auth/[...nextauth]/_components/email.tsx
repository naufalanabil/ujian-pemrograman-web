import {
  Tailwind,
  Html,
  Body,
  Head,
  Heading,
  Container,
  Section,
  Text,
  Preview,
  Link,
} from "@react-email/components";
import { render } from "@react-email/render";
export default async function Email({
  url,
  host,
}: {
  url: string;
  host: string;
}) {
  return {
    html: (otp?: string) =>
      render(
        <Tailwind>
          <Html>
            <Head />
            <Preview>Sign in to Literasi</Preview>
            <Body className="bg-white font-sans text-center">
              <Container className="bg-white border border-gray-300 rounded-lg mt-5 w-full max-w-md mx-auto p-12">
                <Text className="font-bold text-lg text-center">
                 Literasi
                </Text>
                <Heading className="text-center">
                  Your Authentication Code
                </Heading>

                <Section className="bg-black/5 rounded-md my-4 mx-auto w-[280px]">
                  <Heading className="text-black font-bold text-[32px] leading-[40px] tracking-[6px] py-2 text-center m-0">
                    {otp}
                  </Heading>
                </Section>

                <Text className="text-center text-red-500">Reminder:</Text>
                <Text className="text-gray-700 tracking-normal px-10 m-0 text-center">
                  This code is valid for 1 minutes.
                  Please do not share this code with anyone.
                </Text>
                <Text className="text-gray-700 tracking-normal px-10 m-0 text-center">
                  Not expecting this email?
                </Text>
                <Text className="text-gray-700 tracking-normal px-10 m-0 text-center">
                  Contact{" "}
                  <Link
                    href="mailto:support@jobaccepted.com"
                    className="text-gray-700 underline"
                  >
                    support@jobaccepted.com
                  </Link>{" "}
                  if you did not request this code.
                </Text>
              </Container>
            </Body>
          </Html>
        </Tailwind>
      ),

    text: `Sign in to literasi.vercel.app\nIf you did not request this email, you can safely ignore it.`,
  };
}
