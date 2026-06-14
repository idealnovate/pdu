/**
 * PDU Africa — UI/UX Design Bootcamp
 * Google Apps Script: Enrollment Form Handler
 *
 * HOW TO DEPLOY:
 * 1. Go to script.google.com → New project
 * 2. Paste this entire file
 * 3. Replace 'YOUR_GOOGLE_SHEET_ID' below with your actual Sheet ID
 *    (find it in the Google Sheets URL: /spreadsheets/d/SHEET_ID/edit)
 * 4. Click Deploy → New deployment → Web app
 *    - Description: PDU Enrollment Handler
 *    - Execute as: Me (your PDU Gmail account)
 *    - Who has access: Anyone
 * 5. Click Deploy → copy the Web App URL
 * 6. Paste that URL into pdu/index.html where it says:
 *    const SCRIPT_URL = '...';
 * 7. Each time you edit this script:
 *    Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy
 *
 * CURRENT DEPLOYED URL (already wired into index.html):
 * https://script.google.com/macros/s/AKfycbw-RC0hxIlPexuMNDl_yYnnpAaTArfPayKLDY2ObfHPoRD4fpGL36KzgJvgC3wldsMU/exec
 */

// ── CONFIG ────────────────────────────────────────────────────────────────────
const SHEET_NAME   = 'PDU Enrollments';
const SHEET_ID     = 'YOUR_GOOGLE_SHEET_ID';
const FROM_NAME    = 'PDU Africa';
const REPLY_TO     = 'hello@pduafrica.com';
const COHORT_DATE  = 'June 27, 2026';
const WHATSAPP_URL = 'https://chat.whatsapp.com/HsS2HiuXHfY2CAjIPSyOrk?s=cl&p=i&ilr=2';
// ─────────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME)
                  || SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);

    // Write header row once
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'First Name', 'Last Name',
        'Email', 'Phone (WhatsApp)', 'Gender', 'How They Heard', 'Has Computer'
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
    }

    // Append applicant row
    sheet.appendRow([
      new Date(),
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.gender,
      data.referral,
      data.hasComputer
    ]);

    // Send automated welcome email
    sendWelcomeEmail(data);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendWelcomeEmail(data) {
  const firstName = data.firstName;
  const email     = data.email;

  const subject = `Welcome to PDU Africa, ${firstName}! Your UI/UX Journey Starts Now`;

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background: #f0f4ff; font-family: 'Helvetica Neue', Arial, sans-serif; color: #3a3a3a; }
    .outer { padding: 24px 16px; background: #f0f4ff; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #0e2a47 0%, #1a5276 100%); padding: 40px 40px 32px; text-align: center; }
    .header img { height: 40px; width: auto; margin-bottom: 18px; display: block; margin-left: auto; margin-right: auto; }
    .header h1 { color: #ffffff !important; font-size: 22px; font-weight: 700; margin: 0 0 8px; line-height: 1.3; }
    .header p  { color: #a8c4e0 !important; font-size: 14px; margin: 0; }
    .track-badge { display: inline-block; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); color: #ffffff; font-size: 12px; font-weight: 700; padding: 4px 14px; border-radius: 100px; margin-bottom: 16px; letter-spacing: 0.05em; }
    .body { padding: 36px 40px; background: #ffffff; }
    .greeting { font-size: 18px; font-weight: 700; color: #0e2a47; margin-bottom: 16px; }
    .body p { font-size: 15px; line-height: 1.75; color: #3a3a3a; margin-bottom: 16px; }
    .highlight-box { background: #f0f4ff; border-left: 4px solid #1a5276; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 24px 0; }
    .highlight-box p { margin: 0; font-size: 14px; color: #0e2a47; }
    .highlight-box strong { display: block; font-size: 15px; margin-bottom: 6px; color: #1a5276; }
    .step-text { font-size: 14px; color: #3a3a3a; line-height: 1.6; }
    .cta-btn { display: block; text-align: center; background: #25D366; color: #0a2e19 !important; text-decoration: none; font-size: 16px; font-weight: 700; padding: 16px 32px; border-radius: 100px; margin: 28px auto; max-width: 300px; }
    .footer { background: #0e2a47; padding: 24px 40px; text-align: center; }
    .footer p { color: #7a9ab8 !important; font-size: 12px; margin: 0; line-height: 1.7; }
    .footer a { color: #a8c4e0 !important; text-decoration: none; }
  </style>
</head>
<body>
<div class="outer">
<div class="wrapper">

  <div class="header">
    <div class="track-badge">UI/UX Design Bootcamp</div>
    <h1>You&#8217;re In! &#10003;</h1>
    <p>PDU Africa &mdash; Free UI/UX Design Scholarship Bootcamp</p>
  </div>

  <div class="body">
    <p class="greeting">Hi ${firstName},</p>
    <p>Congratulations and a huge welcome to the <strong>PDU Africa Free UI/UX Design Scholarship Bootcamp!</strong> You'll master Figma, design thinking, prototyping, and end-to-end product design — all completely free.</p>
    <p>We've received your application and we're excited to have you on board.</p>

    <div class="highlight-box">
      <strong>Cohort Start Date</strong>
      <p>Your cohort kicks off on <strong>${COHORT_DATE}</strong>. Mark your calendar &mdash; this is where your journey begins.</p>
    </div>

    <p>Here&#8217;s what happens next:</p>

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:14px;">
      <tr>
        <td width="38" valign="top">
          <div style="background:#1a5276;color:#ffffff;border-radius:50%;width:28px;height:28px;text-align:center;line-height:28px;font-size:13px;font-weight:700;font-family:Arial,sans-serif;">1</div>
        </td>
        <td valign="top" style="padding-top:5px;">
          <span class="step-text"><strong>Join our WhatsApp Community</strong> &mdash; every live class link, resource, and announcement is shared there first. You will not receive class links any other way.</span>
        </td>
      </tr>
    </table>

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
      <tr>
        <td width="38" valign="top">
          <div style="background:#1a5276;color:#ffffff;border-radius:50%;width:28px;height:28px;text-align:center;line-height:28px;font-size:13px;font-weight:700;font-family:Arial,sans-serif;">2</div>
        </td>
        <td valign="top" style="padding-top:5px;">
          <span class="step-text"><strong>Watch your inbox</strong> &mdash; we will send you pre-class resources and updates before the cohort starts.</span>
        </td>
      </tr>
    </table>

    <a href="${WHATSAPP_URL}" class="cta-btn">Join the WhatsApp Community &#8594;</a>

    <p>If you have any questions before the cohort starts, simply reply to this email or reach us on WhatsApp &mdash; we respond within 24 hours.</p>
    <p>We&#8217;ll see you on <strong>${COHORT_DATE}</strong>. Get ready to build your UI/UX design career!</p>
    <p>With excitement,<br><strong>The PDU Africa Team</strong></p>
  </div>

  <div class="footer">
    <p>
      &copy; 2026 PDU Africa. All rights reserved.<br>
      <a href="mailto:${REPLY_TO}">${REPLY_TO}</a>
    </p>
  </div>

</div>
</div>
</body>
</html>`;

  GmailApp.sendEmail(email, subject, '', {
    htmlBody: htmlBody,
    name:     FROM_NAME,
    replyTo:  REPLY_TO
  });
}
