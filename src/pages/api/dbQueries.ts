

export async function allData(){
    return await require("../../../notes.json");
}

export async function userData(email : string){
    const response = await require("../../../notes.json");
    const json =  response.filter((note:any) => {
        return note.email == email;
    });
    
    return json;
}

export async function deleteData(id : string, email : string){
    const fs = require('fs');
    const response = await require("../../../notes.json");
    const fileName = "./notes.json"

    const json =  response.filter((note:any) => {
        return note.id != id && note.email == email
    });

    fs.writeFileSync(fileName, JSON.stringify(json, null, 2));
    return await require("../../../notes.json");
}

export async function putData(id : string, title: string, note : string, email : string){
    const fs = require('fs');
    const response = await require("../../../notes.json");
    const fileName = "./notes.json"

    const newObject = {"email": email,
    "id": id,
    "note": note,
    "title": title};

    fs.writeFile(fileName, JSON.stringify([...response, newObject]), (err:Error) => {
        if (err) console.log('Error writing file:', err);
    })

    return await require("../../../notes.json");
}

