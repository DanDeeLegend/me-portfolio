"""Generates the Dannybouy mascot SVGs in public/mascot/. Run: python3 scripts/make-mascot.py
Chunky chibi sticker: oversized head, tiny body, thick ink outline, flat colour with one shade tone, die-cut white border."""
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
    brows = {"smile": ("M96 118 Q110 108 126 114", "M174 114 Q190 108 204 118"),
             "wink": ("M96 118 Q110 108 126 114", "M174 108 Q190 100 204 110"),
             "wave": ("M96 114 Q110 104 126 110", "M174 110 Q190 104 204 114"),
             "confused": ("M96 122 Q110 112 126 108", "M174 106 Q190 108 204 122")}[mood]
    eye = lambda cx: (f'<ellipse cx="{cx}" cy="146" rx="11.5" ry="16" fill="{INK}"/>'
                      f'<circle cx="{cx+4}" cy="139" r="5.5" fill="#fff"/><circle cx="{cx-4}" cy="152" r="2.6" fill="#fff"/>')
    right_eye = f'<path d="M176 150 Q188 136 202 150" {st(6)}/>' if mood == "wink" else eye(188)
    mouth = {"smile": f'<path d="M132 180 Q152 196 174 178" {st(6)}/>',
             "wink": f'<path d="M130 178 Q152 206 176 176 Q152 186 130 178Z" fill="#fff" {st(5)[st(5).index("stroke="):]}/>',
             "wave": f'<path d="M130 176 Q152 212 176 176 Z" fill="#4d1a27" {st(5)[st(5).index("stroke="):]}/><ellipse cx="152" cy="196" rx="11" ry="6" fill="#e7788a"/>',
             "confused": f'<path d="M134 184 Q144 174 154 184 T174 182" {st(6)}/>'}[mood]
    scallops = [(64, 96), (82, 68), (112, 50), (150, 44), (188, 50), (218, 68), (236, 96), (246, 122)]
    hair_circles = "".join(f'<circle cx="{x}" cy="{y}" r="22" fill="{HAIR}" {st(5)[st(5).index("stroke="):]}/>' for x, y in scallops)
    return (
        f'<ellipse cx="60" cy="146" rx="17" ry="20" fill="{SKIN}" {st()[st().index("stroke="):]}/><ellipse cx="240" cy="146" rx="17" ry="20" fill="{SKIN}" {st()[st().index("stroke="):]}/>'
        f'<ellipse cx="150" cy="138" rx="98" ry="86" fill="{SHADE}"/>'
        f'<g clip-path="url(#headclip)"><ellipse cx="140" cy="128" rx="98" ry="84" fill="{SKIN}"/></g>'
        f'<ellipse cx="150" cy="138" rx="98" ry="86" fill="none" stroke="{INK}" stroke-width="{SW}"/>'
        f'{hair_circles}'
        f'<path d="M52 134 C44 70 96 34 150 34 C204 34 256 70 248 134 C242 106 216 92 192 88 C172 100 128 100 108 88 C84 92 58 106 52 134Z" fill="{HAIR}"/>'
        f'<path d="M52 134 C58 106 84 92 108 88 C128 100 172 100 192 88 C216 92 242 106 248 134" {st()}/>'
        f'<path d="M92 62 Q116 46 146 48" fill="none" stroke="{HAIR_HI}" stroke-width="7" stroke-linecap="round"/>'
        f'<path d="{brows[0]}" {st(7)}/><path d="{brows[1]}" {st(7)}/>'
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
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-14 10 328 312" width="328" height="312" role="img">{DEFS}'
            f'<g filter="url(#sticker)">{body(mood)}{head(mood)}{extras(mood)}</g></svg>')

out = pathlib.Path(__file__).resolve().parent.parent / "public" / "mascot"
for mood in ("smile", "wink", "wave", "confused"):
    (out / f"dannybouy-{mood}.svg").write_text(svg(mood))
