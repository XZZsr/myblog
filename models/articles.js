var mongoose = require('mongoose')
var Schema = mongoose.Schema

var acticlesSchema = new Schema({
	"title": String,
	"sub": String,
	"author": String,
	"created_at": String,
	"content": String,
	"type": String
})

module.exports = mongoose.model('Articles',acticlesSchema)