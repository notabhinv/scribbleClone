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
    ctx.lineWidth = 5
    ctx.strokeStyle = "red"

    ctx.beginPath()
    ctx.moveTo(e.offsetX, e.offsetY)
    isDrawing = true
})

canvas.addEventListener("mousemove", (e) => {
    if(isDrawing){
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
    }
})

canvas.addEventListener("mouseup", () => {
    isDrawing = false
})

canvas.addEventListener("mouseleave", () => {
    isDrawing = false
})


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
}