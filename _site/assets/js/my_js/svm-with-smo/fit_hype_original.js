let mhp_o = 0;// my hyperplane


var canvasDiv_2 = document.getElementById("fit_hyperplane_yourself_1");
var pwidth_2 = canvasDiv_2.offsetWidth;

function setup(){
    var canvas = createCanvas(pwidth_2,400);
    canvas.parent('fit_hyperplane_yourself_1');
    
    mhp_o = new hplane_2({x:width/2,y:height/2});
 
    rnd_pts_2(
        400,
        {x: width*0.4,y:height*0.3},
        {x: width*0.26,y:height*0.35},
        ptsArray_2
    );
    rnd_pts_2(
        400,
        {x: width*0.62,y:height*0.76},
        {x: width*0.49,y:height*0.90},
        ptsArray2_2
    );

    console.log(ptsArray_2)
}
function createdottedline(p1,p2){

    // for(let i=0;i<10;i++){
            
    // }
}

let origin_selected_2 = 0;
function draw(){
    background(260);

    // team blue
    push();
    for(let i=0;i<ptsArray_2.length;i++){
        fill(51, 153, 255)
        let cpt = ptsArray_2[i];
        let m = ( - mhp_o.rotation);
        let c1 = mhp_o.pos.y - Math.cos(mhp_o.rotation)*mhp_o.margin;
        let c2 = mhp_o.pos.y + Math.cos(mhp_o.rotation)*mhp_o.margin;
        let lpt = (mhp_o.apos.x-cpt.pos.x)*m;

        cpt.is_sv = 0;
        if(Math.abs((lpt+(c1)) - cpt.pos.y ) < 10){
            cpt.is_sv = 1;
        }
        if(Math.abs((lpt+(c2)) - cpt.pos.y ) < 10){
            cpt.is_sv = 1;
        }
        ptsArray_2[i].display();
    }
    pop();

    // team red 
    push();
    for(let i=0;i<ptsArray2_2.length;i++){
        fill(255, 153, 51)
        let cpt = ptsArray2_2[i];
        let m = ( - mhp_o.rotation);
        let c1 = mhp_o.pos.y - Math.cos(mhp_o.rotation)*mhp_o.margin;
        let c2 = mhp_o.pos.y + Math.cos(mhp_o.rotation)*mhp_o.margin;
        let lpt = (mhp_o.apos.x-cpt.pos.x)*m;

        cpt.is_sv = 0;
        if(Math.abs((lpt+(c1)) - cpt.pos.y ) < 10){
            cpt.is_sv = 1;
        }
        if(Math.abs((lpt+(c2)) - cpt.pos.y ) < 10){
            cpt.is_sv = 1;
        }
        ptsArray2_2[i].display();
    }
    pop();


    mhp_o.update();
    mhp_o.display();

    let distx = (mhp_o.pos.x-mouseX);
    let disty = (mhp_o.pos.y-mouseY);
    let dist  = Math.sqrt(distx**2 + disty**2);

    if (dist <20)
    {
        // origin_selected_2 = 1;
        mhp_o.orad = 20;
    }else {mhp_o.orad = 10;}

}
function mouseClicked(){ 
    if(origin_selected_2){
        origin_selected_2 = 0;
        mhp_o.orad = 10;
    }
}

function mousePressed(){
    let distx = (mhp_o.pos.x-mouseX);
    let disty = (mhp_o.pos.y-mouseY);
    let dist  = Math.sqrt(distx**2 + disty**2);
    if (dist <20)
    {
        origin_selected_2 = 1;
        mhp_o.orad = 20;
    }
}

function mouseDragged(){

    if(mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0){

    if (!origin_selected_2){

        
        mhp_o.update_rot();
        mhp_o.update_margin();

    }
    else{
        mhp_o.pos = {x:mouseX,y:mouseY};

    }
        }


}

function windowResized() {
  resizeCanvas(canvasDiv_2.offsetWidth,400);
}


function pts_2(npos){
    this.pos  = npos;
    this.size = 10;
    this.is_sv= 0;// is this point a support vector??
    this.color = color(100,100,100 )

    this.display = function(){
        // stroke(this.color);

        if (this.is_sv){
            noFill();
            stroke(0);
            // stroke(0);
            ellipse(this.pos.x,this.pos.y,this.size,this.size);
        }
        else{
            noStroke();
            ellipse(this.pos.x,this.pos.y,this.size,this.size);
        }
    }
}

let ptsArray_2 = [];
let ptsArray2_2 = [];

function rnd_pts_2(nps,pos1,pos2,ptarr){

    randomGaussian()*width;
// (width*.4,height*.3)
    for(let i=0;i<nps*.7;i++){
        let npos = {x: Math.floor(randomGaussian()*(40)+pos1.x),
                    y: Math.floor(randomGaussian()*40 +pos1.y )}

            ptarr.push(new pts_2(npos))


    }

    for(let i=0;i<nps*.3;i++){
        let npos = {x: Math.floor(randomGaussian()*(40) + pos2.x),
                    y: Math.floor(randomGaussian()*20   +  pos2.y)}

            ptarr.push(new pts_2(npos))
    }
}


function bgrid_2() {
    let th       = [10, 10];
    let gridsize = [width / th[0], height / th[1]];

    stroke(070, 160, 270, 080);

    strokeWeight(1);
    for (let i = 1; i < th[1] && i < th[0]; i++) {
        line(0, i * gridsize[1], width, i * gridsize[1]);

        // if (i < height/gridsize[1])
        line(i * gridsize[0], 0, i * gridsize[0], height);
    }
    stroke(0);
    strokeWeight(1);

    th = [20, 20];
    gridsize = [width / th[0], height / th[1]];

    stroke(070, 160, 270, 50);
    strokeWeight(1);
    for (let i = 1; i < th[1] && i < th[0]; i++) {
        line(0, i * gridsize[1], width, i * gridsize[1]);

        // if (i < height/gridsize[1])
        line(i * gridsize[0], 0, i * gridsize[0], height);
    }
    stroke(0);
    strokeWeight(1);
}
function findsupportvectors_2(ppos,dbpos,mlen){

    let dx = (ppos.x-(dbpos.x-mlen))
    let dy = (ppos.y - (dbpos.y-mlen))
    let dist = Math.sqrt(dx**2,dy**2);

    let threshold = 30;

    if(dist < threshold)
        return true;

    return false
}
function hplane_2(poz){
    this.pos = {x: poz.x,y:poz.y};
    this.rotation = 0;
    this.len = width*2;
    this.margin = 30;
    this.apos = {x:0,y:0};
    this.orad = 10;

    this.update_rot = function(){
        
        this.rotation = -Math.atan2(this.pos.x - mouseX,this.pos.y - mouseY)
    }

    this.update_margin = function (nm){
        // this.margin = nm;
        // let distx   = (this.pos.x-mouseX);
        // let disty   = (this.pos.y-mouseY);
        // let dist    = Math.sqrt(distx**2 + disty**2);

        // this.apos.x = 2;

        this.margin = (mouseX - this.pos.x)/Math.sin(this.rotation);
    }
    
    this.update = function(){
        // this.update_rot();

        this.apos.x = this.pos.x + Math.sin(this.rotation)*this.margin;
        this.apos.y = this.pos.y - Math.cos(this.rotation)*this.margin;

    }
    this.display = function(){
        strokeWeight(2);

        let dist = this.margin;
        let tlen = 20;
        push();
        translate(this.pos.x,this.pos.y);
        rotate(this.rotation);



        fill(0);
        stroke(180);
        line(-this.len/2,-dist,this.len/2,-dist);

        strokeWeight(5);
        stroke(20);
        line(-this.len/2,0,this.len/2,0);
        stroke(251, 29, 255);
        fill(251, 29, 255);
        line(0,0,0,-dist);
        
        push(); 
        translate(0,-(dist-tlen/2));
        triangle(-tlen/2,0,tlen/2,0,0,-tlen/2)
        pop();

        strokeWeight(2);
        stroke(180);
        line(-this.len/2,+dist,this.len/2,+dist);

        
        stroke(251, 29, 255);
        fill(251, 29, 255);
        ellipse(0,0,this.orad,this.orad);
        pop();


    }
}