export async function Edit() {
    const params = new URLSearchParams(location.hash.split("?")[1]);
    const id = params.get("id");

    const res = await fetch("http://localhost:7071/api/items");
    const items = await res.json();

    const item = items.find(i => i.id === id);

    return `
        <h1>Edit Item</h1>
        <input id="name" value="${item ? item.name : ''}" />
        <button onclick="update('${id}')">Update</button>
        <p id="msg"></p>
    `;
}

window.update = async (id) => {
    const name = document.getElementById("name").value;
    const msg = document.getElementById("msg");

    if (!name) {
        msg.innerText = "Name required";
        return;
    }

    await fetch("http://localhost:7071/api/items", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, name })
    });

    msg.innerText = "Updated ✅";

    setTimeout(() => {
        location.hash = "#/list";
    }, 500);
};