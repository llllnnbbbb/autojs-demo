
// mobile7 utils.js


function isLogin() {
    var loginBtn = id("com.weaver.emobile7:id/btn_login").exists();
    var canNotBtn = id("com.weaver.emobile7:id/cannot_login").exists();
    if (!loginBtn && !canNotBtn) {
        return true; // 2个按钮都不存在，证明已经登录
    } else {
        return false;
    }
}

function agressTip() { // 勾选协议
    console.log("========== agress_tip_image ==========")
    console.log(id("com.weaver.emobile7:id/agress_tip_image").exists())
    if (id("com.weaver.emobile7:id/agress_tip_image").exists()) {

        console.log("勾选协议存在，判断是否勾选协议.")
        console.log(id("com.weaver.emobile7:id/agress_tip_image").findOne().clickable()) // 永远都是 true

        // 根据按钮是否存在判断勾选了没有
        //    var loginBtn = id("com.weaver.emobile7:id/btn_login").exists() ;
        var canNotBtn = id("com.weaver.emobile7:id/cannot_login").exists();
        if (canNotBtn) { // 未勾选
            console.log("勾选协议.")
            id("com.weaver.emobile7:id/agress_tip_image").findOne().click()
        } else {
            console.log("已勾选协议.")
        }
    }
}


function login() {
    // 登录
    if (!isLogin()) {
        // 存在，未登录
        agressTip(); //  勾选协议.
        // 输入
        console.log("清空输入框...")
        id("com.weaver.emobile7:id/et_username").findOne().setText("")
        id("com.weaver.emobile7:id/et_userpassword").findOne().setText("")
        sleep(1000)
        id("com.weaver.emobile7:id/et_username").findOne().setText("林乃斌")
        sleep(10)
        id("com.weaver.emobile7:id/et_userpassword").findOne().setText("lnb2026")
        id("com.weaver.emobile7:id/btn_login").findOne().click()
        sleep(3000)
        console.log("登录成功...")
    }
}


function logout() {
    try {
        // back();
        // step 1
        console.log("点击我的...")
        utils.clickByBounds(selector().text("我").findOne(5000).bounds());
        sleep(2000);
        // step 2
        utils.clickByBounds(selector().text("设置").findOne(5000).bounds());
        utils.swipeToBottom(2);
        // step 3
        id("com.weaver.emobile7:id/logout_layout").findOne(5000).click(); // 点击登出
        sleep(1000);
        // step 4
        utils.clickByBounds(selector().text("退出登录").findOne(5000).bounds());
        sleep(5000);
    } catch (error) {
        console.log("登出失败...")
    }
}

//app应用关闭
function closeMobileApp() {
    app.openAppSetting("com.weaver.emobile7");
    sleep(random(1000, 2000));
    text(app.getAppName("com.weaver.emobile7")).waitFor();
    // let is_sure = textMatches(/(.*强.*|.*停,*|.*結.*|.*行.*)/).findOne();
    let is_sure = text("强制停止").findOne();

    if (is_sure.enabled()) {
        // textMatches(/(.*强,*|.停,*|.*结,*|,*行,*)/).findOne().click();
        text("强制停止").findOne().click();
        textMatches(/(.*确,*|.*定.*)/).findOne().click();
        // Log(app.getAppName(packageName)+“应用已被关闭");
        sleep(1000);
        console.log("应用已被关闭");
        sleep(5000);
        back();
    } else {
        console.log("应用不能被正常关闭或不在后台运行.");
        back();
        sleep(random(4000, 5000));
    }
    // 锁屏
    runtime.accessibilityBridge.getService().performGlobalAction(android.accessibilityservice.AccessibilityService.GLOBAL_ACTION_LOCK_SCREEN);
}



// 导出函数
// 确保正确导出所有函数
module.exports = {
    logout: logout,
    login: login,
    closeMobileApp: closeMobileApp
};

