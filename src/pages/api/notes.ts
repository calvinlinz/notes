import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const { id, title, note, email } = req.body;
  const fs = require("fs");

  if (method == "POST") {
    const response = await require("../../../notes.json");
    try {
      const json = response.filter((note: any) => {
        return note.email == email;
      });
      res.status(200).json(json);
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
  if (method == "PUT") {
    try {
      const data = await require("../../../notes.json");
      const fileName = "notes.json";
      const id = data.length + 1;

      const newObject = { email: email, id: id, note: note, title: title };

      await fs.writeFile(
        fileName,
        JSON.stringify([...data, newObject]),
        (err: Error) => {
          if (err) console.log("Error writing file:", err);
        }
      );
      const newData = ([...data, newObject]).filter((note: any) => {
        return note.email == email;
      });
      res.status(200).json(newData);
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
  if (method == "DELETE") {
    const response = await require("../../../notes.json");
    try {
      const fileName = "notes.json";
      const json = response.filter((note: any) => {
        return note.id != id;
      });
      await fs.writeFile(fileName, JSON.stringify(json), (err: Error) => {
        if (err) res.status(500).send({ success: false });
      });

      const newData = response.filter((note: any) => {
        return note.email == email;
      });
      res.status(200).send(newData);
    } catch (err) {
      res.status(500).send({ success: false });
    }
  }
}
