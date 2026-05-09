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
  const { street, city, state, pincode, country, email } = params;

  // Format address for email
  const addressMessage = `User Address Details:
Email: ${email}
Street: ${street}
City: ${city}
State: ${state}
PIN Code: ${pincode}
Country: ${country}`;

  // Send email to admin
  await sendEmail(addressMessage);

  return {
    statusCode: 302,
    headers: {
      Location: '/success.html',
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
    subject: 'User Address Submission',
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}
