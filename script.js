

const tableBody = document.querySelector("#tvaTable tbody");
const addRowBtn = document.getElementById("addRow");
const deleteRowBtn = document.getElementById("deleteRow");
const eraseAllBtn = document.getElementById("eraseAll");

addRowBtn.addEventListener("click", () => {
    const newRow = tableBody.rows[0].cloneNode(true);

    newRow.querySelectorAll("input").forEach(input => input.value = "");
    newRow.querySelector("select").value = "";

    tableBody.appendChild(newRow);
    saveToLocalStorage();
});

deleteRowBtn.addEventListener("click", () => {
    if (tableBody.rows.length > 1) {
        tableBody.deleteRow(tableBody.rows.length - 1);
        saveToLocalStorage();
    }
});

eraseAllBtn.addEventListener("click", () => {
    tableBody.querySelectorAll("input").forEach(i => i.value = "");
    tableBody.querySelectorAll("select").forEach(s => s.value = "");
    saveToLocalStorage();
});


tableBody.addEventListener("click", function (e) {
    const row = e.target.closest("tr");

    // Calculer
    if (e.target.classList.contains("calculateBtn")) {
        const ht = parseFloat(row.querySelector(".prixHT").value) || 0;
        const tva = parseFloat(row.querySelector(".tvaSelect").value) || 0;

        const ttc = ht + (ht * tva / 100);
        row.querySelector(".prixTTC").value = ttc.toFixed(2);

        updateTotalTTC();
        saveToLocalStorage();
    }

    // Effacer
    if (e.target.classList.contains("eraseBtn")) {
        row.querySelectorAll("input").forEach(i => i.value = "");
        row.querySelector("select").value = "";
        updateTotalTTC();
        saveToLocalStorage();
    }

    // Supprimer
    if (e.target.classList.contains("deleteBtn")) {
        if (tableBody.rows.length > 1) row.remove();
        updateTotalTTC();
        saveToLocalStorage();
    }
});


function updateTotalTTC() {
    let total = 0;

    tableBody.querySelectorAll(".prixTTC").forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) total += value;
    });

    document.getElementById("totalTTC").innerText = total.toFixed(2);
}


function saveToLocalStorage() {
    const rowsData = [];

    tableBody.querySelectorAll("tr").forEach(row => {
        rowsData.push({
            libelle: row.querySelector(".libelle").value,
            prixHT: row.querySelector(".prixHT").value,
            tva: row.querySelector(".tvaSelect").value,
            prixTTC: row.querySelector(".prixTTC").value
        });
    });

    localStorage.setItem("tvaTableData", JSON.stringify(rowsData));
}


function loadFromLocalStorage() {
    const data = localStorage.getItem("tvaTableData");
    if (!data) return;

    const rows = JSON.parse(data);

    tableBody.innerHTML = ""; // vider le tableau

    rows.forEach(rowData => {
        const row = tableBody.insertRow();

        row.innerHTML = `
            <td class="border border-black px-4 py-2">
                <input type="text" class="libelle border p-1 w-40 text-center" value="${rowData.libelle}">
            </td>
            <td class="border border-black px-4 py-2">
                <input type="number" class="prixHT border p-1 w-40 text-center" value="${rowData.prixHT}">
            </td>
            <td class="border border-black px-4 py-2">
                <select class="tvaSelect border p-1 w-24 text-center">
                    <option value="">Choisir TVA</option>
                    <option value="20">20%</option>
                    <option value="10">10%</option>
                    <option value="5.5">5.5%</option>
                </select>
            </td>
            <td class="border border-black px-4 py-2">
                <input type="number" class="prixTTC border p-1 w-40 text-center" value="${rowData.prixTTC}" readonly>
            </td>
            <td class="border border-black px-4 py-2">
                <button class="px-3 py-1 bg-green-600 text-white rounded calculateBtn">Calculer</button>
            </td>
            <td class="border border-black px-4 py-2">
                <button class="px-3 py-1 bg-yellow-500 text-black rounded eraseBtn">Effacer</button>
            </td>
            <td class="border border-black px-4 py-2">
                <button class="px-3 py-1 bg-red-600 text-white rounded deleteBtn">Supprimer</button>
            </td>
        `;

        row.querySelector(".tvaSelect").value = rowData.tva;
    });

    updateTotalTTC();
}

// Charger au démarrage
loadFromLocalStorage();


document.getElementById("exportJSON").addEventListener("click", () => {
    const data = localStorage.getItem("tvaTableData") || "[]";

    const blob = new Blob([data], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tableau_tva.json";
    link.click();
});



document.getElementById("importJSON").addEventListener("click", () => {
    document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        localStorage.setItem("tvaTableData", e.target.result);
        loadFromLocalStorage();
    };
    reader.readAsText(file);
});



































