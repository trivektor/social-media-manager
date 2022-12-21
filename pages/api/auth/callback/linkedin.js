import dbConnect from "../../../../lib/db-connect";
import axios from "axios";
import { Network } from "../../../../models";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { code, state } = req.query;
  const basicAuthToken = Buffer.from(
    [process.env.LINKEDIN_CLIENT_ID, process.env.LINKEDIN_CLIENT_SECRET].join(
      ":"
    ),
    "utf8"
  ).toString("base64");
  console.log({ code });
  const {
    data: { access_token },
  } = await axios.post(
    "https://www.linkedin.com/oauth/v2/accessToken",
    new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      redirect_uri: `${process.env.REDIRECT_URI}/api/auth/callback/linkedin`,
      code,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuthToken}`,
      },
    }
  );

  await dbConnect();

  const session = await getSession({ req });

  await Network.create({
    name: "LinkedIn",
    accessToken: access_token,
    createdBy: session.user.email,
  });

  res.redirect(process.env.REDIRECT_URI);
}
