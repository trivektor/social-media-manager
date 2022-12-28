import dbConnect from "../../../../lib/db-connect";
import { Network } from "../../../../models";
import { getSession } from "next-auth/react";
import axios from "axios";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getSession({ req });

  const network = await Network.findOne({
    createdBy: session.user.email,
    name: "Reddit",
  });

  const basicAuthToken = Buffer.from(
    [process.env.REDDIT_CLIENT_ID, process.env.REDDIT_CLIENT_SECRET].join(":"),
    "utf8"
  ).toString("base64");

  //github.com/reddit-archive/reddit/wiki/OAuth2#manually-revoking-a-token
  https: await axios.post(
    "https://www.reddit.com/api/v1/revoke_token",
    new URLSearchParams({
      token: network.accessToken,
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
    name: "Reddit",
  });

  res.json({});
}
