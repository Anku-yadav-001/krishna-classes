import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const course = formData.get("course") as string
    const studentClass = formData.get("studentClass") as string
    const queryType = formData.get("queryType") as string
    const message = formData.get("message") as string
    const resumeFile = formData.get("resume") as File | null

    const courseLabels: Record<string, string> = {
      "class-11-12-jee": "Class 11th–12th + IIT-JEE",
      "class-11-12-neet": "Class 11th–12th + NEET",
      "class-8-10": "Class 8th–10th (Foundation)",
      "class-6-7": "Class 6th–7th (All Subjects)",
      "home-tuition": "Home Tuition",
      "other": "Other",
    }
    const queryLabels: Record<string, string> = {
      admission: "Admission Inquiry",
      fees: "Fee Structure",
      demo: "Demo Class",
      career: "Career Application",
      feedback: "Feedback",
      other: "General Inquiry",
    }

    const courseLabel = courseLabels[course] || course || "Not specified"
    const classLabel = studentClass === "dropper" ? "Dropper" : studentClass ? `Class ${studentClass}` : "Not specified"
    const queryLabel = queryLabels[queryType] || queryType || "General Inquiry"
    const isCareer = queryType === "career"
    const firstName = name.trim().split(" ")[0]
    const initial = name.trim().charAt(0).toUpperCase()

    const now = new Date()
    const dateStr = now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    const attachments: nodemailer.SendMailOptions["attachments"] = []
    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer())
      attachments.push({ filename: resumeFile.name, content: buffer, contentType: resumeFile.type })
    }

    // ─────────────────────────────────────────────────────────────────────────
    // EMAIL HTML — clean, single-blue theme, editorial layout
    // ─────────────────────────────────────────────────────────────────────────
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;">

<table width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:40px 16px;">
<tr><td align="center">
<table width="560" cellspacing="0" cellpadding="0" style="max-width:560px;width:100%;">

  <!-- ── HEADER ─────────────────────────────────────────────── -->
  <tr><td style="background:#1e3a8a;border-radius:12px 12px 0 0;padding:28px 32px 24px;">
    <table width="100%" cellspacing="0" cellpadding="0"><tr>

      <!-- Brand -->
      <td style="vertical-align:middle;">
        <div style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:2px;line-height:1;">KRISHNA CLASSES</div>
        <div style="color:#93c5fd;font-size:11px;margin-top:3px;letter-spacing:1px;">& Home Tutors · Kolar, Bhopal · Since 2009</div>
      </td>

      <!-- Badge -->
      <td style="text-align:right;vertical-align:middle;">
        <span style="background:#2563eb;color:#ffffff;font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px;letter-spacing:0.5px;">
          ${isCareer ? "Career Application" : "New Enquiry"}
        </span>
      </td>

    </tr></table>

    <!-- Divider -->
    <div style="height:1px;background:rgba(255,255,255,0.12);margin:20px 0 16px;"></div>

    <!-- Subject line -->
    <table width="100%" cellspacing="0" cellpadding="0"><tr>
      <td>
        <div style="color:rgba(255,255,255,0.5);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">Interested Course</div>
        <div style="color:#ffffff;font-size:20px;font-weight:700;">${courseLabel}</div>
      </td>
      <td style="text-align:right;vertical-align:bottom;">
        <div style="color:rgba(255,255,255,0.45);font-size:11px;">${dateStr} &nbsp;·&nbsp; ${timeStr}</div>
      </td>
    </tr></table>
  </td></tr>

  <!-- ── BODY ───────────────────────────────────────────────── -->
  <tr><td style="background:#ffffff;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">

    <!-- Student profile row -->
    <table width="100%" cellspacing="0" cellpadding="0" style="padding:28px 32px 0;">
      <tr>
        <!-- Avatar -->
        <td style="vertical-align:top;" width="56">
          <div style="width:48px;height:48px;border-radius:50%;background:#1e3a8a;color:#ffffff;font-size:20px;font-weight:800;text-align:center;line-height:48px;">${initial}</div>
        </td>
        <!-- Name + meta -->
        <td style="vertical-align:top;padding-left:14px;">
          <div style="font-size:17px;font-weight:700;color:#0f172a;">${name}</div>
          <div style="font-size:12px;color:#64748b;margin-top:2px;">${classLabel} &nbsp;·&nbsp; ${queryLabel}</div>
        </td>
      </tr>
    </table>

    <!-- Horizontal rule -->
    <div style="height:1px;background:#f1f5f9;margin:20px 32px;"></div>

    <!-- Contact details -->
    <table width="100%" cellspacing="0" cellpadding="0" style="padding:0 32px;">
      <tr>
        <td style="padding-bottom:14px;">
          <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">Phone</div>
          <a href="tel:${phone}" style="font-size:14px;font-weight:600;color:#1e3a8a;text-decoration:none;">${phone}</a>
        </td>
        <td style="padding-bottom:14px;">
          <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">Email</div>
          <a href="mailto:${email}" style="font-size:14px;font-weight:600;color:#1e3a8a;text-decoration:none;">${email}</a>
        </td>
      </tr>
    </table>

    <!-- Course detail row -->
    <table width="100%" cellspacing="0" cellpadding="0" style="padding:0 32px 24px;">
      <tr>
        <td style="background:#f8fafc;border-radius:8px;padding:14px 16px;">
          <table width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td width="33%" style="border-right:1px solid #e2e8f0;padding-right:16px;">
                <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">Course</div>
                <div style="font-size:12px;font-weight:700;color:#1e3a8a;">${courseLabel}</div>
              </td>
              <td width="33%" style="border-right:1px solid #e2e8f0;padding:0 16px;">
                <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">Class</div>
                <div style="font-size:14px;font-weight:700;color:#0f172a;">${classLabel}</div>
              </td>
              <td width="33%" style="padding-left:16px;">
                <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">Purpose</div>
                <div style="font-size:12px;font-weight:700;color:#0f172a;">${queryLabel}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${message?.trim() ? `
    <!-- Message -->
    <table width="100%" cellspacing="0" cellpadding="0" style="padding:0 32px 24px;">
      <tr>
        <td>
          <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;">Message</div>
          <div style="border-left:3px solid #1e3a8a;padding:14px 16px;background:#f8fafc;border-radius:0 8px 8px 0;">
            <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">${message.trim()}</p>
          </div>
        </td>
      </tr>
    </table>
    ` : ""}

    ${resumeFile && resumeFile.size > 0 ? `
    <!-- Resume -->
    <table width="100%" cellspacing="0" cellpadding="0" style="padding:0 32px 24px;">
      <tr>
        <td>
          <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;">Resume Attached</div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;display:flex;align-items:center;">
            <span style="font-size:22px;margin-right:12px;">📎</span>
            <div style="display:inline-block;vertical-align:middle;margin-left:8px;">
              <div style="font-size:13px;font-weight:700;color:#0f172a;">${resumeFile.name}</div>
              <div style="font-size:11px;color:#64748b;margin-top:2px;">${(resumeFile.size / 1024).toFixed(0)} KB · See attachment</div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    ` : ""}

  </td></tr>

  <!-- ── ACTION BUTTONS ────────────────────────────────────── -->
  <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;padding:20px 32px;">
    <table width="100%" cellspacing="0" cellpadding="0"><tr>
      <td style="padding-right:8px;" width="50%">
        <a href="tel:${phone}" style="display:block;background:#1e3a8a;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px;border-radius:8px;text-align:center;">
          Call ${firstName}
        </a>
      </td>
      <td style="padding-left:8px;" width="50%">
        <a href="mailto:${email}?subject=Re: Your enquiry at Krishna Classes" style="display:block;background:#ffffff;color:#1e3a8a;font-size:13px;font-weight:700;text-decoration:none;padding:12px;border-radius:8px;text-align:center;border:1px solid #1e3a8a;">
          Reply via Email
        </a>
      </td>
    </tr></table>
  </td></tr>

  <!-- ── FOOTER ────────────────────────────────────────────── -->
  <tr><td style="background:#0f172a;border-radius:0 0 12px 12px;padding:20px 32px;">
    <div style="color:#ffffff;font-size:13px;font-weight:700;margin-bottom:4px;">Krishna Classes &amp; Home Tutors</div>
    <div style="color:#64748b;font-size:11px;margin-bottom:12px;">207, Mandakini Colony, Kolar Road, Bhopal · +91 78690 69906</div>
    <div style="color:#334155;font-size:10px;border-top:1px solid #1e293b;padding-top:12px;">
      Automated notification from krishnaclasses.in — do not reply directly.
    </div>
  </td></tr>

</table>
</td></tr>
</table>

</body>
</html>`

    await transporter.sendMail({
      from: `"Krishna Classes" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `${isCareer ? "Career Application" : "New Enquiry"} — ${name} · ${classLabel} · ${courseLabel}`,
      attachments,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}