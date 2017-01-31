module.exports = function (collection) {

    return {
        populate: function () {
            console.log("populating frames");
            collection.insert([
                { "_id": 1, "userId": "794e8a1c-285a-405e-8525-c4c79c0d155f", "frameId": null, "width": 3500, "height": 2600, "columns": "500,1750,2100,2700", "rows": "600", "isAd": false, "isTemplate": false, "fixedPrice": null, "fromPrice": null, "discount": null, "comments": null, "customerId": null, "user": null, "customer": null, "frameElements": [], "childs": [], "parent": null, "specifications": [], "allPropertySets": [], "allProperties": [] },
                { "_id": 2, "userId": "794e8a1c-285a-405e-8525-c4c79c0d155f", "frameId": null, "width": 3500, "height": 2500, "columns": "750,1300", "rows": "1500", "isAd": false, "isTemplate": false, "fixedPrice": null, "fromPrice": null, "discount": null, "comments": null, "customerId": null, "user": null, "customer": null, "frameElements": [], "childs": [], "parent": null, "specifications": [], "allPropertySets": [], "allProperties": [] }
            ]);
        },
        getAll: function (callback) {
            console.log("getting all frames");
            collection.find(function (err, data) {
                callback(data);
            });
        },
        getOne: function (id,callback) {
            console.log("getting frame: " +id);
            collection.find({ _id: id }, {}, { limit: 1 }, function (err, data) {
                var obj = data.length > 0 ? data[0] : null;
                callback(obj);
            });
        }
    };
}