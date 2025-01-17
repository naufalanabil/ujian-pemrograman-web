import Email from "@/app/api/auth/[...nextauth]/_components/email";
import { SendVerificationRequestParams } from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import prisma from "./db";
import { VerificationToken } from "next-auth/adapters";

async function sendVerificationRequest({
  identifier,
  url,
  provider,
}: SendVerificationRequestParams) {
  const { host } = new URL(url);
  const otp = new URL(url).searchParams.get("token");
  if (!otp) throw new Error("Token not found");
  const { html, text } = await Email({ url, host });

  const transport = await createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    html: await html(otp),
    text,
  });
  const failed = result.rejected.filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
};
async function createVerificationToken({
  identifier,
  token,
}: VerificationToken) {
  const ifExistToken = await prisma.verificationToken.findMany({
    where: {
      identifier: identifier?.toLowerCase() || identifier,
    },
  });
  if (ifExistToken) {
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: identifier?.toLowerCase() || identifier,
      },
    });
  }
  const oneMinute = new Date(Date.now() + 60 * 1000);

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: identifier?.toLowerCase() || identifier,
      email: identifier?.toLowerCase() || identifier,
      token: token,
      expires: oneMinute,
    },
  });
  return {
    identifier: verificationToken.identifier ?? "",
    token: verificationToken.token,
    expires: verificationToken.expires,
  };
}

async function generateVerificationToken() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export {
  sendVerificationRequest,
  createVerificationToken,
  generateVerificationToken,
};
