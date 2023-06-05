---
title: Understanding (Ferroelectric) Thin Film Capacitors
description: Interactive explanation about depolarization fields in capacitors
tags: post
date: 2023-06-02
layout: layouts/post.njk
---




Understanding Thin Film Capacitors



<play-ground>
  <divs>
    <form>
        <div style="display: grid;">
            <label for="a" id="aText">
            a: 0.5
            </label>
            <input id="a" type="range" min="0.1" max="10" step="0.1" aria-label="a" value="0.5" oninput="result()">
        </div>
        <div style="display: grid;">
            <label for="b" id="bText">
            b: 57
            </label>
            <input id="b" type="range" min="1" max="500" aria-label="b" value="57" oninput="result()">
        </div>
    </form>
  </div>

  <div >
    <canvas id="myChart" style="width: 90%; height: 300px;"></canvas>
  </div>
</play-ground>



<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>

  const ctx = document.getElementById('myChart');

  const xyValues = [];
  generateData("x * 2 + 7", 0, 100, 100);

  
  var aText = document.getElementById("aText");
  var bText = document.getElementById("bText");




  myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [{
        label: "test",
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: xyValues
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          suggestedMin: 0,
          suggestedMax: 100
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    }
  });

  
  /*
  myChart.options.scales['x'].display = false; //global visibility
  myChart.options.scales['y'].display = false; 
  myChart.options.scales['x'].grid.display = false; //grid visibility
  myChart.options.scales['y'].grid.display = false; 
  myChart.options.scales['y'].ticks.display = false; //ticks visibility
  myChart.options.scales['x'].ticks.display = false;
  */
  myChart.update('none');

  function generateData(value, i1, i2, num = 100) {
    xyValues.length = 0;
    for (let x = i1; x <= i2; x += (i2 - i1)/num) {
      xyValues.push({x:x,y:eval(value)});
    }
  }

  function result(){
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    if (!isNaN(a)) {
      aText.innerHTML = "a: " + a; 
      bText.innerHTML = "b: " + b;
      generateData("x * " + a + " + " + b, 0, 100, 100);
      myChart.data.datasets[0].data = xyValues;
      myChart.update('none');
    }
    else
      console.log("Please enter the integer value..");
  }
</script>




<SpringPhysics withDamping />