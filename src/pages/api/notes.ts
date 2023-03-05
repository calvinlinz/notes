import { NextApiRequest, NextApiResponse } from "next";
import {deleteData, generateData, putData} from "@/generateData";


export default async function handler(req : NextApiRequest, res : NextApiResponse){
    const method = req.method;
    const id = req.query.id;
    const title = req.query.title;
    const note = req.query.note;
    const email = req.query.email;

    switch(method){
        case "GET":
            res.status(200).json( await generateData())
        case "POST":
            res.status(200).json( await putData(id,title,note,email))
        case "DELETE":
            res.status(200).json( await deleteData(id,email))
    }

}