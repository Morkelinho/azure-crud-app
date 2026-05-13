import { Home } from './pages/home.js';
import { List } from './pages/list.js';
import { Create } from './pages/create.js';
import { Edit } from './pages/edit.js';

const routes = {
    "/": Home,
    "/list": List,
    "/create": Create,
    "/edit": Edit
};

async function router() {
    const fullPath = location.hash.replace("#", "") || "/";
    const path = fullPath.split("?")[0]; // handle query params

    const page = routes[path] || Home;

    const content = await page();
    document.getElementById("app").innerHTML = content;
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);