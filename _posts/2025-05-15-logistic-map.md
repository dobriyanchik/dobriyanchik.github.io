---
layout:     post
title:      "Logistic map"
date:       2025-05-15 20:45:00
categories: Science
tags:       science chaos
mathjax:    true
series:     "Common chaotic systems"
---

* content
{:toc}

Logistic map is one of the most simple examples of system with chaos. Along with Hénon map it's a very famous _"classic"_ system.

![Logistic map attractor](/assets/sci-data/logistic_attractor.png)

* * *

> _"The map was initially utilized by Edward Lorenz in the 1960s to showcase properties of irregular solutions in climate systems. It was popularized in a 1976 paper by the biologist Robert May in part as a discrete-time demographic model analogous to the logistic equation written down by Pierre François Verhulst."_ <sup>[Wikipedia](en.wikipedia.org/wiki/Logistic_map)</sup>

The Logistic map is described by equation:

$$
x_{n+1} = rx_n(1 - x_n)
$$

Default parameters: $r=4$  
Initial conditions: $x_0=0.1$


$x_n$ takes values between  0 and 1 and reflects population size on n-th year, $x_0$ is initial population size (year 0), $r$ – positive parameter describing reproduction rate (growth) of population, $n$ – current year

## Bifurcation diagram

| Bifurcation diagram for parameter a |
|-------------------------------------|
|![](/assets/sci-data/logistic_bifur_r.png)|

## Frequency analysis

| FFT Power spectrum | Wavelet |
|--------------------|---------|
|![](/assets/sci-data/logistic_fft.png)|![](/assets/sci-data/logistic_morl_wavelet.jpg)|

Power spectrum of the map is noisy on both FFT power spectrum and wavelet charts, it's not possible to distinguish any specific frequency.
 
## Lyapunov exponents
Lyapunov exponents spectrum of the map has only one value. For default parameter value LLE is positive and is equal to $λ_1 = 0.69315$ what indicates chaotic nature of the system. Lyapunov (or Kaplan-Yorke) dimension is $1$.

Let's take a look at LLE dynamics for parameter $r$. 

| LLE dynamics for parameter r |
|------------------------------|
|![](/assets/sci-data/logistic_lle_r.png)|

It's not possible to build a map of Lyapunov exponents spectrum as the system has only one driving parameter.

## References

 - May, Robert M. (1976). ["Simple mathematical models with very complicated dynamics"](https://www.nature.com/articles/261459a0). Nature. 261 (5560): 459–467.
 - Verhulst, P.-F. (1845). ["Recherches mathématiques sur la loi d'accroissement de la population."](https://gdz.sub.uni-goettingen.de/id/PPN129323640_0018) Nouv. mém. de l'Academie Royale des Sci. et Belles-Lettres de Bruxelles 18, 1-41.