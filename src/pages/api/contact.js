import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    if (!gmailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid @gmail.com address' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    try {
      await transporter.verify();
    } catch {
      return res.status(500).json({ message: 'SMTP configuration error' });
    }

    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: `Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1;">New Portfolio Contact</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr style="border: 1px solid #e5e7eb;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
      });

      return res.status(200).json({ message: 'Email sent successfully' });
    } catch {
      return res.status(500).json({ message: 'Failed to send email' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
