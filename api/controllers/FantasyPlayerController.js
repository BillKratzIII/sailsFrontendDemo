/**
 * FantasyPlayerController
 *
 * @description :: Server-side logic for managing fantasty players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/fantasyplayer"

module.exports = {

  /**
   * `FantasyPlayerController.create()`
   */
  create: function (req, res) {
        
        if(req.method != "POST"){
          return res.view('create');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         
        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                return res.view('create', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('create', {success:{message: "Record created successfully"}});

        })
 
  },


  /**
   * `FantasyPlayerController.read()`
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view('read', {fantasyplayers: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the record!"}});
    });

  },


  /**
   * `FantasyController.update()`
   */
  update: function (req, res) {
        
        var values = req.allParams();
        var modifiedEndpoint = endpoint + "/" + values.id;

        if(req.method != "POST"){
          return res.view('update');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
        //MODIFY ENDPOINT URL
        client.put(modifiedEndpoint, args, function (data, response) {
            if(response.statusCode != "200"){
                return res.view('update', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('update', {success:{message: "Record updated successfully"}});

        })
  },


  /**
   * `FantasyPlayerController.delete()`
   */
  delete: function (req, res) {

    var values = req.allParams();
    var modifiedEndpoint = endpoint + "/" + values.id;

        if(req.method != "POST"){
          return res.view('delete');
        }

        client.delete(modifiedEndpoint, function (data, response) {
            if(response.statusCode != "200"){
                return res.view('update', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('update', {success:{message: "Record deleted successfully"}});

        })
  }
};

