import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

async function convertLogo() {
  const svgPath = path.join(process.cwd(), "public/images/PierTronic_Logo.svg");
  const outputDir = path.join(process.cwd(), "public/images");

  try {
    // Read the SVG file
    const svgBuffer = await fs.readFile(svgPath);

    console.log("📦 Converting PierTronic_Logo.svg...");

    // Convert to PNG (1200x630 for Open Graph - standard social media size)
    const pngPath = path.join(outputDir, "PierTronic_Logo.png");
    await sharp(svgBuffer)
      .resize(1200, 630, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 }, // white background
      })
      .png({ quality: 95 })
      .toFile(pngPath);
    console.log(`✅ Created: ${pngPath}`);

    // Convert to WebP for better compression
    const webpPath = path.join(outputDir, "PierTronic_Logo.webp");
    await sharp(svgBuffer)
      .resize(1200, 630, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 }, // white background
      })
      .webp({ quality: 95 })
      .toFile(webpPath);
    console.log(`✅ Created: ${webpPath}`);

    console.log("\n🎉 Logo conversion complete!");
    console.log("\n📝 Update your layout.tsx openGraph.images to:");
    console.log(`
      images: [
        {
          url: "/images/PierTronic_Logo.png",
          width: 1200,
          height: 630,
          alt: "Pier-Tronic Logo",
        },
      ],
    `);
  } catch (error) {
    console.error("❌ Error converting logo:", error);
    process.exit(1);
  }
}

convertLogo();
