
// utils.js
function formatTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    // 简单格式化，不使用padStart
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}


function wakeUp() {
    if (!device.isScreenOn()) {
        // 屏幕关闭则唤醒
        device.wakeUp();
        sleep(2000); // 等待屏幕完全亮起
        console.log("屏幕已唤醒");
    } else {
        console.log("屏幕已经是亮的");
    }
}

function awakenQQ() {
    wakeUp();
    launchApp("QQ"); // 打开QQ com.tencent.mobileqq
    sleep(7000);
    console.log("打开QQ,当前时间：" + formatTime());
    home();
    sleep(1000);
    runtime.accessibilityBridge.getService().performGlobalAction(android.accessibilityservice.AccessibilityService.GLOBAL_ACTION_LOCK_SCREEN);
}

//
function sendMessage(qqNumber, message) {
    wakeUp();
    launchApp("QQ");
    sleep(5000);

    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://im/chat?chat_type=wpa&version=1&src_type=web&uin=" + qqNumber,
        packageName: "com.tencent.mobileqq",
    });

    sleep(3000);

    // var inputBox = className("EditText").findOne(5000);
    var inputBox = id("com.tencent.mobileqq:id/input").findOne(5000);
    if (inputBox) {
        inputBox.setText(message);
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


// 通过打开资料卡的方式发送，避免发送失败
function sendQQMsgByCard(qqNumber, message) {
    wakeUp();
    launchApp("QQ");
    sleep(5000);

    app.startActivity(
        {
            action: "android.intent.action.VIEW",
            data: "mqqapi://card/show_pslcard?src_type=internal" +
                "&version=1&uin=" + qqNumber +
                "&card_type=friend&source=external",
            packageName: "com.tencent.mobileqq"
        }

    );

    sleep(3000);

    // 点击 '发信息'
    var qqMsgButton = [717, 1895, 1024, 2062]; // 原坐标：717, 1895, 1024, 2062 发信息-按钮位置

    simpleClickByBounds(qqMsgButton); // QQ信息Card

    // var inputBox = className("EditText").findOne(5000);
    var inputBox = id("com.tencent.mobileqq:id/input").findOne(5000);
    if (inputBox) {
        inputBox.setText(message);
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


function isClock(clock) {
    var date = new Date();
    var hour = date.getHours();
    if (hour == clock) {
        return random(2000, 12000); 不在随机等待了
       // return 1000;
    } else {
        return -1;
    }
}


function clickParent(targetWidget) {
    if (targetWidget) {
        // 获取父控件并检查是否可点击
        var parent = targetWidget.parent();
        while (parent && !parent.clickable()) {
            parent = parent.parent(); // 继续向上查找
        }

        if (parent && parent.clickable()) {
            console.log("找到了可点击的父控件");
            parent.click(); // 点击该父控件
            return true;
        } else {
            console.log("未找到可点击的父控件");
            return false;
        }
    } else {
        console.log("未找到目标控件");
        return false;
    }
}


// 查找可滚动控件并滚动到底部
function swipeToBottom(counts) {
    counts = counts || 3;
    var screenWidth = device.width;
    var screenHeight = device.height;
    // console.log("屏幕尺寸: " + screenWidth + " x " + screenHeight);
    // 多次滑动确保到达底部
    for (var i = 0; i <= counts; i++) {
        // 从屏幕下方向上滑动
        swipe(screenWidth / 2, screenHeight * 0.8, screenWidth / 2, screenHeight * 0.2, 800);
        sleep(1000);
        // 检查是否已经到底（可以检查是否有新的内容加载）
        // 这里可以添加判断是否到达底部的逻辑
    }
    console.log("已完成滑动操作");
}

function simpleClickByBounds(boundsInfo) {
    var left = boundsInfo[0];
    var top = boundsInfo[1];
    var right = boundsInfo[2];
    var bottom = boundsInfo[3];

    var x = Math.floor((left + right) / 2);
    var y = Math.floor((top + bottom) / 2);

    console.log("坐标点击按钮: (" + x + ", " + y + ")");

    // 获取坐标点上的所有元素

    sleep(1000);

    // 执行点击
    var clickResult = click(x, y);
    if (!clickResult) {
        console.log("点击执行失败，坐标是：" + boundsInfo);
        return false;
    } else {
        return true;
    }
}
// 打印界面结构，帮助分析
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
function clickByBounds(bounds) {
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


function findClickableContainerForText(textContent) {
    var targetText = selector().text(textContent).findOne(3000);
    if (!targetText) {
        console.log("未找到文本: " + textContent);
        return null;
    }

    var textBounds = targetText.bounds();
    console.log("目标文本位置: " + textBounds);

    // 查找所有可点击且大小合理的控件
    var candidates = selector().clickable(true)
        .filter(function (obj) {
            var bounds = obj.bounds();
            return bounds.width() > 50 && bounds.height() > 50;
        })
        .find();
    console.log("查找所有可点击且大小合理的控件: " + candidates);

    // 找到包含目标文本的可点击控件
    for (var i = 0; i < candidates.length; i++) {
        var candidate = candidates[i];
        var candidateBounds = candidate.bounds();

        if (candidateBounds.contains(textBounds.centerX(), textBounds.centerY())) {
            console.log("候选容器: " + candidate.className());
            console.log("容器位置: " + candidateBounds);
            return candidate;
        }
    }

    return null;
}


function clickByBoundsWithVerification(boundsInfo, expectedText) {
    // 先检查该位置是否确实有预期的文本
    var left, top, right, bottom;

    if (Array.isArray(boundsInfo)) {
        left = boundsInfo[0];
        top = boundsInfo[1];
        right = boundsInfo[2];
        bottom = boundsInfo[3];
    }

    // 在该区域内查找文本
    var elementsInArea = selector().boundsInside(left, top, right, bottom).find();

    var foundText = false;

    for (var i = 0; i < elementsInArea.length; i++) {
        var element = elementsInArea[i];
        if (element.text() && element.text().indexOf(expectedText) !== -1) {
            foundText = true;
            // printElementInfo(element);
            break;
        }
    }

    if (foundText) {
        var centerX = Math.floor((left + right) / 2);
        var centerY = Math.floor((top + bottom) / 2);
        click(centerX, centerY);
        console.log("验证通过，点击成功");
        return true;
    } else {
        console.log("未在指定区域找到预期文本: " + expectedText);
        return false;
    }
}

// 数组表示一个矩形区域的坐标，格式为 [left, top, right, bottom]
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

// Usage
// highlightTapArea([44, 1040, 220, 1200]);

// var bounds = [404, 970, 780, 1344] ;
// bounds[1] += 200; // top
// bounds[3] += 200; // bottom


// 往右移动 + ，往左移动 -
// bounds[0] -= 200; // left
// bounds[2] -= 200; // right
// utils.highlightTapArea(bounds);


// 缩放
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
function closeAlarm() {

    // 先息屏
    runtime.accessibilityBridge.getService().performGlobalAction(android.accessibilityservice.AccessibilityService.GLOBAL_ACTION_LOCK_SCREEN);
    sleep(5000);
    device.wakeUp();
    sleep(2000);
    back(); // 息屏闹铃的情况;
}


// 


// 导出函数
// 确保正确导出所有函数
module.exports = {
    formatTime: formatTime,
    sendMessage: sendMessage,
    wakeUp: wakeUp,
    isClock: isClock,
    awakenQQ: awakenQQ,
    clickByBounds: clickByBounds,
    swipeToBottom: swipeToBottom,
    simpleClickByBounds: simpleClickByBounds,
    closeAlarm: closeAlarm,
    highlightTapArea: highlightTapArea,
    calculateCenteredBounds: calculateCenteredBounds,
    clickParent: clickParent,
    sendQQMsgByCard: sendQQMsgByCard
};

