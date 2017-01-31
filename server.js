#!/bin/env node
//  OpenShift sample Node application
var restify = require('restify');
var mongojs = require("mongojs");
var util = require('util');

var m_fr = require('./frames');
var m_pr = require('./properties');
var m_prt = require('./propertyTypes');
var m_et = require('./elements');

var ip_addr = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || '8080';

var db_name = process.env.OPENSHIFT_APP_NAME || "koapp";

var connection_string = '127.0.0.1:27017/' + db_name;
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

var db = mongojs(connection_string, [db_name]);
var dbUsers = db.collection("users");

//get or create databases and inject them into the module and return the repo.
var properties = m_pr(db.collection("properties"));
var propertyTypes = m_prt(db.collection("propertyTypes"));
var frames = m_fr(db.collection("frames"));
var elements = m_et(db.collection("elementTypes"),db.collection("elementVariants"));

var server = restify.createServer({
    name : "koapp"
});

server.pre(restify.pre.userAgentConnection());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

function authenticateOrigin(response,origin, callback){

    if(origin==null) //remove if live
        origin = 'null'; //remove if live

    dbUsers.findOne({domain:origin} , function(err , user){
        
        if(user == null)
        {
            console.log("unauthorized request from: "+origin);
            response.send(403,"Not a valid user!");
            return;
        }

        console.log("granted acces to: "+origin);
        return callback(user);
    })
}

function signResponse(res,req,callback)
{
    console.log('---------------------------------');
    console.log('Signing request from: ' + req.headers.origin);
    authenticateOrigin(res, req.headers.origin, function(user)
    {
        res.setHeader('Access-Control-Allow-Origin',user.domain);
        callback(user);     
    });
}

function adminUser(req , res , next){
    console.log('Request from:' + req.headers.origin);
    authenticateOrigin(res, req.headers.origin, function(user)
    {
        res.setHeader('Access-Control-Allow-Origin',user.domain);
        res.send(200,user);
    });
}

server.get('/populateElements' ,populateElements);
function populateElements(req , res , next){
    signResponse(res, req, function(user)
    {
        elements.populate();
        res.send(200,"OK");
    });
}

server.get('/elementTypes' ,getAllElementTypes);
function getAllElementTypes(req , res , next){
    signResponse(res, req, function(user)
    {
        elements.getAllTypes(function(result){
            res.send(200,result);
        });       
    });
}

//SAVE ELEMENT TYPE
server.post('/elementTypes' ,postElementTypes);
function postElementTypes(req , res , next){

    console.log('recieved:');
    console.log(req.params);
    signResponse(res, req, function(user)
    {
        req.params._id = mongojs.ObjectId(req.params._id);
        elements.saveType(req.params,function(result){
            res.send(201,result);
        });       
    });
}

//SAVE ELEMENT VARIANT
server.post('/elementVariants' ,postElementVariant);
function postElementVariant(req , res , next){

    console.log('recieved:');
    console.log(req.params);
    signResponse(res, req, function(user)
    {
        req.params._id = mongojs.ObjectId(req.params._id);
        elements.saveVariant(req.params,function(result){
            res.send(201,result);
        });       
    });
}

server.get('/elementVariants' ,getAllElementVariants);
function getAllElementVariants(req , res , next){
    signResponse(res, req, function(user)
    {
        elements.getAllVariants(function(result){
            res.send(200,result);
        });       
    });
}

server.post('/elementTypeConnectVariants' ,connectElementTypesVariants);
function connectElementTypesVariants(req , res , next){
    signResponse(res, req, function(user)
    {
        console.log('recieved:');
        console.log(req.params);

        req.params.type_id = mongojs.ObjectId(req.params.type_id);
        for(var v in req.params.variant_ids)
        {
            req.params.variant_ids[v] = mongojs.ObjectId(req.params.variant_ids[v]);
        }
        
        elements.connect(req.params.type_id,req.params.variant_ids,function(result){
            res.send(200,result);
        });       
    });
}

server.get('/populatePropertyTypes' ,populatePropertyTypes);
function populatePropertyTypes(req , res , next){
    signResponse(res, req, function(user)
    {
        propertyTypes.populate();
        res.send(200,"OK");
    });
}

server.get('/propertyTypes' ,getAllPropertyTypes);
function getAllPropertyTypes(req , res , next){
    signResponse(res, req, function(user)
    {
        propertyTypes.getAll(function(result){
            res.send(200,result);
        });       
    });
}

server.get('/populateProperties' ,populateProperties);
function populateProperties(req , res , next){
    signResponse(res, req, function(user)
    {
        properties.populate();
        res.send(200,"OK");
    });
}

server.get('/properties' ,getAllProperties);
function getAllProperties(req , res , next){
    signResponse(res, req, function(user)
    {
        properties.getAll(function(result){
            res.send(200,result);
        });       
    });
}

server.post('/properties' ,postProperties);
function postProperties(req , res , next){

    console.log('recieved:');
    console.log(req.params);
    signResponse(res, req, function(user)
    {
        req.params._id = mongojs.ObjectId(req.params._id);
        properties.save(req.params,function(result){
            res.send(201,result);
        });       
    });
}

server.del('/properties/:id' ,deleteProperties);
function deleteProperties(req , res , next){
    signResponse(res, req, function(user)
    {
        console.log('recieved:');
        console.log(req.params);
        properties.remove({_id:mongojs.ObjectId(req.params.id)}, function(result){
            res.send(204,result);
        });       
    });
}

server.get('/populateFrames' ,populateFrames);
function populateFrames(req , res , next){
    signResponse(res, req, function(user)
    {
        frames.populate();
        res.send(200,"OK");
    });
}

server.get('/frames' ,getAllFrames);
function getAllFrames(req , res , next){
    signResponse(res, req, function(user)
    {
        frames.getAll(function(result){
            res.send(200,result);
        });       
    });
}

server.get('/frames/:frameId' ,getOneFrame);
function getOneFrame(req , res , next){
    signResponse(res, req, function(user)
    {
        frames.getOne(req.params.frameId, function(result){
            res.send(200,result);
        });       
    });
}

server.get('/' ,home);
function home(req , res , next){
    res.send(200,'test 123');
}

server.get({path : '/adminUser' , version: '0.0.1'} ,adminUser);

server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
})

