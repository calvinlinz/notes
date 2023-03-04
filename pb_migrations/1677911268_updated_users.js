migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pxrwybu0wn7d2d0")

  // remove
  collection.schema.removeField("4q4w3atc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "em3bfi6n",
    "name": "email",
    "type": "email",
    "required": false,
    "unique": true,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pxrwybu0wn7d2d0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4q4w3atc",
    "name": "email",
    "type": "text",
    "required": false,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("em3bfi6n")

  return dao.saveCollection(collection)
})
