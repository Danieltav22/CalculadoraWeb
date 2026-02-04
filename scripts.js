const display = document.getElementById("display");
const buttons = document.querySelectorAll("#calculator button");
const historyDiv = document.getElementById("history");
const clearHistoryBtn = document.getElementById("clearHistory");

// ===== HISTORIAL LOCALSTORAGE =====
function getHistory() {
    return JSON.parse(localStorage.getItem("history")) || [];
}

function saveHistory(operation) {
    const history = getHistory();
    history.push(operation);
    localStorage.setItem("history", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyDiv.innerHTML = "";
    const history = getHistory();

    history.forEach(item => {
        const p = document.createElement("p");
        p.textContent = item;
        historyDiv.appendChild(p);
    });
}

function clearHistory() {
    localStorage.removeItem("history");
    renderHistory();
}

// ===== BOTONES =====
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.id;

        if (value === "=") {
            try {
                const expression = display.value;
                const result = eval(expression);
                display.value = result;
                saveHistory(`${expression} = ${result}`);
            } catch {
                display.value = "Error";
                setTimeout(() => display.value = "", 1000);
            }
        } 
        else if (value === "ac") {
            display.value = "";
        } 
        else if (value === "de") {
            display.value = display.value.slice(0, -1);
        } 
        else {
            display.value += value;
        }
    });
});

clearHistoryBtn.addEventListener("click", clearHistory);

// Mostrar historial al cargar
renderHistory();