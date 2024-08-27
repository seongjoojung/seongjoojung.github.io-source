---
title: VASP 6, vasp2cif and other updates
description: Long time no post!
tags: post
date: 2024-03-31
layout: layouts/post.njk
card: summary
image: https://seongjoojung.github.io/favicons/fav.png
---

Long time no post!

I've had a few plans for new posts but other things in life were prioritized and were indefinitely procrastinated. In this post, I'd like to share some updates regarding the codes I've shared and future plans.

I've updated my go-to DFT package from VASP 5 to VASP 6 and made the VASP 6 version for the [force correction patch](https://github.com/seongjoojung/VASP-force-correction-patch). I've only tested for VASP 6.4.1 but I'll be interested to find out if they work in other VASP 6 versions. A couple more INCAR tags were implemented, `LFIX_XY_COL` and `LFIX_Z_COL`. They fix Cartesian components of lattice vectors, instead of the lattices vectors themselves. VASP `POSCAR` file contains 3 lines for lattice vectors, which contain 3 Cartesian components. Starting from line 3, there are 9 floats which I'll index as follows:

<pre>
<code>1 2 3
4 5 6
7 8 9
</code></pre>

`LFIX_XY` fixes values of 1, 2, 3, 4, 5, 6 whereas `LFIX_XY_COL` fixes values of 1, 2, 4, 5, 7, 8. This way, the epitaxial boundary condition can be applied in cases where the unit cell is not a conventional unit cell. In the same way, `LFIX_XY` fixes values of 7, 8, 9 whereas `LFIX_Z_COL` fixes values of 3, 6, 9.

I've also shared a [script](https://github.com/seongjoojung/vasp2cif-FINDSYM-7.1.4) for converting VASP format `POSCAR`/`CONTCAR` directly to a `.cif` file, which is very useful for mode decomposition. (Lots and lots of mode decomposition) It is based on the works of [previous authors](https://github.com/egplar/vasp2cif) which haven't been updated in the last 11 years. I've made it compatible with Python 3 and the latest version of `findsym`.

For now, I'm finishing up the antiferroelectric work on SrTiO<sub>3</sub>, which I shared at the APS March Meeting. APS members can review the recording until June 5th, 2024 [here](https://apsapp.bravuratechnologies.com/APS-WEB/?id=33600024#!/agenda/33778029/details) (Log in, click the link again, and click the "View Recording" Button) - my presentation starts at 2:19:00. I'm not too proud to share this recording because I think I've had better rehearsal sessions than the actual presentation, but I'm excited about the content! I'll share more about this paper later.

For the next posts after finishing the manuscript, I'm thinking of making a post about different multivariable optimization methods, which is a very helpful insight to have for DFT calculations. I also want to make a post about the Legendre transform and the different meanings of thermodynamic energies, hopefully all before summer.

See you soon!