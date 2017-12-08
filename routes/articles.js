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

router.get('/',function (req,res,next) {  //查询所有
	Articles.find({},function (err,doc) {
		if(err){
			res.json({
				status_code: '422',
				message: err.message,
			})
		}else{
			res.json({
				status_code: '200',
				message: 'ok',
				data: doc,
			})
		}
	})
})
router.get('/:id',function (req,res,next) {  //根据id查询单例
	Articles.findById(req.params.id, function(err, doc) {
		if (err){
			res.json({
				status_code: '422',
				message: err.message,
				req: req.params.id
			})
		}else{
			res.json({
				status_code: '200',
				message: 'ok',
				data: doc,
				req: req.params.id
			})
		}
	});
})
router.put('/:id',function (req,res,next) {  //更新博客
	Articles.findById(req.params.id, function(err, doc) {
		if (err){
			res.json({
				status_code: '422',
				message: err.message,
			})
		}else{
			doc.title = req.body.title
			doc.save(function(err,data){
				if(err){
					res.json({
						status_code: '422',
						message: err.message,
					})
				}else{
					res.json({
						status_code: '200',
						message: 'ok',
						data: data
					})
				}
			})
		}
	});
})
router.post('/',function(req,res){  //创建博客
	if(req.body.title == '' || req.body.title == undefined){
		res.json({
			status_code: '422',
			message: '标题不能为空'
		})
	}
	if(req.body.content == '' || req.body.content == undefined){
		res.json({
			status_code: '422',
			message: '正文不能为空'
		})
	}
	let title = req.body.title
	let content = req.body.content
	let sub = req.body.sub || ''
	let author = req.body.author || ''
	let article = new Articles({title,content,sub,author})
	article.save(function(err){
		if(err){
			res.json({
				status_code: '422',
				message: err.message,
				req: req
			})
		}else{
			res.json({
				status_code: '200',
				message: 'ok'
			})
		}
	})
})
router.delete('/:id',function(req,res){  //删除博客
	Articles.remove(req.params.id,function(err){
		if(err){
			res.json({
				status_code: '422',
				message: err.message,
			})
		}else{
			res.json({
				status_code: '200',
				message: 'ok'
			})
		}
	})
})
module.exports = router
