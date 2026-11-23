
from pathlib import Path

# Change this to your main images directory
ROOT_DIR = Path("/home/samarai/Dev/pkmi/gallery-originals")

IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".webp",
    ".gif", ".bmp", ".tiff", ".svg"
}

PREVIEW_ONLY = True  # Change to False to perform renaming

for folder in sorted(ROOT_DIR.rglob("*")):
    if not folder.is_dir():
        continue

    images = sorted(
        file for file in folder.iterdir()
        if file.is_file()
        and file.suffix.lower() in IMAGE_EXTENSIONS
    )

    for index, image in enumerate(images, start=1):

        new_name = f"{folder.name}-{index}{image.suffix.lower()}"
        new_path = folder / new_name

        if image.name == new_name:
            continue

        if new_path.exists():
            print(f"CONFLICT: {new_path}")
            continue

        print(f"{image.name} -> {new_name}")

        if not PREVIEW_ONLY:
            image.rename(new_path)

print("\nProcessing complete.")
