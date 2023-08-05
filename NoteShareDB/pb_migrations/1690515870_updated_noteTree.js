migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x26f883v1jaydhw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "weddkexb",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x26f883v1jaydhw")

  // remove
  collection.schema.removeField("weddkexb")

  return dao.saveCollection(collection)
})
