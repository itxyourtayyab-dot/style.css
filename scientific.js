const scientificDisplay =
    document.getElementById("scientificDisplay");

function scientificInput(value) {
    if (scientificDisplay.value === "Math Error" ||
        scientificDisplay.value === "Invalid input") {
        scientificDisplay.value = "";
    }

    scientificDisplay.value += value;
}

function clearScientific() {
    scientificDisplay.value = "";
}

function scientificDelete() {
    scientificDisplay.value =
        scientificDisplay.value.slice(0, -1);
}

function calculateScientific() {
    let expression = scientificDisplay.value.trim();

    if (!expression) return;

    // Allow only calculator characters and approved functions.
    if (!/^[0-9a-zA-Z+\-*/^().,\s]+$/.test(expression)) {
        scientificDisplay.value = "Invalid input";
        return;
    }

    const names = expression.match(/[a-zA-Z]+/g) || [];
    const allowedNames = [
        "sin", "cos", "tan", "sqrt", "log", "ln", "pi", "e"
    ];

    if (names.some(name => !allowedNames.includes(name))) {
        scientificDisplay.value = "Invalid input";
        return;
    }

    // Convert scientific functions to JavaScript Math functions.
    expression = expression
        .replace(/\bpi\b/g, "PI")
        .replace(/\be\b/g, "E")
        .replace(/\bsin\(/g, "sin(")
        .replace(/\bcos\(/g, "cos(")
        .replace(/\btan\(/g, "tan(")
        .replace(/\bsqrt\(/g, "sqrt(")
        .replace(/\blog\(/g, "log(")
        .replace(/\bln\(/g, "ln(")
        .replace(/\^/g, "**");

    // Convert degree-based trigonometry to radians.
    expression = expression
        .replace(/\bsin\(/g, "sin(")
        .replace(/\bcos\(/g, "cos(")
        .replace(/\btan\(/g, "tan(");

    const sin = x => Math.sin(x * Math.PI / 180);
    const cos = x => Math.cos(x * Math.PI / 180);
    const tan = x => Math.tan(x * Math.PI / 180);
    const sqrt = x => Math.sqrt(x);
    const log = x => Math.log10(x);
    const ln = x => Math.log(x);
    const PI = Math.PI;
    const E = Math.E;

    try {
        const result = Function(
            "sin", "cos", "tan", "sqrt", "log", "ln", "PI", "E",
            '"use strict"; return (' + expression + ');'
        )(sin, cos, tan, sqrt, log, ln, PI, E);

        if (typeof result !== "number" || !Number.isFinite(result)) {
            scientificDisplay.value = "Math Error";
            return;
        }

        scientificDisplay.value = String(
            Number(result.toPrecision(12))
        );
    } catch {
        scientificDisplay.value = "Math Error";
    }
}