/*
 * TODO:
 * Make Everything Using Set Time Out and Async Calls
 */
var slider,output,diag_ctrl;

 
const GRID_DIM  = [12,12];
const canvasDim = {x:400,y:400};
const GraphCanvasDim={x:800,y:800};
// const MasterFrameRate = 01;

var MasterSpeed = 14;
let dropbtn_elm;

// main Control:-
var timeDueration = 110*(1/MasterSpeed);
var MasterFrameRate = 180*(1/MasterSpeed);

var start_index = 13;
var end_index   = 124;

let goalnode;
var allow_diagonals;

var ProgramEnded = 0;

var NodeArray = [];
var boxSize = [canvasDim.x/GRID_DIM[0],canvasDim.y/GRID_DIM[1]];

let sstatus;
let tile_map;

let customMap,lstorage;
/* Open */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
    ProgramEnded = 1;
}

/* Close */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    ProgramEnded = 0;
} 

function pos2ind(x,y,width){
    return y*width + x;
}

function arrow(p,x1,x2,offset){

    let fac =0.95;
    fac = 1-(((30/2)+05)/p.dist(x1.x,x1.y,x2.x,x2.y));

    // lerp .9
    let c = Math.abs(x2.x-x1.x)*fac;
    let c2 = Math.abs(x2.y-x1.y)*fac;

    c = (x2.x > x1.x)? x2.x+(x2.x-x1.x):x1.x+(x1.x-x2.x);
    c2 = (x2.y > x1.y)? x2.y+(x2.y-x1.y):x1.y+(x1.y-x2.y);

    c=    p.lerp(x1.x,x2.x,fac);
    c2 = p.lerp(x1.y,x2.y,fac);
    // console.log(c,c2,x2.x,x2.y)
    x2 = {x:c,y:c2};
    
// this code is to make the arrow point
    p.push() //start new drawing state
    var angle = p.atan2(x1.y - x2.y, x1.x - x2.x); //gets the angle of the line
    p.translate(x2.x, x2.y); //translates to the destination vertex
    p.rotate(angle-p.HALF_PI); //rotates the arrow point
    p.triangle(-offset*0.3, offset/5, offset*0.3, offset/5, 0, -offset/6); //draws the arrow point as a triangle
    p.pop();
}

function genNeigh(x,y,gdim){
// give the ids of the neighbour of this Node

    let neighs = [];

    /** <-----x------>
      ^
      |     a b c
      y     h * d
      |     g f e

     */

    if(allow_diagonals)
        neighs.push( [x-1,y-1] )    //a

    neighs.push( [x,y-1  ] )    //b

    if(allow_diagonals)
        neighs.push( [x+1,y-1] )    //c

    neighs.push( [x+1,y  ] )    //d

    if(allow_diagonals)
        neighs.push( [x+1,y+1] )    //e

    neighs.push( [x,y+1  ] )    //f

    if(allow_diagonals)
        neighs.push( [x-1,y+1] )    //g

    neighs.push( [x-1,y  ] )    //h

    let n =[];
    for(let i=0;i<neighs.length;i++){
        let cn = neighs[i];

        if(cn[0] >= gdim[0] || cn[1] >= gdim[1] ||  cn[0] < 0 || cn[1] < 0){
            // remove form this array if its an outlier
            continue;
        }
        // n.push(cn)
        n.push(pos2ind(cn[0],cn[1],gdim[0]));
    }
    // console.log(n);
    return n;
}

function lerpDrawLine(p,x1,x2,fac){
    let nx = p.lerp(x1.x,x2.x,fac);
    let ny = p.lerp(x1.y,x2.y,fac);

    p.strokeWeight(2);
    p.line(x1.x,x1.y,nx,ny)
    p.strokeWeight(1);

}

ID = 0;
var Node = function(id,value,neigh,CanvasPos,bsize){
    this.id = id;
    this.value = value,// Value of this Node
    this.neighbours =neigh;
    this.color = [250,250,250];
    this.canvaspos = {x:CanvasPos[0],y:CanvasPos[1]};
    this.boxSize = bsize;
    this.GraphCanvasPos = {x:-1,y:-1};
    this.Status = null;
    // this.GraphCanvasPos = this.canvaspos;
    // ID++;

    this.GraphCanvasPos.x = this.canvaspos.x*2+(canvasDim.x/GRID_DIM[0])/1;
    this.GraphCanvasPos.y = this.canvaspos.y*2+(canvasDim.y/GRID_DIM[1])/1;

    // this.GraphCanvasPos = {x: 10+Math.random()*(GraphCanvasDim.x-20),y:10+ Math.random()*(GraphCanvasDim.y-20)};

    this.addNeighs = function(newNode){
        this.neighbours.push(newNode);
    },
    this.updateMap = function(){

        // if (this.Status == "isVisited")// then make it red
        //     this.color = [255,29,168];// red
        // if (this.Status == "inStack")
        //     this.color = [250,250,0];// yellow
        // if (this.Status =="isCurrent")
        //     this.color = [0,255,0];// green
        // if (this.Status =="isPath" || this.Status == "isGoal")
        //     this.color =[0,0,255]; // blue

    },
    this.updateGraph = function(Pos){
        this.GraphCanvasPos = {x:Pos[0],y:Pos[1]};
    },
    this.drawMap = function(p,color=this.color){

        p.stroke(75);
        if (this.Status == "isVisited")// then make it red
            this.color = [255,29,168];// red
        if (this.Status == "inStack")
            this.color = [250,250,40];// yellow
        if (this.Status =="isCurrent")
            // this.color = [0,255,0];// green
            // this.color = [255,255,255]
            this.color =[140,0,255]; // blue
        if (this.Status =="isWall"){
            this.color = [100,100,100]; // black

        }
        if (this.Status =="isPath" || this.Status == "isGoal")
            this.color = [255,0,0];// green
        if (this.Status =="isStart")
            this.color = [0,300,0]; // black

        p.fill(this.color[0],this.color[1],this.color[2]);
        // p.noStroke();
        p.rect(this.canvaspos.x, this.canvaspos.y, this.boxSize[0],this.boxSize[1]);
        p.stroke(0)
        p.fill(0)
        // p.text(this.id,this.canvaspos.x*1.0+this.boxSize[0]*.2,this.canvaspos.y*1.0+this.boxSize[1]/2)
        p.fill(255);

        // this.color=[255,255,255];
    },

    this.drawGraph = function(p,drawpath=1){

        if (this.Status == "isVisited")// then make it red
            this.color = [255,29,168];// red
        if (this.Status == "inStack")
            this.color = [250,250,40];// yellow
        if (this.Status =="isCurrent")
            // this.color = [0,255,0];// green
            // this.color = [255,255,255]
            this.color =[140,0,255]; // blue
        if (this.Status =="isWall")
            this.color = [100,100,100]; // black
        if (this.Status =="isPath" || this.Status == "isGoal")
            this.color = [255,0,0];// red 

        
        for (let i=0;drawpath&&i<this.neighbours.length;i++){
            let currNeigh = this.neighbours[i];
          

            p.stroke(0);
            p.fill(0)

            // if thisNeighbour is the last guy in the Stack (that means it is going to be the next current NOde) so join it with this node if this node is the dfs_currNode
            if ((stack.length > 0 )&&currNeigh == stack[stack.length-1] && this == dfs_cnode  && this.Status != "isGoal"){
                p.strokeWeight(5);
                p.fill(this.color[0],this.color[1],this.color[2]);
                p.stroke(this.color[0],this.color[1],this.color[2]);
                p.fill(0,255,0)
                p.stroke(0,255,0);
            }
            
            p.strokeWeight(3);
            p.line(this.GraphCanvasPos.x,this.GraphCanvasPos.y
                ,currNeigh.GraphCanvasPos.x,currNeigh.GraphCanvasPos.y);

                // draw Arrow:
            // p.fill(0)
            p.strokeWeight(1);

            arrow(p,this.GraphCanvasPos,currNeigh.GraphCanvasPos,300/(GRID_DIM[0]));
        }
        p.strokeWeight(2);
        p.fill(this.color[0],this.color[1],this.color[2]);
        // p.noStroke();
        p.ellipse(this.GraphCanvasPos.x,this.GraphCanvasPos.y,400/(GRID_DIM[0]),400/(GRID_DIM[0]));

        p.stroke(0)
        p.strokeWeight(1);
        p.fill(0)
        p.textSize(12);
        p.text(this.id,this.GraphCanvasPos.x-11,this.GraphCanvasPos.y+5)
        p.fill(255);

    }
    this.drawTree = function(p,drawpath=1){
        // can use minimum spanning tree

    }

}


function main(){
        // Create Grid Viz
        for (let i=0;i<GRID_DIM[0];i++){
            for(let j=0;j<GRID_DIM[1];j++){
                let NewNode = new Node([j,i],Math.random(),[],[boxSize[0]*i,boxSize[1]*j],[boxSize[0]-1,boxSize[1]-1]);
                NodeArray.push(NewNode);
            }
        }

    // adding Neighbours
    for(let i=0;i<NodeArray.length;i++){
            let CurrNode = NodeArray[i];
            let cnNeighs = genNeigh(CurrNode.id[0],CurrNode.id[1],GRID_DIM);

            for(let j=0;j<cnNeighs.length;j++){
                // console.log(cnNeighs[j]) ;
                NodeArray[i].addNeighs(NodeArray[cnNeighs[j]]);
                // CurrNode.addNeighs(23);
            }
        } 

}
// main();













var stack = [];
let dfs_cnode;

var frameCount = 0;
var fcthreshold = Math.floor(07/MasterSpeed);

// goalnode = NodeArray[5];
// goalnode = NodeArray[pos2ind(5,4,GRID_DIM[0])];

// goalnode.color = [0,0,255];

function genPath(cnode){

    if (cnode == undefined)return null;

    cnode.Status = "isPath";
    
    genPath(newnode);
}

let dummy = 20;
function pausetime(t){


    if (popped ==0){
        // dummy = fcthreshold
        // fcthreshold = t;
        popped = 1
    // if(progress >= 1)progress =0;
    // if (dfs_cnode)
        // dfs_cnode.Status = "isCurrent";
        return null;
    }
    else{
        popped = 0;
        fcthreshold = dummy;
    }

}


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function dfs_CheckGoal(){
    console.log("1) inside,dfs_CheckGoal",dfs_cnode);
    if (dfs_cnode != undefined && dfs_cnode == goalnode){
    // if (stack.length == 0){
        console.log("Found it! ",stack,dfs_cnode);
    /** PAUSE */

        // backtracking
        // genPath(dfs_cnode);
        ProgramEnded = 1;       
        sstatus.innerHTML = "found it!"
        return true     
    }

}

function dfs_DrawNodes(p){
    console.log("2) inside,dfs_DrawNodes");
    for(let i=0;!ProgramEnded && i<NodeArray.length;i++){
        NodeArray[i].drawMap(p);
    }
}

function dfs_SetVisited(p){
    console.log("3) inside,dfs_SetVisited");
        
    if (dfs_cnode != undefined ){
        if (dfs_cnode.Status != "isStart" )
        dfs_cnode.Status = "isVisited";
    }
    node2pop = stack[length-1];

}


function dfs_PopCurrNode(p){
    if(stack.length >0){
        console.log("4) inside,dfs_PopCurrNode");
        // pop the node from stack and set it as current node
        dfs_cnode = stack.pop();
        
        if (dfs_cnode != goalnode && dfs_cnode.Status != "isStart")
            dfs_cnode.Status = "isCurrent";

        // dfs_cnode.updateMap();  
        return dfs_cnode;
    }else{
        ProgramEnded = 1
        sstatus.innerHTML = "Unable to find it!"
    }
}

function dfs_AddNeighinStack(p){
    console.log("5) inside,dfs_AddNeighinStack");
    if (dfs_cnode != undefined){
        for(let i=dfs_cnode.neighbours.length-1;i>=0;i--){
            let cneigh = dfs_cnode.neighbours[i];
            // if (stack.indexOf[cneigh] < 0)// if this node is not inside stack already then add it.
                for( let node in stack)if(node ==cneigh)continue
                
            if (cneigh.Status != "isVisited" && cneigh.Status !="inStack" && cneigh.Status !="isWall"){
                stack.push(cneigh);
                if (cneigh.Status != "isStart" && cneigh.Status != "isGoal")
                    dfs_cnode.neighbours[i].Status = "inStack";
            }
        }
    }
}

function resetbtn(){
}
function DFS(p){

        /** PAUSE */
        let ret = 0;

        sstatus.innerHTML = "Searching..."
        setTimeout(() => {
            if (!ProgramEnded)
                currentCodeIndex = 5;

            console.log("this")
        }, timeDueration*1);

        setTimeout(() => {
            // Check if this node is goal node
            if(dfs_CheckGoal(p)){
                ret = 1;
            }
            if (!ProgramEnded)
                currentCodeIndex = 7;
        }, timeDueration*2);


        // timeDueration = slider.value;
        // MasterFrameRate = slider.value;

        // Draw in Canvas
        // // dfs_DrawNodes(p);

        setTimeout(() => {
            if (ProgramEnded)
                currentCodeIndex = 6;
            else            
                currentCodeIndex = 9;

        }, timeDueration*5);

        if (ret){
            return null;
        }

   // then restart the program 

    // }
        // Draw in Canvas

        // dfs_DrawNodes(p);
    setTimeout(() => {
        if (!ProgramEnded)
            currentCodeIndex = 8;
        // currentCodeIndex = 10;
        dfs_SetVisited(p);

        if (stack[stack.length-1].Status != "isStart" && stack[stack.length-1] != goalnode)
            stack[stack.length-1].Status = "isCurrent";
        dfs_DrawNodes(p);
    }, timeDueration*3);


    setTimeout(() => {
        if (!ProgramEnded)
            currentCodeIndex = 10; 
        progress = -1;
        dfs_PopCurrNode(p);
       dfs_AddNeighinStack(p) ;
    }, timeDueration*6);

    setTimeout(() => {
        if (!ProgramEnded)
            currentCodeIndex = 3;

    }, timeDueration*7);



    setTimeout(() => {
        if (!ProgramEnded)
            currentCodeIndex = 4;
        if(progress != 0)progress =0;
    //    progress = 0;
    }, timeDueration*8);


    setTimeout(() => {
        if (!ProgramEnded)
            p.draw();
    }, timeDueration*10);


    p.noLoop();
    // dfs_AddNeighinStack(p);
}



let everystop = 0;

