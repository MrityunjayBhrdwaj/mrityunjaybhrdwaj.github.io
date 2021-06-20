---
layout: post 
title : Linear Regression
tags  : [ML,AI,supervised, linear, linear Regression ]
title-seprator: "|"
categories: Machine Learning
permalink: /:categories/:title.html
mathjax: true
author: Mrityunjay
img: /posts_imgs/linearRegression/teaser/linearRegression.png
viz: linearRegression/index.html
---

## Um, what am i looking at?

This is a simple linear regression which tries to fit the best possible line from the given data points.

Just tap on the grid(Data Space) to add a new data points ( you can also drag the data points by click and drag),  play with the controls on the right and hit recalculate!

At each step, we calculate the gradients and update our parameters (which in this case is weights and biases) using stochastic gradient descent.

## But, What is a Linear Regression?

### Source: [ELI5: Linear regression, what is it an dhow do they do it ?](https://www.reddit.com/r/explainlikeimfive/comments/16xlsd/eli5_linear_regression_what_is_it_an_dhow_do_they/)

When you have 2 variables, an independent variable (lets call it X) and the dependent variable (lets call it Y). Linear regression is a test to do 2 things:

   * To see how closely related are these two variables. Basically applying linear regression gives us a number between -1 and 1 that gives us an indication of the the strength of correlation between the two. 0 means they aren't related. 1 means they are positively correlated (an increase in X means an increase in Y). -1 means negatively correlated (increase in X means a decrease in Y and vice versa).

   * We can use linear regression for prediction. If we know the rough relationship between X and Y, then we can use this relationship to predict values of Y for a value of X we want.

For example: Lets say X is the number of workers in a painting job and Y is the amount of time needed to finish a job. You do several jobs with different numbers of workers and you time how much it takes to finish each job.

We put those pretty numbers in a graph and do a simple linear regression and we learn 2 things: Does increasing the number of workers really decrease the time needed to finish a job? (i.e. are they correlated and how much). Second, if we get a customer who wants the job done in a very short time, then we can use our study to predict how many workers it might need to finish it.

from [Maqda7](https://www.reddit.com/user/Maqda7/)

## Hyperparameters:

epoch: for how long should we run the gradient descent iteraction.

Learning rate: how much we scale our gradient at each time step to correct our model.

## Further reading:
[Wiki: Linear Regression](https://en.m.wikipedia.org/wiki/Linear_regression#:~:text=In%20statistics%2C%20linear%20regression%20is,as%20dependent%20and%20independent%20variables.&text=Such%20models%20are%20called%20linear%20models.)

[StatQuest: Linear Regression](https://youtu.be/nk2CQITm_eo)

