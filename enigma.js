const rotorIselect = rotorSelectItems[2];
const rotorIIselect = rotorSelectItems[1];
const rotorIIIselect = rotorSelectItems[0];

const RotorI = {
    alpha: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
    turnoverLetter: 'R'
};

const RotorII = {
    alpha: 'AJDKSIRUXBLHWTMCQGZNPYFVOE',
    turnoverLetter: 'F'
};

const RotorIII = {
    alpha: 'BDFHJLCPRTXVZNYEIWGAKMUSQO',
    turnoverLetter: 'W'
};

const ReflectorB = {
    alpha: 'YRUHQSLDPXNGOKMIEBFZCWVJAT'
};

function noDigits(e) {
    if (("1234567890".indexOf(e.key) != -1) || e.keyCode == 8 || e.keyCode == 17) e.preventDefault();
}

function turnRotors(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        if ((ALPHABET.indexOf(rotorIselect.value) + 1) < 26) {
            rotorIselect.value = ALPHABET[ALPHABET.indexOf(rotorIselect.value) + 1];

            if (rotorIselect.value === RotorI.turnoverLetter) {
                if ((ALPHABET.indexOf(rotorIIselect.value) + 1) < 26) {
                    rotorIIselect.value = ALPHABET[ALPHABET.indexOf(rotorIIselect.value) + 1];

                    if (rotorIIselect.value === RotorII.turnoverLetter) {
                        if ((ALPHABET.indexOf(rotorIIIselect.value) + 1) < 26) {
                            rotorIIIselect.value = ALPHABET[ALPHABET.indexOf(rotorIIIselect.value) + 1];
                        }
                        else {
                            rotorIIIselect.value = ALPHABET[0]
                        }
                    }
                }
                else {
                    rotorIIselect.value = ALPHABET[0]
                }
            }
        }
        else {
            rotorIselect.value = ALPHABET[0]
        }
    }
}

function goEnigma() {
    let keyValue = enigmaInput.value[enigmaInput.value.length - 1],
        rotor1Val = rotorIselect.value,
        rotor2Val = rotorIIselect.value,
        rotor3Val = rotorIIIselect.value;

    let op1 = op2 = op3 = op4 = op5 = op6 = op7 = op8 = 0;

    // input -> rot1
    // a = (letter + rotor1)mod26
    op1 = RotorI.alpha[(ALPHABET.indexOf(keyValue) + ALPHABET.indexOf(rotor1Val)) % 26];

    // rot1 -> rot2
    // b = (a + (rotor2 - rotor1))mod26
    op2 = RotorII.alpha[((ALPHABET.indexOf(op1) + (ALPHABET.indexOf(rotor2Val) - ALPHABET.indexOf(rotor1Val))) + 26) % 26];

    // rot2 -> rot3
    // c = (b + (rotor3 - rotor2))mod26
    op3 = RotorIII.alpha[((ALPHABET.indexOf(op2) + (ALPHABET.indexOf(rotor3Val) - ALPHABET.indexOf(rotor2Val))) + 26) % 26];

    // rot3 -> reflector
    // d = (c - rotor3)mod26
    op4 = ReflectorB.alpha[((ALPHABET.indexOf(op3) - ALPHABET.indexOf(rotor3Val)) + 26) % 26];

    // reflector -> rot3
    op5 = ALPHABET[RotorIII.alpha.indexOf(ALPHABET[(ALPHABET.indexOf(op4) + ALPHABET.indexOf(rotor3Val)) % 26])];

    // rot3 -> rot2
    op6 = ALPHABET[RotorII.alpha.indexOf(ALPHABET[((ALPHABET.indexOf(op5) - (ALPHABET.indexOf(rotor3Val) - ALPHABET.indexOf(rotor2Val))) + 26) % 26])];

    // rot2 -> rot1
    op7 = ALPHABET[RotorI.alpha.indexOf(ALPHABET[((ALPHABET.indexOf(op6) - (ALPHABET.indexOf(rotor2Val) - ALPHABET.indexOf(rotor1Val))) + 26) % 26])];

    // rot1 -> output
    op8 = ALPHABET[((ALPHABET.indexOf(op7) - ALPHABET.indexOf(rotor1Val)) + 26) % 26];

    enigmaOutput.value += op8;
}

enigmaInput.onkeyup = (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        enigmaInput.value = enigmaInput.value.toUpperCase();

        goEnigma();
    }
};

enigmaInput.onkeydown = (e) => {
    noDigits(e);
    turnRotors(e);
};