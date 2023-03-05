import { NextApiRequest, NextApiResponse } from "next";
import {deleteData, generateData} from "@/generateData";


export default async function handler(req : NextApiRequest, res : NextApiResponse){
    const method = req.method;
    res.status(200).json( await deleteData())

}