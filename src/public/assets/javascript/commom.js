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
sound.volume = 0.8;
// all messages element HTML
const logMsg = qs("#messages");
// all messages container
const logMsgContainer = qs("#container-messages");
// button toggle mode style
const togglekey = qs(".toggle-type-key");
// set setTimeout
const inputTimeout = qs("#timeout");
// get modal username
const modalSetName = qs(".modal-set-name");
// get input username localAuth
const username = qs("#username");
// get input check-this-my-channel
const thisMyChannel = qs("#check-this-my-channel");
// get btn save username
const btnSaveAuthLoc = qs("#save-my-tag-channel");

// set timeout value
let TimeoutValue = !inputTimeout.value ? 10 : inputTimeout.value;
// id socket not usabled
let myId;
// verify alert timer
let alertActive = false;

// when validate tag channel name
const eventHandleSetChannel = (myChannel = null) => {
  btnSet.disabled = true;
  channel.disabled = true;
  btnResetChannel.removeAttribute("disabled");
  channel.value = myChannel ? myChannel : channel.value;

  socket.emit("channel-name", {
    channel: channel.value,
  });

  logMsg.innerHTML = `       
      <h2>Mensagens do chat Twitch: ${channel.value} </h2>        
  `;
};

// case already set tag name channel
if (
  window.localStorage.getItem("userTag") &&
  window.localStorage.getItem("userTag") != ""
) {
  modalSetName.style.display = "none";
  eventHandleSetChannel(window.localStorage.getItem("userTag"));
}

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

  eventHandleSetChannel();
  window.localStorage.setItem("userTag", channel.value);
});

// clear input and messages, set default
btnResetChannel.addEventListener("click", () => {
  btnResetChannel.disabled = true;
  channel.disabled = false;
  btnSet.disabled = false;
  channel.value = "";
  socket.emit("clear-channel", {});
  window.localStorage.removeItem("userTag");
  logMsg.innerHTML = `       
      <h2>Mensagens do chat Twitch </h2>        
  `;
});
