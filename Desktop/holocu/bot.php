<?php
$botToken = "7144252041:AAHAQz3X_b9s5HQCJAf5TDLhnFP2RQ2f-TM";
$channelUsername = "@emam_salavat";
$apiUrl = "https://api.telegram.org/bot" . $botToken . "/";

$content = file_get_contents("php://input");
$update = json_decode($content, true);

if (!$update) {
    exit;
}

$chatId = $update["message"]["chat"]["id"];
$text = $update["message"]["text"];

if ($text == "/start") {
    sendJoinMessage($chatId);
} elseif ($text == "عضو شدم") {
    checkMembership($chatId);
}

function sendJoinMessage($chatId) {
    global $apiUrl, $channelUsername;
    
    $joinMessage = "📿 برای استفاده از صلوات شمار امام کوین باید در کانال زیر عضو شوید:";
    $joinButton = [
        'inline_keyboard' => [
            [
                ['text' => '📢 عضویت در کانال', 'url' => "https://t.me/" . $channelUsername],
                ['text' => '✅ عضو شدم', 'callback_data' => 'check_membership']
            ]
        ]
    ];

    $encodedKeyboard = json_encode($joinButton);

    file_get_contents($apiUrl . "sendMessage?chat_id=" . $chatId . "&text=" . urlencode($joinMessage) . "&reply_markup=" . $encodedKeyboard);
}

function checkMembership($chatId) {
    global $apiUrl, $channelUsername;

    $response = file_get_contents($apiUrl . "getChatMember?chat_id=" . $channelUsername . "&user_id=" . $chatId);
    $result = json_decode($response, true);

    if ($result["result"]["status"] == "member" || $result["result"]["status"] == "administrator" || $result["result"]["status"] == "creator") {
        sendWelcomeMessage($chatId);
    } else {
        sendJoinMessage($chatId);
    }
}

function sendWelcomeMessage($chatId) {
    global $apiUrl;

    $welcomeMessage = "🎉 شما عضو کانال هستید. برای ورود به صلوات شمار، روی دکمه زیر کلیک کنید.";
    $welcomeButton = [
        'inline_keyboard' => [
            [
                ['text' => '🚀 ورود به صلوات شمار', 'url' => 'YOUR_LINK_HERE']
            ]
        ]
    ];

    $encodedKeyboard = json_encode($welcomeButton);

    file_get_contents($apiUrl . "sendMessage?chat_id=" . $chatId . "&text=" . urlencode($welcomeMessage) . "&reply_markup=" . $encodedKeyboard);
}
?>
