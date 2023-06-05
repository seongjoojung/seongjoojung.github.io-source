---
title: Understanding (Ferroelectric) Thin Film Capacitors
description: Interactive explanation about depolarization fields in capacitors
tags: post
date: 2023-06-02
layout: layouts/post.njk
---




Understanding Thin Film Capacitors



<play-ground>
  <div>
    <form>
        <div style="display: grid;">
            <label for="a" id="aText">
            a: 1
            </label>
            <input id="a" type="range" min="1" max="10" step="0.1" aria-label="a" value="1" oninput="result()">
        </div>
        <div style="display: grid;">
            <label for="b" id="bText">
            b: 57
            </label>
            <input id="b" type="range" min="1" max="500" aria-label="b" value="57" oninput="result()">
        </div>
    </form>
  </div>

  <div>
    <canvas id="myChart" style="width:100%;"></canvas>
</div>
</play-ground>



<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>

  const ctx = document.getElementById('myChart');

  const xValues = [];
  const yValues = [];
  generateData("x * 2 + 7", 0, 10, 0.5);

  
  var aText = document.getElementById("aText");
  var bText = document.getElementById("bText");

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: yValues
      }]
    },
    options: {

    }
  });

  function generateData(value, i1, i2, step = 1) {
    xValues.length = 0;
    yValues.length = 0;
    for (let x = i1; x <= i2; x += step) {
      yValues.push(eval(value));
      xValues.push(x);
    }
  }

  function result(){
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    if (!isNaN(a)) {
      aText.innerHTML = "a: " + a; 
      bText.innerHTML = "b: " + b;
      generateData("x * " + a + " + " + b, 0, 10, 1);
      myChart.data.labels = xValues;
      myChart.data.datasets[0].data = yValues;
      myChart.update('none');
    }
    else
      console.log("Please enter the integer value..");
  }
</script>



And finally, represent the resulting position data in the playground:

<SpringPhysics withDamping />