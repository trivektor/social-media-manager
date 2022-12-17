import dbConnect from "../../../../lib/db-connect";
import axios from "axios";
import { Network } from "../../../../models";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { code } = req.query;
  const basicAuthToken = Buffer.from(
    [process.env.REDDIT_CLIENT_ID, process.env.REDDIT_CLIENT_SECRET].join(":"),
    "utf8"
  ).toString("base64");
  const {
    data: { access_token },
  } = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.REDDIT_CLIENT_ID,
      redirect_uri: `${process.env.REDIRECT_URI}/api/auth/callback/reddit`,
      code_verifier: "challenge",
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
    name: "Reddit",
    accessToken: access_token,
    createdBy: session.user.email,
  });

  res.redirect(process.env.REDIRECT_URI);
}
