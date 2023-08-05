migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x26f883v1jaydhw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5o3nwbpe",
    "name": "sharedUsers",
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
  collection.schema.removeField("5o3nwbpe")

  return dao.saveCollection(collection)
})
