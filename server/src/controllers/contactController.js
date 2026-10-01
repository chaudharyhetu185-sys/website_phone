const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');
const { getIsConnected } = require('../config/db');

let inMemoryMessages = [];

// Helper to safely mask email strings for logging (e.g. j***@gmail.com)
const maskEmail = (email) => {
  if (!email || typeof email !== 'string') return '[None]';
  const parts = email.split('@');
  if (parts.length !== 2) return '[Invalid Email]';
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length <= 2 ? name[0] + '***' : name.slice(0, 2) + '***' + name.slice(-1);
  return `${maskedName}@${domain}`;
};

// Helper to get email configuration from environment variables
const getEmailConfig = () => {
  const mailHost = process.env.MAIL_HOST || 'smtp.gmail.com';
  const mailPort = parseInt(process.env.MAIL_PORT || '587', 10);
  const mailUser = (process.env.MAIL_USER || '').trim();
  // Strip any accidental spaces from Gmail App Passwords (e.g. "abcd efgh ijkl mnop" -> "abcdefghijklmnop")
  const rawPass = process.env.MAIL_PASSWORD || process.env.MAIL_PASS || '';
  const mailPass = rawPass.replace(/\s+/g, '').trim();

  // Primary receiver email (where customer inquiries land)
  const receiverEmail = (process.env.RECEIVER_EMAIL || process.env.CONTACT_RECEIVER_EMAIL || '').trim();
  // Optional second receiver email
  const receiverEmail2 = (process.env.CONTACT_RECEIVER_EMAIL_2 || '').trim();

  const receiversList = [receiverEmail, receiverEmail2].filter(Boolean);
  const receivers = receiversList.join(', ');

  const isPlaceholder = !mailPass || mailPass === 'your_gmail_app_password' || mailPass === 'your_gmail_app_password_here';
  const isConfigured = Boolean(mailUser && mailPass && !isPlaceholder && receiversList.length > 0);

  return {
    mailHost,
    mailPort,
    mailUser,
    mailPass,
    receiverEmail,
    receiverEmail2,
    receivers,
    receiversList,
    isConfigured,
    isPlaceholder
  };
};

// ─── Nodemailer Reusable Connection Pool ──────────────────────────────────────
let cachedTransporter = null;
let lastConfigHash = '';

const getTransporter = () => {
  const config = getEmailConfig();
  const configHash = `${config.mailHost}:${config.mailPort}:${config.mailUser}:${config.mailPass}`;

  // Reuse existing transporter instance if config hasn't changed
  if (cachedTransporter && lastConfigHash === configHash) {
    return cachedTransporter;
  }

  // Close previous transporter if config changed
  if (cachedTransporter) {
    try {
      cachedTransporter.close();
    } catch (e) {
      // ignore
    }
  }

  // Initialize pooled transporter for high throughput and zero connection overhead per request
  cachedTransporter = nodemailer.createTransport({
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    rateLimit: 5,
    host: config.mailHost,
    port: config.mailPort,
    secure: config.mailPort === 465, // true for port 465 (SSL), false for 587 (TLS/STARTTLS)
    auth: {
      user: config.mailUser,
      pass: config.mailPass,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });

  lastConfigHash = configHash;
  return cachedTransporter;
};

// ─── Transporter Verification (Startup / Diagnostics) ────────────────────────
const verifySMTPTransporter = async () => {
  const config = getEmailConfig();
  console.log('──────────────────────────────────────────────────');
  console.log('[SMTP Diagnostics]');
  console.log(`  Host:        ${config.mailHost}:${config.mailPort}`);
  console.log(`  Sender User: ${maskEmail(config.mailUser)}`);
  console.log(`  Password:    ${config.mailPass ? (config.isPlaceholder ? '[PLACEHOLDER - NOT REAL]' : `[Set - ${config.mailPass.length} chars]`) : '[MISSING]'}`);
  console.log(`  Receivers:   ${config.receiversList.map(maskEmail).join(', ') || '[MISSING]'}`);
  console.log(`  Configured:  ${config.isConfigured ? 'YES' : 'NO'}`);
  console.log('──────────────────────────────────────────────────');

  if (!config.isConfigured) {
    console.warn('⚠️  [SMTP Warning] Email service is NOT fully configured.');
    if (!config.mailUser) console.warn('   - Missing MAIL_USER');
    if (!config.mailPass || config.isPlaceholder) console.warn('   - Missing or placeholder MAIL_PASSWORD');
    if (config.receiversList.length === 0) console.warn('   - Missing RECEIVER_EMAIL');
    return false;
  }

  try {
    const transporter = getTransporter();
    await transporter.verify();
    console.log('✅ [SMTP Success] SMTP transporter connection verified and ready.');
    return true;
  } catch (err) {
    console.error('❌ [SMTP Error] SMTP verification failed:', err.message);
    if (err.code === 'EAUTH') {
      console.error('   Hint: Authentication failed. If using Gmail, make sure 2-Step Verification is ON and you are using a 16-character App Password (not your normal Gmail password).');
    }
    return false;
  }
};

// ─── Email HTML Template ─────────────────────────────────────────────────────
const buildEmailHTML = (payload) => {
  const { name, email, phone, service, subject, message, createdAt } = payload;
  const dateStr = new Date(createdAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; margin: 0; padding: 0; color: #0f172a; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); padding: 32px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
    .header p { margin: 8px 0 0; font-size: 13px; opacity: 0.9; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #4f46e5; margin-bottom: 6px; }
    .value { font-size: 15px; color: #0f172a; font-weight: 500; line-height: 1.5; }
    .value a { color: #4f46e5; text-decoration: none; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; font-size: 14px; color: #334155; line-height: 1.7; white-space: pre-wrap; word-break: break-word; }
    .footer { background: #f1f5f9; padding: 20px 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
    .divider { height: 1px; background: #e2e8f0; margin: 24px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Project Inquiry</h1>
      <p>Received via DuoVerse Contact Form</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Client Name</div>
        <div class="value"><strong>${escapeHtml(name)}</strong></div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      </div>
      ${phone ? `
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value">${escapeHtml(phone)}</div>
      </div>
      ` : ''}
      ${service ? `
      <div class="field">
        <div class="label">Interested Service</div>
        <div class="value">${escapeHtml(service)}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${escapeHtml(subject)}</div>
      </div>
      <div class="divider"></div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${escapeHtml(message)}</div>
      </div>
      <div class="divider"></div>
      <div class="field">
        <div class="label">Date & Time</div>
        <div class="value" style="font-size:13px; color:#64748b;">${dateStr}</div>
      </div>
    </div>
    <div class="footer">
      This message was sent directly through the DuoVerse website contact form.<br />
      Reply to this email to respond directly to <strong>${escapeHtml(email)}</strong>.
    </div>
  </div>
</body>
</html>`;
};

// Helper to escape HTML characters in templates
const escapeHtml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// ─── Real Email Dispatch Helper ──────────────────────────────────────────────
const sendContactEmail = async (payload) => {
  const config = getEmailConfig();

  if (!config.mailUser) {
    const err = new Error('MAIL_USER environment variable is missing on the server.');
    err.statusCode = 500;
    throw err;
  }

  if (!config.mailPass || config.isPlaceholder) {
    const err = new Error('MAIL_PASSWORD environment variable is missing or using placeholder on the server.');
    err.statusCode = 500;
    throw err;
  }

  if (config.receiversList.length === 0) {
    const err = new Error('RECEIVER_EMAIL environment variable is missing on the server.');
    err.statusCode = 500;
    throw err;
  }

  const transporter = getTransporter();

  const mailOptions = {
    from: `"DuoVerse Contact" <${config.mailUser}>`,
    to: config.receivers,
    replyTo: payload.email,
    subject: `New Inquiry from ${payload.name} — ${payload.subject || 'DuoVerse'}`,
    html: buildEmailHTML(payload),
    text: `New DuoVerse Contact Form Submission\n\nName: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || 'N/A'}\nService: ${payload.service || 'N/A'}\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}\n\nSubmitted at: ${new Date(payload.createdAt).toISOString()}`,
  };

  console.log(`[SMTP Dispatch] Delivering to [${config.receiversList.map(maskEmail).join(', ')}] via pooled connection...`);

  const info = await transporter.sendMail(mailOptions);

  // Validate that the email server accepted the message
  if (info.rejected && info.rejected.length > 0 && (!info.accepted || info.accepted.length === 0)) {
    const rejectErr = new Error(`Email recipient was rejected by mail server: ${info.rejected.join(', ')}`);
    rejectErr.statusCode = 502;
    throw rejectErr;
  }

  console.log(`✅ [SMTP Dispatch Success] Message ID: ${info.messageId}, Accepted: ${info.accepted ? info.accepted.length : 0}`);
  return info;
};

// ─── Controllers ──────────────────────────────────────────────────────────────

// @desc    Submit a contact form message & dispatch email
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
  console.log('[Contact API] Received POST /api/contact request');

  try {
    const { name, email, phone, service, subject, message } = req.body;

    // 1. Rigorous server-side validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your name.'
      });
    }

    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    if (!message || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a message of at least 5 characters.'
      });
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      service: service ? service.trim() : 'Web Development & Design',
      subject: (subject && subject.trim()) || 'New Website Project Inquiry',
      message: message.trim(),
      createdAt: new Date(),
    };

    // 2. Save record to DB or in-memory array (audit history)
    try {
      if (getIsConnected()) {
        await ContactMessage.create(payload);
      } else {
        inMemoryMessages.push({ id: `msg-${Date.now()}`, ...payload });
      }
    } catch (dbErr) {
      console.warn('⚠️ [Contact API] Could not save message to database:', dbErr.message);
    }

    // 3. Dispatch real email via pooled SMTP without blocking the user
    sendContactEmail(payload)
      .then((info) => {
        console.log(`✅ [Contact API Delivery Success] Message ID: ${info.messageId}, Accepted: ${info.accepted ? info.accepted.length : 0}`);
      })
      .catch((emailErr) => {
        if (emailErr.code === 'EAUTH') {
          console.error('❌ [SMTP Auth Error]: Authentication failed. Check MAIL_USER and MAIL_PASSWORD (Gmail App Password).');
        } else if (emailErr.code === 'ETIMEDOUT' || emailErr.code === 'ESOCKET' || emailErr.code === 'ECONNREFUSED') {
          console.error(`❌ [SMTP Connection Error]: Could not reach ${process.env.MAIL_HOST || 'smtp.gmail.com'}:${process.env.MAIL_PORT || '587'}. Error: ${emailErr.message}`);
        } else {
          console.error('❌ [SMTP Delivery Error]:', emailErr.message);
        }
      });

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you shortly.',
    });

  } catch (error) {
    console.error('❌ [Contact API Exception]:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected server error occurred. Please try again.'
    });
  }
};

// @desc    Get all submitted contact messages
// @route   GET /api/contact
// @access  Public (internal/admin)
exports.getContactMessages = async (req, res) => {
  try {
    if (getIsConnected()) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: messages.length, data: messages });
    }
    return res.status(200).json({ success: true, count: inMemoryMessages.length, data: inMemoryMessages, source: 'in-memory' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve messages', error: error.message });
  }
};

exports.verifySMTPTransporter = verifySMTPTransporter;
exports.getEmailConfig = getEmailConfig;

