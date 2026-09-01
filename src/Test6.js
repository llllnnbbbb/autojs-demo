auto();

var utils = require("./utils.js");
var mobile7 = require("./mobile7.js");



var targetWidget = id("bottom__text").className("android.widget.TextView").text("工作台").findOne(5000);
console.log(targetWidget.exists())

 
