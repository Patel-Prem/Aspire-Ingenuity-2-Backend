require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = ({ to, from, subject, text, html }) => {
  const msg = {
    to: to, // Recipient
    from: {
      name: "Aspiring Ingenuity", //Name of the email
      email: "aspiringingenuity@gmail.com",
    },
    subject: subject, //needs to change
    text: text,
    html: html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent to=>" + to);
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendMultipleMail = async ({ emails, from, subject, text, html }) => {
  console.log("{ emails, from, subject, text, html }");
  console.log({ emails, from, subject, text });
  const msg = {
    to: emails, // Recipient
    from: {
      name: "Aspiring Ingenuity", //Name of the email
      email: "aspiringingenuity@gmail.com", //Verified sender
    },
    subject: subject, //needs to change
    text: text,
  };
  const response = await sgMail
    .sendMultiple(msg)
    .then(() => {
      console.log("Email sent to =>" + emails.length + " Users");
      return {
        message: "Email sent to " + emails.length + " users successfully!",
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        message: "Error! Could not sent email.",
      };
    });
  return response;
};

module.exports = { sendMail, sendMultipleMail };
