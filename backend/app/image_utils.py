import uuid  # For generating unique file name
from io import BytesIO # Working with image bytes in memory
from pathlib import Path # For file operations

from PIL import Image, ImageOps

# Pillow is a CPUBound Task and it will block the event loop in async condition
# So we need to write our functions here as synchronus functions and run using thread 

PROFILE_PICS_DIR = Path("media/profile_pics")

## Process Image Function
def process_profile_image(content: bytes) -> str:
    with Image.open(BytesIO(content)) as original:
        img = ImageOps.exif_transpose(original) # fix orentation issue

        img = ImageOps.fit(img, (300, 300), method=Image.Resampling.LANCZOS) # crop to 300x300 pixels

        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGB")

        filename = f"{uuid.uuid4().hex}.jpg"
        filepath = PROFILE_PICS_DIR / filename

        PROFILE_PICS_DIR.mkdir(parents=True, exist_ok=True)

        img.save(filepath, "JPEG", quality=85, optimize=True)

    return filename


## Delete Profile Image Function
def delete_profile_image(filename: str | None) -> None:
    if filename is None:
        return

    filepath = PROFILE_PICS_DIR / filename
    if filepath.exists():
        filepath.unlink() # deletion