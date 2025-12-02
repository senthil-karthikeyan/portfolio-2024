"use server";

import nodemailer from "nodemailer";
import { google } from "googleapis";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const redirectUri = process.env.REDIRECT_URI;
const authEmail = process.env.AUTH_EMAIL;
const creatorEmail = process.env.CREATOR_EMAIL;

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri,
);

oAuth2Client.setCredentials({
  refresh_token: refreshToken,
});

type Data = {
  name: string;
  email: string;
  message: string;
};

export async function sendEmail(data: Data) {
  try {
    console.log({ data });
    const { name, email, message } = data;
    const accessToken = (await oAuth2Client.getAccessToken()) as string;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: authEmail,
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      },
    });

    const template = `
   <html>
  <head>
    <title>Client Mail</title>
  </head>

  <body style="margin:0; padding:0; background:#f7f7f7; font-family:Arial, sans-serif;">

    <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">

      <div style="background:#4A90E2; padding:20px; text-align:center; color:white;">
        <h2 style="margin:0; font-size:22px; letter-spacing:0.5px;">Client Message</h2>
      </div>

      <div style="padding:25px;">

        <h3 style="margin-top:0; font-size:18px; color:#333;">
          <strong>Name:</strong> ${name}
        </h3>
        <p style="font-size:15px; color:#555; margin:8px 0;">
          <strong>Email:</strong> ${email}
        </p>

        <p style="font-size:15px; color:#555; margin:15px 0 5px 0;">
          <strong>Message:</strong>
        </p>
        <div style="background:#fafafa; border-left:4px solid #4A90E2; padding:12px 14px; font-size:14px; color:#444; border-radius:4px;">
          ${message}
        </div>
      </div>
    </div>
  </body>
</html>
  `;

    const mailOptions: nodemailer.SendMailOptions = {
      from: authEmail,
      to: creatorEmail,
      subject: "Mail from User",
      html: template,
    };
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send email",
      // error,
    };
  }
}
