import { InferGetStaticPropsType } from "next";



export async function generateData(){
    const response = await require("../notes.json");
    return response;
}

export async function deleteData(){
    const fs = require('fs');
    const response = await require("../notes.json");
    const fileName = "./notes.json"

    const newObject = {"email": "23@gmail.com","id": "3",};

    const json =  response.filter((note:any) => {
        return note.id != newObject.id && note.email != newObject.email;
    });

    fs.writeFileSync(fileName, JSON.stringify(json, null, 2));


    return response;
}



export async function putData(){
    const fs = require('fs');
    const response = await require("../notes.json");
    const fileName = "./notes.json"

    const newObject = {"email": "23@gmail.com",
    "id": "3",
    "note": "232\n\n\nSwen326",
    "title": "TESTER"};

    fs.writeFile(fileName, JSON.stringify([...response, newObject]), (err:Error) => {
        if (err) console.log('Error writing file:', err);
    })
}

