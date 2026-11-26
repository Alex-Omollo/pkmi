
from pathlib import Path
from PIL import Image, ImageOps
import argparse

SUPPORTED_FORMATS = {
    ".jpg", ".jpeg", ".png", ".bmp",
    ".tiff", ".tif", ".gif", ".ico"
}


def convert_image(source, output_dir, quality=85):
    try:
        with Image.open(source) as img:

            # Correct image orientation using EXIF metadata
            img = ImageOps.exif_transpose(img)

            # Handle transparency and preserve it in WebP
            if img.mode not in ("RGB", "RGBA"):
                img = img.convert(
                    "RGBA" if "transparency" in img.info else "RGB"
                )

            output_file = output_dir / f"{source.stem}.webp"

            img.save(
                output_file,
                "WEBP",
                quality=quality,
                method=6
            )

            print(f"Converted: {source.name} -> {output_file.name}")

    except Exception as e:
        print(f"Failed: {source.name} | {e}")


def main():
    parser = argparse.ArgumentParser(
        description="Convert images to WebP format"
    )

    parser.add_argument("input", help="Input folder")
    parser.add_argument(
        "-o", "--output",
        default="webp",
        help="Output folder (default: webp)"
    )
    parser.add_argument(
        "-q", "--quality",
        type=int,
        default=85,
        help="WebP quality (1-100, default: 85)"
    )

    args = parser.parse_args()

    if not 1 <= args.quality <= 100:
        parser.error("Quality must be between 1 and 100")

    input_dir = Path(args.input)
    output_dir = Path(args.output)

    if not input_dir.is_dir():
        parser.error("Input directory does not exist")

    output_dir.mkdir(parents=True, exist_ok=True)

    files = [
        file for file in input_dir.iterdir()
        if file.is_file()
        and file.suffix.lower() in SUPPORTED_FORMATS
    ]

    if not files:
        print("No supported images found.")
        return

    print(f"Found {len(files)} images.")

    for file in files:
        convert_image(file, output_dir, args.quality)

    print("\nConversion completed!")


if __name__ == "__main__":
    main()
