const socket = new WebSocket(`wss://${window.location.host}/livechat`);
// const getChat = () => fetch("/chat").then((d) => d.text());
// const [$messages, $form, $input] = ["messages", "form", "input"].map((id) =>
//   document.getElementById(id)
// );

// window.addEventListener("load", async () => {
//   if ($messages.children.length === 0) {
//     const data = (await getChat()).split("\n").filter((t) => t.trim() !== "");
//     data.forEach((t) => {
//       const li = document.createElement("li");
//       li.textContent = t;
//       $messages.appendChild(li);
//       window.scrollTo(0, document.body.scrollHeight);
//     });
//   }
// });

// $form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if ($input.value && socket.readyState === socket.OPEN) {
//     socket.send(input.value);
//     input.value = "";
//   }
// });

// socket.addEventListener("message", (event) => {
//   console.log(event.data)
//   const li = document.createElement("li");
//   li.textContent = event.data;
//   $messages?.appendChild(li);
//   window.scrollTo(0, document.body.scrollHeight);
// });

socket.addEventListener("message",e=>{
  console.log(e.data)
})


