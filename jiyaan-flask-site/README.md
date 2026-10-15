# Jiyaan Institute of Technology - GCP Data Engineering website

A single-page website with a Python (Flask) backend, a zero-config SQLite database, and a pricing chatbot powered by OpenAI.

## Features

- Animated hero with a 3D tilt logo card, a canvas network background and scroll parallax
- Course cards with 3D hover tilt, upcoming batches with seat bars, and a pricing section
- Testimonials carousel, enquiry form with server-side validation (saved to SQLite)
- Pricing chatbot that answers only from a generated pricing document (no RAG, no vector DB)
- Responsive layout, reduced-motion support

## Project structure

```
app.py                  Flask app: pages, API, chatbot endpoint
db.py                   SQLite setup, auto-created tables and starter content
pricing_document.py     Builds the single pricing document the chatbot may use
static/index.html       The website
static/css/style.css    Styles and animations
static/js/main.js       Rendering, animations, enquiry form, chat widget
static/img/             Jiyaan logo images (copied from logo/)
logo/                   Your original logo files
data/                   SQLite database and generated pricing document (created on first run)
.env                    Your OpenAI API key (git-ignored)
.env.example            Template for .env
```

## Setup

Requires Python 3.10 or newer.

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate      macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
```

### Add your OpenAI API key

Open `.env` and replace the placeholder:

```
OPENAI_API_KEY=sk-...your key...
OPENAI_MODEL=gpt-4o-mini
```

`OPENAI_MODEL` can be any chat model your key has access to. The site works without a key; only the chatbot needs one.

### Run

```bash
python app.py
```

Open http://127.0.0.1:5001

On first run the database file `data/jiyaan.db` is created and filled with starter content. Nothing else needs configuring.

## How the chatbot is restricted

1. `pricing_document.py` builds a Markdown document from the same database rows that power the site's pricing section, and saves a copy to `data/pricing_document.md`.
2. On every chat request, `app.py` injects that whole document into the system prompt.
3. The system prompt tells the model to answer only from the document and to reply with a fixed message for anything else.

To change what the chatbot knows, edit the pricing rows (or the `POLICIES` text in `pricing_document.py`) and the document is regenerated automatically.

## Before going live

- **Replace the sample content.** Testimonials, the "learners trained" and "pass rate" figures, fee amounts, batch dates, and refund and EMI policies are starter values. Change them in `db.py` (the seed lists) or directly in `data/jiyaan.db`. Delete `data/jiyaan.db` to re-seed from `db.py`.
- **Keep `.env` private.** It is listed in `.gitignore`. Never commit your API key.
- **Use a production server.** `python app.py` runs Flask's development server and is for local development only. For production, run the app with waitress, which works on Windows (installed by `requirements.txt`):

  ```bash
  waitress-serve --listen=127.0.0.1:5001 app:app
  ```

  On Linux you can use `gunicorn -w 2 -b 127.0.0.1:5001 app:app` instead. Put a reverse proxy such as Nginx or Caddy in front of it if you deploy publicly, and serve over HTTPS.
- **Images.** The site uses your logo files only. Add more photos to `static/img/` and reference them in `static/index.html` if you want them.

## Troubleshooting

- **Chat says "not configured"**: `.env` still has the placeholder key. Put in your real key and restart `python app.py`.
- **Chat says "unavailable"**: check the server terminal for the OpenAI error (wrong key, no quota, or unsupported model name).
- **Port in use**: change `port=5001` in the last lines of `app.py`.
