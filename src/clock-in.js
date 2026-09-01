auto();

var utils = require("./utils.js");
var mobile7 = require("./mobile7.js");

// 检查并请求通知监听权限
// 通用的通知监听设置函数
function setupNotificationListener(callback) {
    var success = false;

    // 方法1: 直接尝试开启
    try {
        events.observeNotification();
        events.on("notification", callback);
        console.log("通过方法-开启通知监听成功");
        success = true;
    } catch (e) {
        console.log("方法-失败: " + e.message);
    }

    // 如果方法1失败，提示用户手动设置
    if (!success) {
        console.log("请手动开启通知监听权限:");
        console.log("1. 打开手机设置");
        console.log("2. 找到'通知管理'或'通知使用权'");
        console.log("3. 找到Auto.js并开启权限");

        try {
            // 尝试跳转到设置页面
            app.startActivity({
                action: "android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS"
            });
        } catch (e) {
            console.log("无法自动跳转设置页面");
        }
    }

    return success;
}

// 锁
var PROCESSED_ALARM_LOCK = "lock";

// QQ通知处理函数
function qqNotificationHandler(notification) {
    console.log("通知信息: " + notification);

    // console.log("通知的包名22: " + notification.getPackageName());
    if (notification.getPackageName() == "com.tencent.mobileqq") {
        console.log("=== 收到QQ通知 ===");
        console.log("时间: " + new Date().toLocaleString());
        console.log("标题: " + (notification.title || "无"));
        var text = notification.text || "无";
        console.log("内容: " + text);

        // 在这里添加你的处理逻辑
        // 例如：保存消息、触发其他操作等
        if ("clock" === text || "打卡" === text) {
            // 使用立即执行函数确保顺序执行
            (function () {
                try {
                    console.log("开始执行打卡流程");
                    utils.sendMessage("93434692", "开始执行通知打卡:" + utils.formatTime());
                    sleep(5000);
                    clockIn(); // 打卡
                    console.log("打卡流程执行完成");
                } catch (error) {
                    console.log("发生了错误: " + error);
                    utils.sendMessage("93434692", "打卡失败:" + error);
                    mobile7.closeMobileApp(); // 关闭app
                } finally {
                    mobile7.closeMobileApp(); // 关闭app
                }
            })();

        }
    } else if (notification.getPackageName() == "com.sec.android.app.clockpackage") {

        (function () {
            // 三星闹钟.
            // 关闭闹钟
            utils.closeAlarm();
            sleep(4000);
            var title = notification.title || "无";

            if (title.includes("关闭近期的闹钟")) {
                console.log("===================  取消闹铃,忽略...  ===================");
                // 冗余执行一次息屏
                runtime.accessibilityBridge.getService().performGlobalAction(android.accessibilityservice.AccessibilityService.GLOBAL_ACTION_LOCK_SCREEN);
            } else {

                var THIS_LOCK = notification.getPackageName() + "_" + title; // 临时锁
                if (PROCESSED_ALARM_LOCK === THIS_LOCK) {
                    console.log("===================  已经处理过了,忽略...  ===================");
                    // 冗余执行一次息屏
                    runtime.accessibilityBridge.getService().performGlobalAction(android.accessibilityservice.AccessibilityService.GLOBAL_ACTION_LOCK_SCREEN);
                } else {
                    PROCESSED_ALARM_LOCK = THIS_LOCK;  // 创建新的锁
                    utils.awakenQQ(); // 唤醒QQ 
                    sleep(5000);     // 10s
                    var sleepTimeMorning = utils.isClock(7);   // 上午的时间
                    //  var s18 = utils.isClock(18);  // 下午的时间
                    var sleepTimeNight = utils.isClock(18);  // 下午的时间
                    if (sleepTimeMorning > 0) {
                        console.log("上午定时打卡.");
                        // 再次进行判断是否为打卡闹铃唤醒的
                        console.log("内容: " + title);
                        if ("上午打卡" === title) {
                            clockProcessor(notification, sleepTimeMorning);
                        } else {
                            // 不是正确的闹铃
                            console.log("===================  不是正确的闹钟,忽略...  ===================");
                            // 冗余执行一次息屏
                            runtime.accessibilityBridge.getService().performGlobalAction(android.accessibilityservice.AccessibilityService.GLOBAL_ACTION_LOCK_SCREEN);
                        }
                    } else if (sleepTimeNight > 0) {
                        console.log("下午定时打卡.");
                        // 再次进行判断是否为打卡闹铃唤醒的
                        console.log("内容: " + title);
                        if ("下午打卡" === title) {
                            clockProcessor(notification, sleepTimeNight);
                        } else {
                            // 不是正确的闹铃
                            console.log("===================  不是正确的闹钟,忽略...  ===================");
                            // 冗余执行一次息屏
                            runtime.accessibilityBridge.getService().performGlobalAction(android.accessibilityservice.AccessibilityService.GLOBAL_ACTION_LOCK_SCREEN);
                        }
                    }
                }
            }
            // function body
        })();
        // end ..
    }

}

function clockProcessor(notification, sleepTime) {
    console.log("=== 闹钟触发的打卡 ===");
    console.log("时间: " + new Date().toLocaleString());
    console.log("标题: " + (notification.title || "无"));
    console.log("内容: " + text);

    // 在这里添加你的处理逻辑
    // 例如：保存消息、触发其他操作等
    // 使用立即执行函数确保顺序执行

    // 上午
    console.log("执行打卡，休眠时间: " + sleepTime);
    sleep(sleepTime);
    try {
        console.log("开始执行打卡流程");
        utils.sendMessage("93434692", "开始执行定时打卡:" + utils.formatTime());
        sleep(5000);
        clockIn(); // 打卡
        console.log("打卡流程执行完成");
    } catch (error) {
        console.log("发生了错误: " + error);
        utils.sendQQMsgByCard("93434692", "打卡失败:" + error + ",>>>: 通过资料卡发送");
        sleep(5000);

    } finally {
        mobile7.closeMobileApp(); // 关闭app
    }
}




// 启动监听

log("子线程启动监听程序..")
setupNotificationListener(qqNotificationHandler);
// clockIn(); // 打卡

// ### 打卡
function clockIn() {
    // 检查屏幕是否是亮的
    if (!device.isScreenOn()) {
        // 屏幕关闭则唤醒
        device.wakeUp();
        sleep(2000); // 等待屏幕完全亮起
        console.log("屏幕已唤醒");
    } else {
        console.log("屏幕已经是亮的");
    }

    launchApp("EMobile7") // 打开mobile7

    sleep(15000) // 等待20s，等待app启动完毕.

    console.log("启动完毕...")

    mobile7.login();
    console.log("登录完成...")

    var QQMessage = "===== 操作完成 ===== \n";


    // 使用前先分析布局

    console.log("是否存在工作台按钮? ") // 2022-11月他们更新了版本，工作台不可点击
    // var workbench = selector().text("工作台");
    var workbench = id("bottom__text").className("android.widget.TextView").text("工作台");

    console.log(workbench.exists())

    if (!workbench.exists()) {
        throw new Error("未找到工作台");
        //  utils.simpleClickByBounds([620, 1969, 727, 2064]); // 点击工作台
        // console.log("未找到工作台？！直接点击[固定位置]...")
    } else {
        console.log("已找到工作台...")
        utils.clickParent(workbench.findOne(5000));
    }

    sleep(2000) // 等待界面刷新

    // 使用 
    utils.swipeToBottom(); // 拉到最底下.
    console.log("拉到最底下...")

    sleep(2000) // 等待界面刷新
    // ### 工作台 -> 点击 “考勤打开” 进入打卡界面
    var kqdkBtnBounds = [44, 980, 220, 1100]; // 原坐标：44, 1040, 220, 1200， 考勤打卡按钮位置
    var isClick = utils.simpleClickByBounds(kqdkBtnBounds); // text = App016
    console.log("点击考勤打卡按钮，进入考勤打卡界面...")
    if (!isClick) {
        // 没有点击到？！
        utils.swipeToBottom(2); // 拉到最底下.
        utils.simpleClickByBounds(kqdkBtnBounds); // 点击考勤打卡
        console.log("第二次点击考勤打卡...")
        QQMessage += "step 第二次点击考勤打卡 \n";
    }
    console.log("打开打卡界面，准备进行打卡...")
    sleep(2000) // 等待界面刷新

    // waitForClockBtn(); // 等待考勤界面。
    // 等待元素出现，最多等待5秒(5000毫秒)


    utils.swipeToBottom(3); // 拉到最底下.


    // 考勤打卡 , 最后一哆嗦

    var dk = selector().text("打卡"); //  如果按钮存在，99%可以点击到按钮
    if (dk.exists()) {
        var dkBoundsPlanA = selector().text("打卡").findOne(5000).bounds();
        utils.clickByBounds(dkBoundsPlanA);
        QQMessage += "step 2 点击打卡. \n"
    }
    sleep(5000);

    dk = selector().text("打卡");
    if (dk.exists()) {
        var dkBoundsPlanB = [404, 1170, 780, 1544]; // 原坐标：404, 970, 780, 1344 ,点击 打卡
        utils.simpleClickByBounds(dkBoundsPlanB);
        QQMessage += "step 2 , [打卡] 按钮还在，执行 plan b 打卡. \n"
    }
    sleep(5000);

    // 有可能是更新
    if (selector().text("更新打卡时间").exists()) {
        selector().text("更新打卡时间").findOne(5000).click();
        QQMessage += "step 3.1 更新打卡时间. \n"
    } else {
        QQMessage += "step 3.2 没有[更新打卡时间]，可能自动打卡了. \n"
    }


    sleep(5000);
    // 
    var allTimeTexts = textMatches(/(.*打卡时间*|.*今天.*)/).find();
    allTimeTexts.forEach(function (t) {
        QQMessage += t.text() + "\n";
    });


    QQMessage += "step 4打卡完成. \n"

    // 登出
    back();

    mobile7.logout();


    sleep(10000);

    // QQ 通知
    console.log("账号登出,发送QQ通知消息...")

    utils.sendQQMsgByCard("93434692", QQMessage + " >>>: 通过资料卡发送");

    sleep(5000);

}

