migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x26f883v1jaydhw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b7tyxqh2",
    "name": "parent",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qeopwyan",
    "name": "content",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "gajdxwoxoth8v9a",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vtsorqyi",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x26f883v1jaydhw")

  // remove
  collection.schema.removeField("b7tyxqh2")

  // remove
  collection.schema.removeField("qeopwyan")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vtsorqyi",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
