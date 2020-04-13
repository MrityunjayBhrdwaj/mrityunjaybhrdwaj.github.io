function toggleDiv1Fn() {
  var x = document.getElementById("toggleDiv1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
} 
// let layout1Original = 0;
// let layout3Original = 0;
// let  winningOverlay1_margin = 0;
// let  winningOverlay2_margin = 0;
// let viz3ContainerStyle_padding = 0;
// let viz3ContainerStyle_margin = 0;
// let viz3ContainerStyle_marginRight = 0;
// let viz3ContainerStyle_height = 0;
// let viz2ControlsStyle_margin = 0;
// let viz2ControlsStyle_marginTop = 0;
// let viz2ControlsStyle_height = 0;
// let viz1ControlsStyle_margin = 0;
// let viz1ControlsStyle_marginTop = 0;
// let viz1ControlsStyle_height = 0;
// let slideContainer_width = 0;

const isFirst = 1;
function myFunction(x) {

  console.log("invoked")

  // TODO: for adapting size change...
// if (isFirst && (layout1 != undefined)){
//   layout1Original = Object.assign({}, layout1);
//   layout3Original = Object.assign({}, layout_3);

//   winningOverlay1_margin = winningOverlayElement1.style.margin;
//   winningOverlay2_margin = winningOverlayElement2.style.margin;

//   viz3ContainerStyle_padding = document.getElementById('viz3Container').style.padding;
//   viz3ContainerStyle_margin = document.getElementById('viz3Controls').style.margin;
//   viz3ContainerStyle_marginRight = document.getElementById('viz3Controls').style.marginRight;
//   viz3ContainerStyle_height = document.getElementById('viz3Controls').style.height;

//   viz2ControlsStyle_margin = document.getElementById('viz2Controls').style.margin;
//   viz2ControlsStyle_marginTop = document.getElementById('viz2Controls').style.marginTop;
//   viz2ControlsStyle_height = document.getElementById('viz2Controls').style.height;

//   viz1ControlsStyle_margin = document.getElementById('viz1Controls').style.margin;
//   viz1ControlsStyle_marginTop = document.getElementById('viz1Controls').style.marginTop;
//   viz1ControlsStyle_height = document.getElementById('viz1Controls').style.height;

      // slideContainer_width = document.getElementById('slidecontainer').style.width;

//   isFirst = 0;
// }




if (x.matches) { // If media query matches
    // document.body.style.backgroundColor = "yellow";

    // changing layout1 for mobile devices
    layout1.width = 400;
    layout1.height = 400;
    layout1.images = [];
    layout1.font.size = 14;
    layout1.xaxis.title.font.size = 16;
    layout1.yaxis.title.font.size = 16;

    // changing size of the viz4Sketch
    layout_3.width = 400;
    layout_3.height = 400;


    winningOverlayElement1.style.margin = "15% 20%";
    winningOverlayElement2.style.margin = "5% 20%";

    document.getElementById('viz3Container').style.padding = "0";
    document.getElementById('viz3Controls').style.margin = "0";
    document.getElementById('viz3Controls').style.marginRight = "1%";
    document.getElementById('viz3Controls').style.height = "750px";

    document.getElementById('viz2Controls').style.margin = "0";
    document.getElementById('viz2Controls').style.marginTop = "10%";
    document.getElementById('viz2Controls').style.height = "300px";

    document.getElementById('viz1Controls').style.margin = "0";
    document.getElementById('viz1Controls').style.marginTop = "10%";
    document.getElementById('viz1Controls').style.height = "300px";

    document.getElementsByClassName('slidecontainer')[0].style.width = "15px";
    document.getElementsByClassName('slidecontainer')[1].style.width = "15px";
    document.getElementsByClassName('slidecontainer')[2].style.width = "15px";

    document.getElementById("viz3").style.flexDirection = "column";


    // Updating all the plots
    Plotly.newPlot('viz4Sketch',data_3A,layout_3)
    Plotly.react('viz1Sketch',data1,layout1);

    updateSketch2(contourSliderElement2.value);
    Plotly.newPlot('viz5Sketch',data_2,layout1)

    document.getElementById('viz1Controls').style.height = "250px";
    document.getElementById('viz2Controls').style.height = "250px";

} else {

  // TODO: for adapting size change...
  // if (!isFirst){

  //   // reverting back the changes
  //   layout1 = layout1Original;
  //   layout_3 = layout3Original;

  //   Plotly.newPlot('viz4Sketch',data_3A,layout_3)

  //   Plotly.react('viz1Sketch',data1,layout1);

  //   document.getElementById('viz3Container').style.padding = viz3ContainerStyle_padding
  //   document.getElementById('viz3Controls').style.margin = viz3ContainerStyle_margin
  //   document.getElementById('viz3Controls').style.marginRight = viz3ContainerStyle_marginRight
  //   document.getElementById('viz3Controls').style.height = viz3ContainerStyle_height

  //   document.getElementById('viz2Controls').style.margin = viz2ControlsStyle_margin
  //   document.getElementById('viz2Controls').style.marginTop = viz2ControlsStyle_marginTop
  //   document.getElementById('viz2Controls').style.height = viz2ControlsStyle_height

  //   document.getElementById('viz1Controls').style.margin = viz1ControlsStyle_margin
  //   document.getElementById('viz1Controls').style.marginTop = viz1ControlsStyle_marginTop
  //   document.getElementById('viz1Controls').style.height = viz1ControlsStyle_height

  //   winningOverlayElement1.margin  = winningOverlay1_margin;
  //   winningOverlayElement2.margin  = winningOverlay2_margin;

  // }
}
}

var x = window.matchMedia("(max-width: 700px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes
















