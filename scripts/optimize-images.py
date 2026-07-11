from pathlib import Path
from PIL import Image, ImageOps

PAGES = ["on-stage", "on-set", "portraits", "lifestyle"]
SOURCE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}
IMAGE_ROOT = Path("public/images")


def resize_to_width(image, max_width):
    width, height = image.size

    if width <= max_width:
        return image.copy()

    new_height = round(height * (max_width / width))
    return image.resize((max_width, new_height), Image.Resampling.LANCZOS)


def save_webp(image, destination, quality):
    destination.parent.mkdir(parents=True, exist_ok=True)

    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGB")

    image.save(destination, "WEBP", quality=quality, method=6)


def optimize_page(page):
    folder = IMAGE_ROOT / page
    thumb_folder = folder / "thumbs"
    full_folder = folder / "full"

    if not folder.exists():
        return 0

    sources = sorted(
        file
        for file in folder.iterdir()
        if file.is_file() and file.suffix.lower() in SOURCE_EXTENSIONS
    )

    for source in sources:
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original)
            thumb = resize_to_width(image, 700)
            full = resize_to_width(image, 2200)

            output_name = f"{source.stem}.webp"
            save_webp(thumb, thumb_folder / output_name, quality=78)
            save_webp(full, full_folder / output_name, quality=86)

    return len(sources)


def main():
    for page in PAGES:
        count = optimize_page(page)
        print(f"{page}: optimized {count} source photo(s)")


if __name__ == "__main__":
    main()
