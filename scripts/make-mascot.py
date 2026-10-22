"""Generates the Dannybouy mascot SVGs in public/mascot/. Run: python3 scripts/make-mascot.py
Chunky chibi sticker: oversized head, tiny body, thick ink outline, flat colour with one shade tone, die-cut white border."""
import math
import pathlib

INK, SKIN, SHADE, BLUSH = "#1b1420", "#8f5b38", "#6c4228", "#c4704a"
HAIR, HAIR_HI = "#1a1512", "#52443b"
PINK, PINK_D, LIME = "#f4a9c0", "#d97c9b", "#c8ff3d"
SW = 6  # outline width

def st(w=SW, fill="none"):
    return f'fill="{fill}" stroke="{INK}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"'

DEFS = f"""<defs>
<filter id="sticker" x="-15%" y="-15%" width="130%" height="130%">
  <feMorphology in="SourceAlpha" operator="dilate" radius="9" result="d"/>
  <feFlood flood-color="#ffffff"/><feComposite in2="d" operator="in" result="w"/>
  <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity=".35" in="w" result="s"/>
  <feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>
<pattern id="plaid" width="24" height="24" patternUnits="userSpaceOnUse">
  <rect width="24" height="24" fill="{PINK}"/>
  <rect x="10" width="5" height="24" fill="#fff" opacity=".8"/><rect y="10" width="24" height="5" fill="#fff" opacity=".8"/>
  <rect x="2" width="2" height="24" fill="{PINK_D}" opacity=".7"/><rect y="2" width="24" height="2" fill="{PINK_D}" opacity=".7"/>
</pattern>
<clipPath id="headclip"><ellipse cx="150" cy="138" rx="98" ry="86"/></clipPath>
</defs>"""

def body(mood):
    out = []
    if mood == "wave":  # raised arm drawn first so the head overlaps it
        out.append(f'<path d="M104 250 C60 244 24 214 22 168 L52 164 C56 194 78 212 112 222Z" fill="url(#plaid)" {st()[st().index("stroke="):]}/>')
        out.append(f'<circle cx="30" cy="140" r="21" fill="{SKIN}" {st()[st().index("stroke="):]}/>')
        out.append(f'<path d="M12 124 L4 108 M28 118 L26 98 M44 122 L52 106" {st(5)}/>')
    else:
        out.append(f'<ellipse cx="86" cy="262" rx="17" ry="30" fill="url(#plaid)" {st()[st().index("stroke="):]}/>')
        out.append(f'<circle cx="84" cy="292" r="13" fill="{SKIN}" {st()[st().index("stroke="):]}/>')
    out.append(f'<ellipse cx="214" cy="262" rx="17" ry="30" fill="url(#plaid)" {st()[st().index("stroke="):]}/>')
    out.append(f'<circle cx="216" cy="292" r="13" fill="{SKIN}" {st()[st().index("stroke="):]}/>')
    out.append(f'<path d="M96 296 L96 254 Q96 226 124 222 L176 222 Q204 226 204 254 L204 296 Z" fill="url(#plaid)" {st()[st().index("stroke="):]}/>')
    out.append(f'<path d="M126 222 L150 260 L174 222 Z" fill="#fff" {st(5)[st(5).index("stroke="):]}/>')
    out.append(f'<path d="M122 224 L142 268 M178 224 L158 268" {st(5)}/>')
    out.append(f'<path d="M142 226 h16 l3 11 h-22z" fill="{INK}" {st(4)[st(4).index("stroke="):]}/><path d="M145 238 h10 l5 42 l-10 10 l-10 -10z" fill="{INK}" {st(4)[st(4).index("stroke="):]}/>')
    out.append(f'<circle cx="182" cy="254" r="5.5" fill="#f2c94c" stroke="{INK}" stroke-width="3"/>')
    return "".join(out)

def head(mood):
    brows = {"smile": ("M94 124 Q110 117 128 122", "M172 122 Q190 117 206 124"),
             "wink": ("M94 124 Q110 117 128 122", "M172 114 Q190 106 206 114"),
             "wave": ("M94 120 Q110 112 128 118", "M172 118 Q190 112 206 120"),
             "confused": ("M94 128 Q110 120 128 116", "M172 112 Q190 114 206 128")}[mood]
    eye = lambda cx: (f'<ellipse cx="{cx}" cy="148" rx="10.5" ry="14.5" fill="{INK}"/>'
                      f'<circle cx="{cx+4}" cy="139" r="5.5" fill="#fff"/><circle cx="{cx-4}" cy="152" r="2.6" fill="#fff"/>')
    right_eye = f'<path d="M176 150 Q188 136 202 150" {st(6)}/>' if mood == "wink" else eye(188)
    mouth = {"smile": f'<path d="M132 182 Q150 194 172 178 Q176 176 178 172" {st(6)}/>',
             "wink": f'<path d="M130 178 Q152 206 176 176 Q152 186 130 178Z" fill="#fff" {st(5)[st(5).index("stroke="):]}/>',
             "wave": f'<path d="M130 176 Q152 212 176 176 Z" fill="#4d1a27" {st(5)[st(5).index("stroke="):]}/><ellipse cx="152" cy="196" rx="11" ry="6" fill="#e7788a"/>',
             "confused": f'<path d="M134 184 Q144 174 154 184 T174 182" {st(6)}/>'}[mood]
    cx, cy, R = 150, 128, 100
    scallops = [(cx + R * math.cos(math.radians(t)), cy + R * math.sin(math.radians(t))) for t in range(196, 345, 12)]
    hair_circles = "".join(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="17" fill="{HAIR}" {st(5)[st(5).index("stroke="):]}/>' for x, y in scallops)
    return (
        f'<ellipse cx="60" cy="148" rx="17" ry="21" fill="{SKIN}" {st()[st().index("stroke="):]}/><ellipse cx="240" cy="148" rx="17" ry="21" fill="{SKIN}" {st()[st().index("stroke="):]}/>'
        f'<path d="M56 140 Q52 150 58 158 M244 140 Q248 150 242 158" fill="none" stroke="{SHADE}" stroke-width="4" stroke-linecap="round"/>'
        f'<ellipse cx="150" cy="138" rx="98" ry="86" fill="{SHADE}"/>'
        f'<g clip-path="url(#headclip)"><ellipse cx="140" cy="128" rx="98" ry="84" fill="{SKIN}"/></g>'
        f'<ellipse cx="150" cy="138" rx="98" ry="86" fill="none" stroke="{INK}" stroke-width="{SW}"/>'
        f'{hair_circles}'
        f'<path d="M54 142 C44 78 98 40 150 40 C202 40 256 78 246 142 C242 122 232 108 214 102 C196 108 172 106 150 104 C128 106 104 108 86 102 C68 108 58 122 54 142Z" fill="{HAIR}"/>'
        f'<path d="M54 142 C58 122 68 108 86 102 C104 108 128 106 150 104 C172 106 196 108 214 102 C232 108 242 122 246 142" {st()}/>'
        f'<path d="M100 62 Q122 50 150 52" fill="none" stroke="{HAIR_HI}" stroke-width="7" stroke-linecap="round"/>'
        f'<path d="{brows[0]}" {st(8)}/><path d="{brows[1]}" {st(8)}/>'
        f'{eye(112)}{right_eye}'
        f'<path d="M144 166 Q150 172 157 166" fill="none" stroke="{SHADE}" stroke-width="5" stroke-linecap="round"/>'
        f'<ellipse cx="84" cy="176" rx="14" ry="8" fill="{BLUSH}" opacity=".6"/><ellipse cx="216" cy="176" rx="14" ry="8" fill="{BLUSH}" opacity=".6"/>'
        f'{mouth}')

def extras(mood):
    star = f'<path d="M262 40 L269 60 L289 67 L269 74 L262 94 L255 74 L235 67 L255 60Z" fill="{LIME}" stroke="{INK}" stroke-width="4.5" stroke-linejoin="round"/>'
    if mood in ("smile", "wink", "wave"):
        return star
    q = "M244 64 C242 36 284 34 284 62 C284 82 262 82 262 104"
    return (f'<path d="{q}" fill="none" stroke="{INK}" stroke-width="16" stroke-linecap="round"/>'
            f'<path d="{q}" fill="none" stroke="{LIME}" stroke-width="8" stroke-linecap="round"/>'
            f'<circle cx="262" cy="124" r="7.5" fill="{LIME}" stroke="{INK}" stroke-width="4.5"/>')

def svg(mood):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-14 0 328 322" width="328" height="322" role="img">{DEFS}'
            f'<g filter="url(#sticker)">{body(mood)}{head(mood)}{extras(mood)}</g></svg>')

out = pathlib.Path(__file__).resolve().parent.parent / "public" / "mascot"
for mood in ("smile", "wink", "wave", "confused"):
    (out / f"dannybouy-{mood}.svg").write_text(svg(mood))

# Head-only avatar for tiny sizes (nav logo): no sticker filter or plaid, tight crop, so it stays crisp at 40px.
AVATAR_DEFS = '<defs><clipPath id="headclip"><ellipse cx="150" cy="138" rx="98" ry="86"/></clipPath></defs>'
avatar = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="38 18 224 212" width="224" height="212" role="img">'
          f'{AVATAR_DEFS}{head("smile")}</svg>')
(out / "dannybouy-avatar.svg").write_text(avatar)
