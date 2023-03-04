migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d2ydnceal3b6eq1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i3fltqyb",
    "name": "email",
    "type": "email",
    "required": true,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d2ydnceal3b6eq1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i3fltqyb",
    "name": "email",
    "type": "email",
    "required": false,
    "unique": true,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
})
