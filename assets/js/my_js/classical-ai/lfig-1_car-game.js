
let map_dim = {w:100,h:100};

// images
let tilemap_alpha;
let tilemap;
let car_img;
let startMenu_img;
let startMenublind_img;
let redMarker_img;
let tilemapbild_alpha

let playdemo   = 0;
let markerAnim = 0;

const thisdiv     = document.getElementById("Lfig-1");
const thispwidth  = thisdiv.offsetWidth;

var sketch1 = function(p){

    let redcar;
    p.preload = function(){
        tilemap       = p.loadImage("../../../assets/img/posts_imgs/classical-ai/body/lfigs/Tile_map.png",function(){console.log("yey!")},function(){console.log("no!")});
        tilemap_alpha = p.loadImage("../../../assets/img/posts_imgs/classical-ai/body/lfigs/Tile_map_collision.png");
        tilemapblind_alpha = p.loadImage("../../../assets/img/posts_imgs/classical-ai/body/lfigs/Tile_map_collision_blind.png");
        car_img       = p.loadImage("../../../assets/img/posts_imgs/classical-ai/body/lfigs/c2.png");
        startMenu_img = p.loadImage("../../../assets/img/posts_imgs/classical-ai/body/lfigs/startMenu.jpg");
        startMenublind_img = p.loadImage("../../../assets/img/posts_imgs/classical-ai/body/lfigs/startMenu_blind.jpg");
        redMarker_img = p.loadImage("../../../assets/img/posts_imgs/classical-ai/body/lfigs/only_marker.png");
       }

    p.setup = function(){

        let cvs = p.createCanvas(400,400);
        cvs.parent("#Lfig-1");

        console.log("inside setup")
        redcar = new car(tilemap_alpha);


        p.noLoop();
    }

    p.draw = function(){
        p.background(100);

        if(playdemo){
            p.image(tilemap,0,0,400,400);
            
        }
        else{
            p.image(startMenu_img,0,0,400,400);
            return null;
        }

        if (redcar.reach_dest){
            menu(p);
        }

        else{

            if (p.keyIsDown(65)) {
                redcar.actions("left")
            }

            if (p.keyIsDown(68)) {
                redcar.actions("right")
            }

            if (p.keyIsDown(87)) {
                redcar.actions("up")
            }

            if (p.keyIsDown(83)) {
                redcar.actions("down")
            }



        }

        redcar.display(p,car_img);

        if(redcar.reach_dest ==0){

            destMarker(p,markerAnim,[345, 163],[10,30]);
            // destMarker(p,markerAnim,[145, 323],[10,30]);
            // p.image(redMarker_img,0,Math.floor(Math.sin(markerAnim)*10) -10 ,400,400);
            markerAnim += .05;

        }

    }

    p.windowResized = function(){
        p.resizeCanvas(400,400);
    }

    p.mouseClicked = function(){
        if(is_insideCanvas(p)){
            if(!playdemo){
                playdemo = 1;
                p.loop(); 
            }
            if( redcar.reach_dest){
                redcar.pos        = {x:70,y:70};
                redcar.reach_dest = false;
            }
        }
    }

}

function destMarker(p,theta,pos,radRange){

    p.noFill();
    p.strokeWeight(10);
    p.stroke(235,0,0);
    // p.stroke(255,0,0,Math.floor(Math.sin(markerAnim)*250) + (Math.floor((1-Math.sin(markerAnim))*150)));
    let radius = Math.floor(Math.sin(theta)*radRange[0]) + (Math.floor((1-Math.sin(theta))*radRange[1]));
    p.ellipse(pos[0],pos[1],radius,radius);

    p.noStroke();
    p.fill(255);

}

function menu(p){

    p.fill(80,120);
    p.rect(0,0,p.width,p.height);

    p.fill(250,255);
    p.textSize(20);
    p.text("Bravo!\n You Reached Your Destination\n \t\t\t\tTap to play again",Math.floor(p.width*.1),p.height/2);

}

function car(map){

    this.pos        = {x:75,y:70};
    this.rotation   = 0;
    this.stepsize   = 1;
    this.map        = map;
    this.reach_dest = 0;
    
    this.checkcollision = function(npos){
        let tpos = {x: Math.floor(((npos.x)**1)/(4)),y:Math.floor(((npos.y)**1)/(4))}; // in which tile he is at
        let mapindex = (tpos.x*map_dim.w + tpos.y);

        let tmapval =   Math.abs( this.map.get(tpos.x,tpos.y)[1]);
        // console.log(tpos,tmapval);

        if (tmapval){
            if( tmapval < 255)
                return 2;

            return 1;
        }
        
        return 0;
    }

    
    this.actions = function(dir){

        let newpos = {x: this.pos.x,y:this.pos.y};
        switch(dir){
            case("right"):
                newpos.x += this.stepsize;
                this.rotation =  Math.PI/2;
            break;

            case("left"):
                newpos.x -= this.stepsize;
                this.rotation = -Math.PI/2
            break;

            case("up"):
                newpos.y -= this.stepsize;
                this.rotation =  0;
            break;

           case("down"):
                newpos.y += this.stepsize;
                this.rotation =  Math.PI
            break;

            default:

            break;
        }

        let is_collided = this.checkcollision(newpos); // 0 = collided 1 = not collided 2 = destination

        if (is_collided){
            this.pos = newpos;

            
            if (is_collided == 2)
                this.reach_dest = 1;
                

        }
    }
    this.display = function(p,img){
        // console.log("inside car.display")
        p.push();
        p.translate(this.pos.x,this.pos.y);
        p.rotate(this.rotation);

        p.fill(100,200,100);
        // for image
        let img_fac = 0.7;
        let img_pos_fac   = 0.050*img_fac;
        let img_scale_fac = 0.1*img_fac;
        p.image(img,-img.width*img_pos_fac,-img.height*img_pos_fac,img.width*img_scale_fac,img.height*img_scale_fac);

        p.pop();

    }
}


let c1 = new p5(sketch1);