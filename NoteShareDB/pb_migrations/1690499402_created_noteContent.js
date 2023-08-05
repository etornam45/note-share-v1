migrate((db) => {
  const collection = new Collection({
    "id": "gajdxwoxoth8v9a",
    "created": "2023-07-27 23:10:02.007Z",
    "updated": "2023-07-27 23:10:02.007Z",
    "name": "noteContent",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fqqf3hmf",
        "name": "content",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("gajdxwoxoth8v9a");

  return dao.deleteCollection(collection);
})
