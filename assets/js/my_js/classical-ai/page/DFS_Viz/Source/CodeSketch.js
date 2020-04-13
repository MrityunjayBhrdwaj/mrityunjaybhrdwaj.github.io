// Represent Code line by Line

let input = "var foo(k)\:\
    if \(k > 100\)\
        print\(\"nope\"\)\
    else\:\
        print\(\"yey!!\"\)\
"; 
let code1 = [["function DFS(){"],["         //dosomething.. "],["};"]]

let dfscode = [
["1  procedure DFS-iterative(v,g):"],
["2      let S be a stack"],
["3      S.push(v)"],
["4      while S is not empty:"],
["5          v = S.pop()"],
["6          if (v == goalnode)"],
["7               return true"],
["8          if v.isVisited == false :"],
["9              v.isVisited = true;"],
["10             for node in v.neighbours:"],
["11                  S.push(node)"]

]


/* 

DFS psudoCode
 procedure DFS(G,v):
2      label v as discovered
3      for all edges from v to w in G.adjacentEdges(v) do
4          if vertex w is not labeled as discovered then
5              recursively call DFS(G,w)



*/

var currentCodeIndex = 0;
// console.log("currentCodeIndex",currentCodeIndex)
function CodeSnippet(p,code){
    // if(currentCodeIndex >= code.length)currentCodeIndex = 3;

    // if (ProgramEnded)return null;

    let lineofcode = code.length;// can be equals to stack count but its dynamic not constant
    // lineofcode = stack.length;

    let rectdim = [p.width,p.height/lineofcode];

    for(let i=0;i<lineofcode;i++){
        // console.log(i,currentCodeIndex);

        p.fill(250);// Background Color
        if(i == currentCodeIndex){
            p.fill([0,200,105]);

        }
        p.noStroke();
        p.rect(5,rectdim[1]*i,rectdim[0],rectdim[1])

        let txt = code[i];

        p.fill(0)
        p.stroke(0);
        p.text(txt,rectdim[0]*.05,rectdim[1]+(rectdim[1])*i-.2*(rectdim[1]/2));
        // p.text(i+")",7,(rectdim[1])*i+1*(rectdim[1]/2));
    }
        // currentCodeIndex++;
}
var sketch4 = function(p){
    p.setup = function(){
        var canvas = p.createCanvas(400,300);
        canvas.parent("#sketch4");
        p.frameRate(MasterFrameRate/2);
        p.background(0);

        console.log("hello from CodeSketch");
        // p.noLoop();
    }

    p.draw  = function(){

        CodeSnippet(p,dfscode);

        if (ProgramEnded)p.noLoop();

    }
}