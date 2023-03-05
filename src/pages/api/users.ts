import { NextApiRequest, NextApiResponse } from "next";
import { newUser } from "@/pages/api/dbQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req?.method;
  const name = req.body?.name;
  const email = req.body?.email;

  switch (method) {
    case "POST":
      let data = await newUser(name, email);
      res.status(200).json(data);
      return;
    default:
      res.status(404).json({ name: "notes end point" });
      return;
  }
}
