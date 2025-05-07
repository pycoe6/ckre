let chatId = -1001223737350;

function sendRequest() {
  fetch('https://api.chatkeeper.app/cabinet/v1/tg/getchatconfig', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Origin': 'https://cabinet.chatkeeper.app',
      'Referer': 'https://cabinet.chatkeeper.app/',
    },
    credentials: 'include',
    body: JSON.stringify({ chat_id: chatId.toString() })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(`Response for chat_id ${chatId}:`, data);
  })
  .catch(error => {
    console.error(`Error for chat_id ${chatId}:`, error);
  });

  chatId++;
  setTimeout(sendRequest, 1000);
}

sendRequest();
