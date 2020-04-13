let mhp = 0;// my hyperplane

let origin_selected = 0;
const canvasDiv = document.getElementById("fit_hyperplane_yourself_0");
const pwidth = canvasDiv.offsetWidth;


let ptsArray = [];
let ptsArray2 = [];

let rndSeed = 1;
let accuracy = 0;
let wakeUpTime = 1;

let isCanvasSleeping = false;

var sketch1 = function(p){

    console.log("inside sketch1")
    p.setup = function(){
        var canvas = p.createCanvas(pwidth,400);
        canvas.parent("#fit_hyperplane_yourself_0");

        // init hyperplane
        mhp = new hplane(p,{x:p.width/2,y:p.height*.9});

        rnd_pts(p,
            400,
            {x: p.width*0.4,y:p.height*0.3},
            {x: p.width*0.26,y:p.height*0.35},
            ptsArray
        );
        rnd_pts(p,
            400,
            {x: p.width*0.62,y:p.height*0.76},
            {x: p.width*0.49,y:p.height*0.90},
            ptsArray2
        );

        accuracy =  (1-classifyArray(p,mhp.rotation,mhp.pos.y,ptsArray2) + classifyArray(p,mhp.rotation,mhp.pos.y,ptsArray,1))/2;

        // console.log(ptsArray)

    }

    p.draw = function(){
        p.background(260);

        // team blue
        p.push();
        for(let i=0;i<ptsArray.length;i++){
            p.fill(51, 153, 255)
            let cpt = ptsArray[i];
            let m = ( - mhp.rotation);
            let c1 = mhp.pos.y - Math.cos(mhp.rotation)*mhp.margin;
            let c2 = mhp.pos.y + Math.cos(mhp.rotation)*mhp.margin;
            let lpt = (mhp.apos.x-cpt.pos.x)*m;

            // cpt.is_sv = 0;
            if(false){

                if(Math.abs((lpt+(c1)) - cpt.pos.y ) < 10){
                    cpt.is_sv = 1;
                }
                if(Math.abs((lpt+(c2)) - cpt.pos.y ) < 10){
                    cpt.is_sv = 1;
                }
            }
            ptsArray[i].display();
        }
        p.pop();

        // team red 
        p.push();
        for(let i=0;i<ptsArray2.length;i++){
            p.fill(255, 153, 51)
            let cpt = ptsArray2[i];
            let m = ( - mhp.rotation);
            let c1 = mhp.pos.y - Math.cos(mhp.rotation)*mhp.margin;
            let c2 = mhp.pos.y + Math.cos(mhp.rotation)*mhp.margin;
            let lpt = (mhp.apos.x-cpt.pos.x)*m;

            // cpt.is_sv = 0;
            if(false){

                if(Math.abs((lpt+(c1)) - cpt.pos.y ) < 10){
                    cpt.is_sv = 1;
                }
                if(Math.abs((lpt+(c2)) - cpt.pos.y ) < 10){
                    cpt.is_sv = 1;
                }
            }
            ptsArray2[i].display();


        }
        p.pop();

        p.textSize(20);
        p.text("accuracy: "+accuracy.toFixed(5)*100+"%", 10, 20);
        // mhp.update();
        mhp.display();

        let distx = (mhp.pos.x-p.mouseX);
        let disty = (mhp.pos.y-p.mouseY);
        let dist  = Math.sqrt(distx**2 + disty**2);

        if (dist <20)
        {
            // origin_selected = 1;
            mhp.orad = 20;
        }else {mhp.orad = 10;}


        // if the sketch is running for 30 seconds then put it to sleep

        if((p.frameCount % 60 === 0) ){
            console.log("wakeUpTime: "+ wakeUpTime);
            wakeUpTime++;

            if (wakeUpTime > 10){
            console.log("putting our sketch to sleep"+ wakeUpTime)
            isCanvasSleeping = true;
            wakeUpTime = 1;
            
            p.noLoop();

            }
        }
    }

    p.mouseClicked = function(){ 


        if(origin_selected){
            origin_selected = 0;
            mhp.orad = 10;

            // restart the canvas if it is sleeping
            if (isCanvasSleeping)p.loop();
            // resetting wake up time
            wakeUpTime = 1;
        }


    }

    p.mousePressed = function(){

        

        let distx = (mhp.pos.x-p.mouseX);
        let disty = (mhp.pos.y-p.mouseY);
        let dist  = Math.sqrt(distx**2 + disty**2);
        if (dist < 20)
        {
            // restart the canvas if it is sleeping
            if (isCanvasSleeping)p.loop();

            origin_selected = 1;
            mhp.orad = 20;

            // resetting wake up time
            wakeUpTime = 1;
        }

    }

    p.mouseDragged = function(){


        if( p.mouseX < p.width && p.mouseY < p.height && p.mouseX > 0 && p.mouseY > 0){

            if (!origin_selected){

                
                mhp.update_rot();
                // mhp.update_margin();

                // console.log("classify from blue",classify(mhp.rotation,mhp.pos.y,ptsArray[1].pos.x,ptsArray[1].pos.y));
            }
            else{
                mhp.pos.y = p.mouseY;

            }

            // restart the canvas if it is sleeping
            if (isCanvasSleeping)p.loop();

            // resetting wake up time
            wakeUpTime = 1;

        }

            // accuracy = classifyArray(p,mhp.rotation, mhp.pos.y,ptsArray)
        accuracy =  (1-classifyArray(p,mhp.rotation,mhp.pos.y,ptsArray2) + classifyArray(p,mhp.rotation,mhp.pos.y,ptsArray,1))/2;

    }

    p.windowResized = function(){
        p.resizeCanvas(canvasDiv.offsetWidth,400);
    }

}

function pts(p,pos){
    this.pos   = pos;
    this.size  = 10;
    this.is_sv = 0;// is this point a support vector??
    this.mc    = 0;// miss classified

    this.display = function(){
        // p.stroke(this.color);

        if (this.is_sv){// for support vectors
            p.fill(0);
            p.ellipse(this.pos.x,this.pos.y,this.size,this.size);

            let radFac = 2.0;
            p.noFill();
            p.stroke(0);
            p.ellipse(this.pos.x,this.pos.y,this.size*radFac,this.size*radFac);

            p.fill(0);
        }
        else{
            if(this.mc){// for Miss-Classificed pts 
                p.textSize(15);
                p.fill(85);    
                p.text("X",this.pos.x,this.pos.y);
                p.strokeWeight(1);
            }
            else{
                p.noStroke();
                p.ellipse(this.pos.x,this.pos.y,this.size,this.size);
            }
        }
    }
}

function rnd_pts(p,nps,pos1,pos2,ptarr){

    
    p.randomGaussian()*p.width;
// (p.width*.4,p.height*.3)
    for(let i=0;i<nps*.7;i++){
        let npos = {x: Math.floor(p.randomGaussian()*(32) + pos1.x),
                    y: Math.floor(p.randomGaussian()*(32) + pos1.y)}

            ptarr.push(new pts(p,npos))


    }

    for(let i=0;i<nps*.3;i++){
        let npos = {x: Math.floor(p.randomGaussian()*(40) + pos2.x),
                    y: Math.floor(p.randomGaussian()*(20) + pos2.y)}

            ptarr.push(new pts(p,npos))
    }
}


function bgrid(p) {
    let th       = [10, 10];
    let gridsize = [p.width / th[0], p.height / th[1]];

    p.stroke(070, 160, 270, 080);

    p.strokeWeight(1);
    for (let i = 1; i < th[1] && i < th[0]; i++) {
        p.line(0, i * gridsize[1], p.width, i * gridsize[1]);

        // if (i < p.height/gridsize[1])
        p.line(i * gridsize[0], 0, i * gridsize[0], p.height);
    }
    p.stroke(0);
    p.strokeWeight(1);

    th = [20, 20];
    gridsize = [p.width / th[0], p.height / th[1]];

    p.stroke(070, 160, 270, 50);
    p.strokeWeight(1);
    for (let i = 1; i < th[1] && i < th[0]; i++) {
        p.line(0, i * gridsize[1], p.width, i * gridsize[1]);

        // if (i < p.height/gridsize[1])
        p.line(i * gridsize[0], 0, i * gridsize[0], p.height);
    }
    p.stroke(0);
    p.strokeWeight(1);
}

function findsupportvectors(p,ppos,dbpos,mlen){

    let dx = (ppos.x-(dbpos.x-mlen))
    let dy = (ppos.y - (dbpos.y-mlen))
    let dist = Math.sqrt(dx**2,dy**2);

    let threshold = 30;

    if(dist < threshold)
        return true;

    return false
}

function classifyArray(p,w,b,Array,yn=0){
    let rf = 0;
    // w = 0*Math.PI/4;
    // b =500;
    for(let i=0;i<Array.length;i++){
        let curr_pt = Array[i];
        let x = curr_pt.pos.x;
        let y = curr_pt.pos.y;
        let y_hat_o = w*Math.abs(x-p.height)+b ;
        // let y_hat = ( w*(x)+b > 0)? 1:0;
        y_hat = ( ((w)*( x - mhp.pos.x))+b > (y))? 1:0;

        curr_pt.mc = false;
        if(Math.abs(yn-y_hat))curr_pt.mc = true;
        // console.log("yprid:",y_hat_o," y:",y)
        rf += y_hat
    }

    // console.log("accuracy:",w,b,(rf/Array.length));

    let acc = (rf/Array.length)
    return acc;
}
function hplane(p,poz,sm=0){
    this.pos = {x: poz.x*1,y:poz.y};
    this.rotation = 0;
    this.len = p.width*2;
    this.margin = 50;
    this.apos = {x:0,y:0};
    this.orad = 10;
    this.show_margin = sm;

    this.update_rot = function(){
        
        let nrot = -Math.atan2(this.pos.x - p.mouseX,this.pos.y - p.mouseY)
        if( -Math.PI/2 < nrot && nrot < Math.PI/2)
            this.rotation = nrot;        
    }

    this.update_margin = function (){

        this.margin = (p.mouseX - this.pos.x)/Math.sin(this.rotation);
    }
    
    this.update = function(){
        // this.update_rot();

        this.apos.x = this.pos.x + Math.sin(this.rotation)*this.margin;
        this.apos.y = this.pos.y - Math.cos(this.rotation)*this.margin;

    }
    this.display = function(){
        p.strokeWeight(2);

        let dist = this.margin;
        let tlen = 20;
        p.push();
        p.translate(this.pos.x,this.pos.y);
        p.rotate(this.rotation);

        // theta and theta_0 

        // main-db
        p.strokeWeight(5);
        p.stroke(20);
        p.line(-this.len/2,0,this.len/2,0);

        // db-normal gizmo 
        // p.stroke(251, 29, 255);
        p.fill(251, 29, 255);
        p.fill(0)
        p.line(0,0,0,-dist);
        p.push(); 
        p.translate(0,-(dist-tlen/2));
        p.triangle(-tlen/2,0,tlen/2,0,0,-tlen/2)
        p.pop();
        // p.stroke(251, 29, 255);
        // p.fill(251, 29, 255);
        p.ellipse(0,0,this.orad,this.orad);

        if(this.show_margin){
            p.strokeWeight(2);
            p.fill(0);
            p.stroke(180);

            // // margin -up
            p.line(-this.len/2,-dist,this.len/2,-dist);

            // margin -down
            p.line(-this.len/2,+dist,this.len/2,+dist);
        }

        
        p.pop();


    }
}

var hplane_sketch1 = new p5(sketch1); 

// var canvasDiv = document.getElementById("fit_hyperplane_yourself_0");
// var pwidth = canvasDiv.offsetWidth;
console.log("script loaded")