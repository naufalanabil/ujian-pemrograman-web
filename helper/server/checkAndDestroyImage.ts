import { cloudinary } from "@/lib/cld";
import { extractPublicId } from "cloudinary-build-url";

async function checkAndDestroyImage(url: string) {
    const publicId = extractPublicId(url);
  
    if (publicId) {
      try {
        // Check if resource exists first
        const resource = await cloudinary.api.resource(publicId);
      
        // Then destroy it
        await cloudinary.uploader.destroy(publicId);
         } catch (error) {
        console.error(
          `Failed to delete image with public ID ${publicId}:`,
          error
        );
      }
    }
  }

  export default checkAndDestroyImage;  