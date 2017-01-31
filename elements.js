module.exports = function (types,variants) {

    return {
        populate: function () {
            console.log("removing elementTypes");
            types.remove(function () {
                console.log("removing elementVariants");
                variants.remove(function () {
                    console.log("populating elementTypes");
                    types.insert([
                        { "maxWidth": 3000, "minWidth": 10, "maxHeight": 3000, "minHeight": 10, "maxM2": null, "name": "none", "fixed": false     ,"variants":[]   },
                        { "maxWidth": 3000, "minWidth": 100, "maxHeight": 3000, "minHeight": 140, "maxM2": null, "name": "glass", "fixed": false  ,"variants":[]  },
                        { "maxWidth": 3000, "minWidth": 100, "maxHeight": 3000, "minHeight": 140, "maxM2": null, "name": "window", "fixed": false ,"variants":[]   },
                        { "maxWidth": 1200, "minWidth": 100, "maxHeight": 3000, "minHeight": 140, "maxM2": null, "name": "door", "fixed": true    ,"variants":[]   },
                        { "maxWidth": 3000, "minWidth": 100, "maxHeight": 3000, "minHeight": 140, "maxM2": null, "name": "doors", "fixed": true   ,"variants":[]   },
                        { "maxWidth": 3000, "minWidth": 100, "maxHeight": 3000, "minHeight": 140, "maxM2": null, "name": "panel", "fixed": false  ,"variants":[]   }
                    ], function () {
                        console.log("populating elementVariants");
                        variants.insert([
                                { "title": "Draai-kiep-raam", "description": "Een mooi draai-kiep-raam", "imageUrl": "http://www.kozijnen-webshop.nl/media/catalog/product/cache/1/image/400x400/9df78eab33525d08d6e5fb8d27136e95/d/r/drv_1_1.jpg", "htmlMemo": "Lang verhaal over draaikiepraam", "properties": [], "propertySets": [] },
                                { "title": "Val-raam", "description": "Een valraam gaat naar binnen toe open", "imageUrl": "http://www.harryvankozijnen.nl/wp-content/uploads/2012/03/valraam-wp1-e1330693452251-420x560.png", "htmlMemo": "Verhaaltje over het val-raampje", "properties": [], "propertySets": [] },
                                { "title": "Uitzet-raam", "description": "Raam dat de scharnieren aan de bovenkant heeft en naar buiten toe open gaat.", "imageUrl": "http://www.kozijnen-weetjes.nl/wp-content/uploads/sites/15/2014/10/kozijn-uitleg.png", "htmlMemo": "Verhaal", "properties": [], "propertySets": [] }
                        ]);
                    });
                });
            });
        },
        saveType: function (obj, callback) {
            console.log("saving elementType " + obj._id);
            types.save(obj, callback);
        },
        saveVariant: function (obj, callback) {
            console.log("saving elementVariant " + obj._id);
            variants.save(obj, callback);
        },
        connect: function (type_id, variant_ids, callback) {
            console.log("connecting variants to elementtypes");
            types.update(
               { _id: type_id },
               { $addToSet: { variants: { $each: variant_ids } } },
               function (err, data) {
                callback(data);
               });
        },
        getAllTypes: function (callback) {
            console.log("getting all elementTypes");
            types.find(function (err, data) {
                callback(data);
            });
        },
        getAllVariants: function (callback) {
            console.log("getting all elementVariants");
            variants.find(function (err, data) {
                callback(data);
            });
        }
    };
}