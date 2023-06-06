---
title: Understanding (Ferroelectric) Thin Film Capacitors
description: Interactive explanation about depolarization fields in capacitors
tags: post
date: 2023-06-05
layout: layouts/post.njk
---




Understanding Thin Film Capacitors



<play-ground>
  <divs>
    <form>
        <div style="display: grid;">
            <label for="V" id="VText">
            Voltage: 0
            </label>
            <input id="V" type="range" min="-10" max="10" step="1" aria-label="V" value="0" oninput="result()">
        </div>
        <div style="display: grid;">
            <label for="l" id="lText">
            Length: 80
            </label>
            <input id="l" type="range" min="10" max="500" aria-label="l" value="80" oninput="result()">
        </div>
    </form>
  </div>

  <div >
    <canvas id="myChart" style="width: 90%; height: 300px;"></canvas>
  </div>
</play-ground>



<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/js/capacitors.js"></script>




<SpringPhysics withDamping />