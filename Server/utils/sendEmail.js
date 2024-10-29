// import dotenv from "dotenv";
// import nodemailer from "nodemailer";
// import Verification from "../models/emailVerification.js";
// import { generateOTP, hashString } from "./index.js";

// dotenv.config();

// const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

// let transporter = nodemailer.createTransport({
//   host: "smtp-mail.outlook.com",
//   auth: {
//     user: AUTH_EMAIL,
//     pass: AUTH_PASSWORD,
//   },
// });

// export const sendVerificationEmail = async (user, res, token) => {
//   const { _id, email, name } = user;
//   const otp = generateOTP();

//   //   mail options
//   const mailOptions = {
//     from: AUTH_EMAIL,
//     to: email,
//     subject: "Email Verification",
//     html: `<div
//     style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
//     <h3 style="color: rgb(8, 56, 188)">Please verify your email address</h3>
//     <hr>
//     <h4>Hi, ${name},</h4>
//     <p>
//         Please verify your email address with the OTP.
//         <br>
//         <h1 styles='font-size: 20px; color: rgb(8, 56, 188);'>${otp}</h1>
//     <p>This OTP <b>expires in 2 mins</b></p>
//     </p>
//     <div style="margin-top: 20px;">
//         <h5>Regards</h5>
//         <h5>BlogUP</h5>
//     </div>
// </div>`,
//   };

//   try {
//     const hashedToken = await hashString(String(otp));

//     const newVerifiedEmail = await Verification.create({
//       userId: _id,
//       token: hashedToken,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 120000,
//     });

//     if (newVerifiedEmail) {
//       transporter
//         .sendMail(mailOptions)
//         .then(() => {
//           res.status(201).send({
//             success: "PENDING",
//             message:
//               "OTP has been sent to your account. Check your email and verify your email.",
//             user,
//             token,
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(404).json({ message: "Something went wrong" });
//         });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: "Something went wrong" });
//   }
// };

// import dotenv from "dotenv";
// import nodemailer from "nodemailer";
// import Verification from "../models/emailVerification.js";
// import { generateOTP, hashString } from "./index.js";
// import { google } from "googleapis";

// dotenv.config();

// const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, AUTH_EMAIL } = process.env;

// const sendVerificationEmail = async (user, res, token) => {
//   const { _id, email, name } = user;
//   const otp = generateOTP();

//   // Set up OAuth2 client
//   const OAuth2 = google.auth.OAuth2;
//   const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, "https://developers.google.com/oauthplayground");

//   oauth2Client.setCredentials({
//     refresh_token: REFRESH_TOKEN,
//   });
//   console.log("CLIENT_ID:", CLIENT_ID);
//   console.log("CLIENT_SECRET:", CLIENT_SECRET);
//   console.log("REFRESH_TOKEN:", REFRESH_TOKEN);
  
//   try {
//     // Obtain access token
//     const { token: accessToken } = await oauth2Client.getAccessToken();

//     // Set up the transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: AUTH_EMAIL,
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });

//     // Mail options
//     const mailOptions = {
//       from: AUTH_EMAIL,
//       to: email,
//       subject: "Email Verification",
//       html: `<div
//         style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
//         <h3 style="color: rgb(8, 56, 188)">Please verify your email address</h3>
//         <hr>
//         <h4>Hi, ${name},</h4>
//         <p>
//             Please verify your email address with the OTP.
//             <br>
//             <h1 style='font-size: 20px; color: rgb(8, 56, 188);'>${otp}</h1>
//         <p>This OTP <b>expires in 2 mins</b></p>
//         </p>
//         <div style="margin-top: 20px;">
//             <h5>Regards</h5>
//             <h5>BlogUP</h5>
//         </div>
//     </div>`,
//     };

//     // Save the OTP and user verification details
//     const hashedToken = await hashString(String(otp));

//     const newVerifiedEmail = await Verification.create({
//       userId: _id,
//       token: hashedToken,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 120000,
//     });

//     if (newVerifiedEmail) {
//       await transporter.sendMail(mailOptions); // Wait for the email to be sent
//       res.status(201).send({
//         success: "PENDING",
//         message: "OTP has been sent to your account. Check your email and verify your email.",
//         user,
//         token,
//       });
//     }
//   } catch (error) {
//     console.error("Error occurred while sending verification email:", error);
//     res.status(404).json({ message: "Something went wrong" });
//   }
// };

// export { sendVerificationEmail };


import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Verification from "../models/emailVerification.js";
import { generateOTP, hashString } from "./index.js";

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

export const sendVerificationEmail = async (user, res, token) => {
  const { _id, email, name } = user;
  const otp = generateOTP();

  // Set up the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: AUTH_EMAIL,
      pass: AUTH_PASSWORD,
    },
  });

  // Mail options
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `<div
      style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
      <h3 style="color: rgb(8, 56, 188)">Please verify your email address</h3>
      <hr>
      <h4>Hi, ${name},</h4>
      <p>
          Please verify your email address with the OTP.
          <br>
          <h1 style='font-size: 20px; color: rgb(8, 56, 188);'>${otp}</h1>
      <p>This OTP <b>expires in 2 mins</b></p>
      </p>
      <div style="margin-top: 20px;">
          <h5>Regards</h5>
          <h5>Write Wave</h5>
      </div>
  </div>`,
  };

  try {
    // Save the OTP and user verification details
    const hashedToken = await hashString(String(otp));

    const newVerifiedEmail = await Verification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 120000,
    });

    if (newVerifiedEmail) {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(201).send({
        success: "PENDING",
        message:
          "OTP has been sent to your account. Check your email and verify your email.",
        user,
        token,
      });
    }
  } catch (error) {
    console.error("Error occurred while sending verification email:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
