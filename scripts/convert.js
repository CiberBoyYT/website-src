function convert() {
    const quantity = parseFloat(document.getElementById("quantity").value);
    const fromUnit = document.getElementById("unit").value;
    const toUnit = document.getElementById("toUnit").value;
    let result;

    //length
    if (fromUnit === "m" && toUnit === "km") result = quantity / 1000;
    else if (fromUnit === "km" && toUnit === "m") result = quantity * 1000;
    else if (fromUnit === "cm" && toUnit === "m") result = quantity / 100;
    else if (fromUnit === "m" && toUnit === "cm") result = quantity * 100;
    else if (fromUnit === "mm" && toUnit === "m") result = quantity / 1000;
    else if (fromUnit === "m" && toUnit === "mm") result = quantity * 1000;
    else if (fromUnit === "mi" && toUnit === "km") result = quantity * 1.60934;
    else if (fromUnit === "km" && toUnit === "mi") result = quantity / 1.60934;
    else if (fromUnit === "in" && toUnit === "m") result = quantity * 0.0254;
    else if (fromUnit === "m" && toUnit === "in") result = quantity / 0.0254;
    else if (fromUnit === "yd" && toUnit === "m") result = quantity * 0.9144;
    else if (fromUnit === "m" && toUnit === "yd") result = quantity / 0.9144;

    // weight
    else if (fromUnit === "g" && toUnit === "kg") result = quantity / 1000;
    else if (fromUnit === "kg" && toUnit === "g") result = quantity * 1000;
    else if (fromUnit === "mg" && toUnit === "g") result = quantity / 1000;
    else if (fromUnit === "g" && toUnit === "mg") result = quantity * 1000;
    else if (fromUnit === "oz" && toUnit === "g") result = quantity * 28.3495;
    else if (fromUnit === "g" && toUnit === "oz") result = quantity / 28.3495;
    else if (fromUnit === "lb" && toUnit === "kg") result = quantity * 0.453592;
    else if (fromUnit === "kg" && toUnit === "lb") result = quantity / 0.453592;

    //time
    else if (fromUnit === "s" && toUnit === "min") result = quantity / 60;
    else if (fromUnit === "min" && toUnit === "s") result = quantity * 60;
    else if (fromUnit === "h" && toUnit === "min") result = quantity * 60;
    else if (fromUnit === "min" && toUnit === "h") result = quantity / 60;
    else if (fromUnit === "h" && toUnit === "s") result = quantity * 3600;
    else if (fromUnit === "s" && toUnit === "h") result = quantity / 3600;

    //temperature
    else if (fromUnit === "c" && toUnit === "f") result = (quantity * 9 / 5) + 32;
    else if (fromUnit === "f" && toUnit === "c") result = (quantity - 32) * 5 / 9;
    else if (fromUnit === "c" && toUnit === "k") result = quantity + 273.15;
    else if (fromUnit === "k" && toUnit === "c") result = quantity - 273.15;
    else if (fromUnit === "f" && toUnit === "k") result = (quantity - 32) * 5 / 9 + 273.15;
    else if (fromUnit === "k" && toUnit === "f") result = (quantity - 273.15) * 9 / 5 + 32;

    //result output
    const resultField = document.getElementById("result");
    if (result !== undefined) {
        resultField.innerText = `Result: ${result} ${toUnit}`;
    } else {
        resultField.innerText = "The conversion is not valid :(";
    }
}
