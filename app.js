//== Select the elements on the page - canvas,shake button ==
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
//== Set-up Canvas ==
// Make a variable called height and width from the same properties on our canvas
const {width, height} = canvas ; // const width = canvas.width , // const height = canvas.height
// Create random x,y axis
let x = Math.floor( Math.random() * width ) ;
let y = Math.floor( Math.random() * height ) ;
// Set up line properties
ctx.lineCap = 'round'; // the shape used to draw the end points of lines.
ctx.lineJoin = 'round'; //  the shape used to join two line segments where they meet.
ctx.lineWidth = 30; // width points 
// Make a point
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function draw(key){
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    switch(key){
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowRight' :
            x += MOVE_AMOUNT;
            break;
        case 'ArrowDown' :
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft' :
            x -= MOVE_AMOUNT;
            break;
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// function handleKey
function handleKey(e){
    if(e.key.includes("Arrow")){
        e.preventDefault();
        draw(e.key);
    };
};

function clearCanvas(){
    canvas.classList.add('shake');
    canvas.addEventListener('animationend',(e)=>{
        ctx.clearRect(0, 0, e.target.width, e.target.height);
        canvas.classList.remove('shake');
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    },{once:true});
};
// evenListener
window.addEventListener('keydown',handleKey);
shakeButton.addEventListener('click',clearCanvas);