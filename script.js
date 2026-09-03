function addMessage(text, sender) {
    const messages = document.getElementById("messages");
    const msg = document.createElement("div");
    msg.classList.add("msg", sender);
    msg.innerText = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    try {
        const response = await fetch("http://192.168.1.236/chat") , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        const botReply =
            "Intent: " + data.intent + "\n" +
            "Confidence: " + data.confidence + "\n" +
            "Hint: " + data.hint + "\n" +
            "Source: " + data.source;

        addMessage(botReply, "bot");

    } catch (error) {
        addMessage("Error: Could not reach backend.", "bot");
    }
}
