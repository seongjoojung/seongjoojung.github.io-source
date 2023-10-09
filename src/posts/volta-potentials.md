---
title: Visualizing Volta Potential
description: Seeing the unseen and speaking the unspoken 
tags: post
date: 2023-10-07
layout: layouts/post.njk
card: summary
image: https://seongjoojung.github.io/favicons/fav.png
---

We need to talk about [Volta potential](https://en.wikipedia.org/wiki/Volta_potential). Users of quantum mechanical simulations such as density functional theory often overlooks "classical" thinking of electrostatic field. In most of finite-sized or continuous boundary calculations, local electric field (defined as negative gradient of electric potential) does not mean much. The electric potential changes rapidly near ions and electrons (densities), and total field averages to zero. But that may not be true, if your system is assymetrically charged. And having two different conductors in your system can easily make your system assymetrically charged.

Volta potential is essentially the same potential as [Galvani potential](https://en.wikipedia.org/wiki/Galvani_potential) between two conductors, but separated by a distance. It is the potential difference driven by alignment of the Fermi level of two conductors with different work functions. 
connected by wire
real effect, but distance is shorter