// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req: NextRequest) {
//   const formData = await req.formData();
//   const file = formData.get("file");

//   if (!file || typeof file === "string") {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());

//   try {
//     const uploadResult = await new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream({ resource_type: "image" }, (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       }).end(buffer);
//     });
//     return NextResponse.json({ url: (uploadResult as any).secure_url });
//   } catch (error) {
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  // Ensure we got a File
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (err?: UploadApiErrorResponse, result?: UploadApiResponse) => {
          if (err) return reject(err);
          if (!result) return reject(new Error("Upload failed, no result returned"));
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error:unknown) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
