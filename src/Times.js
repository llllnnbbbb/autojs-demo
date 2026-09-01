// 引用utils.js文件

var utils = require("./utils.js");
var mobile7 = require("./mobile7.js");

// 使用引用的函数
var currentTime = utils.formatTime();
console.log("当前时间: " + currentTime);



// 创建一个悬浮窗显示坐标
// 可以修改 textSize 属性来调整字体大小，便于调整坐标 
function showCoordinateOnScreen(x, y) {
    var window = floaty.window(
        <frame gravity="center">
            <text id="coordinate" textColor="red" textSize="14sp" />
        </frame>
    );

    window.setPosition(x, y);
    window.coordinate.setText(x + ", " + y);

    // 3秒后关闭
    setTimeout(function () {
        window.close();
    }, 3000);
}


try {
    // var workbench = selector().text("工作台").exists();
    // console.log(workbench);
    // if (!workbench) {
    //     throw new Error("未找到工作台");
    // }
    //  utils.swipeToBottom(1);
    // console.log("点击考勤打卡...", selector().text("考勤打卡").findOne(5000).bounds())

    // var bounds = selector().text("考勤打卡").findOne(5000).bounds();
    // console.log("点击考勤打卡...", bounds.centerX());
    // console.log("点击考勤打卡...", bounds.centerY());

    // utils.clickByBounds(selector().text("考勤打卡").findOne(5000).bounds());
    //      showCoordinateOnScreen(134, 1278);

    // utils.simpleClickByBounds([44, 1040, 220, 1200]); // text = App016
    // showCoordinateOnScreen(50, 1020);
} catch (error) {
    console.log("-------");
    console.log(error.message);
}
console.log(" ---- ----");
function analyzeLayout() {
    var allTexts = textMatches(".*").find();
    allTexts.forEach(function (t) {
        //  console.log("文本: " + t.text() + ", 类型: " + t.className());

        //   if(t.text()==='外勤打卡') {
        console.log("ID: " + t.id());

        console.log("文本: " + t.text() + ", 类型: " + t.className());
        console.log("坐标: " + t.bounds());
        // }

    });
}

//console.log(selector().text("停止").exists());


//console.log(device.isScreenOn());

// back(); // 息屏闹铃的情况;


//back();
//back();
// analyzeLayout();

//console.log(selector().text("自动打卡").exists());
//console.log(selector().text("更新打卡时间").exists());

// selector().text("更新打卡时间").findOne(5000).click();
// launchApp("EMobile7") // 打开mobile7

// sleep(5000);

var packageName = "com.weaver.emobile7";
// var className = "weaver.fw.com.MainActivity";
var className = "com.weaver.platform.WebViewActivity";


var packageName = "com.weaver.emobile7";
//  var webViewActivity = "com.weaver.platform.WebViewActivity";
var webViewActivity = "weaver.fw.com.ModifyPasswordActivity";

var settings = "weaver.fw.com.CreateDiscussionActivity";

// var intent = new Intent();

//intent.setClassName(packageName,settings);

// 可能需要的额外参数（根据实际应用调整）
//intent.putExtra("url", "http://47.112.168.240:8999"); // 替换为实际URL
//intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
// context.startActivity(intent);
//
// var packageName = "com.weaver.emobile7";

// 先启动主应用
// app.launch(packageName);
// shell("am start -n " + packageName + "/" + webViewActivity, true);


var qqNumber = "93434692";

var url1 = 'mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=' + qqNumber;

// 没试过
var url2 = 'mqqapi://im/chat?chat_type=wpa&version=1&src_type=web&uin=' + qqNumber;
var url3 = 'mqqwpa://im/chat?chat_type=wpa&version=1&src_type=web&uin=' + qqNumber;

//app.startActivity({
//    action: "android.intent.action.VIEW",
//   data: url3,
//   packageName: "com.tencent.mobileqq",
//});



// intent.putData(url3);

// app.startActivity(intent);


//utils.clickByBounds(selector().text("消息").findOne(5000).bounds()); // 点击工作台
//click(266, 550);

//utils.clickByBounds(selector().text("she says").findOne(5000).bounds()); // 点击工作台
// utils.sendMessage("93434692", "Hello,Are you OK 2xx写写信?");


// 数组表示一个矩形区域的坐标，格式为 [left, top, right, bottom]
// ,left_offset,top_offset
function highlightTapArea(bounds) {
    var window = floaty.window(
        <frame>
            <canvas id="canvas" layout_width="match_parent" layout_height="match_parent" />
        </frame>
    );

    var flashCount = 0;
    var maxFlashes = 8;

    var intervalId = setInterval(function () {
        flashCount++;
        if (flashCount > maxFlashes) {
            clearInterval(intervalId);
            window.close();
        }
    }, 200);

    window.canvas.on("draw", function (canvas) {
        if (flashCount > maxFlashes) return;

        var paint = new Paint();
        paint.setAntiAlias(true);

        // Draw the bounds rectangle
        paint.setColor(flashCount % 2 === 0 ?
            colors.parseColor("#FFFF0000") :
            colors.parseColor("#FFFFFF00"));
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(8);

        var rect = new android.graphics.RectF(bounds[0], bounds[1], bounds[2], bounds[3]);
        canvas.drawRect(rect, paint);

        // Draw semi-transparent fill
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(colors.parseColor("#33FF0000"));
        paint.setAlpha(flashCount % 2 === 0 ? 60 : 30);
        canvas.drawRect(rect, paint);

        // Draw a clear marker at the exact click point (center)
        // Handle both array and bounds object
        var left, top, right, bottom;
        if (Array.isArray(bounds)) {
            left = bounds[0];
            top = bounds[1];
            right = bounds[2];
            bottom = bounds[3];
        } else {
            left = bounds.left;
            top = bounds.top;
            right = bounds.right;
            bottom = bounds.bottom;
        }

        var centerX = (left + right) / 2;
        var centerY = (top + bottom) / 2;

        paint.setStyle(Paint.Style.FILL);
        paint.setColor(colors.parseColor("#FF00FF00")); // Bright green for click point
        canvas.drawCircle(centerX, centerY, 15, paint); // Large circle



        // Draw crosshair for precise targeting
        paint.setStrokeWidth(4);
        paint.setStyle(Paint.Style.STROKE);
        canvas.drawLine(centerX - 25, centerY, centerX + 25, centerY, paint); // Horizontal line
        canvas.drawLine(centerX, centerY - 25, centerX, centerY + 25, paint); // Vertical line
    });

    window.setPosition(0, 0);
    window.setSize(device.width, device.height);

    setTimeout(() => {
        clearInterval(intervalId);
        window.close();
    }, 10000);
}

function calculateCenteredBounds(originalBounds, scale) {
    var left = originalBounds[0];
    var top = originalBounds[1];
    var right = originalBounds[2];
    var bottom = originalBounds[3];

    // Calculate center point
    var centerX = (left + right) / 2;
    var centerY = (top + bottom) / 2;

    // Calculate original dimensions
    var originalWidth = right - left;
    var originalHeight = bottom - top;

    // Calculate new dimensions
    var newWidth = originalWidth * scale;
    var newHeight = originalHeight * scale;

    // Calculate new coordinates
    var newLeft = centerX - newWidth / 2;
    var newTop = centerY - newHeight / 2;
    var newRight = centerX + newWidth / 2;
    var newBottom = centerY + newHeight / 2;

    return [newLeft, newTop, newRight, newBottom];
}


function clickByBounds2(bounds) {
    console.log("坐标点击按钮: (" + bounds.centerX() + ", " + bounds.centerY() + ")");
    // 获取坐标点上的所有元素
    // 执行点击
    var clickResult = click(bounds.centerX(), bounds.centerY());
    if (!clickResult) {
        console.log("点击执行失败，坐标是：" + bounds.centerX() + "," + bounds.centerY());
        return false;
    } else {
        return true;
    }
}


// utils.highlightTapArea([404, 970, 780, 1344]); // Visualize the area
//  [left, top, right, bottom]
var bounds = calculateCenteredBounds([404, 970, 780, 1344], 0.7);
// 点位往下移动 + ，往上移动 -

bounds = [404, 970, 780, 1344];
bounds[1] += 200; // top
bounds[3] += 200; // bottom


// 往右移动 + ，往左移动 -
bounds[0] -= 200; // left
bounds[2] -= 200; // right

//var rectKQDK = selector().text("考勤打卡").findOne(5000).bounds();

// highlightTapArea(kqdkBounds);
// highlightTapArea([404, 870, 780, 1444]);
// clickByBounds2(selector().text("考勤打卡").findOne(5000).bounds()); // 点击-考勤打卡

// utils.clickByBounds(kqdkBounds);
var dkBounds = [404, 970, 780, 1344];
//var bounds3 = selector().text("打卡").findOne(5000).bounds();
// [left, top, right, bottom]
// dkBounds = [bounds3.left,bounds3.top,bounds3.right,bounds3.bottom];

// 点位往下移动 + ，往上移动 -
//bounds[1] += 200; // top
//bounds[3] += 200; // bottom



var kqdkBtnBounds = [44, 980, 220, 1100]; // 考勤打卡按钮位置
//highlightTapArea(kqdkBtnBounds);
// utils.simpleClickByBounds(kqdkBtnBounds);


//const newText = textMatches("上班时间*").findOne(2000).text();
//console.log("newText: " + newText);



//var dkBoundsPlanB = [404, 1170, 780, 1544];

//highlightTapArea(dkBoundsPlanB);
//console.log("是否存在工作台按钮?!")
//var workbench = selector().text("工作台");
//console.log(workbench.exists())

// var allTexts = textMatches("打卡时间 今天.*").find();
//var bounds3 = selector().text("工作台").findOne(5000).bounds();
// [left, top, right, bottom]
//console.log("bounds3: " + bounds3.left);
//var dkBounds2 = [bounds3.left, bounds3.top, bounds3.right, bounds3.bottom];
// utils.simpleClickByBounds([620, 1969, 727, 2064]);
// utils.highlightTapArea([620, 1860, 720, 1960]);
// utils.clickByBounds(selector().text("工作台").findOne(5000).bounds()); // 点击工作台


function clickByBoundsPrint(x, y) {
    console.log("坐标点击按钮: (" + x + ", " + y + ")");

    // Create temporary visual marker
    var window = floaty.window(
        <frame>
            <text id="marker" textColor="#ff0000" textSize="20sp">●</text>
        </frame>
    );

    window.setPosition(x - 10, y - 10);

    // Execute click after a short delay to see the marker
    setTimeout(() => {
        var clickResult = click(x, y);
        if (!clickResult) {
            console.log("点击执行失败，坐标是：" + x + "," + y);
        }
        window.close();
    }, 1000);

    return true;
}

//highlightTapArea([620, 1860, 720, 1960]);
//utils.simpleClickByBounds([620, 1860, 720, 1960]); // 点击工作台 
// clickByBoundsPrint(670,1910); // 670, 1910
// click(670,1910);
// 方法1: 使用Tap代替Click
// 先获取当前屏幕信息

// 在目标位置显示一个提示
// 创建一个可控制的悬浮标记
//let marker = floaty.rawWindow(
// <frame gravity="center">
//      <text id="text" text="★" textColor="#ff0000" textSize="20sp"/>
//   </frame>
//);

//marker.setTouchable(false);
//marker.setPosition(640, 1890);

// 手动控制关闭时间
//setTimeout(() => {
//    marker.close();
//}, 10000); // 显示10秒

// clickPhysical(640, 1890);

// utils.clickByBounds(selector().text("工作台").findOne(5000).bounds()); // 点击工作台

console.log("是否存在工作台按钮?!")


// console.log(selector().text("版本更新").findOne(5000))

//selector().text("工作台").findOne(5000).click();
// click(670, 1910);

//text("通讯录").findOne(5000).click();

// 点击搜索框
// 打开QQ聊天界面并发送消息
function sendQQMessage(qqNumber, message) {
    // 启动QQ
    app.launchApp("QQ");
    sleep(2000);

    // 点击搜索框
    var search = id("com.tencent.mobileqq:id/xzl").findOne(5000);
    if (search) {
        search.click();
        sleep(1000);

        // 输入QQ号
        // search.setText("")
        search.setText(qqNumber);
        sleep(1500);

        // 点击搜索结果
        var result = text(qqNumber.toString()).findOne(3000);
        if (result) {
            result.click();
            sleep(2000);

            // 输入消息
            var input = className("EditText").findOne(5000);

            if (input) {
                input.setText(message);
                sleep(1000);

                // 点击发送按钮
                var sendBtn = desc("发送").findOne(3000) ||
                    id("com.tencent.mobileqq:id/fun_btn").findOne(3000);
                if (sendBtn) {
                    sendBtn.click();
                    toast("消息发送成功");
                    return true;
                }
            }
        }
    } else {
        toast("搜索框未找到");

    }
    toast("发送失败");
    return false;
}

//var search = id("com.tencent.mobileqq:id/xzl").findOne(5000);
//console.log("search: ");
//console.log(search);
//search.click();
//search.focus();
//setText(".");
//sendQQMessage("93434692", "你好，这是自动发送的消息");//


// utils.sendMessage("93434692", "打卡成功");

//
function sendMessage2(qqNumber, message) {

    app.startActivity(
        {
            action: "android.intent.action.VIEW",
            data: "mqqwpa://im/chat?chat_type=wpa&uin=" + qqNumber +
                "&version=1&src_type=web&needSend=false",
            packageName: "com.tencent.mobileqq",
            extras: {
                "key_action": "jump",
                "key_uin": qqNumber,
                "key_from": "external"
            }
        }

    );

    sleep(3000);

    // var inputBox = className("EditText").findOne(5000);
    var inputBox = id("com.tencent.mobileqq:id/input").findOne(5000);
    if (inputBox) {


        // 点击输入框获得焦点
        inputBox.click();
        sleep(random(200, 500));

        // 2. 模拟人类输入（逐个字符或分段输入）
        var chars = message.split('');
        var typed = "";

        for (let i = 0; i < chars.length; i++) {
            // 随机延迟输入
            typed += chars[i];
            inputBox.setText(typed);

            // 随机延迟50-150ms，模拟打字
            var delay = random(50, 150);

            // 偶尔插入更长的停顿（模拟思考）
            if (random(1, 10) > 8) {
                delay += random(200, 500);
            }

            sleep(delay);
        }

        // 3. 发送前的"思考"时间
        sleep(random(800, 2000));


        //   inputBox.setText(message);
        var sendButton = text("发送").findOne(3000) || desc("发送").findOne(3000);
        if (sendButton) {
            sendButton.click();
        }
    }
    sleep(3000);

    // 退出当前界面
    back();
    back();
}


// sendMessage2("93434692", "打卡成功222");
function showCard(qqNumber) {
    app.startActivity(
        {
            action: "android.intent.action.VIEW",
            data: "mqqapi://card/show_pslcard?src_type=internal" +
                "&version=1&uin=" + qqNumber +
                "&card_type=friend&source=external",
            packageName: "com.tencent.mobileqq"
        }

    );
}
// showCard("93434692")
// var sendMsg = text("发信息").findOne(3000) || desc("发信息").findOne(3000);
var qqMsgButton = [717, 1895, 1024, 2062]; // 原坐标：44, 1040, 220, 1200， 考勤打卡按钮位置

utils.sendQQMsgByCard("93434692", "打卡成321321321功222");

// clickByBoundsPrint(720, 1880);