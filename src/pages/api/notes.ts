import { NextApiRequest, NextApiResponse } from "next";
import {allData, deleteData, putData, userData} from "@/generateData";


export default async function handler(req : NextApiRequest, res : NextApiResponse){
    const method = req.method;
    const id = req.body.id;
    const title = req.body.title;
    const note = req.body.note;
    const email = req.body.email;

    switch(method){
        case "POST":
            res.status(200).json( await userData(email));
            return;
        case "PUT":
            res.status(200).json( await putData(id,title,note,email))
            return;
        case "DELETE":
            res.status(200).json( await deleteData(id,email));
            return;
        default:
            res.status(404).json("FAILED");
            return;
    }

}