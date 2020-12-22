import LinearRegression from './Source/Linear-RegressionAsync.mjs';
import * as tfvis from './dependency/tensorflowJS/tfjs-vis.umd.min.js';
import { sortAB, darkModeCols, inputViz, linePlot } from './dependency/utils.mjs';

// TODO: add residuals visualization.
// TODO: add Pause/Play, restart and next step btn.
// TODO: Decide upon the design language like specify where the no. of epoch should go etc.

// DONE:
// fix useBias initialziation issue
// fix the styling of the learning rate and make it opertaional
// fix the frame of the data space the tail of the regression line is visible

const btnElem = document.getElementById('button');
const lossElem = document.getElementById('loss');
const metricElem = document.getElementById('metric');
const lrInputElem = document.getElementById('lrInput')
const lrSelectElem = document.getElementById('lrSelect');
const useBiasElem = document.getElementById('useBias');
const epochElem = document.getElementById('epoch');


/* Specifing the behaviour of UI elements */


btnElem.addEventListener('click', () => {
  console.log(modelParams);
  updateViz();
});


lrSelectElem.onchange = function(){
  lrInputElem.value = this.options[this.selectedIndex].value * 1;

  modelParams.learningRate = this.options[this.selectedIndex].value * 1;

  console.log('learningRateElemVal:- ', modelParams.learningRate);
}

lrInputElem.onchange = function () {
  modelParams.learningRate = this.value * 1;

  console.log('learningRateElemVal:- ', modelParams.learningRate );
};


useBiasElem.oninput = function () {

  modelParams.useBias = this.checked * 1;
  console.log(this.checked);
};

epochElem.oninput = function () {
  modelParams.nEpoch = this.value * 1;
};



const modelParams = {
  useBias: useBiasElem.checked * 1,
  nEpoch: epochElem.value * 1,
  threshold: 0.01,
  learningRate: lrInputElem.value * 1,
};

/* Visualizing */

// input viz
const inputVizObj = inputViz(
  '#inputSpaceViz',
  {
    width: 1050,
    height: 550,
    gridIntervel: { x: 16, y: 8 },
    rangeX: { min: -5, max: 5 },
    rangeY: { min: -2, max: 2 },
    margin: { top: 5, bottom: 10, left: 25, right: 10 },
  },
  true /* spawn points on click */
);
const svg = inputVizObj.svg;
svg.style('color', 'white');

// styling the frame
inputVizObj.frame.style('fill', '#eee');

// fetching the data points group
const dataPointsGrp = inputVizObj.dataPointsGrp;

// creating group for regression line
const afterGridSpace = inputVizObj.spaces.afterGridSpace;
const regLineGrp = afterGridSpace.append('g').attr('class', 'regressionLine');

// fetching important info from inputVizObj
const xScale = inputVizObj.conversionFns.x;
const yScale = inputVizObj.conversionFns.y;
const xInvScale = inputVizObj.conversionFns.xInv;
const yInvScale = inputVizObj.conversionFns.yInv;

// init the model
let model = null;

// initializing the data Arrays
let trainX = null;
let trainY = null;
/**
 * Updating the visualization
 */
function updateViz() {
  let dataX = [];
  let dataY = [];

  const dataPts = dataPointsGrp._groups[0][0].childNodes;

  for (let i = 0; i < dataPts.length; i++) {
    dataX.push(xInvScale(dataPts[i].attributes.cx.value));
    dataY.push(yInvScale(dataPts[i].attributes.cy.value));
  }

  // sorting dataY realative to the sorted DataX
  [dataX, dataY] = sortAB(dataX, dataY);

  const nSamples = dataPts.length;
  trainX = tf.tensor(dataX).expandDims().transpose();
  trainY = tf.tensor(dataY).expandDims().transpose();

  console.log('modelParams', modelParams);

  model = new LinearRegression(
    modelParams,
    callback
  );


  // reinitializing for next episode
  lossArray = [];
  metricArray = [];

  model.fit(trainX, trainY);
}

let lossArray = [];
let metricArray = [];

/**
 * A callback function which gets invoked at the end of each epoch and update our visualization.
 * @param {number} epoch current Epoch of our training loop
 * @param {number} cLoss current loss
 * @param {tf.tensor} cWeights current weight tensor
 * @param {tf.tensor} yPred current predicted output
 * @return {Promise} returns a promise which resolves only when all the visualizations are being updated.
 */
function callback(epoch, cLoss, cWeights, yPred) {
  return new Promise((resolve, reject) => {
    // calculating our predicted y
    const domainPoints = tf.linspace(-5, 5, 100).expandDims().transpose();
    const domainPredY = model.test(domainPoints);

    /* updating our input space visualzer */

    // preparing our regression line data
    const regLineData = domainPredY
      .flatten()
      .arraySync()
      .map((y, i) => {
        return { x: domainPoints.flatten().arraySync()[i], y: y };
      });

    // updating our visualizer
    const regLineSelect = regLineGrp.selectAll('path');
    regLineSelect
      .data([regLineData])
      .enter()
      .append('path')
      .merge(regLineSelect)
      .transition()
      .duration(10)
      .ease(d3.easeCubic)
      .attr(
        'd',
        d3
          .line()
          .x(function (d) {
            return xScale(d.x);
          })
          .y(function (d) {
            return yScale(d.y);
          })
          .curve(d3.curveCardinal)
      )
      .attr('fill', 'none')
      .attr('stroke', darkModeCols.red(1.0))
      .attr('stroke-width', 2.5)
      .on('end', resolve);

    /* visualizing the loss */

    // adding the current loss to our loss array
    lossArray.push(cLoss);

    // logging our current loss
    lossElem.innerHTML = `Epoch: ${epoch - 1}`;

    // using tfvis to visualizing our loss trajectory
    const data = {
      values: lossArray.map((val, i) => {
        return { x: i, y: val };
      }),
      series: ['loss'],
    };



    // const surface = document.querySelector('#lossViz');
    // window.tfvis.render.linechart(surface, data, { width: 250, height: 125 });

    // linePlot(surface, data, {width: 250, height: 125});

    const lViz = linePlot('#lossViz', data,
      {
        width: 250, 
        height: 125, 
        margin: {left: 10, right: 10, top: 10, bottom: 10},
        showAxis:false, 
        isFrame: false 
      }  
    )
    // lViz.frame.style('fill', '#eee')

  });
}


















