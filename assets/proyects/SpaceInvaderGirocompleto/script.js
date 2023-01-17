//Game const
const updateSpeed = 1000;           // Milisegundos
const animationSpeed = 1;
const timeLapse = 60;               // Pasos por segundo (por defecto N = 10)

const bound = 10;
const width = 600;
const height = 600;

const shipRadius = 250;
const barrierRadius= 200;
const shipCollisionRadius = 5;
const bulletCollisionRadius = 4;
const enemyCollisionRadius = 6;
const barrierCollisionRadius = 15;

const moveVelocity = 6;
const bulletVelocity = 10;

const angleOfEnemySpawn = 45;
const startEnemiesNumPerLine = 360 / angleOfEnemySpawn;
const startNumOfEnemyLine = 3;
const distanceBetweenEnemies = 35;

//Game variables
var ship;
var bullet;
var enemyBullets;
var enemies;
var barriers;
var layerAngle;

var gameOver;
var victory;
var balckHole;

//Context and scafold variables
var worldLayer;
var worldLayerCtx;
var bulletsLayer;
var bulletsLayerCtx;
var shipLayer;
var shipLayerCtx;
var enemiesLayer;
var enemiesLayerCtx;
var barriersLayer;
var barriersLayerCtx;

var gameLoop;
var generalAnimation;
var steptime = 0;
var inputValue;
var velocityFlag = true;


window.addEventListener("keydown", controlsManager, false);
//window.addEventListener("keyup", controlsManager, false);
inputValue = document.getElementById("inputBarr");

function controlsManager(event)
{
    switch (event.code)
    {
        case 'ArrowRight':
            console.log(' -> ' + event.code);
            aux = parseInt(inputValue.value) - moveVelocity;
            inputValue.value = aux.toString();
            break;
        case 'ArrowLeft':
            console.log(' <- ' + event.code);
            aux = parseInt(inputValue.value) + moveVelocity;
            inputValue.value = aux.toString();
            break;
        case 'KeyD':
            console.log(' D ' + event.code);
            aux = parseInt(inputValue.value) - moveVelocity;
            inputValue.value = aux.toString();

            break;
        case 'KeyA':
            console.log(' A ' + event.code);
            aux = parseInt(inputValue.value) + moveVelocity;
            inputValue.value = aux.toString();

            break;
        case 'Space':
            console.log(' Space ' + event.code);
            if(bullet == undefined)
            {
                bullet = new Bullet(shipRadius, layerAngle);
            }
            break;
        default:
            console.log('Default ' + event.code);
            break;
    }

}

function shotWithMobile()
{    
    if(bullet == undefined)
    {
        bullet = new Bullet(shipRadius, layerAngle);
    }
}

//Init Game...
main();

function main()
{
    initGame();

    ship = new Ship(0,0);
    enemies = new Enemies;
    barriers = new Barriers;
    
    drawWorld();
    sapwnEnemies();
    console.log('The game was loaded...')
    run();
}

function initGame()
{
    //Se inicializan los contextos de cada layer a través de los distintos canvas    
    worldLayer = document.getElementById('world');
    worldLayerCtx = worldLayer.getContext('2d'); 

    bulletsLayer = document.getElementById('bullets');
    bulletsLayerCtx = bulletsLayer.getContext('2d');

    shipLayer = document.getElementById('ship');
    shipLayerCtx = shipLayer.getContext('2d');

    enemiesLayer = document.getElementById('enemies');
    enemiesLayerCtx = enemiesLayer.getContext('2d');

    barriersLayer = document.getElementById('barriers');
    barriersLayerCtx = barriersLayer.getContext('2d');

    //Se ajustan todos los canvas a los tamaños por defecto
    worldLayer.width = width;
    worldLayer.height = height;
    bulletsLayer.width = width;
    bulletsLayer.height = height;
    shipLayer.width = width;
    shipLayer.height = height;
    enemiesLayer.width = width;
    enemiesLayer.height = height;
    barriersLayer.width = width;
    barriersLayer.height = height;

    //Se cambian las propiedades de los contextos que sean necesarios,
    //porejemplo ajustando el centro de los mismos al centro del canvas para permitir las rotaciones
    shipLayerCtx.translate(shipLayer.width/2, shipLayer.height/2);
    bulletsLayerCtx.translate(bulletsLayer.width/2, bulletsLayer.height/2);
    enemiesLayerCtx.translate(enemiesLayer.width/2, enemiesLayer.height/2);
    barriersLayerCtx.translate(barriersLayer.width/2, barriersLayer.height/2);

    //Se asingan las imagenes de victoria y derrota    
    gameOver = new Image();
    victory = new Image();
    balckHole = new Image();
    gameOver.src = "img/game_over.png";
    victory.src = "img/win.png";
    balckHole.src = "img/black_hole.png";
}

function drawWorld()
{
    //Fondo del mundo
    worldLayerCtx.beginPath();
    worldLayerCtx.arc(width / 2, height / 2, (width / 2) - 10, 0,2 * Math.PI);
    worldLayerCtx.fillStyle = 'black';
    worldLayerCtx.fill();

    /*
    //Gías visuales
    worldLayerCtx.moveTo(width / 2, 10);
    worldLayerCtx.lineTo(width / 2 , height - 10);
    worldLayerCtx.strokeStyle = 'white';
    worldLayerCtx.lineWidth = 2;
    worldLayerCtx.stroke();

    worldLayerCtx.moveTo(10, height / 2);
    worldLayerCtx.lineTo(width - 10, height / 2);
    worldLayerCtx.strokeStyle = 'white';
    worldLayerCtx.lineWidth = 2;
    worldLayerCtx.stroke();
    */
    
    //Borde del mundo
    worldLayerCtx.beginPath();
    worldLayerCtx.arc(width / 2, height / 2, (width / 2) - 10, 0, 2 * Math.PI);
    worldLayerCtx.strokeStyle = 'yellow';
    worldLayerCtx.lineWidth = 4;
    worldLayerCtx.stroke();

    //Primera carga de las Barreras del mundo
    barriers.addBarrier(barrierRadius, 0, 4);
    barriers.addBarrier(barrierRadius, 90, 4);
    barriers.addBarrier(barrierRadius, 180, 4);
    barriers.addBarrier(barrierRadius, 270, 4);
}

function sapwnEnemies()
{
    for(var i = 1; i <= startNumOfEnemyLine; i++)
    {
        for(var j = 1; j <= startEnemiesNumPerLine; j++)
        {
            enemies.addEnemy(distanceBetweenEnemies * i, angleOfEnemySpawn * j, i);
        }
    }    
}

function run()
{
    gameLoop = setInterval(Update, updateSpeed / timeLapse, world, worldLayerCtx);
    generalAnimation = setInterval(changeAnimation, updateSpeed / animationSpeed, world, worldLayerCtx);
}

function changeAnimation()
{
    enemies.enemies.forEach(enemy => {
        enemy.moveState += 1;
        enemy.state = enemy.state? false : true;
        if(enemy.spriteNum == -1)
        {
            enemy.animCount += 1;
            if(enemy.animCount == 2) enemy.delete();
        }
    });
}

function Update()
{
    steptime += 1;
    //console.log(steptime);
    //Se recoge el input para rotar el objeto
    layerAngle = inputValue.value;

    clearLayers();
    //Se llaman a los métodos update de los objetos por separado,
    // que en este caso llaman ellos mismos a su método de renderizado.
    ship.update(inputValue.value);
    enemies.enemies.forEach(enemy => enemy.update());
    barriers.barriers.forEach(barrier => barrier.update());

    if(bullet != undefined)
    {
        bullet.update();
    }

    checkColision();
    victoryLooseCondition();
}

function clearLayers()
{
    shipLayerCtx.clearRect(
        -shipLayer.width/2, -shipLayer.height/2,
         shipLayer.width, shipLayer.height
         );
    bulletsLayerCtx.clearRect(
        -bulletsLayer.width, -bulletsLayer.height,
        bulletsLayer.width * 2, bulletsLayer.height * 2
        );
    enemiesLayerCtx.clearRect(
        -enemiesLayer.width, -enemiesLayer.height,
        enemiesLayer.width * 2, enemiesLayer.height * 2
        );
    barriersLayerCtx.clearRect(
            -barriersLayer.width, -barriersLayer.height,
            barriersLayer.width * 2, barriersLayer.height * 2
             );
}

/**
 * Función que calcula la colisión de los objetos a través de las balas.
 * No se contempla que la nave pueda ser tocada por un enemigo, porque para que
 * este caso se de, el alien enemigo ya estará en el punto de condición de derrora 
 * del jugador.
 * 
 * Para conseguirlo, en el Update() se comprueba que las balas que haya en la escena
 * no estén en contacto con el resto de objetos de la escena.
 */
function checkColision()
{
    //Se calculan las colisiones de la bala del jugador de fuera hacia dentro
    //Colisión con barreras en bucle
    barriers.barriers.forEach(barrier => {
        if(bullet != undefined)
        {
            var distance = calculateDistanceBetweenObjs(bullet, barrier);
            if(distance < (bullet.radiusColision + barrier.radiusColision))
            {
                bullet.delete();
                barrier.life -= 1;
                if(barrier.life <= 0) barrier.delete();
            }
        }        
    });
    
    //Colisión con enemigos en bucle
    if(bullet != undefined)
    {
        enemies.enemies.forEach(enemy => {
            if(bullet != undefined)
            {
                var distance = calculateDistanceBetweenObjs(bullet, enemy);
                if(distance < (bullet.radiusColision + enemy.radiusColision))
                {
                    bullet.delete();
                    enemy.spriteNum = -1;
                    enemy.radiusColision = -10;
                    //enemy.delete();
                    //Sumar puntuación dentro del delete si se puede.
                }
            }
        });

    }
    
    //Se calculan las colisiones de la bala del enemigo de dentro hacia fuera

    //Colisión entre ellos?

    //Colisión en bucle con barreras
    
    //Colisión simple con jugador

    //Colisones de enemigos con barreras
    enemies.enemies.forEach(enemy => {
        barriers.barriers.forEach(barrier => {
            var distance = calculateDistanceBetweenObjs(barrier, enemy);
            if(distance < (barrier.radiusColision + enemy.radiusColision))
            {
                barrier.life -= 1;
                if(barrier.life <= 0) barrier.delete();
                //enemy.delete();
            }
        });
    });
}

function calculateDistanceBetweenObjs(obj1, obj2)
{
    //Como cada canvas o layer de dibujado presenta una rotación diferente,
    //para conseguir unas varibales a todos los objetos se aplica esa rotación
    //a la posición relativa de cada layer para cada objeto. Si el objeto no
    //está rotado, su posición global es igual a su posición relativa.

    var v = [(obj1.x - obj2.x ),(obj1.y - obj2.y)]          //Vector entre las posiciones de los objetos, multiplicada por la componente del ángulo correspondiente
    var distance = Math.sqrt(v[0] * v[0] + v[1] * v[1]);    //Módulo del vector entre los dos objetos para obtener la distancia
    return distance;
}

function victoryLooseCondition()
{
    if(enemies.length == 0)
    {
        shipLayerCtx.drawImage(victory, -190, -200, 400,400);
        clearInterval(gameLoop);
    }
    enemies.enemies.forEach(enemy => 
        {
            if(enemy.r > shipRadius)
            {
                shipLayerCtx.drawImage(gameOver, -205, -140);
                clearInterval(gameLoop);
            } 
        })
}


//Game Classes
function Ship(r)
{ 
    this.sprite = inicializateSprite();
    this.radiusColision = shipCollisionRadius; //Colisión calculada a través del radio de una circunferencia.
    //coordenadas polares
    this.angleOfLayer;
    this.r = 0;
    //coordenadas cartesianas
    this.x = this.r * Math.cos(this.angleOfLayer * (Math.PI / 180));
    this.y = this.r * Math.sin(this.angleOfLayer * (Math.PI / 180));

    /**
     * Las variables específicas para la lectura del spriteSheet serían inicializadas aquí,
     * pero se ha decidido utilizar valores hardcoreados y calculados a mano.
     * @returns la variable del sprite.
     */
    function inicializateSprite()
    {
        var newSprite = new Image();
        newSprite.src = "img/space_invaders_sprites_v.png";
        return newSprite;
    }

    this.update = function(input)
    {
        shipLayerCtx.save();
        shipLayerCtx.rotate(input * (Math.PI/180));     //Se rota todo el canvas de renderizado de la nave
        this.updatePosition(shipRadius, input);         //Se aplica el desplazamiento correspondiente según el radio
        this.render();                                  //Se renderiza la imagen en la posición actual
        shipLayerCtx.restore();
    }

    /**
     * Los valores de la renderización de los sprites están hardcodeados y calculados a mano,
     * ya que hacerlo a través de variables y de forma genérica da un resultado visual peor.
     * Como solo es un sprite con pocos objetos, sin ser el método más conveniente,
     * se ha optado por él. 
     */
    this.render = function()
    {
        //38px por cm, concuerdan con los contados en Photoshop
        shipLayerCtx.drawImage(this.sprite,                    //Imagen para tomar los datos
            19, 223,                                      //Desde dónde se renderiza el sprite
            16, 25,                                       //Ancho y alto del sprite a renderizar
            //this.sprite.width, this.sprite.height,      //IMAGEN ENTERA
            shipRadius, -12,                              //Dónde se renderiza la imagen
            //this.x, this.y,
            16, 25);                                      //Escala de la imagen en px, ajustada a la misma que el ancho y alto del sprite para mantener el 'aspec ratio' de la imagen

        //Dibujado del agujero negro del centro de la pantalla
        worldLayerCtx.drawImage(balckHole, worldLayer.width/2 - 25, worldLayer.height/2 - 25, 50, 50);
    }

    this.updatePosition = function(r, angle)
    {
        this.angleOfLayer = angle;
        this.r = r;
        this.x = this.r * Math.cos(this.angleOfLayer * (Math.PI / 180));
        this.y = this.r * Math.sin(this.angleOfLayer * (Math.PI / 180));
    }

    this.getPosition = function()
    {
        return [this.x, this.y];
    }
}

function Bullet(r, angle)
{
    this.sprite = inicializateSprite();
    this.radiusColision = bulletCollisionRadius;
    //dirección de desplazamiento
    this.direction;
    //coordenadas polares
    this.angleOfLayer = angle;
    this.r = r;
    //coordenadas cartesianas
    this.x = this.r * Math.cos(this.angleOfLayer * (Math.PI / 180));
    this.y = this.r * Math.sin(this.angleOfLayer * (Math.PI / 180));

    function inicializateSprite()
    {
        var newSprite = new Image();
        newSprite.src = "img/space_invaders_sprites_v.png";
        return newSprite;
    }

    /**
     * Este update será igual en el caso de que se hiciera una pool de balas, 
     * ya que solo habría que cambiar la llamada a todas las balas
     */
    this.update = function()
    {
        bulletsLayerCtx.save();
        bulletsLayerCtx.rotate(this.angleOfLayer * (Math.PI/180));         //Se rota todo el canvas de renderizado
        this.updatePosition();                                      //Se aplica el desplazamiento, en este caso se suma a su desplazamiento actual
        this.render();                                              //Se renderiza la imagen en la posición actual
        bulletsLayerCtx.restore();
    }

    this.render = function()
    {
        if (bullet != undefined)
        {
            bulletsLayerCtx.drawImage(this.sprite,
            68, 107,
            12, 6,
            this.r, -2,
            12, 6);
        }
    }

    /**
     * La dirección la encotramos multiplicando el vector de direccion por un escalar que marca 
     * el tamaño de desplazamiento.
     */
    this.updatePosition = function()
    {   
        this.r -= bulletVelocity;
        this.x = this.r * Math.cos(this.angleOfLayer * (Math.PI / 180));
        this.y = this.r * Math.sin(this.angleOfLayer * (Math.PI / 180));
        if (this.r < -shipRadius)
        {
            this.delete();
        } 
    }

    this.delete = function()
    {
        bulletsLayerCtx.clearRect(
            -bulletsLayer.width, -bulletsLayer.height,
            bulletsLayer.width * 2, bulletsLayer.height * 2
             );
        bullet = undefined;
    }
}

function Enemies()
{
    this.enemies = [];
    this.length = 0;

    this.addEnemy = function(r, angle, sprite)
    {
        var newEnemy = new Enemy(this.length, r, angle, sprite)
        this.enemies.push(newEnemy);
        this.length++;
    }

    this.getEnemy = function(id)
    {
        if(id > 0 && id <= this.length)
        {
            return this.enemies[id];
        }
        else
        {
            return -1;
        }
    }

    this.delete = function(id)
    {
        var index = this.enemies.findIndex(enemy => {
        return enemy.id === id;
        });
        this.enemies.splice(index, 1);
        this.length -= 1;
        if(this.length == 5) velocityFlag = true;
        if((this.length == 10 || this.length == 5) && velocityFlag)
        {
            velocityFlag = false
            generalAnimation = setInterval(changeAnimation, updateSpeed / animationSpeed, world, worldLayerCtx);
        }
    }
}

function Enemy(id, r, angle, sprite)
{
    this.sprite1 = inicializateSprite();
    this.sprite2 = inicializateSprite();
    //this.spriteNum = Math.random() * 3;    //Por si se quiere elegir un sprite aleatorio, el resultado será 0, 1 o 2
    this.spriteNum = sprite;
    this.moveState = 0;
    this.moveAux;
    this.animCount = 0;
    this.state = false;
    this.id = id;
    this.radiusColision = enemyCollisionRadius;
    //coordenadas polares
    this.angleOfLayer = angle;
    this.r = r;
    //coordenadas cartesianas
    this.x = this.r * Math.cos(this.angleOfLayer * (Math.PI / 180));
    this.y = this.r * Math.sin(this.angleOfLayer * (Math.PI / 180));

    function inicializateSprite()
    {
        var newSprite = new Image();
        newSprite.src = "img/space_invaders_sprites.png";
        return newSprite;
    }

    this.update = function()
    {
        if(this.moveState < 20 && this.moveState != this.moveAux)
        {
            this.moveAux = this.moveState;
            this.updatePosition(this.r, this.angleOfLayer + 10);
            this.render();
        }
        else if(this.moveState > 10)
        {
            this.moveState = -1;
            this.moveAux = 0;
            this.updatePosition(this.r + 20, this.angleOfLayer);
            this.render();
        }
        else
        {
            this.render();
        }
    }

    this.render = function()
    {
        if(this.spriteNum == 1)
        {
            if(this.state)
            {
                enemiesLayerCtx.drawImage(this.sprite1,
                    40, 16,
                    16, 16,
                    this.x - 8, this.y - 8,
                    16, 16);
            }
            else
            {
                enemiesLayerCtx.drawImage(this.sprite2,
                    7, 16,
                    16, 16,
                    this.x -8, this.y -8,
                    16, 16);
            }
        }
        else if(this.spriteNum == 2)
        {
            if(this.state)
            {
                enemiesLayerCtx.drawImage(this.sprite1,
                    74, 16,
                    22, 16,
                    this.x - 11, this.y - 8,
                    22 , 16);
            }
            else
            {
                enemiesLayerCtx.drawImage(this.sprite2,
                    108, 16,
                    22, 16,
                    this.x -11, this.y -8,
                    22, 16);
            }
        }        
        else if(this.spriteNum == 3)
        {
            if(this.state)
            {
                enemiesLayerCtx.drawImage(this.sprite1,
                    148, 17,
                    24, 16,
                    this.x - 12, this.y - 8,
                    24, 16);
            }
            else
            {
                enemiesLayerCtx.drawImage(this.sprite2,
                    180, 17,
                    24, 16,
                    this.x -12, this.y -8,
                    24, 16);
            }
        }
        else if (this.spriteNum == -1)
        {
            enemiesLayerCtx.drawImage(this.sprite2,
                437, 67,
                26, 16,
                this.x -8, this.y -8,
                26, 16);     
        }
        else
        {
            //En el caso de que sean más de 3 filas...
            if(this.state)
            {
                enemiesLayerCtx.drawImage(this.sprite1,
                    148, 17,
                    24, 16,
                    this.x - 12, this.y - 8,
                    24, 16);
            }
            else
            {
                enemiesLayerCtx.drawImage(this.sprite2,
                    180, 17,
                    24, 16,
                    this.x -12, this.y -8,
                    24, 16);
            }
        }
    }
    
    this.updatePosition = function(r, angle)
    {
        this.angleOfLayer = angle;
        this.r = r;
        this.x = this.r * Math.cos(this.angleOfLayer * (Math.PI / 180));
        this.y = this.r * Math.sin(this.angleOfLayer * (Math.PI / 180));
    }

    this.delete = function()
    {
        enemies.delete(this.id);
    }
}

function Barriers()
{
    this.barriers = [];
    this.length = 0;

    this.addBarrier = function(r, angle, life)
    {
        var newBarrier = new Barrier(this.length, r, angle, life)
        this.barriers.push(newBarrier);
        this.length++;
    }

    this.getBarrier = function(id)
    {
        if(id > 0 && id <= this.length)
        {
            return this.barriers[id];
        }
        else
        {
            return -1;
        }
    }

    this.delete = function(id)
    {
        var index = this.barriers.findIndex(barrier => {
        return barrier.id === id;
        });
        this.barriers.splice(index, 1);
        this.length -= 1;
    }
}

function Barrier(id, r, angle, life)
{
    this.sprite = inicializateSprite();
    this.id = id;
    this.life = life;
    this.radiusColision = barrierCollisionRadius;
    //coordenadas polares
    this.angleOfLayer = angle;
    this.r = r;
    //coordenadas cartesianas
    this.x = this.r * Math.cos(this.angleOfLayer * (Math.PI / 180));
    this.y = this.r * Math.sin(this.angleOfLayer * (Math.PI / 180));

    function inicializateSprite()
    {
        var newSprite = new Image();
        newSprite.src = "img/space_invaders_sprites.png";
        return newSprite;
    }

    this.update = function()
    {        
        this.render();
    }

    this.render = function()
    {
        if(this.life == 4)
        {            
            barriersLayerCtx.drawImage(this.sprite,
                316, 4,
                44, 32,
                this.x -21, this.y -16,
                44, 32);
        }
        else if(this.life == 3)
        {
            barriersLayerCtx.drawImage(this.sprite,
                480, 1,
                44, 32,
                this.x -21, this.y -16,
                44, 32);
        }
        else if(this.life == 2)
        {
            barriersLayerCtx.drawImage(this.sprite,
                429, 1,
                44, 32,
                this.x -21, this.y -16,
                44, 32);
        }
        else if(this.life == 1)
        {
            barriersLayerCtx.drawImage(this.sprite,
                375, 2,
                44, 32,
                this.x -21, this.y -16,
                44, 32);

        }
    }
    
    this.delete = function()
    {
        barriers.delete(this.id);
    }
}