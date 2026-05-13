export function Create() {
    return `
        <h1>Create Item</h1>
        <input id="name" placeholder="Item name"/>
        <button onclick="save()">Save</button>
        <p id="msg"></p>
    `;
}

window.save = async () => {
    const nameInput = document.getElementById("name");
    const msg = document.getElementById("msg");

    const name = nameInput.value;

    if (!name) {
        msg.innerText = "Please enter a name";
        return;
    }

    await fetch("http://localhost:7071/api/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    msg.innerText = "Saved ✅";

    setTimeout(() => {
        location.hash = "#/list";
    }, 500);
};