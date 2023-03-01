/**************************************************************************/
const messages = document.getElementById("messages");
const msgForm = document.getElementById("msgForm");
//const infoForm = document.getElementById("infoForm");
const scroll = document.getElementById("scroll-to-bottom");
/**************************************************************************/
const url = "https://chat-server.simbarashemapip.repl.co";
let socket = io(url);
/**************************************************************************/
socket.on("connection", () => {
	// socket.connect();
	console.log(`${socket.id} Connected`);
});
/**************************************************************************/
socket.on("message", (data) => {
	console.log(data);
	appendMessages(data);
});
/**************************************************************************/
msgForm.addEventListener("submit", (e) => {
	e.preventDefault();
	socket.emit("chatmessage", {
		message: msgForm.message.value,
		user: socket.id
	});
	msgForm.message.value = "";
});
/**************************************************************************/
// infoForm.addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	socket.connect();
// 	socket.emit("user", { message: infoForm.user.value, user: socket.id });
// 	infoForm.user.value = "";
// 	document.getElementById("info-form-container").style.display = "none";
// 	changeAppearance();
// });
/**************************************************************************/
function appendMessages(data) {
	const date = new Date();
	const hr = date.getHours();
	const min = date.getMinutes();

	if (socket.id == data.user) {
		const html = `
        <div class="msg current-user-msg">
            <p>${data.message}</p>
            <span>${hr}:${min}</span>
        </div>`;
		messages.innerHTML += html;
	} else {
		const html = `
        <div class="msg">
            <p>${data.message}</p>
            <span>${hr}:${min}</span>
        </div>`;
		messages.innerHTML += html;
	}

	scroll.scrollTop = scroll.scrollHeight;
}
/**************************************************************************/
function openChatWindow() {
	document.getElementById("chat-form-container").style.display = "block";
}
/**************************************************************************/
function closeChatWindow() {
	document.getElementById("chat-form-container").style.display = "none";
}
/**************************************************************************/
