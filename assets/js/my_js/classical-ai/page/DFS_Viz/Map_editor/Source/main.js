
let PixMap = [];
// let gsize;
// const GRID_DIM  = [12,12];
// const canvasDim = {x:400,y:400};
// let boxSize = [canvasDim.x/GRID_DIM[0],canvasDim.y/GRID_DIM[1]];
let map;
let savemap = 0;
let brush = 0; // 1 = none 0 = wall 2 = start 3 = end.

let cStartpix = 0;
let cEndpix   = 0;

let fac = 1.5;

var map_editor = function(p){

    p.preload = function(){
       map = p.loadImage("Map_editor/map.png");
    }

    p.setup = function(){
        // let cvs_elm = document.getElementById("medit_cvs")
        let cvs = p.createCanvas(400*fac, 400*fac);
        cvs.parent("#medit_cvs");
        p.background(100);

        // for(let i=0;i<GRID_DIM[0];i++){
        //     for(let j=0;j<GRID_DIM[1];j++){
        //         PixMap[i*GRID_DIM[0]+j] = new pix(i*GRID_DIM[0]+j,[boxSize[0]*i,boxSize[1]*j],boxSize[0],!(map.get(i,j)[0] < 255));
        //     }
        // }

        for(let i=0;i<GRID_DIM[0];i++){
            for(let j=0;j<GRID_DIM[1];j++){
                let map_status = ( customMap.status[i* GRID_DIM[0] + j]);
                if(map_status === 2)
                    cStartpix = i*GRID_DIM[0] + j
                if (map_status === 3)
                    cEndpix = i*GRID_DIM[0] + j

                PixMap[i*GRID_DIM[0]+j] = new pix(i*GRID_DIM[0]+j,[(fac*boxSize[0])*i,fac*boxSize[1]*j],fac*boxSize[0],map_status);
            }
        }
        
    }

    p.draw = function(){
        for(let i=0;i<PixMap.length;i++){
            PixMap[i].display(p);
        }
        // if(savemap){
        //     map.save("other","png");
        // }
    }
    p.keyTyped = function(){
        myObj = { name: "John", age: 31, city: "New York" };

        let values = [];
        for(let pix in pixMap){
            values.push(pix.status);
        }
        
        myObj = {"status": values}        
        myJSON = JSON.stringify(myObj);
        localStorage.setItem("testJSON", myJSON);

        window.alert("eeee")
        // text = localStorage.getItem("testJSON");
        // obj = JSON.parse(text);
        // console.log("obj: ",)
    }
    let pix = function(index,CanvasPos,bsize,status=1){
        this.index = index;
        this.canvaspos = {x:CanvasPos[0],y:CanvasPos[1]};
        this.boxSize = bsize;
        this.status  = status

        this.display = function(p){
            switch (this.status) {
                case 0:
                    p.fill(110,110,110);

                    break;
                case 1:
                    p.fill(255,255,255);
                    
                    break;
            
                case 2:
                    p.fill(0,255,0);
                    
                    break;
                case 3:
                    p.fill(255,00,0);
                    
                    break;
            }
            if(this.status == 1){


            }
            else{

            }

            p.rect(this.canvaspos.x,this.canvaspos.y,this.boxSize,this.boxSize);

        }


    }
    // p.mouseClicked(fxn)
    p.mousePressed = function(){
        if(p.mouseX < p.width && p.mouseY < p.height && p.mouseX > 0 && p.mouseY > 0){
            let mouseIndex = {i: Math.floor(p.mouseX/(fac*boxSize[0])),j:Math.floor(p.mouseY/(fac*boxSize[1]))}
            let pcurr_status =  PixMap[mouseIndex.i*GRID_DIM[0] + mouseIndex.j].status;

            let mindex = mouseIndex.i * GRID_DIM[0] + mouseIndex.j;

            if(pcurr_status != brush)
                PixMap[mouseIndex.i*GRID_DIM[0] + mouseIndex.j].status = brush;
            else{
                PixMap[mouseIndex.i*GRID_DIM[0] + mouseIndex.j].status = 1; 
            }

            if(brush === 2 && cStartpix != mindex ){
                PixMap[cStartpix].status = 1;
                cStartpix = mindex; 
                PixMap[cStartpix].status = brush;
            }
            if(brush === 3 && cEndpix != mindex ){
                PixMap[cEndpix].status = 1;
                cEndpix = mindex; 
                PixMap[cEndpix].status = brush;
            }
        }
    }
}

function saveMap(){
//    savemap = 1; 

    let values = [];
    for(let i=0;i<PixMap.length;i++){
        let pix = PixMap[i];
        console.log("p: ",pix.status);
        values.push(pix.status);
    }
    
    let myObj = {"status": values}        
    myJSON = JSON.stringify(myObj);
    localStorage.setItem("testJSON", myJSON);

    window.location.reload();
}

function clearMap(){
    for(let i=0;i<PixMap.length;i++){
        if(PixMap[i].status === 0)
            PixMap[i].status = 1;
    }
}
function loadMap(){
    console.log("tile_map",tile_map.get(0,0));
    clearMap();

    for(let i=0;i<GRID_DIM[0];i++){
        for(let j=0;j<GRID_DIM[1];j++){
            if (tile_map.get(i,j)[0] < 255){
                if(PixMap[i*GRID_DIM[0] + j].status <=1)
                    PixMap[i*GRID_DIM[0] + j].status = 0;
            }
        }
    }


}