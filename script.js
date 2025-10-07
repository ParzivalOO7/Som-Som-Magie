let CelA1 = document.getElementById("inp_A1");
let CelA2 = document.getElementById("inp_A2");
let CelA3 = document.getElementById("inp_A3");
let CelA4 = document.getElementById("inp_A4");

let CelB1 = document.getElementById("inp_B1");
let CelB2 = document.getElementById("inp_B2");
let CelB3 = document.getElementById("inp_B3");
let CelB4 = document.getElementById("inp_B4");

let CelC1 = document.getElementById("inp_C1");
let CelC2 = document.getElementById("inp_C2");
let CelC3 = document.getElementById("inp_C3");
let CelC4 = document.getElementById("inp_C4");

let CelD1 = document.getElementById("inp_D1");
let CelD2 = document.getElementById("inp_D2");
let CelD3 = document.getElementById("inp_D3");
let CelD4 = document.getElementById("inp_D4");

function CheckAnswer() {
  let invB2 = parseInt(document.getElementById("inp_B2").value);
  let invB3 = parseInt(document.getElementById("inp_B3").value);
  let invC2 = parseInt(document.getElementById("inp_C2").value);
  let invC3 = parseInt(document.getElementById("inp_C3").value);

  if (invB2 == CelB2 && invB3 == CelB3 && invC2 == CelC2 && invC3 == CelC3) {
    document.body.style.backgroundColor = "green";
  } else {
    document.body.style.backgroundColor = "red";
  }

  setTimeout(() => {
    document.body.style.backgroundColor = "white";
  }, 2000);
}

function MakeProblem() {
  CelB2 = Math.floor(Math.random() * 25 + 1);
  CelB3 = Math.floor(Math.random() * 25 + 1);
  CelC2 = Math.floor(Math.random() * 25 + 1);
  CelC3 = Math.floor(Math.random() * 25 + 1);

  CelA1.value = CelC3 + CelB2;
  CelB4.value = CelB2 + CelB3;
  CelD3.value = CelB3 + CelC3;
  CelC4.value = CelC2 + CelC3;
  CelD2.value = CelB2 + CelC2;
  CelA4.value = CelC2 + CelB3;
}

function FakeSolve() {
  document.getElementById("inp_B2").value = CelB2;
  document.getElementById("inp_B3").value = CelB3;
  document.getElementById("inp_C2").value = CelC2;
  document.getElementById("inp_C3").value = CelC3;
}
