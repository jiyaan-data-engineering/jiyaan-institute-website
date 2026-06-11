/**
 * Google Forms submission utility
 * Submits lead data to Google Forms without page redirect
 *
 * REQUIRED FIELDS (marked with * in form):
 * - Email: entry.804146219
 * - Lead ID: entry.1700792524 (must be generated/submitted)
 * - Datetimestamp: entry.9340487 (must be current date/time)
 */

// Google Form configuration
const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScJNbKvJ9S-IZdh3m9Tmo3xUkNW4CwqITaygk87T-5iOapIiQ/formResponse"

// Form field entry IDs - All 3 required fields + 5 user input fields
export const FORM_FIELDS = {
  // REQUIRED FIELDS
  email: "entry.804146219", // Email - REQUIRED
  leadId: "entry.1700792524", // Lead ID - REQUIRED (must generate)
  datetimestamp: "entry.9340487", // Datetimestamp - REQUIRED (current date/time)

  // USER INPUT FIELDS
  name: "entry.294407203", // Name - Required
  phone: "entry.2006329507", // Phone - Required
  course: "entry.1775010313", // Course of Interest - Required
  message: "entry.166782921", // Message - Optional

  // Backend/Admin fields (not submitted by website form):
  // assignedTo: "entry.1178934496",
  // status: "entry.1771432039",
  // followUpDate: "entry.1281460059",
  // demoDate: "entry.340016737",
  // interested: "entry.1335220265",
  // experience: "entry.1923683204",
  // currentRole: "entry.1467348373",
  // jobChange: "entry.457460750",
  // budgetConcern: "entry.1946357365",
  // telcallerNotes: "entry.1685320537",
  // nextAction: "entry.947654028",
}

export interface SubmissionData {
  name: string
  email: string
  phone: string
  course: string
  message?: string
}

/**
 * Generate unique Lead ID
 * Format: LEAD-TIMESTAMP-RANDOM
 * Example: LEAD-1686125800000-A7K3
 */
function generateLeadId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `LEAD-${timestamp}-${random}`
}

/**
 * Format current date for Google Forms date field
 * Google Forms date fields need: MM/DD/YYYY format
 * Example: 06/11/2026
 */
function getCurrentDateFormatted(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const year = now.getFullYear()
  return `${month}/${day}/${year}`
}

/**
 * Submit data to Google Forms
 * Includes all required fields to avoid HTTP 400 errors
 */
export async function submitToGoogleForms(data: SubmissionData): Promise<boolean> {
  try {
    const formData = new FormData()

    // ========== REQUIRED FIELDS ==========

    // 1. Email (required)
    formData.append(FORM_FIELDS.email, data.email)

    // 2. Lead ID (required) - Generate unique ID
    const leadId = generateLeadId()
    formData.append(FORM_FIELDS.leadId, leadId)

    // 3. Datetimestamp (required) - Current date/time
    const currentDate = getCurrentDateFormatted()
    formData.append(FORM_FIELDS.datetimestamp, currentDate)

    // ========== USER INPUT FIELDS ==========

    // 4. Name (required)
    formData.append(FORM_FIELDS.name, data.name)

    // 5. Phone (required)
    formData.append(FORM_FIELDS.phone, data.phone)

    // 6. Course (required)
    formData.append(FORM_FIELDS.course, data.course)

    // 7. Message (optional)
    if (data.message?.trim()) {
      formData.append(FORM_FIELDS.message, data.message)
    }

    // Submit to Google Forms using no-cors mode
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    })

    // With no-cors mode, we can't check response status,
    // but if fetch completes without throwing, submission was sent
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
