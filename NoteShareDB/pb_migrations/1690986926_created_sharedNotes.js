migrate((db) => {
  const collection = new Collection({
    "id": "b4l62r5mxy5dj7o",
    "created": "2023-08-02 14:35:26.286Z",
    "updated": "2023-08-02 14:35:26.286Z",
    "name": "sharedNotes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "serg1o5a",
        "name": "sender",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "c59zgxlo",
        "name": "receiver",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "3jzkemhs",
        "name": "note",
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
  const collection = dao.findCollectionByNameOrId("b4l62r5mxy5dj7o");

  return dao.deleteCollection(collection);
})
