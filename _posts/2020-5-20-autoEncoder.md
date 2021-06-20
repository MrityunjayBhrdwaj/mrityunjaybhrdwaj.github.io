---
layout: post 
title : AutoEncoder
tags  : [ML,AI,dimensionality-reduction,AE, supervised, neural-network, MNIST]
title-seprator: "|"
categories: Machine Learning
permalink: /:categories/:title.html
mathjax: true
author: Mrityunjay
img: /posts_imgs/AE/teaser/autoEncoder.png
viz: AE/index.html
---

## Um, what am i looking at?

This is a visualization of An Autoencoder, which tries to encode the inputs into a lower dimensional representation without sacrificing the reconstruction accuracy after decoding.

Here we are using a pretrained Autoencoder which is trained on MNIST Dataset. you can see how a particular image of 784 dim is being encoded in just 2-dim by clicking 'get random image' button.

you can also walk inside the latent space grid and see how that 2d purple point is being decoded as an image in the end by simply, dragging and dropping that point and seeing the magic ;).

## But, What is an Autoencoder?
from wiki:-

An autoencoder is a type of artificial neural network used to learn efficient data codings in an unsupervised manner. The aim of an autoencoder is to learn a representation (encoding) for a set of data, typically for dimensionality reduction, by training the network to ignore signal “noise”. Along with the reduction side, a reconstructing side is learnt, where the autoencoder tries to generate from the reduced encoding a representation as close as possible to its original input, hence its name. Several variants exist to the basic model, with the aim of forcing the learned representations of the input to assume useful properties.

## Further Reading

[Wiki: Autoencoder](https://en.wikipedia.org/wiki/Autoencoder)

[two minutes paper: What is an Autoencoder](https://www.youtube.com/watch?v=Rdpbnd0pCiI)