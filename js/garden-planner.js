const plants = {
    "Яблуня": {
        size: 4,
        color: "#ff8f8f",
        icon: "🍎"
    },

    "Груша": {
        size: 5,
        color: "#dff0d8",
        icon: "🍐"
    },

    "Вишня": {
        size: 3,
        color: "#ffb3c1",
        icon: "🍒"
    },

    "Черешня": {
        size: 5,
        color: "#ffe08a",
        icon: "🍒"
    },

    "Слива": {
        size: 3,
        color: "#d6c2ff",
        icon: "🟣"
    },

    "Абрикос": {
        size: 4,
        color: "#ffd59e",
        icon: "🍊"
    },

    "Персик": {
        size: 3,
        color: "#ffc9c9",
        icon: "🍑"
    },

    "Айва": {
        size: 5,
        color: "#fff0a6",
        icon: "🍐"
    }
};

document.getElementById("generateBtn").addEventListener("click", generatePlan);

function generatePlan() {

    const resultBlock = document.querySelector(".result-block");
    resultBlock.style.display = "block";

    const width = parseInt(document.getElementById("width").value);
    const height = parseInt(document.getElementById("height").value);

    const grid = document.getElementById("gardenGrid");
    const legend = document.getElementById("legend");
    const stats = document.getElementById("stats");

    grid.innerHTML = "";
    legend.innerHTML = "";
    stats.innerHTML = "";

    // Розмір сітки
    const cellSize = 28;

    grid.style.width = width * cellSize + "px";
    grid.style.height = height * cellSize + "px";

    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${width}, ${cellSize}px)`;
    grid.style.gridTemplateRows = `repeat(${height}, ${cellSize}px)`;

    let occupied = [];

    for (let y = 0; y < height; y++) {
        occupied[y] = [];
        for (let x = 0; x < width; x++) {
            occupied[y][x] = false;
        }
    }

    let totalPlaced = 0;
    let failedPlants = 0;
    let usedArea = 0;

    document.querySelectorAll(".plant-card").forEach(card => {

        const name = card.dataset.name;
        const count = parseInt(card.querySelector("input").value);

        if (count <= 0) return;

        const plant = plants[name];

        // Легенда
        legend.innerHTML += `
            <div class="legend-item">
                <span 
                    class="legend-color"
                    style="background:${plant.color}">
                </span>

                ${plant.icon} ${name} — ${plant.size}×${plant.size} м
            </div>
        `;

        for (let i = 0; i < count; i++) {

            let placed = false;

            for (let y = 0; y <= height - plant.size; y++) {

                for (let x = 0; x <= width - plant.size; x++) {

                    let canPlace = true;

                    // Перевірка місця
                    for (let yy = 0; yy < plant.size; yy++) {

                        for (let xx = 0; xx < plant.size; xx++) {

                            if (occupied[y + yy][x + xx]) {
                                canPlace = false;
                            }
                        }
                    }

                    if (canPlace) {

                        // Займаємо місце
                        for (let yy = 0; yy < plant.size; yy++) {

                            for (let xx = 0; xx < plant.size; xx++) {

                                occupied[y + yy][x + xx] = true;
                            }
                        }

                        // Створення блоку рослини
                        const plantDiv = document.createElement("div");

                        plantDiv.className = "placed-plant";

                        plantDiv.style.gridColumn =
                            `${x + 1} / span ${plant.size}`;

                        plantDiv.style.gridRow =
                            `${y + 1} / span ${plant.size}`;

                        plantDiv.style.background = plant.color;

                        plantDiv.innerHTML = `
                            <div class="plant-inner">
                                <div class="plant-icon">
                                    ${plant.icon}
                                </div>

                                <div class="plant-name">
                                    ${name}
                                </div>
                            </div>
                        `;

                        grid.appendChild(plantDiv);

                        totalPlaced++;
                        usedArea += plant.size * plant.size;

                        placed = true;

                        break;
                    }
                }

                if (placed) break;
            }

            if (!placed) {
                failedPlants++;
            }
        }
    });

    const totalArea = width * height;
    const percent = ((usedArea / totalArea) * 100).toFixed(1);

    stats.innerHTML = `
        <div class="success">
            Розміщено: ${totalPlaced} рослин
        </div>

        ${
            failedPlants > 0
                ? `
                <div class="error">
                    Не вдалося розмістити:
                    ${failedPlants} рослин
                    (недостатньо місця)
                </div>
                `
                : ""
        }

        <div class="info">
            Використано площі:
            ${percent}%
            (${usedArea} м² з ${totalArea} м²)
        </div>

        <div class="good">
            Оптимальне використання площі ділянки!
        </div>
    `;
}