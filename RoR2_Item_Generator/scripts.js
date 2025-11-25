let numPlayers = -1;

document.getElementById("refresh").onclick = function () {
    numPlayers = Number(document.getElementById("numPlayers").value);

    if (isNaN(numPlayers) || numPlayers < 1) {
        console.log("Please enter a valid number of players.");
        return;
    }

    const playerContainer = document.getElementById("playerContainer");
    playerContainer.innerHTML = "";

    // Header row
    for (let i = 0; i < numPlayers; i++) {
        const playerTitle = document.createElement("th");
        playerTitle.textContent = "Player " + (i + 1);
        playerContainer.appendChild(playerTitle);
    }

    // Create items row
    document.getElementById("playerContainer").nextSibling.remove(); // Remove old items row
    let itemsRow = document.createElement("tr");

    fetch('items/items.json')
        .then(response => response.json())
        .then(items => {
            const numCommon = items.Common.length;
            const numUncommon = items.Uncommon.length;
            const numLegendary = items.Legendary.length;
            const numBoss = items.Boss.length;
            const numLunar = items.Lunar.length;
            const numEquipment = items.Equipment.length;
            const numLunarEquipment = items['Lunar-Equipment'].length;
            const voidCommon = items['Void-Common'].length;
            const voidUncommon = items['Void-Uncommon'].length;
            const voidLegendary = items['Void-Legendary'].length;

            for (let i = 0; i < numPlayers; i++) {
                const playerItems = document.createElement("td");
                playerItems.innerHTML =
                    "Common: " + items.Common[Math.floor(Math.random() * numCommon)].name + "<br>" +
                    "Uncommon: " + items.Uncommon[Math.floor(Math.random() * numUncommon)].name + "<br>" +
                    "Legendary: " + items.Legendary[Math.floor(Math.random() * numLegendary)].name + "<br>" +
                    "Boss: " + items.Boss[Math.floor(Math.random() * numBoss)].name + "<br>" +
                    "Lunar: " + items.Lunar[Math.floor(Math.random() * numLunar)].name + "<br>" +
                    "Equipment: " + items.Equipment[Math.floor(Math.random() * numEquipment)].name + "<br>" +
                    "Lunar Equipment: " + items['Lunar-Equipment'][Math.floor(Math.random() * numLunarEquipment)].name + "<br>" +
                    "Void Common: " + items['Void-Common'][Math.floor(Math.random() * voidCommon)].name + "<br>" +
                    "Void Uncommon: " + items['Void-Uncommon'][Math.floor(Math.random() * voidUncommon)].name + "<br>" +
                    "Void Legendary: " + items['Void-Legendary'][Math.floor(Math.random() * voidLegendary)].name;

                itemsRow.appendChild(playerItems);
            }

            // Append the row **after** it's populated
            playerContainer.parentElement.appendChild(itemsRow);
        });
};
