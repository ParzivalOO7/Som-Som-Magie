const CelA1 = document.getElementById("inp_A1");
const CelA2 = document.getElementById("inp_A2");
const CelA3 = document.getElementById("inp_A3");
const CelA4 = document.getElementById("inp_A4");

const CelB1 = document.getElementById("inp_B1");
const inpB2 = document.getElementById("inp_B2");
const inpB3 = document.getElementById("inp_B3");
const CelB4 = document.getElementById("inp_B4");

const CelC1 = document.getElementById("inp_C1");
const inpC2 = document.getElementById("inp_C2");
const inpC3 = document.getElementById("inp_C3");
const CelC4 = document.getElementById("inp_C4");

const CelD1 = document.getElementById("inp_D1");
const CelD2 = document.getElementById("inp_D2");
const CelD3 = document.getElementById("inp_D3");
const CelD4 = document.getElementById("inp_D4");

let ansB2, ansB3, ansC2, ansC3;
let mode;

function clearInputs() {
  inpB2.value = "";
  inpB3.value = "";
  inpC2.value = "";
  inpC3.value = "";
}

function MakeProblem() {
  const explanation = document.getElementById("explanation");
  explanation.style.animation = "none";
  explanation.offsetHeight;
  explanation.style.animation = "";

  clearInputs();

  // Randomly pick addition or multiplication — player has to figure it out
  mode = Math.random() < 0.5 ? 'add' : 'mul';

  ansB2 = Math.floor(Math.random() * 9 + 1);
  ansB3 = Math.floor(Math.random() * 9 + 1);
  ansC2 = Math.floor(Math.random() * 9 + 1);
  ansC3 = Math.floor(Math.random() * 9 + 1);

  if (mode === 'add') {
    CelA1.value = ansC3 + ansB2;
    CelB4.value = ansB2 + ansB3;
    CelD3.value = ansB3 + ansC3;
    CelC4.value = ansC2 + ansC3;
    CelD2.value = ansB2 + ansC2;
    CelA4.value = ansC2 + ansB3;
  } else {
    CelA1.value = ansC3 * ansB2;
    CelB4.value = ansB2 * ansB3;
    CelD3.value = ansB3 * ansC3;
    CelC4.value = ansC2 * ansC3;
    CelD2.value = ansB2 * ansC2;
    CelA4.value = ansC2 * ansB3;
  }
}

function showToast(message, type) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show " + type;
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function CheckAnswer() {
  const vB2 = parseInt(inpB2.value, 10);
  const vB3 = parseInt(inpB3.value, 10);
  const vC2 = parseInt(inpC2.value, 10);
  const vC3 = parseInt(inpC3.value, 10);

  const correct =
    vB2 === ansB2 && vB3 === ansB3 && vC2 === ansC2 && vC3 === ansC3;

  if (correct) {
    showToast("Correct! Well done.", "toast-correct");
  } else {
    showToast("Not quite. Try again!", "toast-wrong");
  }
}

function FakeSolve() {
  inpB2.value = ansB2;
  inpB3.value = ansB3;
  inpC2.value = ansC2;
  inpC3.value = ansC3;
}
