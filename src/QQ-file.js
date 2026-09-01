auto();

var qqNumber = "1";

// 使用QQ的内部分享机制
var imagePath = "/storage/emulated/0/Pictures/QQ/image_1758079558288.jpg";
var imageFile = new java.io.File(imagePath);

if (imageFile && imageFile.exists()) {
    var imagePathStr = imageFile.getAbsolutePath();
    console.log("找到图片: " + imagePathStr);

    try {
        // 方法1: 使用QQ专用的分享Intent
        var intent = new Intent("android.intent.action.SEND");
        intent.setType("image/*");
        intent.putExtra("android.intent.extra.STREAM", android.net.Uri.fromFile(imageFile));
        intent.putExtra("uin", qqNumber);
        intent.putExtra("chat_type", "wpa");
        intent.putExtra("keyword", "from_autojs");
        intent.setPackage("com.tencent.mobileqq");
        intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
      //  intent.addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION);

        context.startActivity(intent);
        console.log("已尝试通过QQ专用方式发送图片");
    } catch (e) {
        console.error("QQ专用方式发送失败: " + e);

        try {
            // 方法2: 使用系统分享面板，让用户选择QQ
            var intent = new Intent("android.intent.action.SEND");
            intent.setType("image/*");
            intent.putExtra("android.intent.extra.STREAM", android.net.Uri.fromFile(imageFile));
            intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION);

            context.startActivity(Intent.createChooser(intent, "发送图片到QQ"));
            console.log("已打开分享面板，请选择QQ发送");
        } catch (e2) {
            console.error("系统分享方式也失败: " + e2);

            // 方法3: 直接启动QQ并让用户手动选择图片
            try {
                app.startActivity({
                    action: "android.intent.action.VIEW",
                    data: "mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=" + qqNumber,
                    packageName: "com.tencent.mobileqq",
                    flags: [android.content.Intent.FLAG_ACTIVITY_NEW_TASK]
                });
                console.log("已启动QQ聊天界面，请手动发送图片");
            } catch (e3) {
                console.error("启动QQ失败: " + e3);
            }
        }
    }
} else {
    console.log("未找到图片文件: " + imagePath);
}
