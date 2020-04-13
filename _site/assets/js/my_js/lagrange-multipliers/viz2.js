// Creating Visualization 1

const contourSliderElement2 = document.getElementById("contourSlider2");
const contourValueElement2 = document.getElementById("contourValue2");
const winningOverlayElement1 = document.getElementById("winningOverlay1");

// applying objective function for our plot
// let x_2 = tf.linspace(0, 10,100);
let x_2 = x_1;
let y_2 = function1D(x_2); 

// applying constraints
const constraintMask1D = constraint1D(x_2);



let x_2Feasible = x_2;
let y_2Feasible = function1D(x_2Feasible);

x_2 = x_2.mul(17000).add(13000); 

// converting all the data to array
let x_2Array = x_2.flatten().arraySync();
let y_2Array = y_2.flatten().arraySync();

const data_2 = [
    {
        x : x_2Array,
        y : y_2Array,
        type: 'scatter',
        name: 'f(x)'

    },

];

let x_2FeasibleArray = 0;
let y_2FeasibleArray = 0;



tf.booleanMaskAsync(x_2, constraintMask1D).then(
    function(v){
        x_2Feasible = v
        y_2Feasible = y_2Feasible.slice([0],[v.shape[0]])

        
        x_2FeasibleArray = x_2Feasible.flatten().arraySync();
        y_2FeasibleArray = y_2Feasible.flatten().arraySync();

        data_2.push(
            {
                x : x_2FeasibleArray,
                y : y_2FeasibleArray,
                type: 'scatter',
                name: 'f(feasible points)',
                marker: {
                    color: 'orange'
                }

            }
        )

        data_2.push(
            {
                x : x_2FeasibleArray,
                y : tf.zeros(x_2Feasible.shape).flatten().arraySync(),
                type: 'scatter',
                name: 'feasible points',
                marker: {
                    color: 'orange'
                },
                hoverinfo:'skip'
            }
        )

    
        Plotly.newPlot('viz2Sketch',data_2,layout1)
        Plotly.newPlot('viz5Sketch',data_2,layout1)
    }
)






// updating the sketch everytime our contour line changes
function updateSketch2(sliderValue){



    // here, we want our contour line to obey our constraints as well
    let contour =   tf.min(y_2).mul(1-(sliderValue/100))
                      .add(tf.max(y_2).mul(sliderValue/100));

    if (Math.abs(contour.flatten().arraySync()[0] - 2.5) < 0.05){
        winningAudioElement.play();

        winningOverlayElement1.style.display = "block";
        setTimeout(() =>{
            winningOverlayElement1.style.display = "none";
        }, winningGifDuration)
    }

	contourValueElement2.innerHTML = contour.flatten().arraySync()[0].toFixed(1);

    const contourLine = tf.ones(x_2.shape).mul(contour);

    // converting all the data to array
    const contourLineArray = contourLine.flatten().arraySync();

    // creating updated data array
    const data = [
        {
            x : x_2Array.slice(x_2FeasibleArray.length -1),
            y : y_2Array.slice(x_2FeasibleArray.length -1),
            type: 'scatter',
            name: 'f(x)',


        },
        {
            x: x_2Array,
            y: contourLineArray,
            type: 'scatter',
            mode: 'line',
            name: 'contour line',
            marker: {
                color: 'red'
            }
        },
        {
            x : x_2FeasibleArray,
            y : y_2FeasibleArray,
            type: 'scatter',
            name: 'f(feasible points)',
            marker: {
                color: 'orange'
            },

        },
        {
            x : x_2FeasibleArray,
            y : tf.zeros(x_2Feasible.shape).flatten().arraySync(),
            type: 'scatter',
            name: 'feasible points',
            marker: {
                color: 'orange'
            },
            text: [''],
            hoverinfo:'skip'
        }

    ]

    Plotly.react('viz2Sketch',data, layout1)


}





// putting event listener for our contour line slider
contourSliderElement2.oninput = (a) =>{
    const sliderValue = contourSliderElement2.value;
    updateSketch2(sliderValue);
}

const contourRange = {min: 10, max: 100};