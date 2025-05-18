const fs = require("fs")
const path = require("path")

const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars")

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
  console.log("Created upload directory:", uploadDir)
} else {
  console.log("Upload directory already exists:", uploadDir)
}
