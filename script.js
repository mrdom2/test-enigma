const rotorSelectItems = document.querySelectorAll(".rotor--init");
const clearButton = document.getElementById("clear");

const enigmaInput = document.getElementById("enigma-input");
const enigmaOutput = document.getElementById("enigma-output");

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

rotorSelectItems.forEach(select => {
    Array.from(ALPHABET).forEach(letter => {
        let opt = document.createElement('option');
        opt.value = letter;
        opt.innerHTML = letter;
        select.appendChild(opt);
    });
});

clearButton.onclick = () => {
    enigmaInput.value = enigmaOutput.value = "";
}