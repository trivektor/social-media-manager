import dbConnect from "../../../../lib/db-connect";
import axios from "axios";
import { Network } from "../../../../models";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { code } = req.query;
  const basicAuthToken = Buffer.from(
    [process.env.NOTION_CLIENT_ID, process.env.NOTION_CLIENT_SECRET].join(":"),
    "utf8"
  ).toString("base64");
  const {
    data: { access_token },
  } = await axios.post(
    "https://api.notion.com/v1/oauth/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      redirect_uri: `${process.env.REDIRECT_URI}/api/auth/callback/notion`,
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
    name: "Notion",
    accessToken: access_token,
    createdBy: session.user.email,
  });

  res.redirect(process.env.REDIRECT_URI);
}
