
let glayer_blind;
let glayer_menu; // menu
let playdemo_blind = 0;
let markerAnim_blind =0;
var sketch2 = function(p){
    let redcar;

    p.setup = function(){
        // console.log("done preloading",tilemap,tilemap_alpha,car_img);
        
        let cvs = p.createCanvas(400,400);
        cvs.parent("#Lfig-2");
        p.pixelDensity(1);

        console.log("inside setup",glayer_blind)
        redcar = new car(tilemapblind_alpha);


    }
    p.draw = function(){
        
        if(playdemo_blind == 1){
            p.background(100);
            p.image(tilemap,0,0,400,400);
        glayer_blind.image(startMenublind_img,0,0,400,400);
        glayer_blind.background(0,255);
        glayer_blind.fill(0);

        glayer_blind.loadPixels();

        for (let x = 0; x < glayer_blind.width; x++) {
            for (let y = 0; y < glayer_blind.height; y++) {

                let car_relpos   = {x:p.map(redcar.pos.x,0,p.width,0,glayer_blind.width),
                                    y:p.map(redcar.pos.y,0,p.height,0,glayer_blind.height)}
                if(p.dist(car_relpos.x,car_relpos.y,x,y) < 3){
                    glayer_blind.set(x,y,[0,0,0,60]);
                }
                else{
                    glayer_blind.set(x,y,[0,0,0,255]);
                }
            }
        }
        glayer_blind.updatePixels();
        // destMarker(p,markerAnim_blind,[345, 163],[10,30]);
        destMarker(p,markerAnim_blind,[145, 323],[10,30]);

        if (redcar.reach_dest){
            menu(glayer_menu);
            p.image(glayer_menu,0,0);
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

            redcar.display(p,car_img);

            p.image(glayer_blind,0,0,400,400);

        }
            
        }
        else{ 
            // p.image(startMenu_img,0,0,400,400);
            p.image(startMenublind_img,0,0,400,400);
            // p.FrameRate(1);
            
            // return null;
        }

        markerAnim_blind += .05;

    }

    p.windowResized = function(){
        p.resizeCanvas(400,400);
    }

    p.mouseClicked = function(){
        if (is_insideCanvas(p)){
            if(!playdemo_blind){
                glayer_blind   = p.createGraphics(100*.5,100*.5);
                glayer_menu    = p.createGraphics(p.width,p.height);
                playdemo_blind = 1;
                p.loop();
                p.FrameRate(60);
            }

            redcar.pos        = {x:70,y:70};
            redcar.reach_dest = false;

        }
    }
}

function is_insideCanvas(p){
    if(p.mouseX > 0 && p.mouseX < 400 && p.mouseY > 0 && p.mouseY < 400)
        return true;

    return false;
}
let s2 = new p5(sketch2);