# Visual Guide: Extract Google Form Entry IDs

## Method 1: Browser Inspect (RECOMMENDED)

### Step 1: Open Your Google Form
```
URL: https://forms.gle/D8BijjMuaK5ySWHS8
```

### Step 2: Open Developer Tools
- **Windows**: Press `F12` or `Ctrl+Shift+I`
- **Mac**: Press `Cmd+Option+I`
- Or: Right-click → "Inspect"

### Step 3: Inspect the Email Field

```
Google Form Page
┌─────────────────────────────────────────┐
│ Email *                                  │
│ ┌───────────────────────────────────────┐│
│ │ [input field]                         ││
│ └───────────────────────────────────────┘│
└─────────────────────────────────────────┘
        ↓ Right-click here
        
Select "Inspect" or "Inspect Element"
```

### Step 4: Read the HTML in DevTools

You will see something like:

```html
<div class="mfEuyf QCUQC">
  <div class="goog-date-picker" style="display:none"></div>
  <input
    aria-label="Email"
    aria-required="true"
    class="whsOnd zHQkBf"
    data-initial-value=""
    data-item-id="700000000"
    dir="auto"
    id="mG61Hd"
    jsaction="..."
    jscontroller="..."
    jslog="..."
    name="entry.1234567890"        ← THIS IS YOUR ENTRY ID!
    placeholder="Your email"
    required=""
    type="email"
    value="">
</div>
```

**YOUR ENTRY ID**: `1234567890` (the numbers after `entry.`)

### Step 5: Extract All 5 Entry IDs

Repeat for each field:

| Field | HTML to Look For | Entry ID |
|-------|------------------|----------|
| Email | `name="entry.XXXXXXXXX"` | ? |
| Name | `name="entry.XXXXXXXXX"` | ? |
| Phone | `name="entry.XXXXXXXXX"` | ? |
| Course of interest | `name="entry.XXXXXXXXX"` | ? |
| Message | `name="entry.XXXXXXXXX"` | ? |

---

## Method 2: Network Tab (Alternative)

If inspect method is confusing, try this:

### Step 1: Open DevTools
- Press `F12`
- Click **"Network"** tab

### Step 2: Fill and Submit Form
1. Manually fill out your Google Form
2. Click **Submit**
3. Don't refresh the page!

### Step 3: Find the Request
```
Network Tab
├── All
├── XHR       ← Click here
├── Fetch
├── WS
└── Manifest
```

Look for a request to: `/formResponse` or similar

Click on it, then go to **"Payload"** or **"Request Body"**

You'll see:
```
entry.1234567890=your@email.com
entry.1234567891=John+Doe
entry.1234567892=%2B91+9876543210
entry.1234567893=GCP+Data+Engineering
entry.1234567894=My+message+here
```

**Your Entry IDs**:
- Email: `1234567890`
- Name: `1234567891`
- Phone: `1234567892`
- Course: `1234567893`
- Message: `1234567894`

---

## Method 3: Use Browser Console (Advanced)

Open DevTools (F12) → Console tab → Paste this:

```javascript
// This will log all form inputs to console
document.querySelectorAll('input[name^="entry"], textarea[name^="entry"], select[name^="entry"]').forEach(el => {
  console.log(`${el.getAttribute('aria-label')}: ${el.getAttribute('name')}`)
})
```

Will output:
```
Email: entry.1234567890
Name: entry.1234567891
Phone: entry.1234567892
Course of interest: entry.1234567893
Message: entry.1234567894
```

---

## What You'll Find

### Email Field
```html
<input name="entry.XXXXXXXX" type="email" ... />
```
**Your ID**: `XXXXXXXX`

### Name Field
```html
<input name="entry.XXXXXXXX" type="text" ... />
```
**Your ID**: `XXXXXXXX`

### Phone Field
```html
<input name="entry.XXXXXXXX" type="tel" ... />
```
**Your ID**: `XXXXXXXX`

### Course Field (Checkboxes)
```html
<input name="entry.XXXXXXXX" type="checkbox" value="GCP Data Engineering" />
<input name="entry.XXXXXXXX" type="checkbox" value="GCP Associate Cloud Engineer" />
<!-- etc -->
```
**Your ID**: `XXXXXXXX` (same for all checkboxes)

### Message Field
```html
<textarea name="entry.XXXXXXXX" ... ></textarea>
```
**Your ID**: `XXXXXXXX`

---

## Once You Have All IDs

### Update `utils/google-forms.ts`

```typescript
export const FORM_FIELDS = {
  email: "entry.XXXXXXXX",    // ← Replace XXXXXXXX with your email ID
  name: "entry.XXXXXXXX",     // ← Replace XXXXXXXX with your name ID
  phone: "entry.XXXXXXXX",    // ← Replace XXXXXXXX with your phone ID
  course: "entry.XXXXXXXX",   // ← Replace XXXXXXXX with your course ID
  message: "entry.XXXXXXXX",  // ← Replace XXXXXXXX with your message ID
}
```

### Test Again

```bash
npm run dev
# Fill and submit form
# Check Google Sheet - response should appear!
```

---

## Troubleshooting

### "I can't find the input field in HTML"

**Try this**:
1. Right-click → Inspect
2. In DevTools, use `Ctrl+F` to search
3. Search for: `entry.`
4. You'll see all entry IDs highlighted

### "There are multiple fields with same name"

This is normal for checkboxes (Course field). Use that entry ID for course submission.

### "The HTML is minified/hard to read"

Click the "pretty print" button in DevTools (looks like `{}`)

### "Still can't find it"

Try the **Console method** above - just paste and run the JavaScript code.

---

## Quick Reference

**Entry ID Format**: `entry.XXXXXXXXX` where XXXXXXXXX = 10 digits

**Where to Find**:
- In HTML: `name="entry.XXXXXXXXX"`
- In Network payload: `entry.XXXXXXXXX=value`
- In Console output: `entry.XXXXXXXXX`

**How to Extract**:
1. Look for `entry.`
2. Copy the numbers after it
3. That's your ID!

---

## Next Steps

1. ✅ Extract all 5 entry IDs
2. ✅ Update `utils/google-forms.ts`
3. ✅ Restart development server: `npm run dev`
4. ✅ Test form submission again
5. ✅ Verify response appears in Google Sheet

**Result**: Form will work perfectly! 🎉
