auto();
var utils = require("./utils.js");

// app.launch("com.taobao.taobao");

// sleep(6000);

// 点击淘金币
var tjbBtnBounds = [537, 337, 707, 521]; // 
utils.simpleClickByBounds(tjbBtnBounds); // 
sleep(2000);
// 点击赚更多金币
var dk = selector().text("去赚金币"); //  
console.log(dk.exists())

if (dk.exists()) {
    var dkBoundsPlanA = selector().text("去赚金币").findOne(5000).bounds();
    utils.clickByBounds(dkBoundsPlanA);
} else {
    throw new Error("赚金币");
}
sleep(2000);

// 1.
var rwdf = selector().text("任务到访得金币"); //  
if (rwdf.exists()) {
    utils.clickByBounds(selector().text("任务到访得金币").findOne(5000).bounds());
}

// 2.
var tjbqwkt = selector().text("淘金币趣味课堂"); //  
if (tjbqwkt.exists()) {
    utils.clickByBounds(selector().text("淘金币趣味课堂").findOne(5000).bounds());
    sleep(1000);
    textContains("A").findOne(3000).click();
    text("我选好了").findOne(3000).click();

    sleep(2000);
    textMatches(/(.*已成功领取奖励,*|.*回到主页.*)/).findOne().click();
}
// 3.

var hwcjk = textContains("好物沉浸看"); //  
if (hwcjk.exists()) {
    textContains("好物沉浸看").findOne(3000).click();
    var count = 0;
    var timer = setInterval(function () {
        // 重复的动作
        utils.swipeToBottom(1); // 拉1下
        count++;
        if (count >= 150) { // 100ms * 150 = 15秒
            clearInterval(timer);
        }
    }, 100);
}

/**
utils.swipeToBottom(); // 拉到最底下.
var gd = selector().text("展开"); //  
console.log(gd.exists())
if (gd.exists()) {
    utils.clickByBounds(selector().text("展开").findOne(5000).bounds());
}
utils.swipeToBottom(1); // 拉1下
 */
