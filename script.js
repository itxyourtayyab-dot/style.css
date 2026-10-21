const simpleDisplay = document.getElementById("simpleDisplay");

function showCalculator(type) {
    document.getElementById("simple").hidden = type !== "simple";
    document.getElementById("scientific").hidden =
        type !== "scientific";
}

function simpleInput(value) {
    simpleDisplay.value += value;
}

function clearSimple() {
    simpleDisplay.value = "";
}

function deleteSimple() {
    simpleDisplay.value = simpleDisplay.value.slice(0, -1);
}

function calculateSimple() {
    const expression = simpleDisplay.value;

    if (!expression || !/^[0-9+\-*/.() ]+$/.test(expression)) {
        simpleDisplay.value = "Invalid input";
        return;
    }

    try {
        const result = Function('"use strict"; return (' +
            expression + ')')();

        if (typeof result !== "number" || !Number.isFinite(result)) {
            simpleDisplay.value = "Math Error";
            return;
        }

        simpleDisplay.value = String(
            Number(result.toPrecision(12))
        );
    } catch {
        simpleDisplay.value = "Math Error";
    }
}