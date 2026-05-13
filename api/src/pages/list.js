export async function List() {
    const res = await fetch("http://localhost:7071/api/items");
    const data = await res.json();

    return `
        <h1>Items</h1>
        <ul>
            ${data.map(i => `
                <li>
                    ${i.name}
                    <button onclick="edit('${i.id}')">Edit</button>
                    <button onclick="del('${i.id}')">Delete</button>
                </li>
            `).join("")}
        </ul>
    `;
}

window.del = async (id) => {
    await fetch(`http://localhost:7071/api/items?id=${id}`, {
        method: "DELETE"
    });

    location.hash = "#/list";
};

window.edit = (id) => {
    location.hash = "#/edit?id=" + id;
};
``