from pathlib import Path
from PIL import Image, ImageOps

PAGES = ["on-stage", "on-set", "portraits", "lifestyle"]
SOURCE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}
SOURCE_ROOT = Path("photo-sources")
OUTPUT_ROOT = Path("public/images")


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
    source_folder = SOURCE_ROOT / page
    output_folder = OUTPUT_ROOT / page
    thumb_folder = output_folder / "thumbs"
    full_folder = output_folder / "full"

    if not source_folder.exists():
        return 0

    sources = sorted(
        file
        for file in source_folder.iterdir()
        if file.is_file() and file.suffix.lower() in SOURCE_EXTENSIONS
    )
    expected_outputs = {f"{source.stem}.webp" for source in sources}

    for output_directory in (thumb_folder, full_folder):
        output_directory.mkdir(parents=True, exist_ok=True)
        for output in output_directory.glob("*.webp"):
            if output.name not in expected_outputs:
                output.unlink()

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
