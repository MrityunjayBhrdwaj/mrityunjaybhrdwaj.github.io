var popped = 0;
var progress = 0;
let removespeed = 0.0225*((1/timeDueration)*2000);

var node2pop = stack[stack.length-1];

function initStack(p){
    // analogy: box ==> register that contain a perticular node.
    let boxcount = (stack.length > 30)? stack.length: 30;// can be equals to stack count but its dynamic not constant
    // boxcount = stack.length;

    let rectdim = [p.width,p.height/boxcount];

    for(let i=0;i<=boxcount;i++){

        if(boxcount-i < stack.length)
            p.text(boxcount-i+")",7,rectdim[1]*i-(rectdim[1]/2));
        // p.fill(255);
        let currStackNode = stack[boxcount-i];


            p.fill(255);
        if ( boxcount-(i) == stack.length){
            currStackNode = node2pop;
 
        //    let txt = currStackNode || "Empty" ;
            // txt = (txt != "Empty")?txt.id+" " + "isCurrent" : txt;

           // console.log("inside");
           p.fill(255,255,0);
            p.rect(5,rectdim[1]*i,rectdim[0]-10,rectdim[1])

            // p.fill(0)
            // p.stroke(0);
            // p.text(node2pop.id,rectdim[0]/2,(rectdim[1])*i-(rectdim[1]/2));
            // p.fill(0)
            // p.stroke(0);
            // p.text(txt,rectdim[0]/2,(rectdim[1])*(i+0)-(rectdim[1]/2));

            p.fill(0,00,0);
            if (progress >= 0)
            p.rect(5,rectdim[1]*i,rectdim[0]*(progress),rectdim[1])

            // p.fill(0,250,300) 
            continue
        }
        else{

        if (currStackNode != undefined){
        // currStackNode.updateMap();
        // p.fill(currStackNode.color[0],currStackNode.color[1],currStackNode.color[2]);
        // p.fill(Math.random()*250,Math.random()*250,Math.random()*250)
            p.fill(255,255,0)
        }
         }

        let txt = currStackNode || " " ;
        txt = (txt != " ")?txt.id+" "   : txt;


        p.noStroke();
        p.rect(5,rectdim[1]*i,rectdim[0]-10,rectdim[1])

        // if (boxcount-i == stack.length){


        // p.fill(255,255,00)
        // pop animation
        

        // }
        p.fill(0)
        p.stroke(0);
        p.text(txt,rectdim[0]/2,(rectdim[1])*(i+0)-(rectdim[1]/2));

    }
}

var sketch3 = function(p){
    p.setup = function(){
        var canvas = p.createCanvas(200,800);
        canvas.parent("#sketch3");// so that we can modify the position

        // Pos from neighs
        // p.frameRate(1)
        p.frameRate(MasterFrameRate)
        // p.frameRate(60);
        // p.noLoop();
    };
    p.draw = function(){
        p.background(040,040,80);

        // if (popped) then play remove animation. of stack
        // if (added new item)then play add animation of stack
        initStack(p);
        if (ProgramEnded)p.noLoop();

        if (progress >= 0)
        progress += removespeed;
    };
};