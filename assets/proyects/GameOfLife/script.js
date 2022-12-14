//Game const variables
const updateSpeed = 1000;           // Milisegundos
const timeLapse = 10;               // Pasos por segundo (por defecto N = 10)
const defaultPxPerCell = 20;
var pxPerCell;
const defaultSize = 40;
var size;
var randomWorld;
const defaultState = false;
const deathColor = 'black';
const aliveColor = 'white';
const closeCells = 
[[-1,-1],[0,-1],[1,-1],
[-1,0],[1,0],
[-1,1],[0,1],[1,1]];                // Vector de las 8 casillas contiguas a una célula dada

//Mouse variables
var mouseX;
var mouseY;

//Context and game variables
var canvas;
var context;

var playStop = true;
var pauseContinue = true;

var world;
var worldLife = 0;
var update;

//HTML vatiables
var worldText = document.getElementById("worldLife");
var cellText = document.getElementById("cellLife");

//Init game
main();


//Auxiliar function
function mouseFuncionalityUp(event)
{
    console.log(mouseX, ' - ' , mouseY)
    context.fillStyle = world.changeCellByMouse(mouseX, mouseY)? aliveColor : deathColor;
    context.fillRect(mouseX * pxPerCell, mouseY * pxPerCell, pxPerCell, pxPerCell);
    //console.log(world.worldMap);
}

// Cada vez que el ratón se encuentra dentro del canvas,
// se recoge su posición en función del tamaño de las casillas,
// dividiendo la posición por el tamaño de pixeles de una célula.
function mouseFuncionalityMove(event)
{
    mouseX = Math.floor((event.pageX - event.currentTarget.offsetLeft)/pxPerCell);
    mouseY = Math.floor((event.pageY - event.currentTarget.offsetTop)/pxPerCell);

    if((mouseX > -1 && mouseY > -1) && (mouseX < size && mouseY < size)) cellText.innerHTML = 
    "Cell [" + mouseX + " - " + mouseY + "] still alive " + world.takeTimeAlive(mouseX, mouseY) + " steps.";
}

function updateInfo()
{
    worldLife++;
    worldText.innerHTML = "Steps world alive: " + worldLife;
}

function changePlay()
 {
    if (playStop)
    {
        run();
        document.getElementById("playStop").src = "img/stop.png";
        playStop = false;
    } 
    else 
    {
        worldLife = 0;
        updateInfo();
        pause();
        main();

        document.getElementById("playStop").src = "img/play.png";
        playStop = true;
        if (!pauseContinue)
        {
            document.getElementById("pauseRestat").src = "img/pause.png";
            pauseContinue = true;
        }
    }
}

function changePause()
{
    if (pauseContinue)
    {
        pause();
        document.getElementById("pauseRestat").src = "img/play.png";
        pauseContinue = false;
    }
    else 
    {
        run();
        document.getElementById("pauseRestat").src = "img/pause.png";
        pauseContinue = true;
    }
}

//Functionality
function main()
{
    canvas = document.getElementById('world');
    context = canvas.getContext('2d');

    randomWorld = document.getElementById("random");
    size = document.getElementById("newSize").value;    
    pxPerCell = document.getElementById("newPx").value;

    if(size < 10 || size > 1000)
    {
        console.log('Valor de tamaño de mundo incorrecto. Se utilizará el valor por defecto [' + defaultSize +']');
        size = defaultSize;
    }

    if(size < 5 || size > 1000)
    {
        console.log('Valor de píxeles de mundo incorrecto. Se utilizará el valor por defecto [' + defaultPxPerCell +']');
        size = defaultSize;
    }

    canvas.width = size * pxPerCell;
    canvas.height = size * pxPerCell;

    world = new World(size);
    console.log(world.worldMap);
    
    //Pintado por defecto del mundo. Se utiliza principalmente para cuando se ha inicializado con valores aleatorios
    for(var i = 0; i < size; i++)
    {
        for(var j = 0; j < size; j++)
        {
            context.fillStyle = world.worldMap[i][j].state? aliveColor : deathColor;
            context.fillRect(i * pxPerCell, j * pxPerCell, pxPerCell, pxPerCell);
        }
    }

    //Mouse Funcionality
    canvas.addEventListener("mouseup", mouseFuncionalityUp, false);
    canvas.addEventListener("mousemove", mouseFuncionalityMove, false);
}

function run()
{
    update = setInterval(start, updateSpeed / timeLapse, world, context);
}

function pause()
{
    console.log('GAME ---> PAUSED ||');
    clearInterval(update);
}

function start(world, context)
{
    console.log('GAME ---> RUNNING...');
    world.calculateNextState();             //Se calcula el estado de la iteración siguiente
    world.swapStates();                     //Se intercambia el resultados. El estado siguiente pasa a ser el actual
    world.draw(context);                    //Se dibuja sobre el cambas el resultado de la iteración actual
    updateInfo();
}


//Classes
function World(size)
{
    this.size = size;
    this.worldMap = createWorld(size);

    function createWorld(size)
    {
        var map = [];
        for(i = 0; i < size; i++)
        {
            var line = [];
            for( j = 0; j < size; j++)
            {
                line[j] = new Cell(defaultState, 0, i, j);
            }
            map[i] = line;
        }
        return map;
    }

    this.calculateNextState = function(context)
    {
        for(var i = 0; i < this.size; i++)
        {
            for(var j = 0; j < this.size; j++)
            {
                this.worldMap[i][j].checkState(this.worldMap);
            }
        }
    } 

    this.swapStates = function(context)
    {
        for(var i = 0; i < this.size; i++)
        {
            for(var j = 0; j < this.size; j++)
            {                
                this.worldMap[i][j].swapCellState();
            }
        }
    }

    this.draw = function(context)
    {
        for(var i = 0; i < this.size; i++)
        {
            for(var j = 0; j < this.size; j++)
            {
                context.fillStyle = this.worldMap[i][j].state? aliveColor : deathColor;
                context.fillRect(i * pxPerCell, j * pxPerCell, pxPerCell, pxPerCell);
            }
        }
    }
    
    this.changeCellByMouse = function(x,y)
    {
        //Cambia el estado de la célula y devuelve su resultado. Utilizado por le ratón, para cambiar de color la celda.
        this.worldMap[x][y].changeState();
        return this.worldMap[x][y].state;
    }

    this.takeTimeAlive = function(x,y)
    {
        return this.worldMap[x][y].timeLapse;
    }
}

function Cell(startState, startTime, x, y)
{
    //Estado de la célula aleatorio si así se ha seleccionado en el checkbox
    this.state = randomWorld.checked? Boolean(Math.round(Math.random())) : startState;
    this.nextState;
    this.timeLapse = startTime;
    this.x = x; //posición de la célula en la matriz
    this.y = y; //posición de la célula en la matriz

    this.changeState = function()
    {
        //Operador ternario para cambiar el estado de la célula (Utilizado por la funcionalidad del ratón)
        this.state = this.state? false : true;
    }

    this.changeNextState = function()
    {
        //Operador ternario para cambiar y guardar el nuevo estado de la célula dependiendo del estado actual
        this.nextState = this.state? false : true;
    }

    this.swapCellState = function()
    {
        this.state = this.nextState;
    }

    //Comprueba las 8 casillas al rededor de su posición para determinar su siguiente estado
    this.checkState = function()
    {
        //De forma automática, se copia el valor del estado actual para la próxima iteración de tódas las células
        this.nextState = this.state;

        var closeCellsAlive = 0;
        for(var i = 0; i < closeCells.length; i++)
        {
            //Se utiliza el operador módulo para calcular el valor de
            checkX = (this.x + closeCells[i][0]) % size;
            checkY = (this.y + closeCells[i][1]) % size;

            //Check the bounds for an infinity matrix
            if(checkX < 0) checkX = size - 1;
            if(checkY < 0) checkY = size - 1;

            if(world.worldMap[checkX][checkY].state)
            {
                closeCellsAlive += 1;
            }
        }

        if(this.state)
        {
            //Si la célula está viva y a su alrededor hay despoblación o superpoblación...
            if(closeCellsAlive < 2 || closeCellsAlive > 3) this.changeNextState();
            this.timeLapse++;
        }
        else
        {
            //Si la célula está muerta y tiene justo 3 celulas contiguas vivas, renace.
            if(closeCellsAlive == 3) this.changeNextState();
            this.timeLapse = 0;
        }
    }  
}