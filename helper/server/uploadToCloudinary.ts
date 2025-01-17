"use server";
import { cloudinary } from "@/lib/cld";
import { extractPublicId } from "cloudinary-build-url";

type CldProps = {
  file?: string | File;
  folder: string;
};

export default async function uploadToCloudinary({
  file,
  folder = "bookstore",
}: CldProps): Promise<{ public_id: string; secure_url: string }> {
  return new Promise((resolve, reject) => {
    if (typeof file === "string" && file.startsWith("data:image")) {
      cloudinary.uploader.upload(
        file,
        {
          folder,
          upload_preset: "test",
        },
        (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
          } else
            resolve({
              public_id: result?.public_id as string,
              secure_url: result?.secure_url as string,
            });
        }
      );
    } else if (file && file instanceof File) {
      file
        .arrayBuffer()
        .then((arrayBuffer) => {
          const buffer = Buffer.from(arrayBuffer);
          cloudinary.uploader
            .upload_stream(
              {
                folder,
                upload_preset: "test",
              },
              (error, result) => {
                if (error) {
                  console.log(error);
                  reject(error);
                } else
                  resolve({
                    public_id: result?.public_id as string,
                    secure_url: result?.secure_url as string,
                  });
              }
            )
            .end(buffer);
        })
        .catch(reject);
    }
  });
}
