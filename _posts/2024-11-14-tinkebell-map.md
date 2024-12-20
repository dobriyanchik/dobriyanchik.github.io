---
layout:     post
title:      "Tinkerbell map"
date:       2024-11-14
categories: Science
tags:       science chaos
mathjax:    true
---

* content
{:toc}

Tinkerbell map is a discrete-time dynamical system. Unlike [Hénon map](2024/09/30/henon-map/) the system is not so well presented and studied.

![Tinkerbell map attractor](/assets/sci-data/tinkerbell_attractor.png)

* * *


Funny fact:
 > _"The origin of the name is uncertain; however, the graphical picture of the system (as shown to the right) shows a similarity to the movement of Tinker Bell over Cinderella Castle, as shown at the beginning of all films produced by Disney."_ <sup>[Wikipedia](https://en.wikipedia.org/wiki/Tinkerbell_map)</sup>

The Tinkerbell map takes a point $(x_n, y_n)$ in the plane and maps it to a new point by next law:

$$
\begin{cases}
x_{n+1} = x_n^2 - y_n^2 + ax_n + by_n\\
y_{n+1} = 2x_ny_n + cx_n + dy_n
\end{cases}
$$

Default parameters: $a=0.9, b=-0.6013, c=2, d=0.5$  
Initial conditions: $x_0=-0.72, y_0=-0.64$


## Bifurcation diagram

| Bifurcation diagram for parameter a | Bifurcation diagram for parameter b |
|-------------------------------------|-------------------------------------|
|![](/assets/sci-data/tinkerbell_bifur_a.png)|![](/assets/sci-data/tinkerbell_bifur_b.png)|

| Bifurcation diagram for parameter c | Bifurcation diagram for parameter d |
|-------------------------------------|-------------------------------------|
|![](/assets/sci-data/tinkerbell_bifur_c.png)|![](/assets/sci-data/tinkerbell_bifur_d.png)|

## Frequency analysis

| FFT Power spectrum | Wavelet |
|--------------------|---------|
|![](/assets/sci-data/tinkerbell_fft.png)|![](/assets/sci-data/tinkerbell_wavelet.jpg)|

Power spectrum of the map has noticeable peak at $\omega \approx 0.1$ and the same is visible on Morlet wavelet where lighter areas indicate higher power of frequencies.
 
## Lyapunov exponents
Lyapunov exponents spectrum for default parameters values has one positive exponent: $$λ_1 = 0.19978, λ_2 = −0.50018$$ so the system is chaotic. Kaplan-Yorke dimension is $1.3994$.

| LLE dynamics for parameter a | LLE dynamics for parameter b |
|------------------------------|------------------------------|
|![](/assets/sci-data/tinkerbell_lle_a_magnified.png)|![](/assets/sci-data/tinkerbell_lle_b_magnified.png)|

| LLE dynamics for parameter c | LLE dynamics for parameter d |
|------------------------------|------------------------------|
|![](/assets/sci-data/tinkerbell_lle_c_magnified.png)|![](/assets/sci-data/tinkerbell_lle_d_magnified.png)|

Maps of Lyapunov exponents spectrum are pretty cool and show visually "interesting" structures. Majority of driving parameters combinations lead to harmonic system state (green color). Unlike general nonlinear ODEs (where count of positive Lyapunov exponents is always $\le n - 2$, where n is equations count) the map has 2 positive Lyapunov exponents in spectrum for some parameters combinations. Areas with 2 positive exponents (brown color) are very small in comparison with other modes.

| LE Spectrum map for parameters a & b | LE Spectrum map for parameters a & c |
|------------------------------|------------------------------|
|![](/assets/sci-data/tinkerbell_lyapunov_map_a_b.png)|![](/assets/sci-data/tinkerbell_lyapunov_map_a_c.png)|

| LE Spectrum map for parameters a & d | LE Spectrum map for parameters b & c |
|------------------------------|------------------------------|
|![](/assets/sci-data/tinkerbell_lyapunov_map_a_d.png)|![](/assets/sci-data/tinkerbell_lyapunov_map_b_c.png)|

| LE Spectrum map for parameters b & d | LE Spectrum map for parameters c & d |
|------------------------------|------------------------------|
|![](/assets/sci-data/tinkerbell_lyapunov_map_b_d.png)|![](/assets/sci-data/tinkerbell_lyapunov_map_c_d.png)|

## References

 - K.T. Alligood, T.D. Sauer, and J.A. Yorke, ["Chaos: An Introduction to Dynamical Systems"](https://link.springer.com/book/10.1007/b97589), Springer-Verlag, Berlin, 1996.