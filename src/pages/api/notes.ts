import { NextApiRequest, NextApiResponse } from "next";
import { deleteData, putData, userData } from "@/pages/api/dbQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req?.method;
  const id = req.body?.id;
  const title = req.body?.title;
  const note = req.body?.note;
  const email = req.body?.email;

  switch (method) {
    case "POST":
      let data = await userData(email);
      res.status(200).json(data);
      return;
    case "PUT":
      data = await putData(id, title, note, email);
      res.status(200).json(data);
      return;
    case "DELETE":
      data = await deleteData(id, email);
      res.status(200).json(data);
      return;
    default:
      res.status(404).json({ name: 'notes end point' });
      return;
  }
}
