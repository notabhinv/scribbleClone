// CREATE ROOM
const createBtn = document.getElementById("createBtn");

createBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;

    if (!username) {
        alert("Enter a username");
        return;
    }

    fetch("http://localhost:8080/game/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username })
    })
    .then(res => res.json())
    .then(data => {
        showGameScreen(data);
    })
    .catch(err => console.error("Error:", err));
});


// JOIN ROOM
const joinBtn = document.getElementById("joinBtn");

joinBtn.addEventListener("click", () => {
    const username = document.getElementById("joinUsername").value;
    const roomId = document.getElementById("joinRoomId").value;

    if (!username || !roomId) {
        alert("Enter username and room ID");
        return;
    }

    fetch(`http://localhost:8080/game/${roomId}/join`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username })
    })
    .then(res => res.json())
    .then(data => {
        showGameScreen(data);
    })
    .catch(err => console.error("Error:", err));
});

//canvas
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let isDrawing = false


canvas.addEventListener("mousedown", (e) => {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    isDrawing = true;

    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/draw",
            body: JSON.stringify({
                roomId: currentRoomId,
                type: "START",
                x: e.offsetX,
                y: e.offsetY
            })
        });
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        const x = e.offsetX;
        const y = e.offsetY;

        ctx.lineTo(x, y);
        ctx.stroke();

        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: "/app/draw",
                body: JSON.stringify({
                    roomId: currentRoomId,
                    type: "DRAW",
                    x: x,
                    y: y
                })
            });
        }
    }
});


function stopDrawing() {
    if (!isDrawing) return;

    isDrawing = false;

    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/draw",
            body: JSON.stringify({
                roomId: currentRoomId,
                type: "STOP",
                x: 0,
                y: 0
            })
        });
    }
}

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);



function showGameScreen(data) {
    console.log("Response:", data);

    // switch UI
    document.getElementById("createScreen").style.display = "none";
    document.getElementById("joinScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    // show data
    document.getElementById("roomId").innerText =
        "Room ID: " + data.roomId;

    document.getElementById("playerName").innerText =
        "Player: " + data.username;

    connectWebSocket(data.roomId);
}



const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
    console.log("Send button clicked!");
    const chatInput = document.getElementById("chatInput");
    const message = chatInput.value.trim();

    if (!message) return;

    if (!stompClient || !stompClient.connected) {
        console.log("WebSocket is not connected yet");
        return;
    }

    stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify({
            roomId: currentRoomId,
            message: message
        })
    });

    chatInput.value = "";
});


// WebSocket Connection


let stompClient = null;
let currentRoomId = null;

function connectWebSocket(roomId) {
    currentRoomId = roomId;

    stompClient = new StompJs.Client({
        brokerURL: "ws://localhost:8080/ws",

        reconnectDelay: 5000,

        onConnect: () => {
            console.log("WebSocket connected!");

            stompClient.subscribe(`/topic/room/${roomId}/chat`, (message) => {
                const chatBox = document.getElementById("chatBox");

                const messageElement = document.createElement("p");
                messageElement.innerText = message.body;

                chatBox.appendChild(messageElement);
            });
            stompClient.subscribe(`/topic/room/${roomId}/draw`, (message) => {
                const drawing = JSON.parse(message.body);

                    if (drawing.type === "START") {
                        ctx.beginPath();
                        ctx.moveTo(drawing.x, drawing.y);
                    } else if (drawing.type === "DRAW") {
                        ctx.lineTo(drawing.x, drawing.y);
                        ctx.stroke();
                    } else if (drawing.type === "STOP") {
                        ctx.closePath();
                    }
            });
        },

        onWebSocketError: (error) => {
            console.error("WebSocket error:", error);
        },

        onStompError: (frame) => {
            console.error("STOMP error:", frame.headers["message"]);
        }
    });

    stompClient.activate();
}
