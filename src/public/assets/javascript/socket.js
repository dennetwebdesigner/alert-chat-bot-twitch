// when has connection
socket.on("connection-me", (data) => {
  myId = data.id;
});

// when new messages arrive
socket.on("new-msg-tw", (data) => {
  if (!alertActive && data.name != window.localStorage.getItem("userTag")) {
    sound.play();
    alertActive = true;
    setTimeout(() => {
      alertActive = false;
    }, TimeoutValue * 1000);
  }
  logMsg.innerHTML += `
    <section class='message'>
      ${data.name}: ${data.message}
    </section>
  `;

  logMsgContainer.scrollTop = logMsgContainer.scrollHeight;
});
