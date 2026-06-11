# Google Forms Integration Setup Guide

## Overview

The website form ("Book Your Free Demo") is now connected to your Google Form at:
- **Form URL**: https://forms.gle/D8BijjMuaK5ySWHS8
- **Form ID**: 1FAIpQLScJNbKvJ9S-IZdh3m9Tmo3xUkNW4CwqITaygk87T-5iOapIiQ

## Form Fields Identified

Your Google Form contains the following fields (from inspection):

| Website Field | Google Form Field | Status |
|---|---|---|
| Full Name | Name | ✓ Found |
| Email | Email | ✓ Found |
| Phone | Phone | ✓ Found |
| Course of Interest | Course of interest | ✓ Found |
| Message | Message (optional) | ✓ Found |
| (Auto) | Datetimestamp | ✓ Backend field |
| (Auto) | Lead ID | ✓ Backend field |
| (Backend) | Assigned To | ✓ Backend field |
| (Backend) | Status | ✓ Backend field |
| (Backend) | Follow-up Date | ✓ Backend field |
| (Backend) | Demo Date | ✓ Backend field |
| (Backend) | Interested? | ✓ Backend field |
| (Backend) | Experience | ✓ Backend field |
| (Backend) | Current Role | ✓ Backend field |
| (Backend) | Job Change? | ✓ Backend field |
| (Backend) | Budget Concern? | ✓ Backend field |
| (Backend) | Telecaller Notes/Remarks | ✓ Backend field |
| (Backend) | Next Action | ✓ Backend field |

## Finding Entry IDs

Entry IDs are in the format: `entry.XXXXXXXXX` (numeric IDs)

### Method 1: Browser Inspect Element (Recommended)

1. **Open the Google Form** in your browser:
   - https://forms.gle/D8BijjMuaK5ySWHS8

2. **Right-click on a form field** and select **"Inspect"** or **"Inspect Element"**

3. **Look for the input element**. You'll see HTML like:
   ```html
   <input name="entry.1234567890" type="text" ... />
   ```
   
   The `name` attribute contains the entry ID: `entry.1234567890`

4. **Repeat for each field:**
   - Full Name field
   - Email field
   - Phone field
   - Course dropdown field
   - Message/Comments field

### Method 2: Prefilled URL Method

1. **Open the form's prefilled URL endpoint:**
   ```
   https://docs.google.com/forms/d/e/1FAIpQLScJNbKvJ9S-IZdh3m9Tmo3xUkNW4CwqITaygk87T-5iOapIiQ/viewform?usp=pp_url&entry.XXXXXX=test
   ```

2. **Experiment with different entry IDs** to find the ones that work

3. **Check the form's page source** (Ctrl+F or Cmd+F) and search for `entry.` to find all field IDs

### Method 3: Network Tab Method

1. **Open Developer Tools** (F12)
2. **Go to Network tab**
3. **Fill out the form and submit** (or preview mode)
4. **Look for a POST request** to:
   ```
   https://docs.google.com/forms/u/0/d/e/1FAIpQLScJNbKvJ9S-IZdh3m9Tmo3xUkNW4CwqITaygk87T-5iOapIiQ/formResponse
   ```
5. **Click on that request** and go to **"Payload"** or **"Request Body"**
6. You'll see the form data with entry IDs like: `entry.1234567890=value`

## Updating the Configuration

Once you have the entry IDs:

1. **Open** `utils/google-forms.ts`

2. **Update the `FORM_FIELDS` object** with your actual entry IDs:
   ```typescript
   export const FORM_FIELDS = {
     name: "entry.XXXX",      // Your Full Name entry ID
     email: "entry.XXXX",     // Your Email entry ID
     phone: "entry.XXXX",     // Your Phone entry ID
     course: "entry.XXXX",    // Your Course of Interest entry ID
     message: "entry.XXXX",   // Your Message entry ID
     timestamp: "entry.XXXX", // Your Timestamp entry ID (optional)
   }
   ```

3. **Save the file**

## Testing the Integration

### Step 1: Local Testing

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open the website** in your browser (usually http://localhost:3000)

3. **Scroll to the "Book Your Free Demo" form** section

4. **Fill out and submit the form** with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 9876543210
   - Course: GCP Data Engineering
   - Message: Testing form integration

5. **Check if the submission appears** in your Google Sheet (responses)

### Step 2: Verify Google Sheet Updates

1. **Open your Google Form**
2. **Go to the "Responses" tab**
3. **Check if a new response appears** with your test data
4. **Verify all fields are populated correctly**

### Step 3: User Experience Test

1. **Submit the form again** from the website
2. **Verify the success message appears:**
   ```
   Thank you! Your demo request has been submitted successfully.
   Our team will contact you shortly.
   ```
3. **Verify the page does NOT redirect** (stays on website)
4. **Check "Submit another response" button works**

## Production Deployment Checklist

- [ ] Entry IDs extracted and verified
- [ ] `utils/google-forms.ts` updated with correct entry IDs
- [ ] Local testing completed successfully
- [ ] Test responses appear in Google Sheet
- [ ] Success message displays correctly
- [ ] No page redirects occur
- [ ] Form works on mobile devices
- [ ] All required fields are validated before submission
- [ ] Privacy statement is visible on form
- [ ] Deployment to Hostinger completed

## Troubleshooting

### Form Not Submitting

**Problem**: Form shows "Submitting..." but nothing happens
- Check that entry IDs are correct in `utils/google-forms.ts`
- Verify Google Form URL is accessible
- Check browser console for errors (F12 > Console)

### Responses Not Appearing in Sheet

**Problem**: Submit succeeds but no response in Google Sheet
- Verify entry IDs match exactly (case-sensitive)
- Test by manually submitting to the form URL
- Check that form is accepting responses (not closed)

### CORS Errors

**Problem**: Console shows CORS errors
- This is expected! Google Forms uses `no-cors` mode
- The submission still works even with CORS errors
- This is why `mode: "no-cors"` is used in the code

### Dynamic Dates Not Updating

**Problem**: Demo dates don't change with current date
- Ensure `utils/demo-dates.ts` was created correctly
- Check that imports in `components/track-record.tsx` are correct
- Clear browser cache and refresh

## Support

For issues or questions:
- Check the GitHub repository: https://github.com/jiyaan-data-engineering/jiyaan-institute-website
- Review the form integration code in `components/lead-form.tsx`
- Check `utils/google-forms.ts` for submission logic

## Additional Resources

- [Google Forms Help](https://support.google.com/docs/answer/141062)
- [Form Response Data Structure](https://support.google.com/docs/answer/7224828)
- [Prefilled Form URL Structure](https://support.google.com/docs/answer/7192629)
