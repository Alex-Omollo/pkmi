
from pathlib import Path
from PIL import Image, ImageOps

# Main parent directory
SOURCE_DIR = Path("/home/samarai/Dev/pkmi/public/images/gallery")

# Separate output directory
OUTPUT_DIR = SOURCE_DIR.parent / f"{SOURCE_DIR.name}_optimized"

QUALITY = 90
MAX_WIDTH = None  # None keeps original dimensions

IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png",
    ".tiff", ".bmp"
}

total_original = 0
total_optimized = 0
processed = 0

for image_path in SOURCE_DIR.rglob("*"):

    if not image_path.is_file():
        continue

    if image_path.suffix.lower() not in IMAGE_EXTENSIONS:
        continue

    # Preserve relative folder structure
    relative_path = image_path.relative_to(SOURCE_DIR)

    output_path = (
        OUTPUT_DIR / relative_path
    ).with_suffix(".webp")

    output_path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    try:
        with Image.open(image_path) as image:

            image = ImageOps.exif_transpose(image)

            # Optional resizing
            if MAX_WIDTH and image.width > MAX_WIDTH:
                new_height = round(
                    image.height * MAX_WIDTH / image.width
                )

                image = image.resize(
                    (MAX_WIDTH, new_height),
                    Image.Resampling.LANCZOS
                )

            # Preserve transparency
            if "A" in image.getbands():
                image = image.convert("RGBA")
            else:
                image = image.convert("RGB")

            image.save(
                output_path,
                "WEBP",
                quality=QUALITY,
                method=6
            )

        original_size = image_path.stat().st_size
        optimized_size = output_path.stat().st_size

        total_original += original_size
        total_optimized += optimized_size
        processed += 1

        reduction = (
            1 - optimized_size / original_size
        ) * 100

        print(
            f"{relative_path}: "
            f"{original_size / 1024:.1f} KB -> "
            f"{optimized_size / 1024:.1f} KB "
            f"({reduction:.1f}% saved)"
        )

    except Exception as error:
        print(f"ERROR: {image_path}: {error}")

print("\n========== SUMMARY ==========")
print(f"Images processed: {processed}")
print(f"Original: {total_original / 1024**2:.2f} MB")
print(f"Optimized: {total_optimized / 1024**2:.2f} MB")

if total_original:
    saved = (
        1 - total_optimized / total_original
    ) * 100

    print(f"Space saved: {saved:.2f}%")

print(f"Output directory: {OUTPUT_DIR}")
