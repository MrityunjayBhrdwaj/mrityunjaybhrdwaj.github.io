/*
TODO:
* Continuously take the samples i.e, reload

Doing:
* visualize margin
* make the margin adaptive to theta

Done:
* Create 2 outlier points.
* place 2 lines onto those points
* Limit decision boundary b/w the 2 line outlier point lines. 

 */

let mhp_2  = 0;// my hyperplane
let margin = 30;

let origin_selected_2 = 0;
const canvasDiv_2 = document.getElementById("fit_hyperplane_yourself_1");
const pwidth_2    = canvasDiv_2.offsetWidth;
// const pwidth_2    = 400;

let ptsArray_2  = [];
let ptsArray2_2 = [];

let accuracy_2   = 0;
let accuracy_arr = [0];

let resample_count = 0;

let thisp;
let resetbtn;

let outlier_pts = [];

let centerpt_on_margin0;
let centerpt_on_margin1;

let margin_range;

function calc_y(p,m=1,x=1,c=0,is_angle){
    return (is_angle)?p.tan(m)*x+c : m*x+c;
}
function btn(p,x,y,ico) {
    this.pos = {x,y};
    this.icon = ico;
    this.display = function(){
        p.image(this.icon,this.pos.x,this.pos.y,50,50);
    }

}

function onclickreset(){
    let npt     = ptsArray.length;
    ptsArray_2  = [];
    ptsArray2_2 = [];

    outlier_pts = [new pts(thisp,{x: thisp.width/2 -20 + 2*thisp.random() ,y: thisp.height/2-10 + 5*thisp.random()}),new pts(thisp,{x: thisp.width/2 + 25 + 2*thisp.random() ,y: thisp.height/2 + 30+ 5*thisp.random()})]
    outlier_pts[0].is_sv = 1;
    outlier_pts[1].is_sv = 1;
    
    rnd_pts(thisp,
        npt,
        {x: thisp.width*0.4,y:thisp.height*0.3},
        {x: thisp.width*0.26,y:thisp.height*0.35},
        ptsArray_2 
    );
    rnd_pts(thisp,
        npt,
        {x: thisp.width*0.62,y:thisp.height*0.76},
        {x: thisp.width*0.49,y:thisp.height*0.90},
        ptsArray2_2 
    );
    accuracy_2 =  (1-classifyArray(thisp,mhp_2.rotation,mhp_2.pos.y,ptsArray2_2) + classifyArray(thisp,mhp_2.rotation,mhp_2.pos.y,ptsArray_2,1))/2;
    accuracy_arr.push(0);


}

function resample(p,npt,accuracy_arr){

    ptsArray_2 = []
    ptsArray2_2 = [];

    rnd_pts(p,
        npt,
        {x: p.width*0.4,y:p.height*0.3},
        {x: p.width*0.26,y:p.height*0.35},
        ptsArray_2
    );
    rnd_pts(p,
        npt,
        {x: p.width*0.62,y:p.height*0.76},
        {x: p.width*0.49,y:p.height*0.90},
        ptsArray2_2
    );
    // rsc++;
    accuracy_arr.push(0);
    p.textSize(20);
    accuracy_2 = (1-classifyArray(p,mhp_2.rotation,mhp_2.pos.y,ptsArray2_2) + classifyArray(p,mhp_2.rotation,mhp_2.pos.y,ptsArray_2,1))/2;
    p.text("accuracy: "+accuracy_2.toFixed(5)*100+"%", 10, 20);

}

function dottedlines(p,divisions=30,length){
    let gapSize  = 5;// in px
    let lineSize = length/divisions;

    let lastx = 0 
   for(let i=0;i<divisions;i++) {
    p.line(lastx+gapSize,0,lastx+lineSize,0);
    lastx = lastx+lineSize
   }
}


// function accuracy(accuracy_arr){
//     p.mean(accuracy_arr);
// }

var sketch2 = function(p){
    // p.randomSeed(rndSeed);
    thisp = p;
    console.log("inside sketch1")
    p.setup = function(){
        var canvas = p.createCanvas(pwidth_2,400);
        canvas.parent("#fit_hyperplane_yourself_1");

        // init hyperplane
        mhp_2 = new hplane(p,{x:p.width/2,y:p.height*.5},0);

        console.log("sdkfjldkf")
        rnd_pts(p,
            400,
            {x: p.width*0.4,y:p.height*0.3},
            {x: p.width*0.26,y:p.height*0.35},
            ptsArray_2
        );
        rnd_pts(p,
            400,
            {x: p.width*0.62,y:p.height*0.76},
            {x: p.width*0.49,y:p.height*0.90},
            ptsArray2_2
        );

        accuracy_2 =  (1-classifyArray(p,mhp_2.rotation,mhp_2.pos.y,ptsArray2_2) + classifyArray(p,mhp_2.rotation,mhp_2.pos.y,ptsArray_2,1))/2;


    outlier_pts = [new pts(thisp,{x: thisp.width/2 -20 + 2*thisp.random() ,y: thisp.height/2-10 + 5*thisp.random()}),new pts(thisp,{x: thisp.width/2 + 25 + 2*thisp.random() ,y: thisp.height/2 + 30+ 5*thisp.random()})]
        outlier_pts[0].is_sv = 1;
        outlier_pts[1].is_sv = 1;

        // console.log(ptsArray_2)
        mhp_2.rotation = -0.7;
    }

    p.draw = function(){
        p.background(260);

        // team blue
        p.push();
        for(let i=0;i<ptsArray_2.length;i++){
            p.fill(51, 153, 255)
            let cpt = ptsArray_2[i];
            let m = ( - mhp_2.rotation);
            let c1 = mhp_2.pos.y - Math.cos(mhp_2.rotation)*mhp_2.margin;
            let c2 = mhp_2.pos.y + Math.cos(mhp_2.rotation)*mhp_2.margin;
            let lpt = (mhp_2.apos.x-cpt.pos.x)*m;

            // cpt.is_sv = 0;
            if(false){

                if(Math.abs((lpt+(c1)) - cpt.pos.y ) < 10){
                    cpt.is_sv = 1;
                }
                if(Math.abs((lpt+(c2)) - cpt.pos.y ) < 10){
                    cpt.is_sv = 1;
                }
            }
            ptsArray_2[i].display();
        }
        p.pop();


        // team red 
        p.push();
        for(let i=0;i<ptsArray2_2.length;i++){
            p.fill(255, 153, 51)
            let cpt = ptsArray2_2[i];
            let m = ( - mhp_2.rotation);
            let c1 = mhp_2.pos.y - Math.cos(mhp_2.rotation)*mhp_2.margin;
            let c2 = mhp_2.pos.y + Math.cos(mhp_2.rotation)*mhp_2.margin;
            let lpt = (mhp_2.apos.x-cpt.pos.x)*m;

            // cpt.is_sv = 0;
            if(false){

                if(Math.abs((lpt+(c1)) - cpt.pos.y ) < 10){
                    cpt.is_sv = 1;
                }
                if(Math.abs((lpt+(c2)) - cpt.pos.y ) < 10){
                    cpt.is_sv = 1;
                }
            }
            ptsArray2_2[i].display();


        }
        p.pop();

        p.noStroke();

        p.textSize(20);
        p.text("accuracy: "+accuracy_2.toFixed(5)*100+"%", 10, 20);
        // mhp_2.update();
        mhp_2.display();

        let distx = (mhp_2.pos.x-p.mouseX);
        let disty = (mhp_2.pos.y-p.mouseY);
        let dist  = Math.sqrt(distx**2 + disty**2);

        centerpt_on_margin0 = {x: mhp_2.pos.x,   y: outlier_pts[0].pos.y + p.tan(mhp_2.rotation)*(p.abs(mhp_2.pos.x*1  - outlier_pts[0].pos.x))} 
        centerpt_on_margin1 = {x: mhp_2.pos.x,   y: outlier_pts[1].pos.y - p.tan(mhp_2.rotation)*(p.abs(mhp_2.pos.x*1  - outlier_pts[1].pos.x))} 

        if (dist < 20)
        {
            // origin_selected_2 = 1;
            mhp_2.orad = 20;
        }else {mhp_2.orad = 10;}

        let margin = 30;




        /* support -vector line 1*/
        p.push();

        p.translate(outlier_pts[0].pos.x,outlier_pts[0].pos.y);
        p.rotate(mhp_2.rotation);

        p.fill(0);
        p.stroke(100);
        
        p.translate(-400,0)
        dottedlines(p,70,800);
        // p.line(-p.width,0,p.width,0);

        p.pop();

        /* support-vector line 2 */
        p.push();

        p.translate(outlier_pts[1].pos.x,outlier_pts[1].pos.y);
        // p.translate(p.width/2,p.height/2);
        p.rotate(mhp_2.rotation);

        p.fill(0);
        p.stroke(100);
        
        p.translate(-400,0)
        dottedlines(p,70,800);
        // p.line(-p.width,0,p.width,0);
        // p.line(-p.width,0,p.width,0);
        // p.line(-p.width,-52,p.width,-52);

        p.pop();




        /* margins */
        p.push();

        let shift = -70;
        p.translate(mhp_2.pos.x,mhp_2.pos.y);
        p.rotate(mhp_2.rotation);


        let cval = mhp_2.pos.y;

        dist = p.dist(mhp_2.pos,outlier_pts[1].pos);
        let tlen = 15;

        p.fill(0);

        p.fill(251, 29, 255);
        p.fill(0);
        p.stroke(0);

        p.stroke((2*p.abs(0.5-margin_range))*300,(1-2*p.abs(0.5-margin_range))*300,0);// colors 

        p.strokeWeight(2);
        p.translate(shift,0);

        /* UPPER MARGIN */

        /* SPEARS */
        p.push(); 
        p.translate(shift+5,-(margin_range)*(55));
        p.translate(0,5)
        // p.line(-tlen/2,0,tlen/2,0)
        let fac = .4;
        p.line(tlen*fac,0,0,-tlen/2)
        p.line(0,-tlen/2,-tlen*fac,0)
        // p.triangle(-tlen/2,0,tlen/2,0,0,-tlen/2)
        p.pop();

        p.push(); 
        p.translate(shift+5,0);
        p.scale(-1);
        p.translate(0,8);
        // p.line(-tlen/2,0,tlen/2,0)
        p.line(tlen*fac,0,0,-tlen/2)
        p.line(0,-tlen/2,-tlen*fac,0)
        // p.triangle(-tlen/2,0,tlen/2,0,0,-tlen/2)
        p.pop();

        // upper margin
        p.line(shift+5,0,shift+5,-(margin_range)*(55));

        /* LOWER MARGIN */

        /* SPEARS */
        p.push(); 
        p.translate(shift,(1-margin_range)*(57));
        p.scale(-1);
        p.translate(0,5)
        // p.line(-tlen/2,0,tlen/2,0)
        // let fac = .4;
        p.line(tlen*fac,0,0,-tlen/2)
        p.line(0,-tlen/2,-tlen*fac,0)
        // p.triangle(-tlen/2,0,tlen/2,0,0,-tlen/2)
        p.pop();

        p.push(); 
        p.translate(shift,0);
        // p.scale(-1);
        p.translate(0,8);
        // p.line(-tlen/2,0,tlen/2,0)
        p.line(tlen*fac,0,0,-tlen/2)
        p.line(0,-tlen/2,-tlen*fac,0)
        // p.triangle(-tlen/2,0,tlen/2,0,0,-tlen/2)
        p.pop();


        // lower margin
        p.line(shift,0,shift,(1-margin_range)*(57));


        p.pop();

        p.push();
        p.translate(p.width/2,p.height/2);
        p.rotate(mhp_2.rotation);

        p.strokeWeight(1);
        p.text("margins",-280,-70);

        p.stroke(0);
        p.strokeWeight(2);
        p.line(-230,-60, p.map(margin_range,0,1,-140,-185)  ,p.map(margin_range,0,1,-19,10));
        p.line(-230,-60, p.map(margin_range,0,1,-145,-185)  ,p.map(margin_range,0,1,10,40));

        // adding spears to margin_1 arrow
        p.push(); 
        p.translate(p.map(margin_range,0,1,-140,-185)  ,p.map(margin_range,0,1,-19,10));
        p.rotate(p.map(margin_range,0,1,p.PI*.65,p.PI*.81))
        p.translate(0,5);
            p.line(tlen*fac,0,0,-tlen/2);
            p.line(0,-tlen/2,-tlen*fac,0);
        p.pop();


        // adding spears to margin_2 arrow
        p.push(); 
        p.translate(p.map(margin_range,0,1,-145,-185)  ,p.map(margin_range,0,1,10,40));
        p.rotate(p.map(margin_range,0,1,p.PI*.70,p.PI*.81))
        p.translate(0,5);
            p.line(tlen*fac,0,0,-tlen/2);
            p.line(0,-tlen/2,-tlen*fac,0);
        p.pop();

        p.pop();


        /* Support Vectors */
        p.fill(0);
        outlier_pts[0].display();
        outlier_pts[1].display();
            
        // let shift_startpt_1  = -74;
        // let shift_endpt_1    = p.abs(outlier_pts[0].pos.x-outlier_pts[1].pos.x)+shift_startpt_1*1.3;
        // let margin_endpt_1   = {x: outlier_pts[1].pos.x+shift_startpt_1, y: calc_y(p, mhp_2.rotation,shift_startpt_1,outlier_pts[1].pos.y,true)};
        // let margin_startpt_1 = {x: mhp_2.pos.x+shift_endpt_1, y: calc_y(p, mhp_2.rotation,shift_endpt_1,mhp_2.pos.y,true)};

        // let shift_startpt_2  = -74;
        // let shift_endpt_2    = p.abs(mhp_2.pos.x-outlier_pts[0].pos.x)+shift_startpt_2*1.3;
        // let margin_endpt_2   = {x: outlier_pts[0].pos.x+shift_startpt_2, y: calc_y(p, mhp_2.rotation,shift_startpt_2,outlier_pts[0].pos.y,true)};
        // let margin_startpt_2 = {x: mhp_2.pos.x+shift_endpt_2, y: calc_y(p, mhp_2.rotation,shift_endpt_2,mhp_2.pos.y,true)};

        // p.strokeWeight(6);
        // p.stroke(300,0,0);
        
        // // console.log("margin: ",margin_endpt_1,margin_startpt_1);
        // p.line(margin_startpt_1.x,margin_startpt_1.y,margin_endpt_1.x,margin_endpt_1.y);
        // p.line(margin_startpt_2.x,margin_startpt_2.y,margin_endpt_2.x,margin_endpt_2.y);
        // p.strokeWeight(2);

        // p.fill(300,00,0);

        // p.rect(outlier_pts[0].pos.x,outlier_pts[0].pos.y,-12,12);
        

        // p.rect(centerpt_on_margin0.x,centerpt_on_margin0.y,10,10);
        // p.rect(centerpt_on_margin1.x,centerpt_on_margin1.y,10,10);

        p.fill(0);

        // p.push();

        // p.translate(mhp_2.pos.x,mhp_2.pos.y);
        // p.rotate(mhp_2.rotation);
        // let x_hat = 0;
        // let y_hat = p.atan(mhp_2.rotation)* x_hat - 0.07*mhp_2.pos.y;
        // // p.translate(x_hat,y_hat)

        // p.fill(0);
        // p.stroke(200,100,100);
        
        // let w1 = 0;
        // let w2 = 0;

        // let shift_x = (mhp_2.pos.x - p.width);
        // let shift_y = -(mhp_2.pos.y - outlier_pts[1].pos.y);

        // p.line(0,0,0,1.2*shift_y);

        // p.pop();

        /* Viz-Margin */
        // p.strokeWeight(10) ;
        p.stroke(0);



    }

    p.mouseClicked = function(){ 
        if(origin_selected_2){
            origin_selected_2 = 0;
            mhp_2.orad = 10;
        }

        if( p.mouseX < p.width && p.mouseY < p.height && p.mouseX > 0 && p.mouseY > 0){
            if(resetbtn.pos.x < p.mouseX && p.mouseY < 50 ){
                resample(p,400,accuracy_arr);
                // window.alert("woohoo!!")
                p.draw();

            }
        }
    }

    p.mousePressed = function(){
        let distx = (mhp_2.pos.x-p.mouseX);
        let disty = (mhp_2.pos.y-p.mouseY);
        let dist  = Math.sqrt(distx**2 + disty**2);
        if (dist < 20)
        {
            origin_selected_2 = 1;
            mhp_2.orad = 20;
        }
    }

    p.mouseDragged = function(){

        if( p.mouseX < p.width && p.mouseY < p.height && p.mouseX > 0 && p.mouseY > 0){

        if (!origin_selected_2){

            
            // mhp_2.update_rot();
            // console.log("rot: "+p.degrees(mhp_2.rotation))
            // mhp_2.update_margin();

            // console.log("classify from blue",classify(mhp_2.rotation,mhp_2.pos.y,ptsArray_2[1].pos.x,ptsArray_2[1].pos.y));
        }
        else{
            margin_range = p.map(p.mouseY, centerpt_on_margin0.y, centerpt_on_margin1.y, 0 , 1);

            if(margin_range >= 0 && margin_range <= 1 ){
                    mhp_2.pos.y  = p.mouseY; 
                }
                else{
                    // snap to the margins if its out of bounds.
                    if (margin_range < 0)mhp_2.pos.y = centerpt_on_margin0.y;
                    if (margin_range > 1)mhp_2.pos.y = centerpt_on_margin1.y;
                }
            margin_range = p.map(mhp_2.pos.y, centerpt_on_margin0.y, centerpt_on_margin1.y, 0 , 1);


            // let m = (mhp.pos.y - outlier_pts[0].pos.y)/(mhp.pos.x - outlier_pts[0].pos.x)
            // console.log("m: "+ m+"rot: "+mhp.rotation)

        }
            }
            // accuracy_2 = classifyArray(p,mhp_2.rotation, mhp_2.pos.y,ptsArray_2)
        accuracy_2 =  (1-classifyArray(p,mhp_2.rotation,mhp_2.pos.y,ptsArray2_2) + classifyArray(p,mhp_2.rotation,mhp_2.pos.y,ptsArray_2,1))/2;

    }

    p.windowResized = function(){
        p.resizeCanvas(canvasDiv_2.offsetWidth,400);
    }

}

var hplane_sketch2 = new p5(sketch2); 

console.log("script loaded")