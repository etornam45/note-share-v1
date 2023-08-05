migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x26f883v1jaydhw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ce8qzqrd",
    "name": "root",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "x26f883v1jaydhw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x26f883v1jaydhw")

  // remove
  collection.schema.removeField("ce8qzqrd")

  return dao.saveCollection(collection)
})
