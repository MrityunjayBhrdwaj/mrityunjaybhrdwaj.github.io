// Creating Visualization 1

const contourSliderElement1 = document.getElementById("contourSlider1");
const contourValueElement1 = document.getElementById("contourValue1");
const winningAudioElement = document.getElementById("onWinningAudio");
const winningGifDuration = 7000;

let isFound = 0;

console.log("its working viz1");
// specifying our objective function
function function1D(x){
    // return x
    // return Math.sin(x+1)*0.2*Math.exp(0.2*x)+1.7
    const a = -5,b=.2,c=.2,d=1.7;
    return tf.sin(x.add(a)).mul(b).mul(tf.exp(x.mul(c))).add(d)
}

function constraint1D(x){
    return x.lessEqual(10)
}

// creating values for our plot
let x_1 = tf.linspace(0, 21,100);
let y_1 = function1D(x_1);

x_1 = x_1.mul(17000).add(13000); 

// feasible points


// converting all the data to array
let x_1Array = x_1.flatten().arraySync();
let y_1Array = y_1.flatten().arraySync();

x_1 = tf.linspace(0, 21,100);

let data1 = [
    {
        x : x_1Array,
        y : y_1Array,
        type: 'scatter',
        name: 'f(x)'

    },
]
let layout1 ={width:800, 
               height: 800,
            title: 'Car Plot' ,
            font: {
                family: 'Courier New, monospace',
                size: 24
            },

            xaxis:{
                color: 'rgb(100,0,100)',
                title: {
                    text: 'price ($)',
                    font: {
                        family: 'Courier New, monospace',
                        size: 25
                    },
                },
                fixedrange: true
            },
            yaxis:{
                color: 'rgb(0,200,0)',
                title: {
                    text: 'preference ',
                    font: {
                        family: 'Courier New, monospace',
                        size: 25,
                    }
                },
                fixedrange: true
            },
            showlegend: true,
            legend: {
                x: 0,
                xanchor: 'left',
                y: 1
            },
              images: [
                {
                x: -0.125,
                y: -0.12903225806451613,
                sizex: 1.25,
                sizey: 1.2903225806451613,
                source: "/assets/img/posts_imgs/lagrange-multipliers/carPlot.png",
                xanchor: "left",
                xref: "paper",
                yanchor: "bottom",
                yref: "paper",
                layer: "below",
                margin: 0,
                opacity: 0.7
                }
            ],
            } 


const config = {responsive: true}
// sizex,y: 1.0 x=80, y=100 width=640 height=620
// sizex = 1.25,sizey=1.29, x=80,y=-80, width=800,height=800
// 80 + 0.1*k = 144

Plotly.newPlot('viz1Sketch',data1,layout1, config)

// updating the sketch everytime our contour line changes
function updateSketch(sliderValue){

    const contour =   tf.min(y_1).mul(1-(sliderValue/100))
                      .add(tf.max(y_1).mul(sliderValue/100));

    const contourLine = tf.ones(x_1.shape).mul(contour);

    if (Math.abs(contour.flatten().arraySync()[0] - 11.1) < 0.05){
        winningAudioElement.play();
    }

    contourValueElement1.innerHTML = contour.flatten().arraySync()[0].toFixed(1);

    // converting all the data to array
    const contourLineArray = contourLine.flatten().arraySync();

    // creating updated data array
    const data1 = [
        {
            x : x_1Array,
            y : y_1Array,
            type: 'scatter',
            name: 'f(x)'

        },
        {
            x: x_1Array,
            y: contourLineArray,
            type: 'scatter',
            mode: 'line',
            name: 'contour line',
            marker:{
                color: 'red'
            }
        }
    ]

    Plotly.react('viz1Sketch',data1,layout1)


}



// putting event listener for our contour line slider
contourSliderElement1.oninput = (a) =>{
    const sliderValue = contourSliderElement1.value;
    updateSketch(sliderValue);
}
