/**************************************************************************/
const messages = document.getElementById("messages");
const msgForm = document.getElementById("msgForm");
const detailsForm = document.getElementById("detailsForm");
const scroll = document.getElementById("scroll-to-bottom");
/**************************************************************************/
const url = "https://chat-server.simbarashemapip.repl.co";
let socket = io(url, { autoConnect: false });
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
detailsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.connect();
    socket.emit("userDetails", {
        names: detailsForm.names.value,
        email: detailsForm.email.value,
        phone: detailsForm.phone.value,
        qtn: detailsForm.question.value
    });
    document.getElementById("details-form-container").style.display = "none";
    document.getElementById("chat-form-container").style.display = "block";
});
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
    if (socket.connected) {
        document.getElementById("chat-form-container").style.display = "block";
    } else {
        document.getElementById("details-form-container").style.display = "block";
    }
}
/**************************************************************************/
function closeChatWindow() {
    if (socket.connected) {
        document.getElementById("chat-form-container").style.display = "none";
    } else {
        document.getElementById("details-form-container").style.display = "none";
    }
}
/**************************************************************************/
