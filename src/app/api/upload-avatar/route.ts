import { writeFile } from "fs/promises"
import { NextResponse } from "next/server"
import { join } from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("avatar") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create a unique filename
    const timestamp = Date.now()
    const filename = `avatar-${timestamp}.webp`

    // Define the upload path (adjust this path according to your project structure)
    const uploadDir = join(process.cwd(), "public", "uploads", "avatars")
    const filepath = join(uploadDir, filename)

    // Save the file
    await writeFile(filepath, buffer)

    // Return the URL path to the uploaded file
    const imageUrl = `/uploads/avatars/${filename}`

    return NextResponse.json({
      success: true,
      imageUrl,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 })
  }
}
