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
  .then(async response => {
    let contentType = response.headers.get('Content-Type') || '';
    let body;
    if (contentType.includes('application/json')) {
      body = await response.json();
    } else {
      body = await response.text();
    }
    console.log(`Response (${response.status}) for chat_id ${chatId}:`, body);
  })
  .catch(error => {
    console.error(`Fetch error for chat_id ${chatId}:`, error);
  });


  chatId-=1;
  setTimeout(sendRequest, 1001);
}

sendRequest();
