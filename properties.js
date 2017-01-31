module.exports = function (collection) {

    return {
        populate: function () {
            collection.remove(function () {
                console.log("populating properties");
                collection.insert([
                    { "type_id": "lijstdikte", "name": "50mm omlijsting", "description": "De rand van het raam is 5cm dik", "value": "50", "price": null, "per": null, "unit": null, "imageUrl": null, "htmlMemo": null, "forSale": false, "propertyType": null },
                    { "type_id": "lijstdikte", "name": "80mm omlijsting", "description": "De rand van het raam is 8cm dik", "value": "80", "price": null, "per": null, "unit": null, "imageUrl": null, "htmlMemo": null, "forSale": false, "propertyType": null },
                    { "type_id": "lijstdikte", "name": "100mm omlijsting", "description": "De rand van het raam is 10cm dik", "value": "100", "price": null, "per": null, "unit": null, "imageUrl": null, "htmlMemo": null, "forSale": false, "propertyType": null },
                    { "type_id": "lijstdikte", "name": "120mm omlijsting", "description": null, "value": "120", "price": null, "per": null, "unit": null, "imageUrl": null, "htmlMemo": null, "forSale": false, "propertyType": null },
                    { "type_id": "lijstdikte", "name": "140mm omlijsting", "description": null, "value": "140", "price": null, "per": null, "unit": null, "imageUrl": null, "htmlMemo": null, "forSale": false, "propertyType": null },
                      
                    { "type_id": "draairichting", "name": "Draaikiep", "description": "Draai-kiep richting naar binnen", "value": "dk", "price": null, "per": null, "unit": null, "imageUrl": null, "htmlMemo": null, "forSale": false, "propertyType": null },
                    { "type_id": "draairichting", "name": "Uitzet binnen", "description": "Raam zet uit naar binnen, let wel op dat het naar binnen kan regenen op deze manier", "value": "uzi", "price": null, "per": null, "unit": null, "imageUrl": null, "htmlMemo": null, "forSale": false, "propertyType": null },
                    { "type_id": "draairichting", "name": "Uitzet buiten", "description": "Raam zet uit naar binnen, let wel op dat het naar buiten, scharnieren zitten boven", "value": "uzo", "price": null, "per": null, "unit": null, "imageUrl": null, "htmlMemo": null, "forSale": false, "propertyType": null },
                       
                    { "type_id": "raamboompjes", "name": "RVS Raamboompje", "description": "Roest vrij staal", "value": "rbrvs", "price": 5.00, "per": 1.00, "unit": "stuk", "imageUrl": null, "htmlMemo": null, "forSale": true, "propertyType": null },
                    { "type_id": "raamboompjes", "name": "Aluminium Raamboompje", "description": "Licht in gebruik", "value": "rbalu", "price": 2.50, "per": 1.00, "unit": "stuk", "imageUrl": null, "htmlMemo": null, "forSale": true, "propertyType": null },
                       
                    { "type_id": "scharnieren", "name": "2 Scharnieren", "description": "Eenvoudige RVS scharnieren", "value": "snsimp", "price": 10.00, "per": 2.00, "unit": "stuk", "imageUrl": null, "htmlMemo": null, "forSale": true, "propertyType": null },
                    { "type_id": "scharnieren", "name": "2 Scharnieren", "description": "RVS scharnieren anti inbraak", "value": "snainbr", "price": 20.00, "per": 2.00, "unit": "stuk", "imageUrl": null, "htmlMemo": null, "forSale": true, "propertyType": null },
                      
                    { "type_id": "deurmaat", "name": "2015 x 630", "description": null, "value": "2015;630", "price": 50.00, "per": 1.00, "unit": "stuk", "imageUrl": null, "htmlMemo": null, "forSale": true, "propertyType": null },
                    { "type_id": "deurmaat", "name": "2015 x 680", "description": null, "value": "2015;680", "price": 50.00, "per": 1.00, "unit": "stuk", "imageUrl": null, "htmlMemo": null, "forSale": true, "propertyType": null },
                    { "type_id": "deurmaat", "name": "2015 x 730", "description": null, "value": "2015;730", "price": 50.00, "per": 1.00, "unit": "stuk", "imageUrl": null, "htmlMemo": null, "forSale": true, "propertyType": null },
                    { "type_id": "deurmaat", "name": "2015 x 780", "description": null, "value": "2015;780", "price": 50.00, "per": 1.00, "unit": "stuk", "imageUrl": null, "htmlMemo": null, "forSale": true, "propertyType": null },
                    { "type_id": "deurmaat", "name": "2015 x 830", "description": null, "value": "2015;830", "price": 50.00, "per": 1.00, "unit": "stuk", "imageUrl": null, "htmlMemo": null, "forSale": true, "propertyType": null }
                ]);
            });
            // whatever
        },
        save: function(obj,callback){
            console.log("saving property " + obj._id);
            collection.save(obj, callback);
        },
        remove : function(obj,callback)
        {
            console.log("removing property " + obj._id);
            collection.remove(obj, function (err, data) {
                callback(data);
            })
        },
        getAll: function (callback) {
            console.log("getting all properties...");
            collection.find(function (err, data) {
                callback(data);
            });
        },
    };
}