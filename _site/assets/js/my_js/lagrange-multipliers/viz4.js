
// applying objective function for our plot
let x1_3 = tf.linspace(-10, 10,50);
let x2_3 = x1_3;

let x_3 = tf.tensor( meshGrid(x1_3.arraySync(), x2_3.arraySync()) );

x1_3 = x_3.reshape([x_3.shape[0]*x_3.shape[1], x_3.shape[2]]).slice([0,0],[-1,1]);
x2_3 = x_3.reshape([x_3.shape[0]*x_3.shape[1], x_3.shape[2]]).slice([0,1],[-1,1]);

function function3d(x, y){
    return x.pow(2).add(y.pow(2));
}

let y_3 = function3d(x1_3, x2_3).reshape([x_3.shape[0], x_3.shape[1]]);

// converting all the data to array
let x1_3Array = x1_3.flatten().arraySync();
let x2_3Array = x2_3.flatten().arraySync();
let y_3Array = y_3.reshape([x_3.shape[0]*x_3.shape[1],1]).flatten().arraySync();

const data_3 = [
    {
        x : x1_3Array,
        y : x2_3Array,
        z : y_3Array,
        type: 'mesh3d',
        name: 'f(x,y)'

    },

];
const layout_3 ={width:600, 
        height: 600,
        margin: {
            l: 1,
            r: 1,
            b: 10,
            t: 10,
            pad: 0
          }, 
        showlegend: true,
        legend: {
            x: 1,
            xanchor: 'right',
            y: 1
        },
        xaxis: {
            title: {
                text: 'x_1'
            }
        },
        yaxis: {
            title: {
                text: 'x_2'
            }
        }
    };
