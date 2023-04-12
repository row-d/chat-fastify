const [$messages, $msgform, $msginput] = ["messages", "form", "input"].map(
  (id) => document.getElementById(id)
);
const socket = new WebSocket(`wss://${window.location.host}/livechat`);

socket.onopen = () => {
  $msgform.addEventListener("submit", (e) => {
    e.preventDefault();
    if ($msginput.value) {
      socket.send($msginput.value);
      $msginput.value = "";
    }
  });
};

socket.onmessage = (event) => {
  const msg = event.data;
  const $msg = document.createElement("li");
  $msg.textContent = msg;
  $messages.appendChild($msg);
  window.scrollTo(0, document.body.scrollHeight);
};

window.addEventListener("load", async () => {
  const res = await fetch("/chat");
  const data = await res.text();
  data.split("\n").forEach((msg) => {
    if (msg.trim() !== "") {
      const $msg = document.createElement("li");
      $msg.textContent = msg;
      $messages.appendChild($msg);
    }
  });
});
