import dbConnect from "../../../../lib/db-connect";
import { Network } from "../../../../models";
import { getSession } from "next-auth/react";
import axios from "axios";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getSession({ req });

  const network = await Network.findOne({
    createdBy: session.user.email,
    name: "LinkedIn",
  });

  const basicAuthToken = Buffer.from(
    [process.env.LINKEDIN_CLIENT_ID, process.env.LINKEDIN_CLIENT_SECRET].join(
      ":"
    ),
    "utf8"
  ).toString("base64");

  https: await axios.post(
    "https://www.linkedin.com/oauth/v2/revoke",
    new URLSearchParams({
      token: network.accessToken,
      token_type_hint: "access_token",
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
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
    name: "LinkedIn",
  });

  res.json({});
}
