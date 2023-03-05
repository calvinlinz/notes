import { useSelector } from "react-redux";
import { selectEmail } from "./loginSlice";


export async function allData(){
    const response = await require("../notes.json");

    return response;
}


export async function userData(email : any){
    const response = await require("../notes.json");
    const json =  response.filter((note:any) => {
        return note.email == email;
    });
    return json;
}

export async function deleteData(id : any, email : any){
    const fs = require('fs');
    const response = await require("../notes.json");
    const fileName = "./notes.json"

    const json =  response.filter((note:any) => {
        return null
    });

    fs.writeFileSync(fileName, JSON.stringify(json, null, 2));
}

export async function putData(id : any, title: any, note : any, email : any){
    const fs = require('fs');
    const response = await require("../notes.json");
    const fileName = "./notes.json"

    const newObject = {"email": email,
    "id": id,
    "note": note,
    "title": title};

    fs.writeFile(fileName, JSON.stringify([...response, newObject]), (err:Error) => {
        if (err) console.log('Error writing file:', err);
    })
}

