const ctx1_TF = document.getElementById('electricChart_TF');
const ctx2_TF = document.getElementById('potentialChart_TF');
const ctx3_TF = document.getElementById('displacementChart_TF');

//Data arrays
const leftElectrode_E_TF = [];
const insulator_E_TF = [];
const rightElectrode_E_TF = [];

const leftElectrode_V_TF = [];
const insulator_V_TF = [];
const rightElectrode_V_TF = [];

const leftElectrode_D_TF = [];
const insulator_D_TF = [];
const rightElectrode_D_TF = [];

//HTML elements and inputs
let V_TF = document.getElementById("V_TF").value;
let l_TF = document.getElementById("l_TF").value;
let chi_TF = document.getElementById("chi_TF").value;
let lambda_TF = document.getElementById("lambda_TF").value;
let Ps_TF = document.getElementById("Ps_TF").value;

let VText_TF = document.getElementById("VText_TF");
let lText_TF = document.getElementById("lText_TF");
let chiText_TF = document.getElementById("chiText_TF");
let lambdaText_TF = document.getElementById("lambdaText_TF");
let PsText_TF = document.getElementById("PsText_TF");
let PText_TF = document.getElementById("PText_TF");

//generate data
generateData_TF(Number(V_TF), Number(l_TF), Number(chi_TF), Number(lambda_TF), Number(Ps_TF), nData);

//make charts
electricChart_TF = new Chart(ctx1_TF, config("Electric field (V/\u212B)", -0.5, 0.5));
addData(electricChart_TF,leftElectrode_E_TF);
addData(electricChart_TF,insulator_E_TF);
addData(electricChart_TF,rightElectrode_E_TF);

potentialChart_TF = new Chart(ctx2_TF, config("Electric potential (V)", -10, 10))
addData(potentialChart_TF,leftElectrode_V_TF);
addData(potentialChart_TF,insulator_V_TF);
addData(potentialChart_TF,rightElectrode_V_TF);

displacementChart_TF = new Chart(ctx3_TF, config("Displacement field (C/m\u00B2)", -0.5, 0.5))
addData(displacementChart_TF,leftElectrode_D_TF);
addData(displacementChart_TF,insulator_D_TF);
addData(displacementChart_TF,rightElectrode_D_TF);

electricChart_TF.update();
potentialChart_TF.update();
displacementChart_TF.update();

function generateData_TF(V, l, chi, lambda, Ps, n = 100) {
  leftElectrode_E_TF.length = 0;
  insulator_E_TF.length = 0;
  rightElectrode_E_TF.length = 0;
  leftElectrode_V_TF.length = 0;
  insulator_V_TF.length = 0;
  rightElectrode_V_TF.length = 0;
  leftElectrode_D_TF.length = 0;
  insulator_D_TF.length = 0;
  rightElectrode_D_TF.length = 0;

  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - electrodeLength;
  i2 = x2 + electrodeLength;
  
  a = 2*lambda*(1-Math.exp(-l/lambda));
  D = 1/(a*(1+chi)+l)*((1+chi)*vac_permittivity*V + l*Ps);
  E = 1/(a*(1+chi)+l)*(V - a/vac_permittivity*Ps);
  let P = chi*E + Ps;

  for (let x = x1; x >= i1; x -= (i2 - i1)/n) {
    leftElectrode_E_TF.push({x:x, y: eval(D/vac_permittivity*Math.exp((x+l/2)/lambda))});
    leftElectrode_V_TF.push({x:x, y: -V/2 + eval(D*lambda/vac_permittivity*Math.exp((x+l/2)/lambda))});
    leftElectrode_D_TF.push({x:x, y: eval(D*Math.exp((x+l/2)/lambda))});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/n) {
    insulator_E_TF.push({x:x, y: E});
    insulator_V_TF.push({x:x, y: -V/2 + eval(D*lambda/vac_permittivity + E*(x + l/2))});
    insulator_D_TF.push({x:x, y: D});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/n) {
    rightElectrode_E_TF.push({x:x, y: eval(D/vac_permittivity*Math.exp(-(x-l/2)/lambda))});
    rightElectrode_V_TF.push({x:x, y: V/2 + eval(-D*lambda/vac_permittivity*Math.exp(-(x-l/2)/lambda))});
    rightElectrode_D_TF.push({x:x, y: eval(D*Math.exp(-(x-l/2)/lambda))});
  }

  return P;
}

function result_TF(){
  let V_TF = document.getElementById("V_TF").value;
  let l_TF = document.getElementById("l_TF").value;
  let chi_TF = document.getElementById("chi_TF").value;
  let lambda_TF = document.getElementById("lambda_TF").value;
  let Ps_TF = document.getElementById("Ps_TF").value;

  let P = generateData_TF(Number(V_TF), Number(l_TF), Number(chi_TF), Number(lambda_TF), Number(Ps_TF), nData);

  VText_TF.innerHTML = "Voltage: " + V_TF + " V"; 
  lText_TF.innerHTML = "Length: " + l_TF + " \u212B";
  chiText_TF.innerHTML = "Electric susceptibility: " + Number(chi_TF).toFixed(1); 
  lambdaText_TF.innerHTML = "Thomas-Fermi screening length: " + Number(lambda_TF).toFixed(1) + " &#8491;"
  PsText_TF.innerHTML = "Spontaneous Polarization: " + Number(Ps_TF).toFixed(2) +" C/m<sup>2</sup>";
  PText_TF.innerHTML = "P: " + P.toFixed(2) +" C/m<sup>2</sup>";


  updateBoxes(electricChart_TF, P);
  updateBoxes(potentialChart_TF, P);
  updateBoxes(displacementChart_TF, P);

  electricChart_TF.update('none');
  potentialChart_TF.update('none');
  displacementChart_TF.update('none');

}