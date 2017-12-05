var express = require('express')
var router = express.Router()

var mongoose = require('mongoose')
var Articles = require('../models/articles')

mongoose.connect('mongodb://127.0.0.1:27017/myblog')

mongoose.connection.on('connected',function () {
	console.log('myblog success')
})
mongoose.connection.on('error',function () {
	console.log('myblog fail')
})
mongoose.connection.on('disconnected',function () {
	console.log('myblog disconnected')
})

router.get('/',function (req,res,next) {
	Articles.find({},function (err,doc) {
		if(err){
			res.json({
				status: '1',
				mes: err.message
			})
		}else{
			res.json({
				status: '200',
				mes: '',
				result:{
					count: doc.length,
					list: doc
				}
			})
		}
	})
})

module.exports = router
