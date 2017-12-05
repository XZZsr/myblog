## 我的博客接口开发


### mongodb筹备阶段
>mongodb的安装
>mongodb创建数据库(mongodb启动的前提下)
```
在命令提示符中show dbs查看当前所有数据库
use database --切换至database数据库，如果没有则会自动创建,成功提示：switched to db databse
db.table.insert({
    title:'我的博客开发之路',
    sub:'简介',
    author:'zsr',
    created_at: '2017-12-5',
    content: '正文',
    type: 1
})
通过db.table.insert创建集合也就是数据库的表 table为集合名，只有建表后数据库才会真正创建，否则重启后database照样不存在
```
