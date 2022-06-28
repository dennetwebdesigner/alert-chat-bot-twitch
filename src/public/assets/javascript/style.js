// set scroll init container messages
logMsgContainer.scrollTop = logMsgContainer.scrollHeight;
// btnResetChannel.disabled = true;
// set style mode init
togglekey.style.float = "left";
DarkMode();

// change mode style
togglekey.addEventListener("click", () => {
  DarkMode();
});
