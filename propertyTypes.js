module.exports = function(collection){

    return {
        populate: function () {
            console.log("populating propertyTypes");
            collection.insert([
                { "_id": 1, "name": "draairichting", "editorType": "radio", "description": "Draairichting van dit element", "imageUrl": null, "htmlMemo": null, "isVisible": true, "properties": [] },
                { "_id": 2, "name": "lijstdikte", "editorType": "combo", "description": "Dikte van de omlijsting om dit element", "imageUrl": null, "htmlMemo": null, "isVisible": true, "properties": [] },
                { "_id": 3, "name": "raamboompjes", "editorType": "radio", "description": "Raamboompjes", "imageUrl": null, "htmlMemo": null, "isVisible": true, "properties": [] },
                { "_id": 4, "name": "scharnieren", "editorType": "combo", "description": "Scharnieren", "imageUrl": null, "htmlMemo": null, "isVisible": true, "properties": [] },
                { "_id": 5, "name": "deurafmeting", "editorType": "radio", "description": "Afmetingen van de deur", "imageUrl": null, "htmlMemo": null, "isVisible": true, "properties": [] }
            ]);
        },
        getAll: function (callback) {
            console.log("getting all propertyTypes");
            collection.find(function (err, data) {
                callback(data);
            });
        }
    };
}