// 好物沉浸看
// 发现精选好物


// searchOneSearch(5, "搜一搜你心");
// lockOnelock(5, "看看#手机");
//lockOnelock(5, "看");
//lockOnelock(11, "好物");
// pailitao();

 uniall();

function uniall() {
    var counts = 1;
    for (var i = 1; i < 50; i++) {
        console.log("执行次数:" + i);
        var qy = i % 3;
        if (qy == 0) {
            lockOnelock(1, "看");
        } else if (qy == 1) {
            searchOneSearch(1, "搜一搜");
        } else {
            pailitao();
        }
    }

}

function pailitao() {
    var loops = 1;
    var btnWords = "拍立淘";
    console.log("执行拍立淘.");

    for (var i = 0; i < loops; i++) {
        var btn = textContains(btnWords); //  
        if (btn!=null && btn.exists()) {
            textContains(btnWords).findOne(3000).click(); //  
            // 是否要搜索

            sleep(1400);
            // swipeToBottom(8);
            sleep(2400);

            sleep(3000);
            back();
        }
    }
}

function lockOnelock(loops, btnWords) {
    console.log("执行看一看.");

    for (var i = 0; i < loops; i++) {
        // console.log("执行次数:" + i);
        //var btn = textContains(btnWords); //  
      var btn =   textMatches(/.*(看一看|好物|看看#).*/);
        if (btn!=null &&  btn.exists()) {
           // textContains(btnWords).findOne(3000).click(); //  
            textMatches(/.*(看一看|好物|看看#).*/).findOne(3000).click();

            sleep(1200);
            swipeToBottom(8);
            sleep(2200);
            back();
            sleep(3000);
        }
    }
}


function searchOneSearch(loops, btnWords) {
    console.log("执行搜一搜.");
    for (var i = 0; i < loops; i++) {
        //   console.log("执行次数:" + i);
        var btn = textContains(btnWords); //  
        if (btn!=null && btn.exists()) {
            textContains(btnWords).findOne(3000).click(); //  
            // 是否要搜索
            var searchBtn = text("搜索").findOne(3000);
            if (searchBtn != null) {
                className("android.widget.EditText").findOne(3000).setText("iphone");
                sleep(300);
                click(device.width / 2, device.height * 0.1);
 
                searchBtn.click();
                sleep(1200);
                swipeToBottom(8);
                sleep(2200);
                back();
                sleep(2200);
                back();
                sleep(3000);
            }

        }
    }
}





/**
 * 拟人化滑动：在传入坐标基础上再叠加小幅偏移
 */
function randomSwipe(startX, startY, endX, endY, duration) {
    var jitter = 30; // 大随机已由区间参数承担，这里只做微调
    startX += random(-jitter, jitter);
    startY += random(-jitter, jitter);
    endX += random(-jitter, jitter);
    endY += random(-jitter, jitter);

    duration += random(-150, 150);
    if (duration < 200) duration = 200;

    swipe(startX, startY, endX, endY, duration);
}

/**
 * 屏幕高度比例随机
 */
function randomY(ratioStart, ratioEnd) {
    return device.height * random(ratioStart, ratioEnd);
}

function randomX(ratioStart, ratioEnd) {
    return device.width * random(ratioStart, ratioEnd);
}

/**
 * 随机生成一次"上滑"或"下滑"的起止坐标（幅度随机）
 * direction: "up"=从下往上（看下一屏），"down"=从上往下（回看上一屏）
 */
function randomSwipePoints(direction) {
    // 滑动幅度分三档：短滑35% / 中滑40% / 长滑25%
    var roll = random(1, 100);
    var ampStart, ampEnd;
    if (roll <= 35) {
        ampStart = 0.20; ampEnd = 0.30;   // 短滑：滑过屏幕的20%~30%
    } else if (roll <= 75) {
        ampStart = 0.35; ampEnd = 0.50;   // 中滑：35%~50%
    } else {
        ampStart = 0.55; ampEnd = 0.70;   // 长滑：55%~70%
    }

    var startX = randomX(0.40, 0.60);
    var endX = startX + random(-30, 30); // 终点X贴近起点，保持近似竖直

    var startY, endY;
    if (direction == "up") {
        // 起点：屏幕下方区域；终点 = 起点 - 幅度
        startY = randomY(0.70, 0.85);
        endY = startY - device.height * random(ampStart, ampEnd);
        // 终点不能越过屏幕顶部留白
        if (endY < device.height * 0.08) endY = device.height * random(0.08, 0.15);
    } else {
        // 起点：屏幕上方区域；终点 = 起点 + 幅度
        startY = randomY(0.15, 0.30);
        endY = startY + device.height * random(ampStart, ampEnd);
        // 终点不能越过屏幕底部
        if (endY > device.height * 0.92) endY = device.height * random(0.85, 0.92);
    }

    return { startX: startX, startY: startY, endX: endX, endY: endY };
}

/**
 * 上下往返滚动（幅度随机 + 首次不愣神）
 * scrollTimes：滚动次数
 */
function swipeToBottom(scrollTimes) {
    scrollTimes = scrollTimes || 8;

    var counts = 1;
    while (counts <= scrollTimes) {
        var direction = (counts % 2 != 0) ? "up" : "down";
        var p = randomSwipePoints(direction);

        randomSwipe(p.startX, p.startY, p.endX, p.endY, 800);

        counts++;
        sleep(random(500, 1500));

        // 愣神停顿：只在第3次之后才可能出现
        // 概率随次数递增：前几次几乎不停，看越久越容易走神
        if (counts >= 3 && random(1, 100) <= 15 + counts * 2) {
            sleep(random(500, 1500));
        }
    }
}
