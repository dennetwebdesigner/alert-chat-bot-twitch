const togglekey = qs(".toggle-type-key");
togglekey.style.float == "left";

togglekey.addEventListener("click", () => {
  if (!togglekey.style.float || togglekey.style.float == "left") {
    togglekey.style.float = "right";
    document.body.style.background = "#000";
    document.body.style.color = "#fff";
  } else {
    togglekey.style.float = "left";
    document.body.style.background = "#fff";
    document.body.style.color = "#000";
  }
});
