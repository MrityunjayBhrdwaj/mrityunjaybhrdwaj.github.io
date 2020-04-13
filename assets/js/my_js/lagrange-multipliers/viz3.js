// Creating Visualization 1

const contourSliderElement3 = document.getElementById("contourSlider3");
const contourValueElement3 = document.getElementById("contourValue3");
const winningOverlayElement2 = document.getElementById("winningOverlay2");

function constraint3d(x,y){

    // const retval = x.add(y).lessEqual(4.2).mul(1).mul(x.add(y).greaterEqual(3.0).mul(1));


    const retval = x.mul(3).add(y.mul(2)).sub(20);

    retval.print();
    const geq = retval.lessEqual(1)
    const leq = retval.greaterEqual(-1)

    const total = geq.mul(1).mul(leq.mul(1));
    total.dtype ="bool";
    return total;
}

let constraintMask2D = constraint3d(x1_3,x2_3).reshape([x_3.shape[0], x_3.shape[1]]);

let x_3Feasible = 0;
let y_3Feasible = 0;

let data_3A = [];

tf.booleanMaskAsync(x_3, constraintMask2D).then(
    function(v){
        x_3Feasible = v;

        const x1_3Feasible = x_3Feasible.slice([0,0],[-1,1]);
        const x2_3Feasible = x_3Feasible.slice([0,1],[-1,1]);

        console.log(x1_3Feasible.shape, x2_3Feasible.shape);
        y_3Feasible = function3d(x1_3Feasible, x2_3Feasible);
   
        y_3Feasible.print();
        const x1_3FeasibleArray = x1_3Feasible.flatten().arraySync();
        const x2_3FeasibleArray = x2_3Feasible.flatten().arraySync();
        const y_3FeasibleArray  = y_3Feasible.flatten().arraySync();

        console.log(x1_3Feasible.shape, 
                    y_3Feasible.shape);

        data_3.push(
            {
                x : x1_3FeasibleArray,
                y : x2_3FeasibleArray,
                z : y_3FeasibleArray,
                type: 'mesh3d',
                name: 'f(feasible points)',
                color:'orange',

            }
        );

        data_3.push(
            {
                x : x1_3FeasibleArray,
                y : x2_3FeasibleArray,
                z : tf.zeros([x_3Feasible.shape[0],1]).flatten().arraySync(),
                type: 'mesh3d',
                name: 'feasible points',
                hoverinfo: 'skip',
                color:'orange',
            }
        );

        data_3A = [data_3[0],data_3[1],data_3[2]];

        Plotly.newPlot('viz4Sketch',data_3A,layout_3)

        // resetting the layout_3 dimensions to 400
        layout_3.width=400;
        layout_3.height=400;

        data_3.push(
            {
                x : [tf.min(x1_3).flatten().arraySync()[0], tf.min(x1_3).flatten().arraySync()[0], tf.max(x1_3).flatten().arraySync()[0], tf.max(x1_3).flatten().arraySync()[0]],
                y : [tf.min(x2_3).flatten().arraySync()[0], tf.max(x2_3).flatten().arraySync()[0], tf.min(x2_3).flatten().arraySync()[0], tf.max(x2_3).flatten().arraySync()[0]],
                z : tf.ones([4,1]).mul(10).flatten().arraySync(),
                type: 'mesh3d',
                opacity: 0.4,
                name: 'contour plane'
            }

        )

        data_3.push(
            {x: [],y: [],z:[], type:'mesh3d'}
        )

        data_3.push(
            {x: [],y: [],z:[], type:'mesh3d'}
        )

        data_3.push(
            {x: [0],y: [0],z:[0],name: 'Global Minimum Point', type:'scatter3d', marker: {color: 'green'}}
        )


            
        console.log("newPlot created");
        Plotly.newPlot('viz3Sketch',data_3,layout_3)
    }
)

// updating the sketch everytime our contour line changes
async function updateSketch3(sliderValue, intersectionPoints){



    // here, we want our contour line to obey our constraints as well
    // let contour =   tf.min(y_3).mul(1-(sliderValue/100))
    //                   .add(tf.max(y_3).div(2).mul(sliderValue/100));
    
    let contour = tf.tensor(contourRange.min+(sliderValue/100)*contourRange.max)

    // if ((contour.flatten().arraySync()[0] - 30.7692)< 0.1)

    // contour = contour.clipByValue(0,5); // its not a generalized solution but its enough for what we want to convay through this visualization

    // updated data array
    data_3[3] = {
            x : [tf.min(x1_3).flatten().arraySync()[0], tf.min(x1_3).flatten().arraySync()[0], tf.max(x1_3).flatten().arraySync()[0], tf.max(x1_3).flatten().arraySync()[0]],
            y : [tf.min(x2_3).flatten().arraySync()[0], tf.max(x2_3).flatten().arraySync()[0], tf.min(x2_3).flatten().arraySync()[0], tf.max(x2_3).flatten().arraySync()[0]],
            z : tf.ones([4,1]).mul(contour).flatten().arraySync(),
            type: 'mesh3d',
            opacity: 0.4,
            name: 'contour plane'
        }

   
    data_3[4] = {
        x: [intersectionPoints[0][0],intersectionPoints[1][0] ],
        y: [intersectionPoints[0][1],intersectionPoints[1][1] ],
        z: [contour.flatten().arraySync()[0],contour.flatten().arraySync()[0]],
        name: 'contour feasible points',
        legendgroup: 'FeasiblePoints',
        type: 'scatter3d',
        mode: 'markers',
        marker: {
            color: 'gray'
        },

    }

    Plotly.react('viz3Sketch',data_3, layout_3);

    console.log("yes");

}

contourSliderElement3.addEventListener('change',() => {

    const sliderValue = contourSliderElement3.value;
    const currZValue = contourRange.min + (sliderValue/100)*contourRange.max;

    const intersectionPoints = getIntersectionPoints(a=3,b=2,c=-20,r=Math.sqrt(currZValue))

    updateSketch3(sliderValue, intersectionPoints)

})