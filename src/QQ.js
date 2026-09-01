auto();


// 给特定QQ用户发送消息,在此之前最好确保QQ已经运行

var qqNumber = "93434692";
var message = "Hello，Are you OK 22 225545634864?";

if (!device.isScreenOn()) {
    // 屏幕关闭则唤醒
    device.wakeUp();
    sleep(2000); // 等待屏幕完全亮起
    console.log("屏幕已唤醒");
} else {
    console.log("屏幕已经是亮的");
}

launchApp("QQ"); // 打开QQ com.tencent.mobileqq
sleep(7000);

// mqqapi://im/chat?chat_type=wpa&version=1&src_type=web&uin=
// mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=
// mqqwpa://im/chat?chat_type=wpa&uin=


// 偶尔打开的是QQ临时聊天，此时发送会失败.
var url1 =  'mqq://im/chat?chat_type=wpa&version=1&src_type=web&web_src=qq.com&uin=' + qqNumber ;

// 没试过

var url3 =  'mqqwpa://im/chat?chat_type=wpa&version=1&src_type=web&uin=' + qqNumber ;
var url4 =  'tencent://message/?Site=qq&Menu=yes&uin=' + qqNumber ;


var qqGroupUrl =  'mqqapi://card/show_pslcard?src_type=internal&version=1&card_type=group&uin=469617602'  ;


var url2 =  'mqqapi://im/chat?chat_type=wpa&version=1&src_type=web&web_src=qq.com&uin=' + qqNumber ;

app.startActivity({
    action: "android.intent.action.VIEW",
    data: url2,
    packageName: "com.tencent.mobileqq",
    flags: ["ACTIVITY_NEW_TASK"]  
});


sleep(3000);

var inputBox = className("EditText").findOne(5000);
if (inputBox) {
      // 先点击输入框，确保获得焦点
   // inputBox.click();
   // sleep(500);
    inputBox.setText(message); // 输入内容
    sleep(500);
   // var sendButton = textContains("发送").findOne(3000) || desc("发送").findOne(3000);
    var sendButton = text("发送").findOne(3000) || desc("发送").findOne(3000);
    if (sendButton) {
       sendButton.click();
    }
}

 