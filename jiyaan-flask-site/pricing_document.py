"""Builds the single pricing document that the chatbot is allowed to answer from.

The document is generated from the same SQLite rows that power the pricing
section of the website, so the site and the chatbot always show the same fees.
It is also written to data/pricing_document.md so you can read or edit it.
"""
from db import BASE_DIR, get_connection

DOC_PATH = BASE_DIR / "data" / "pricing_document.md"

POLICIES = """## Payment and policy notes

- Fees are listed in Indian Rupees (INR) and include applicable GST.
- Payment can be made in one instalment or in up to 3 monthly instalments on the Live Online Batch and Career Accelerator plans.
- Enrolment is confirmed after the first payment is received.
- Refund requests made within 7 days of enrolment, before accessing more than 20% of the course material, are eligible for a full refund.
- Seats in each batch are limited. Prices shown are valid until the batch start date.
"""


def build_pricing_document() -> str:
    with get_connection() as conn:
        plans = conn.execute(
            "SELECT * FROM pricing_plans ORDER BY sort_order"
        ).fetchall()
        batches = conn.execute(
            "SELECT * FROM batches ORDER BY start_date"
        ).fetchall()
        courses = conn.execute(
            "SELECT title, duration FROM courses ORDER BY sort_order"
        ).fetchall()

    lines = [
        "# Jiyaan Institute of Technology - GCP Data Engineering Pricing Document",
        "",
        "Jiyaan Institute of Technology offers training in Google Cloud Platform (GCP) Data Engineering.",
        "",
        "## Pricing plans",
        "",
    ]
    for plan in plans:
        price = f"INR {plan['price_inr']:,}"
        original = f" (regular price INR {plan['original_inr']:,})" if plan["original_inr"] else ""
        badge = " - most popular" if plan["highlight"] else ""
        lines.append(f"### {plan['name']}{badge}")
        lines.append(f"- Price: {price}{original}")
        lines.append(f"- Duration: {plan['duration']}")
        lines.append(f"- Includes: {plan['features']}")
        lines.append("")

    lines.append("## Courses covered")
    lines.append("")
    for course in courses:
        lines.append(f"- {course['title']} ({course['duration']})")
    lines.append("")

    lines.append("## Upcoming batches")
    lines.append("")
    for batch in batches:
        lines.append(
            f"- {batch['name']}: {batch['mode']}, starts {batch['start_date']}, "
            f"{batch['timing']}, {batch['seats_left']} seats left"
        )
    lines.append("")

    lines.append(POLICIES)
    return "\n".join(lines)


def write_pricing_document() -> str:
    """Build the document, save a copy to data/, and return the text."""
    text = build_pricing_document()
    DOC_PATH.parent.mkdir(parents=True, exist_ok=True)
    DOC_PATH.write_text(text, encoding="utf-8")
    return text
