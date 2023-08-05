migrate((db) => {
  const collection = new Collection({
    "id": "x26f883v1jaydhw",
    "created": "2023-07-27 23:07:23.668Z",
    "updated": "2023-07-27 23:07:23.668Z",
    "name": "noteTree",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("x26f883v1jaydhw");

  return dao.deleteCollection(collection);
})
