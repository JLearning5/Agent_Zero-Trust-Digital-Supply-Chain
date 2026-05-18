from __future__ import annotations

from pathlib import Path
from typing import Iterable

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "papers"

PAGE_WIDTH = 1240
PAGE_HEIGHT = 1754
MARGIN_X = 90
MARGIN_Y = 90
CONTENT_WIDTH = PAGE_WIDTH - (MARGIN_X * 2)

FONT_PATH = Path(r"C:\Windows\Fonts\arial.ttf")
FONT_BOLD_PATH = Path(r"C:\Windows\Fonts\arialbd.ttf")

TITLE_FONT = ImageFont.truetype(str(FONT_BOLD_PATH), 42)
SUBTITLE_FONT = ImageFont.truetype(str(FONT_PATH), 24)
HEADING_FONT = ImageFont.truetype(str(FONT_BOLD_PATH), 26)
BODY_FONT = ImageFont.truetype(str(FONT_PATH), 22)
SMALL_FONT = ImageFont.truetype(str(FONT_PATH), 18)

BACKGROUND = "#07111f"
CARD = "#0d1a2e"
BORDER = "#18314f"
ACCENT = "#53d4ff"
TEXT = "#eef6ff"
MUTED = "#a8bbd4"

STUDIES = [
    {
        "filename": "solarwinds-archive-brief.pdf",
        "title": "SolarWinds Supply Chain Attack",
        "subtitle": "Archived case brief for Zero Trust Digital Supply Chain Security",
        "sections": [
            (
                "Overview",
                [
                    "In December 2020, investigators disclosed that attackers had compromised the SolarWinds Orion software build environment and inserted the SUNBURST backdoor into legitimate product updates. The malicious updates were then signed and distributed through trusted vendor channels, giving the campaign extraordinary reach across government and private sector environments.",
                    "The attack is a defining supply chain incident because it turned standard software maintenance into the intrusion path. Victims did not simply trust a vendor brand; they trusted signed updates, operational runbooks, and management tooling that had long been considered routine.",
                ],
            ),
            (
                "Attack Chain",
                [
                    "1. The threat actor gained deep access to SolarWinds' build and release workflow.",
                    "2. Malicious code was inserted into Orion updates before they were signed and shipped.",
                    "3. Customers installed the update through ordinary maintenance processes.",
                    "4. The backdoor enabled command-and-control traffic and follow-on privilege abuse inside victim environments.",
                ],
            ),
            (
                "Why Zero Trust Matters",
                [
                    "SolarWinds demonstrates that trusted software should still be isolated, observed, and policy-constrained. Zero Trust practices such as microsegmentation, identity-aware service access, strict outbound allow lists, and continuous behavioral monitoring reduce the blast radius even when a signed vendor update is compromised.",
                    "Management platforms are especially sensitive because they often hold privileged visibility across broad environments. A mature architecture treats these tools as high-risk resources, not permanently trusted infrastructure.",
                ],
            ),
            (
                "Reference Sources",
                [
                    "FERC, SolarWinds and Related Supply Chain Compromise White Paper: https://www.ferc.gov/sites/default/files/2021-07/SolarWinds%20and%20RelatedSupply%20Chain%20Compromise%20White%20Paper_1.pdf",
                    "New York DFS, DFS Issues Report on the SolarWinds Supply Chain Attack: https://www.dfs.ny.gov/reports_and_publications/press_releases/pr202104271",
                ],
            ),
        ],
    },
    {
        "filename": "kaseya-archive-brief.pdf",
        "title": "Kaseya VSA Ransomware Attack",
        "subtitle": "Archived case brief for Zero Trust Digital Supply Chain Security",
        "sections": [
            (
                "Overview",
                [
                    "In July 2021, the REvil ransomware group exploited vulnerabilities in Kaseya VSA, a remote monitoring and management platform used heavily by managed service providers. The attack propagated through administrative tooling that MSPs relied on to manage downstream customer environments, allowing a single compromise path to affect many organizations at once.",
                    "Kaseya shows why supply chain risk includes service operators and remote management planes, not only software packages. Once the management path was compromised, administrative trust relationships became the delivery mechanism for ransomware.",
                ],
            ),
            (
                "Attack Chain",
                [
                    "1. Attackers exploited flaws affecting on-premise Kaseya VSA servers.",
                    "2. The management platform's broad administrative reach amplified the attack across MSP customer estates.",
                    "3. Malicious payloads were deployed using the same channel defenders used for normal administration.",
                    "4. Ransomware activity targeted business continuity and recovery paths to raise pressure on victims.",
                ],
            ),
            (
                "Why Zero Trust Matters",
                [
                    "A Zero Trust design would treat MSP tooling as privileged infrastructure that requires segmented placement, just-in-time access, strong session monitoring, and explicit policy boundaries between management networks and production workloads.",
                    "The incident also reinforces the need for extra verification when high-impact software or administrative changes originate from third-party systems, even when those systems are already approved vendors.",
                ],
            ),
            (
                "Reference Sources",
                [
                    "FortiGuard Outbreak Alert, Kaseya VSA Attack: https://filestore.fortinet.com/fortiguard/outbreak_alert/kaseya_vsa_attack/report.pdf",
                    "Kaseya Security Incident Overview: https://helpdesk.kaseya.com/hc/en-gb/articles/4403440681361-Kaseya-VSA-SaaS-On-Premises-Security-Incident-Overview",
                ],
            ),
        ],
    },
    {
        "filename": "codecov-archive-brief.pdf",
        "title": "Codecov Bash Uploader Breach",
        "subtitle": "Archived case brief for Zero Trust Digital Supply Chain Security",
        "sections": [
            (
                "Overview",
                [
                    "In April 2021, Codecov disclosed that attackers had modified its Bash Uploader script and were exfiltrating environment variables from customer CI environments. Because the uploader was embedded in routine build workflows, the compromise reached developer pipelines, secrets, and service credentials that were never meant to leave the build system.",
                    "This case is especially important for modern software supply chain security because it shows how build tooling itself can become the attack surface. The breach did not require compromise of the final application artifact first; it targeted the software factory that produced and validated those artifacts.",
                ],
            ),
            (
                "Attack Chain",
                [
                    "1. An attacker gained unauthorized ability to modify the Bash Uploader script.",
                    "2. The changed script silently exported CI environment data to attacker-controlled infrastructure.",
                    "3. Integrations that relied on the uploader inherited the same risk path across customer pipelines.",
                    "4. Leaked tokens and secrets created secondary exposure beyond the initial CI job.",
                ],
            ),
            (
                "Why Zero Trust Matters",
                [
                    "Zero Trust principles must extend into build systems, automation runners, and software release pipelines. Integrity verification, ephemeral credentials, restricted secret scope, and explicit provenance checks help keep CI/CD from acting as an invisible trust bridge.",
                    "Codecov is a reminder that 'internal' developer tooling is still a resource boundary. Policy should account for what a build job can read, where it can send data, and how changes to third-party tooling are validated before execution.",
                ],
            ),
            (
                "Reference Sources",
                [
                    "Codecov Security Update: https://about.codecov.io/security-update/",
                    "Unit 42 Threat Brief, Codecov Bash Uploader: https://unit42.paloaltonetworks.com/codecov-bash-uploader/",
                ],
            ),
        ],
    },
]


def line_height(font: ImageFont.FreeTypeFont) -> int:
    return font.size + 10


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""

    for word in words:
        candidate = word if not current else f"{current} {word}"
        box = draw.textbbox((0, 0), candidate, font=font)
        if box[2] - box[0] <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word

    if current:
        lines.append(current)

    return lines


def create_page() -> tuple[Image.Image, ImageDraw.ImageDraw, int]:
    image = Image.new("RGB", (PAGE_WIDTH, PAGE_HEIGHT), BACKGROUND)
    draw = ImageDraw.Draw(image)

    draw.rounded_rectangle(
        (40, 40, PAGE_WIDTH - 40, PAGE_HEIGHT - 40),
        radius=28,
        outline=BORDER,
        width=3,
        fill=BACKGROUND,
    )

    draw.text((MARGIN_X, MARGIN_Y - 20), "Zero Trust Digital Supply Chain Security", font=SMALL_FONT, fill=ACCENT)
    return image, draw, MARGIN_Y + 40


def ensure_space(
    pages: list[Image.Image],
    image: Image.Image,
    draw: ImageDraw.ImageDraw,
    y: int,
    required: int,
) -> tuple[Image.Image, ImageDraw.ImageDraw, int]:
    if y + required <= PAGE_HEIGHT - MARGIN_Y:
        return image, draw, y

    pages.append(image)
    return create_page()


def draw_paragraphs(
    draw: ImageDraw.ImageDraw,
    paragraphs: Iterable[str],
    y: int,
) -> int:
    for paragraph in paragraphs:
        lines = wrap_text(draw, paragraph, BODY_FONT, CONTENT_WIDTH)
        for line in lines:
            draw.text((MARGIN_X, y), line, font=BODY_FONT, fill=TEXT)
            y += line_height(BODY_FONT)
        y += 12
    return y


def build_pdf(study: dict[str, object]) -> None:
    pages: list[Image.Image] = []
    image, draw, y = create_page()

    draw.text((MARGIN_X, y), study["title"], font=TITLE_FONT, fill=TEXT)
    y += 70
    draw.text((MARGIN_X, y), study["subtitle"], font=SUBTITLE_FONT, fill=MUTED)
    y += 55

    for heading, paragraphs in study["sections"]:
        required_height = 140 + (len(paragraphs) * 110)
        image, draw, y = ensure_space(pages, image, draw, y, required_height)

        draw.rounded_rectangle(
            (MARGIN_X, y - 12, PAGE_WIDTH - MARGIN_X, y + 38),
            radius=16,
            fill=CARD,
            outline=BORDER,
            width=2,
        )
        draw.text((MARGIN_X + 20, y), heading, font=HEADING_FONT, fill=ACCENT)
        y += 70
        y = draw_paragraphs(draw, paragraphs, y)
        y += 18

    draw.text((MARGIN_X, PAGE_HEIGHT - 80), "Prepared for site reference and offline reading.", font=SMALL_FONT, fill=MUTED)
    pages.append(image)

    output_path = OUTPUT_DIR / str(study["filename"])
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    pages[0].save(output_path, save_all=True, append_images=pages[1:], resolution=150.0)


def main() -> None:
    for study in STUDIES:
      build_pdf(study)


if __name__ == "__main__":
    main()
