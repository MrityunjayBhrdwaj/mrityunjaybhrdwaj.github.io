// PLAN:
/*
 * GOAL 1 : UnInformed Search( DFS )
 *  1. Take "Finite" Graph as input.
 *  2. Visualize the entire graph
 *  3. When start searching, zoom over to that node region
 *  4. and continue from that.
 */


var sketch2 = function(p){
    p.setup = function(){
        var canvas = p.createCanvas(800,800);
        canvas.parent("#sketch2");// so that we can modify the position

        // Pos from neighs


        // p.noLoop();
    };
    p.draw = function(){
        p.background(280);


        for(let i=0;i<NodeArray.length;i++){
            NodeArray[i].drawGraph(p);
        }

        for(let i=0;i<NodeArray.length;i++){
            NodeArray[i].drawGraph(p,0);
        }

        // NodeArray[4].drawGraph(p);
        // console.log(NodeArray[4])
        if (ProgramEnded)p.noLoop();

    };
};