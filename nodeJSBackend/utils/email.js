const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // most use services are send grid and mail gun. in this course sendGrid will be used
  // 1) create transporter
  // it is a service/server that we define to send emails eg gmail
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // activate in gmail 'less secure option'
  });
  // 2) define the email options
  const mailOptions = {
    from: 'Mecha <admin@natours.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere' });

// mg.messages
//   .create('sandbox-123.mailgun.org', {
//     from: 'Excited User <mailgun@sandboxe7ec59b2c25b46be851b3b3ceecc28c2.mailgun.org>',
//     to: ['test@example.com'],
//     subject: 'Hello',
//     text: 'Testing some Mailgun awesomeness!',
//     html: '<h1>Testing some Mailgun awesomeness!</h1>',
//   })
//   .then((msg) => console.log(msg)) // logs response data
//   .catch((err) => console.log(err)); // logs any error
