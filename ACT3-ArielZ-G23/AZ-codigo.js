
let operacionActual = "";
let operacionAnterior = "";

// Agregar números a la pantalla
function agregarNumero(numero) {
    if (operacionActual === "Error") {
        operacionActual = "";
    }

    operacionActual += numero;
    actualizarPantalla();
}

// Agregar operadores matemáticos
function agregarOperador(operador) {
    if (operacionActual === "" || operacionActual === "Error") {
        return;
    }

    const ultimoCaracter = operacionActual.slice(-1);

    if ("+-*/".includes(ultimoCaracter)) {
        operacionActual = operacionActual.slice(0, -1);
    }

    operacionActual += operador;
    actualizarPantalla();
}

// Agregar números decimales
function agregarDecimal() {
    if (operacionActual === "Error") {
        operacionActual = "";
    }

    const partes = operacionActual.split(/[+\-*/]/);
    const ultimoNumero = partes[partes.length - 1];

    if (!ultimoNumero.includes(".")) {
        if (ultimoNumero === "") {
            operacionActual += "0";
        }

        operacionActual += ".";
        actualizarPantalla();
    }
}

// Realizar la operación matemática
function calcular() {
    if (operacionActual === "") return;

    try {
        if (!/^[0-9+\-*/. ]+$/.test(operacionActual)) {
            throw new Error("Operación inválida");
        }

        const resultado = Function(
            '"use strict"; return (' + operacionActual + ')'
        )();

        if (!Number.isFinite(resultado)) {
            throw new Error("Operación inválida");
        }

        operacionAnterior = operacionActual;

        document.getElementById("operacion").textContent =
            operacionAnterior.replace(/\*/g, "×").replace(/\//g, "÷") + " =";

        operacionActual = String(
            Number(resultado.toFixed(10))
        );

        document.getElementById("resultado").textContent =
            operacionActual;

    } catch (error) {
        operacionActual = "Error";
        document.getElementById("resultado").textContent = "Error";
    }
}

// Limpiar la calculadora
function limpiar() {
    operacionActual = "";
    operacionAnterior = "";

    document.getElementById("operacion").textContent = "";
    document.getElementById("resultado").textContent = "0";
}

// Actualizar los valores de la pantalla
function actualizarPantalla() {
    document.getElementById("operacion").textContent =
        operacionActual.replace(/\*/g, "×").replace(/\//g, "÷");

    document.getElementById("resultado").textContent =
        operacionActual || "0";
}
