//get url current host
const url_socket = `${location.protocol}//${location.host}`;

//start websocket this domain
const socket = io(url_socket);

// simple document query
const qs = (tag) => document.querySelector(tag);

// set dark mode style
const DarkMode = () => {
  if (!togglekey.style.float || togglekey.style.float == "left") {
    togglekey.style.float = "right";
    document.body.style.background = "#000";
    document.body.style.color = "#fff";
  } else {
    togglekey.style.float = "left";
    document.body.style.background = "#fff";
    document.body.style.color = "#000";
  }
};

/*
 * All Elements HTML useds
 */

// form submit channel
const setChannel = qs("#set-channel");
// button clear input channel and chat
const btnResetChannel = qs("#reset");
// button set channel
const btnSet = qs("#btnSetChannel");
// input channel
const channel = qs("#channel");
// song alert
const sound = qs("audio");
// all messages element HTML
const logMsg = qs("#messages");
// all messages container
const logMsgContainer = qs("#container-messages");
// button toggle mode style
const togglekey = qs(".toggle-type-key");
// set setTimeout
const inputTimeout = qs("#timeout");
let TimeoutValue = !inputTimeout.value ? 10 : inputTimeout.value;

// id socket not usabled
let myId;
// verify alert timer
let alertActive = false;

// change dinamic time the timeout alert
inputTimeout.addEventListener("change", (e) => {
  TimeoutValue = inputTimeout.value;
});
// add new channel and entry
setChannel.addEventListener("submit", (e) => {
  e.preventDefault();
  if (channel.value == "") {
    alert("o campo de canal não pode ser vazio");
    return;
  }

  btnSet.disabled = true;
  channel.disabled = true;
  btnResetChannel.disabled = false;

  socket.emit("channel-name", {
    channel: channel.value,
  });

  logMsg.innerHTML = `       
      <h2>Mensagens do chat Twitch: ${channel.value} </h2>        
  `;
});

// clear input and messages, set default
btnResetChannel.addEventListener("click", () => {
  btnResetChannel.disabled = true;
  channel.disabled = false;
  btnSet.disabled = false;
  channel.value = "";
  socket.emit("clear-channel", {});
  logMsg.innerHTML = `       
      <h2>Mensagens do chat Twitch </h2>        
  `;
});
