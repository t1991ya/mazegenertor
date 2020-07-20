var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
let id = 0
var canHeight = canWidth = 600;
let lastCell;
var lasts = [];
let size = 20;
var cells = [];
let startingCell = new Cell(0, 0)
let speed=200
//drawCell(startingCell,'clear')
document.getElementById('speedRange').addEventListener('input', (e) => {
    document.getElementById('speed').textContent = e.target.value



});
document.getElementById('sizeRange').addEventListener('input', (e) => {
    document.getElementById('size').textContent = e.target.value
   
  });


document.getElementById('next').addEventListener('click', () => {
    speed = parseInt(document.getElementById('speed').textContent) 
    console.log(size)
    size = parseInt( document.getElementById('size').textContent)
    console.log(size)
     clearInterval(id);
    id = setInterval(() => {
        getNext(startingCell)
    },speed)
})
function Cell(x,y)
{
    this.x=x;
    this.y = y;
    this.W = size;
    this.H = size;
}
function drawCell(cell,fill)
{

    ctx.fillStyle = 'balck'
    ctx.fillRect(cell.x, cell.y, cell.W, cell.H);

    if (fill == 'clear_down')
    {
        ctx.clearRect(cell.x+1 , cell.y-1 , size-2 , size)
    }
    if (fill == 'clear_top')
    {
        ctx.clearRect(cell.x+1 , cell.y+1 , size-2 , size+1)
     
    }
    if (fill == 'clear_left')
    {
     ctx.clearRect(cell.x+1 , cell.y+1 , size, size-2 )
    
    }
    if (fill == 'clear_right')
    {
     ctx.clearRect(cell.x-1 , cell.y+1 , size, size-2 )
 
        
    }
    if (fill == 'clear')
    {
     ctx.clearRect(cell.x+1 , cell.y+1 , size-2, size-2 )

        
    }
}

function isIn(cell)
{
    if (cell.x < 0 || cell.y < 0 || cell.x > canWidth-size || cell.y > canHeight-size)
        return false
    else
    return true
}
function lineTo(a, b)
{
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
}
function getNext(cell)
{
    let adjacents = [];
    let top = new Cell(cell.x, cell.y + size);
    if (cells.findIndex(e => e.x == top.x && e.y == top.y) == -1 &&isIn(top))
        adjacents.push(top)
    let down = new Cell(cell.x, cell.y - size); 
    if (cells.findIndex(e => e.x == down.x && e.y == down.y) == -1&&isIn(down))
        adjacents.push(down)
    
    let left = new Cell(cell.x - size, cell.y);
    if (cells.findIndex(e => e.x == left.x && e.y == left.y) == -1&&isIn(left))
        adjacents.push(left)
    let right = new Cell(cell.x + size, cell.y);
    if (cells.findIndex(e => e.x == right.x && e.y == right.y) == -1&&isIn(right))
    adjacents.push(right)
    if (adjacents.length == 0)
    {
     
        //alert('hit')
        console.log(lastCell)
        startingCell = lasts.pop()
        if (lasts.length > 0)
            getNext(startingCell)
        else
        {
            clearInterval(id);
            alert('End');
            //drawCell(lastCell, 'fill')
            

            }
            
       
        
        }
        
    else
    {
        let index = Math.floor(Math.random() * adjacents.length);
        lastCell = adjacents[index]
        let previous = startingCell;
        //let midx = (lastCell.x + startingCell.x) * 0.5;
       // let midy=(lastCell.y + startingCell.y) * 0.5;
      
        startingCell = lastCell
        //drawCell(previous)
        //drawCell(startingCell)
       // lineTo(new Cell(lastCell.x+size/2,lastCell.y+size/2),new Cell(previous.x+size/2,previous.y+size*0.5))
        lasts.push(startingCell)
        cells.push(startingCell)
         if(previous.x==lastCell.x&&previous.y<lastCell.y)
            drawCell(startingCell, 'clear_down')
         if(previous.x==lastCell.x&&previous.y>lastCell.y)
             drawCell(startingCell,'clear_top')
           if(previous.y==lastCell.y&&previous.x<lastCell.x)
             drawCell(startingCell, 'clear_right')
        if(previous.y==lastCell.y&&previous.x>lastCell.x)
            drawCell(startingCell, 'clear_left')
        
    

     
       
       // getNext(lastCell)
    }
};
