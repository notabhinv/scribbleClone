const btn = document.getElementById("createBtn");

btn.addEventListener("click", () => {
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
        console.log("Response:", data);
        document.getElementById("roomDisplay").innerText = "Player: "+data.username +" Room ID: " + data.roomId;
    })
    .catch(err => {
        console.error("Error:", err);
    });
});