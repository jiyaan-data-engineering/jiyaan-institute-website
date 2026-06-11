/**
 * Google Forms submission utility
 * Submits lead data to Google Forms without page redirect
 */

// Google Form configuration
// Replace these entry IDs with values from your Google Form
// To find entry IDs: https://github.com/jiyaan-data-engineering/jiyaan-institute-website/blob/main/GOOGLE_FORM_SETUP.md
const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScJNbKvJ9S-IZdh3m9Tmo3xUkNW4CwqITaygk87T-5iOapIiQ/formResponse"

// Form field entry IDs - UPDATE THESE WITH ACTUAL IDS FROM YOUR FORM
export const FORM_FIELDS = {
  name: "entry.1234567890", // Full Name
  email: "entry.1234567891", // Email
  phone: "entry.1234567892", // Phone
  course: "entry.1234567893", // Course of Interest
  message: "entry.1234567894", // Message
  timestamp: "entry.1234567895", // Timestamp (optional)
}

export interface SubmissionData {
  name: string
  email: string
  phone: string
  course: string
  message?: string
}

/**
 * Submit data to Google Forms
 * Requires CORS-friendly approach (using fetch with no-cors mode)
 */
export async function submitToGoogleForms(data: SubmissionData): Promise<boolean> {
  try {
    const formData = new FormData()

    // Map website fields to Google Form entry IDs
    formData.append(FORM_FIELDS.name, data.name)
    formData.append(FORM_FIELDS.email, data.email)
    formData.append(FORM_FIELDS.phone, data.phone)
    formData.append(FORM_FIELDS.course, data.course)
    if (data.message) {
      formData.append(FORM_FIELDS.message, data.message)
    }

    // Add timestamp
    formData.append(FORM_FIELDS.timestamp, new Date().toISOString())

    // Submit to Google Forms
    // Using no-cors mode because Google Forms doesn't support CORS
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors", // Required for Google Forms
    })

    // Note: With no-cors mode, we can't check response status
    // But if fetch succeeds without throwing, submission was sent
    return true
  } catch (error) {
    console.error("Form submission error:", error)
    return false
  }
}

/**
 * Get submission status message
 */
export function getSubmissionMessage(name: string): string {
  const firstName = name.split(" ")[0] || "there"
  return `Thank you! Your demo request has been submitted successfully.\n\nOur team will contact you shortly.`
}
