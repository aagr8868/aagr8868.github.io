let numPlayers = -1;

let enableVoid = true;
let enableStorm = true;
let enableAlloyed = true;

document.getElementById("refresh").onclick = async function () {
    numPlayers = Number(document.getElementById("numPlayers").value);
    enableVoid = document.getElementById("void").checked;
    enableStorm = document.getElementById("storm").checked;
    enableAlloyed = document.getElementById("alloyed").checked;

    if (!numPlayers || numPlayers < 1) {
        console.log("Please enter a valid number of players.");
        return;
    }

    const enabledDLCs = getEnabledDLCs();

    const items = await loadItems();

    buildHeader(numPlayers);
    buildRows(numPlayers, items, enabledDLCs);
};

async function loadItems() {
    const response = await fetch("items/items.json");
    return await response.json();
}

function getEnabledDLCs() {
    const dlcs = [];

    if (enableVoid) dlcs.push("void");
    if (enableStorm) dlcs.push("storm");
    if (enableAlloyed) dlcs.push("alloyed");

    // Base game items have dlc = null → always allowed
    dlcs.push(null);

    return dlcs;
}
function pickValidItem(arr, enabledDLCs) {
    const valid = arr.filter(it => enabledDLCs.includes(it.dlc));

    if (valid.length === 0) {
        return null; // no valid item available
    }

    const choice = valid[Math.floor(Math.random() * valid.length)];
    return choice;
}
function buildHeader(numPlayers) {
    const playerContainer = document.getElementById("playerContainer");
    playerContainer.innerHTML = "";

    for (let i = 0; i < numPlayers; i++) {
        const th = document.createElement("th");
        th.textContent = "Player " + (i + 1);
        playerContainer.appendChild(th);
    }
}
function buildRows(numPlayers, items, enabledDLCs) {
    const table = document.getElementById("playerContainer").parentElement;

    // Remove old items row
    const oldItems = table.querySelector("tr.items-row");
    if (oldItems) oldItems.remove();

    const row = document.createElement("tr");
    row.classList.add("items-row");

    for (let p = 0; p < numPlayers; p++) {
        const cell = document.createElement("td");

        const chosen = {
            Common: pickValidItem(items.Common, enabledDLCs),
            Uncommon: pickValidItem(items.Uncommon, enabledDLCs),
            Legendary: pickValidItem(items.Legendary, enabledDLCs),
            Boss: pickValidItem(items.Boss, enabledDLCs),
            Lunar: pickValidItem(items.Lunar, enabledDLCs),
            Equipment: pickValidItem(items.Equipment, enabledDLCs),
            "Lunar-Equipment": pickValidItem(items["Lunar-Equipment"], enabledDLCs),
            "Void-Common": enableVoid ? pickValidItem(items["Void-Common"], enabledDLCs) : null,
            "Void-Uncommon": enableVoid ? pickValidItem(items["Void-Uncommon"], enabledDLCs) : null,
            "Void-Legendary": enableVoid ? pickValidItem(items["Void-Legendary"], enabledDLCs) : null
        };

        cell.innerHTML = formatItemDisplay(chosen);
        row.appendChild(cell);
    }

    table.appendChild(row);
}
function formatItemDisplay(data) {
    let html = "";

    for (const key in data) {
        const item = data[key];
        if (!item) continue;

        html += `
            <div class = "card" id ="${key}">
                <strong>${key.replace("-", " ")}:</strong>
                <div class = "card-content">
                <img src="${item.image}" alt="${item.name}"> <br>
                ${item.name}
                </div>
            </div>
        `;
    }
    return html;
}
