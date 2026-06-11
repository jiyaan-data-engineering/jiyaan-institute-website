/**
 * Google Form Entry ID Extractor
 *
 * USAGE:
 * 1. Open your Google Form: https://forms.gle/D8BijjMuaK5ySWHS8
 * 2. Open DevTools (F12)
 * 3. Go to Console tab
 * 4. Copy and paste this entire script
 * 5. Press Enter
 * 6. Copy the output to update utils/google-forms.ts
 */

(function() {
  console.log('%c🔍 Google Form Entry ID Extractor', 'color: #2563eb; font-size: 18px; font-weight: bold');
  console.log('%c' + '='.repeat(60), 'color: #6366f1');

  // Find all input and textarea elements with entry names
  const fields = {
    email: null,
    name: null,
    phone: null,
    course: null,
    message: null,
  };

  // Get all form elements
  const allElements = document.querySelectorAll('input[name^="entry"], textarea[name^="entry"], select[name^="entry"]');

  console.log(`\n📋 Found ${allElements.length} form fields with entry IDs\n`);

  const foundIds = new Map();

  allElements.forEach((element) => {
    const entryId = element.getAttribute('name');
    const ariaLabel = element.getAttribute('aria-label');
    const placeholder = element.getAttribute('placeholder');
    const type = element.type || element.tagName.toLowerCase();
    const fieldLabel = ariaLabel || placeholder || 'Unknown';

    if (!foundIds.has(entryId)) {
      foundIds.set(entryId, {
        label: fieldLabel,
        type: type,
        element: element,
      });
    }

    console.log(`✓ Field: "${fieldLabel}"`);
    console.log(`  Entry ID: ${entryId}`);
    console.log(`  Type: ${type}\n`);
  });

  // Try to map to expected fields
  console.log('%c' + '='.repeat(60), 'color: #6366f1');
  console.log('%c🎯 MAPPING FIELDS', 'color: #2563eb; font-weight: bold');
  console.log('%c' + '='.repeat(60), 'color: #6366f1\n');

  const mapping = {
    email: ['email', 'e-mail', 'mail', 'your email', 'email address'],
    name: ['name', 'full name', 'your name', 'first name'],
    phone: ['phone', 'mobile', 'phone number', 'contact number', 'telephone'],
    course: ['course', 'interested', 'interest', 'program', 'which course', 'course of interest'],
    message: ['message', 'comments', 'remarks', 'additional', 'note', 'tell us'],
  };

  foundIds.forEach((info, entryId) => {
    const label = info.label.toLowerCase();

    for (const [fieldName, keywords] of Object.entries(mapping)) {
      if (keywords.some((keyword) => label.includes(keyword))) {
        fields[fieldName] = entryId;
        console.log(`✓ ${fieldName.toUpperCase()}: ${entryId}`);
        console.log(`  Label: "${info.label}"\n`);
        break;
      }
    }
  });

  // Display results
  console.log('%c' + '='.repeat(60), 'color: #6366f1');
  console.log('%c📋 COPY THIS TO utils/google-forms.ts', 'color: #16a34a; font-weight: bold; font-size: 14px');
  console.log('%c' + '='.repeat(60), 'color: #6366f1\n');

  const output = `export const FORM_FIELDS = {
  email: "${fields.email || 'entry.MISSING'}",
  name: "${fields.name || 'entry.MISSING'}",
  phone: "${fields.phone || 'entry.MISSING'}",
  course: "${fields.course || 'entry.MISSING'}",
  message: "${fields.message || 'entry.MISSING'}",
}`;

  console.log(output);
  console.log('\n%c' + '='.repeat(60), 'color: #6366f1');

  // Verification
  console.log('%c✅ VERIFICATION CHECKLIST', 'color: #16a34a; font-weight: bold; font-size: 14px');
  console.log('%c' + '='.repeat(60), 'color: #6366f1\n');

  let allFound = true;
  for (const [fieldName, entryId] of Object.entries(fields)) {
    if (entryId && entryId.startsWith('entry.')) {
      console.log(`✅ ${fieldName}: ${entryId}`);
    } else {
      console.log(`⚠️  ${fieldName}: NOT FOUND - Please map manually`);
      allFound = false;
    }
  }

  console.log('\n%c' + '='.repeat(60), 'color: #6366f1');

  if (allFound) {
    console.log(
      '%c✅ SUCCESS! All entry IDs found. Copy the config above to utils/google-forms.ts',
      'color: #16a34a; font-weight: bold'
    );
  } else {
    console.log(
      '%c⚠️  Some IDs not found automatically. Check the list above and map manually.',
      'color: #f59e0b; font-weight: bold'
    );
    console.log('%cOpen: EXTRACT_ENTRY_IDS_VISUAL.md for manual mapping instructions', 'color: #6366f1');
  }

  console.log('%c' + '='.repeat(60), 'color: #6366f1\n');

  // Show all found IDs for reference
  console.log('%c📌 ALL FOUND ENTRY IDS (Reference)', 'color: #7c3aed; font-weight: bold');
  console.log('%c' + '='.repeat(60), 'color: #6366f1\n');

  let index = 1;
  foundIds.forEach((info, entryId) => {
    console.log(`${index}. ${entryId}`);
    console.log(`   Label: "${info.label}"`);
    console.log(`   Type: ${info.type}\n`);
    index++;
  });

  // Create a copyable JSON format
  const jsonOutput = {};
  fields.email && (jsonOutput.email = fields.email);
  fields.name && (jsonOutput.name = fields.name);
  fields.phone && (jsonOutput.phone = fields.phone);
  fields.course && (jsonOutput.course = fields.course);
  fields.message && (jsonOutput.message = fields.message);

  console.log('%c📋 JSON FORMAT (for reference)', 'color: #7c3aed; font-weight: bold');
  console.log(JSON.stringify(jsonOutput, null, 2));

  console.log('\n%c' + '='.repeat(60), 'color: #6366f1');
  console.log('%c🚀 NEXT STEPS:', 'color: #2563eb; font-weight: bold');
  console.log('%c1. Copy the FORM_FIELDS config above', 'color: #475569');
  console.log('%c2. Open: utils/google-forms.ts', 'color: #475569');
  console.log('%c3. Replace lines 14-20 with the config', 'color: #475569');
  console.log('%c4. Save and test: npm run dev', 'color: #475569');
  console.log('%c' + '='.repeat(60), 'color: #6366f1');
})();
