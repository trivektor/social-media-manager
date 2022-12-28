import dbConnect from "../../../lib/db-connect";
import { Network } from "../../../models";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const db = await dbConnect();
  const session = await getSession({ req });

  const networks = await Network.find(
    { createdBy: session.user.email },
    "name createdBy"
  );

  res.json({ networks });
}
