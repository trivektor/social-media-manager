import dbConnect from "../../../../lib/db-connect";
import { Network } from "../../../../models";
import { getSession } from "next-auth/react";
import axios from "axios";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getSession({ req });

  const network = await Network.findOne({
    createdBy: session.user.email,
    name: "Twitter",
  });

  const basicAuthToken = Buffer.from(
    [process.env.TWITTER_CLIENT_ID, process.env.TWITTER_CLIENT_SECRET].join(
      ":"
    ),
    "utf8"
  ).toString("base64");
  await axios.post(
    "https://api.twitter.com/2/oauth2/revoke",
    new URLSearchParams({
      token: network.accessToken,
      client_id: process.env.TWITTER_CLIENT_ID,
      // https://twittercommunity.com/t/invalidate-token-oauth2-v2-code-flow/170224/3
      token_type_hint: "access_token",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuthToken}`,
      },
    }
  );

  await Network.deleteOne({
    createdBy: session.user.email,
    name: "Twitter",
  });

  res.json({});
}
