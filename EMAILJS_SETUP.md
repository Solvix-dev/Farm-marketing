# EmailJS Setup Guide

This guide will help you set up EmailJS to enable real email functionality for the contact forms and newsletter subscription.

## 🚀 Quick Setup

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template for contact forms:

```
Subject: New Contact Form Submission - {{subject}}

Hello {{to_name}},

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

Best regards,
Your Website Contact Form
```

4. **Copy the Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_def456`)

### 5. Update Configuration
1. Open `src/config/emailjs.config.ts`
2. Replace the placeholder values:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_actual_service_id',
  TEMPLATE_ID: 'your_actual_template_id', 
  PUBLIC_KEY: 'your_actual_public_key',
  NEWSLETTER_TEMPLATE_ID: 'your_newsletter_template_id', // Optional
};
```

## 📧 Template Variables

The following variables are available in your EmailJS templates:

### Contact Form Variables
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email address
- `{{phone}}` - Sender's phone number (optional)
- `{{subject}}` - Email subject/inquiry type
- `{{message}}` - The message content
- `{{to_name}}` - Your business name (GreenSickle Agro Team)

### Newsletter Variables
- `{{from_email}}` - Subscriber's email
- `{{to_name}}` - Your business name

## 🎯 Features Enabled

Once configured, the following features will work:

✅ **Main Contact Form** - Sends detailed inquiries to your email
✅ **Footer Contact Form** - Quick contact form in footer
✅ **Newsletter Subscription** - Notifies you of new subscribers
✅ **Form Validation** - Client-side validation before sending
✅ **Loading States** - Visual feedback during email sending
✅ **Success/Error Messages** - User feedback with toast notifications

## 🔧 Testing

1. Fill out any contact form on your website
2. Check your email inbox for the message
3. Verify all template variables are populated correctly

## 📝 Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- 1 email template
- Basic support

For higher volume, consider upgrading to a paid plan.

## 🛠 Troubleshooting

### Common Issues:

1. **Emails not sending**
   - Check your Service ID, Template ID, and Public Key
   - Verify your email service is properly connected
   - Check browser console for error messages

2. **Template variables not working**
   - Ensure variable names match exactly (case-sensitive)
   - Check template syntax in EmailJS dashboard

3. **Gmail/Google issues**
   - Enable 2-factor authentication
   - Use App Password instead of regular password
   - Check Gmail security settings

## 🔒 Security Notes

- Public Key is safe to expose in frontend code
- Never expose your Private Key in frontend code
- EmailJS handles email sending securely on their servers
- Form data is transmitted over HTTPS

## 📞 Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: Available through their dashboard
- This project: Check the contact form implementation in `src/components/ContactForm.tsx`
