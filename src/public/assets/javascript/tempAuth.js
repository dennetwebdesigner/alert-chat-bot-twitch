// set name auth location for validate message
btnSaveAuthLoc.addEventListener("click", () => {
  if (!username.value) {
    alert(
      "você precisa dizer qual a tag do seu canal, para não receber alerta das suas proprias mensagens"
    );
    return;
  }

  window.localStorage.setItem("userTag", username.value);

  if (thisMyChannel.checked) return;

  eventHandleSetChannel(username.value);

  modalSetName.innerHTML = `<h1>Carregando</h1>`;

  setTimeout(() => {
    modalSetName.style.display = "none";
  }, 2000);
});
