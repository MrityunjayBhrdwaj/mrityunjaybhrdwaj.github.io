let mhp_2 = 0;// my hyperplane

let origin_selected_2 = 0;
const canvasDiv_2 = document.getElementById("fit_hyperplane_yourself_1");
const pwidth_2 = canvasDiv_2.offsetWidth;


let ptsArray_2 = [];
let ptsArray2_2 = [];

let accuracy_2 = 0;


var sketch2 = function(p){
    // p.randomSeed(rndSeed);

    console.log("inside sketch1")
    p.setup = function(){
        var canvas = p.createCanvas(pwidth_2,400);
        canvas.parent("#fit_hyperplane_yourself_1");

        // init hyperplane
        mhp_2 = new hplane(p,{x:p.width/2,y:p.height*.9},1);

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

        // console.log(ptsArray_2)
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

        p.textSize(20);
        p.text("accuracy: "+accuracy.toFixed(5)*100+"%", 10, 20);
        // mhp_2.update();
        mhp_2.display();

        let distx = (mhp_2.pos.x-p.mouseX);
        let disty = (mhp_2.pos.y-p.mouseY);
        let dist  = Math.sqrt(distx**2 + disty**2);

        if (dist <20)
        {
            // origin_selected_2 = 1;
            mhp_2.orad = 20;
        }else {mhp_2.orad = 10;}

    }

    p.mouseClicked = function(){ 
        if(origin_selected_2){
            origin_selected_2 = 0;
            mhp_2.orad = 10;
        }
    }

    p.mousePressed = function(){
        let distx = (mhp_2.pos.x-p.mouseX);
        let disty = (mhp_2.pos.y-p.mouseY);
        let dist  = Math.sqrt(distx**2 + disty**2);
        if (dist <20)
        {
            origin_selected_2 = 1;
            mhp_2.orad = 20;
        }
    }

    p.mouseDragged = function(){

        if( p.mouseX < p.width && p.mouseY < p.height && p.mouseX > 0 && p.mouseY > 0){

        if (!origin_selected_2){

            
            mhp_2.update_rot();
            mhp_2.update_margin();

            // console.log("classify from blue",classify(mhp_2.rotation,mhp_2.pos.y,ptsArray_2[1].pos.x,ptsArray_2[1].pos.y));
        }
        else{
            mhp_2.pos.y = p.mouseY;

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