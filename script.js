
let score = document.querySelector('.score'); 
let startScreen = document.querySelector('.startScreen');
let gameArea = document.querySelector('.gameArea');

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let player = {
    speed : 7,
    score : 0
};

var Images = [
    'carpic1.png',
    'carpic2.png',
    'carpic3.png',
    'carpic4.png',
    'carpic5.png',
    'carpic6.png',
    'carpic7.png',
    'carpic8.png',
    'carpic9.png',
    'carpic10.png',
]

startScreen.addEventListener('click', start);

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);

function keyPress(eventDetails){
    eventDetails.preventDefault();
    // console.log("keyPress", eventDetails.key);
    let pressedKey = eventDetails.key;
    if(pressedKey === 'ArrowUp' || pressedKey === 'ArrowDown' || pressedKey === 'ArrowLeft' || pressedKey === 'ArrowRight'){
        keys[pressedKey] = true;
    }
    // console.log(keys);
}

function keyRelease(eventDetails){
    eventDetails.preventDefault();
    // console.log("key released", eventDetails.key)
    let releasedKey = eventDetails.key;
    if(releasedKey === 'ArrowUp' || releasedKey === 'ArrowDown' || releasedKey === 'ArrowLeft' || releasedKey === 'ArrowRight'){
        keys[releasedKey] = false;
    }
    // console.log(keys);
}

function gamePlay(){ 
    let car = document.querySelector(".car");
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    // console.log(player.x, player.y);
    movielines();
    moveEnemy(car);

    let road = gameArea.getBoundingClientRect();
    if(player.start){
        if(keys.ArrowUp && player.y > road.top + 100){
            player.y = player.y - player.speed;
        }
        if(keys.ArrowDown && player.y < road.bottom - 150){
            player.y = player.y + player.speed;
        }
        if(keys.ArrowLeft && player.x > 10){
            player.x = player.x - player.speed;
        }
        if(keys.ArrowRight && player.x < 240){
            player.x = player.x + player.speed;
        }

        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';

        player.score++;
        score.innerHTML = "score: " + player.score;
        startScreen.innerHTML = "Show ur Skills....!"
        startScreen.append(score);

        requestAnimationFrame(gamePlay);
    }
}

function collide(a, b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    let CollideCondition = (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.left > bRect.right) || (aRect.right < bRect.left);

    return !CollideCondition;
}

function movielines(){
    const dividers = document.querySelectorAll(".divider");

    dividers.forEach((divider) => {
        // console.log("y", divider.y)

        if(divider.y >= 750){
            divider.y = divider.y - 770;
        }
        divider.y = divider.y + player.speed;
        divider.style.top = divider.y + "px";
    })
}

function moveEnemy(car){
    const enemies = document.querySelectorAll(".enemy");

    enemies.forEach((enemy) => {

        if (collide(enemy, car)){
            console.log("Boom!");
            endGame();
        }

        if(enemy.y >= 800){
            enemy.y = enemy.y - 800;
            enemy.style.left = parseInt(Math.random()*250) + 'px';
            // enemy.style.backgroundColor = randomColor();
        }
        enemy.y = enemy.y + player.speed;
        enemy.style.top = enemy.y + "px";
    })
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    gameArea.classList.add('hide')
    startScreen.innerHTML = "Game Over <br> Your final score is " + player.score + " Press here to restart the game...";
    var child = gameArea.firstChild;
    pauseBackgroundMusic();
    while (child) {
      // Check if the child node is a div element
      if (child.nodeType === 1 && child.nodeName.toLowerCase() === 'div') {
        // Remove the div element
        gameArea.removeChild(child);
      }
      // Move to the next child node
      child = child.nextSibling;
    }
}

function playBackgroundMusic() {
    var bgMusic = document.getElementById("bgMusic");
    bgMusic.play();
}

// Pause the background music
function pauseBackgroundMusic() {
    var bgMusic = document.getElementById("bgMusic");
    bgMusic.pause();
}

// Adjust the volume of the background music (0 to 1)
function setMusicVolume(volume) {
    var bgMusic = document.getElementById("bgMusic");
    bgMusic.volume = volume;
}

function start(){ 
    // console.log('clicked');
    //once clicked hide start screen and display game screen
    startScreen.classList.add('hide');
    gameArea.classList.remove('hide');

    player.start = true;
    requestAnimationFrame(gamePlay);
    playBackgroundMusic();

    //creating a car
    let car = document.createElement('div');
    car.className = "car";
    // car.innerHTML = "car";
    // car.src = "car pic.png";
    var carImg = document.createElement("img");
    carImg.className = "carImage";
    carImg.src = "ourcar.png";
    car.append(carImg)

    // player.x = car.offsetLeft;
    // player.y = car.offsetTop;

    //creating a divider
    for(let x = 0; x <= 6; x++){
        let divider = document.createElement("div");
        divider.className = "divider";
        divider.y = x * 125;
        divider.style.top = divider.y + 'px'
        gameArea.append(divider);
    }

    for(let x = 0; x < 2; x++){
        let sideDivider = document.createElement("div");
        sideDivider.className = "sideDivider";
        sideDivider.style.left = x*230 + 30 + 'px';
        gameArea.append(sideDivider);
    }

    for(let i = 0;i<=2 ;i++){
        let enemy = document.createElement('div');
        enemy.className = "enemy";
        enemy.y = (i+1)*250-1500;
        enemy.style.left = parseInt(Math.random()*250) + 'px';
        enemy.style.top = 100 + 'px';
        let enemyImg = document.createElement("img");
        enemyImg.className = "enemyImg";
        enemyImg.src = getRandomImage();
        enemy.append(enemyImg);
        // enemy.style.backgroundColor = randomColor();

        gameArea.append(enemy);
    }
    
    gameArea.append(car);
}

function getRandomImage() {
    // Generate a random index between 0 and the length of the images array
    var randomIndex = Math.floor(Math.random() * Images.length);
    // Return the randomly selected image path
    return Images[randomIndex];
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2)
    }
    return "#" + c() + c() + c();
}