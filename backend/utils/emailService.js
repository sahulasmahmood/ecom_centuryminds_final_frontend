const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.log('⚠️  Email service not configured - emails will be logged to console');
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      console.log('✅ Email service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error);
    }
  }

  async sendEmail({ to, subject, html }) {
    try {
      if (!this.transporter) {
        console.log('\n📧 Email (Console Mode):');
        console.log('To:', to);
        console.log('Subject:', subject);
        console.log('Body:', html.substring(0, 200) + '...');
        console.log('---\n');
        return { success: true, mode: 'console' };
      }

      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@fireworks.com',
        to,
        subject,
        html
      });

      console.log(`✅ Email sent to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();
