import os
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

random.seed(7)

BLACK = (11, 11, 10)
BLACK_SOFT = (20, 20, 18)
ECRU = (239, 234, 225)
STONE = (168, 162, 155)
CHARCOAL = (43, 41, 38)

SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"

OUT = "/home/claude/noir/public/images"


def grain(img, amount=10):
    """Subtle film-grain style noise so flat placeholders don't look dead-flat."""
    w, h = img.size
    noise = Image.effect_noise((w, h), amount).convert("L")
    noise = noise.point(lambda p: 128 + (p - 128) * 0.35)
    base = img.convert("RGB")
    out = Image.blend(base, Image.merge("RGB", (noise, noise, noise)), 0.05)
    return out


def vignette(img, strength=0.55):
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([-w * 0.3, -h * 0.3, w * 1.3, h * 1.3], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(w * 0.18))
    dark = Image.new("RGB", (w, h), BLACK)
    return Image.composite(img, dark, mask.point(lambda p: int(p * strength) + int(255 * (1 - strength))))


def diagonal_field(size, c1, c2, angle_bias=0.0):
    """Soft directional tonal field, not a gradient blob — reads as studio lighting."""
    w, h = size
    img = Image.new("RGB", size, c1)
    px = img.load()
    for y in range(0, h, 2):
        t = (y / h) * 0.7 + angle_bias
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        for x in range(0, w, 2):
            px[x, y] = (r, g, b)
            if x + 1 < w:
                px[x + 1, y] = (r, g, b)
            if y + 1 < h:
                px[x, y + 1] = (r, g, b)
                if x + 1 < w:
                    px[x + 1, y + 1] = (r, g, b)
    return img.filter(ImageFilter.GaussianBlur(3))


def fabric_weave(size, base, thread):
    """Macro fabric-weave texture for the FABRIC scene — actual woven pattern, not noise."""
    w, h = size
    img = Image.new("RGB", size, base)
    d = ImageDraw.Draw(img)
    spacing = max(6, w // 90)
    for x in range(-h, w, spacing):
        d.line([(x, 0), (x + h, h)], fill=thread, width=2)
    for x in range(0, w + h, spacing):
        d.line([(x, 0), (x - h, h)], fill=tuple(max(0, c - 8) for c in thread), width=1)
    img = img.filter(ImageFilter.GaussianBlur(1.1))
    return img


def label(img, lines, position="bottom-left", color=ECRU, size_ratio=0.028, font_path=SANS, tracking=2, pad_ratio=0.06):
    w, h = img.size
    draw = ImageDraw.Draw(img)
    fsize = max(14, int(h * size_ratio))
    font = ImageFont.truetype(font_path, fsize)
    pad = int(min(w, h) * pad_ratio)

    total_h = 0
    line_sizes = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        lw, lh = bbox[2] - bbox[0], bbox[3] - bbox[1]
        line_sizes.append((lw, lh))
        total_h += lh + 10

    if "bottom" in position:
        y = h - pad - total_h
    elif "top" in position:
        y = pad
    else:
        y = (h - total_h) / 2

    for line, (lw, lh) in zip(lines, line_sizes):
        if "left" in position:
            x = pad
        elif "right" in position:
            x = w - pad - lw
        else:
            x = (w - lw) / 2

        if tracking > 0:
            cx = x
            for ch in line:
                draw.text((cx, y), ch, font=font, fill=color)
                cw = draw.textbbox((0, 0), ch, font=font)[2]
                cx += cw + tracking
        else:
            draw.text((x, y), line, font=font, fill=color)
        y += lh + 10
    return img


def save(img, path, quality=82):
    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    img.convert("RGB").save(full, "JPEG", quality=quality)
    print("wrote", full, img.size)


# ---------------------------------------------------------------------------
# EDITORIAL — cover + story scenes
# ---------------------------------------------------------------------------

cover = diagonal_field((1600, 2000), BLACK_SOFT, BLACK, angle_bias=0.05)
cover = vignette(cover, 0.7)
cover = grain(cover, 14)
label(cover, ["PLACEHOLDER — REPLACE WITH", "COVER EDITORIAL PHOTOGRAPHY"], "bottom-left")
save(cover, "editorial/cover-01.jpg")

story1 = diagonal_field((1400, 1750), CHARCOAL, BLACK, angle_bias=0.1)
story1 = grain(vignette(story1, 0.65), 12)
label(story1, ["PLACEHOLDER —", "EDITORIAL STORY / FRAME A"], "bottom-left")
save(story1, "editorial/story-01.jpg")

story2 = diagonal_field((1200, 1500), BLACK_SOFT, CHARCOAL, angle_bias=0.2)
story2 = grain(vignette(story2, 0.6), 12)
label(story2, ["PLACEHOLDER —", "EDITORIAL STORY / FRAME B"], "bottom-right")
save(story2, "editorial/story-02.jpg")

collection_intro = diagonal_field((1800, 1200), BLACK, BLACK_SOFT, angle_bias=0.0)
collection_intro = grain(vignette(collection_intro, 0.75), 10)
label(collection_intro, ["PLACEHOLDER —", "COLLECTION INTRO WIDE"], "bottom-left")
save(collection_intro, "editorial/collection-intro.jpg")

# ---------------------------------------------------------------------------
# FABRIC — macro weave sequence (used for the scroll-scrubbed reveal)
# ---------------------------------------------------------------------------

fabric_macro = fabric_weave((1600, 1600), (35, 33, 30), (58, 54, 48))
fabric_macro = grain(fabric_macro, 18)
label(fabric_macro, ["PLACEHOLDER —", "FABRIC MACRO DETAIL"], "bottom-left", color=STONE)
save(fabric_macro, "fabric/wool-macro-01.jpg")

fabric_wide = fabric_weave((1800, 1100), (30, 28, 26), (52, 48, 43))
fabric_wide = grain(fabric_wide, 15)
label(fabric_wide, ["PLACEHOLDER —", "FABRIC WIDE / MID REVEAL"], "bottom-left", color=STONE)
save(fabric_wide, "fabric/wool-macro-02.jpg")

# ---------------------------------------------------------------------------
# PRODUCTS — jacket / trousers / shoes, 2-3 angles each, square-ish crops
# ---------------------------------------------------------------------------

product_specs = [
    ("jacket-01", "THE JACKET", "FRONT"),
    ("jacket-02", "THE JACKET", "DETAIL"),
    ("jacket-03", "THE JACKET", "BACK"),
    ("trousers-01", "THE TROUSERS", "FRONT"),
    ("trousers-02", "THE TROUSERS", "DETAIL"),
    ("shoes-01", "THE SHOES", "SIDE"),
    ("shoes-02", "THE SHOES", "DETAIL"),
]

for fname, name, angle in product_specs:
    img = diagonal_field((1200, 1500), ECRU, (214, 208, 197), angle_bias=0.15)
    img = grain(img, 6)
    label(img, ["PLACEHOLDER", name, angle], "bottom-left", color=BLACK, tracking=1)
    save(img, f"products/{fname}.jpg", quality=88)

# ---------------------------------------------------------------------------
# LOOKS — full-height outfit shot
# ---------------------------------------------------------------------------

look = diagonal_field((1400, 1900), BLACK_SOFT, BLACK, angle_bias=0.08)
look = grain(vignette(look, 0.68), 13)
label(look, ["PLACEHOLDER —", "LOOK 01 / FULL OUTFIT"], "bottom-left")
save(look, "looks/look-01.jpg")

print("done")
