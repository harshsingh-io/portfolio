
## portrait-source.webp → public/img/portrait-{320,400,760}.{avif,webp}

Background-removed cut-out, 1166x1349. Regenerate with:

```
crop box (61, 54, 1097, 1349)        # 1036x1295 = 4:5, centred on the subject,
                                     # bottom-aligned because he is cut at the
                                     # waist — padding below floats a severed torso
per-channel LUT  v -> v*0.80 + 30    # shadow lift so the navy blazer clears the
                                     # dark page: 1.29:1 -> 1.69:1, midtones and
                                     # the face untouched. Applied to RGB, not as
                                     # grayscale, so the CSS hover can reveal colour.
cwebp  -q 84 -alpha_q 100
avifenc -q 64 -s 4
```

Do not re-crop without re-measuring against `--paper` in dark mode. The whole
reason this asset exists is that the previous one measured 1.29:1 and vanished.

## about-source.webp → img/about-{430,860}.webp

The About photograph. 1086x1448, which is already 3:4, so there is no crop —
the previous asset was square and the square was a crop, not the picture.
Regenerate with:

```
Lanczos resize to 430 and 860 wide    # the plate is 4 of 12 columns, ~330 CSS px
cwebp -q 82                           # 24 KB / 95 KB, both loading="lazy"
```

Grayscale and the +4% contrast are CSS, not baked, so the hex in the file still
matches what a colour treatment would need. Unlike the hero portrait this one
has its own background and needs no shadow lift: mean luminance 109/255 against
a `--surface` plate in either theme.
