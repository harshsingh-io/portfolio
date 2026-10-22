
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
