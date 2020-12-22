---
layout: post 
title : Bayesian Linear Regression
tags  : [ML,AI,linear-regression,bayesian, bayes]
title-seprator: "|"
categories: Machine Learning
permalink: /:categories/:title.html
mathjax: true
author: Mrityunjay
img: /posts_imgs/bayesianLinearRegression/teaser/darkBLR.png
viz: bayesianLinearRegression/index.html
---

## What is Bayesian Linear Regression and why should I care?

Just like in simple linear regression in bayesian Linear Regression we try to find the best possible curve to fit to our <span class="dataPoints">data</span> but along with that, we also take into account **the uncertainity** towards our prediction. for example, in this visualization, we can see that in the areas where we have the <span class="dataPoints">data points</span>, the width of the <span class="stdev">dashed curve</span> is small which means our model is really confident about its prediction (which is showen in the <span class="prediction">solid red line</span>) but if you see in the regions inwhich we don't have any data points, the width of those <span class="stdev">dashed curve</span> are much larger which inturn means, that the model is highly uncertain about its prediction.... but why should we care about modelling uncertainity? Suppose, you want to diagnose a patient and given the symptoms you want to predict how serious this patient is and should it require immidiate attention on not... because we know how confident our model is about its prediction, we can make better decisions like if its highly uncertain, then we should better consult with the expert or something and don't believe on its predictions, whereas in the standard linear regression/ non-bayesian methods we can't do any of that, there we only have a prediction and thats it... using bayesian linear regression, we can also find missing data and even learns what would be the best possible degree of the polynomial to fit to this data without having to manually set them( like we usually do)...





