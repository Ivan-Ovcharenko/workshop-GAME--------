// урок 3
// h2 = document.querySelector("#start h2");
// playButton =document.querySelector("#play");
// pauseButton =document.querySelector("#pause");
// playButton.onclick = function(){
//     player.play();
// }
// pauseButton.onclick = function(){
//     player.pause();
// }

// Урок 4
//при нажатии на кнопку старт, нужно прятать кнопку старт
//и показывать блок гейм 
startButton = document.querySelector("#start button");
startBlock = document.querySelector("#start");
gameBlock = document.querySelector("#game");

gamerSkin = "skin_1";
//жизни
countLifes = 3;

//очки
score = document.querySelector("#score span");


startButton.onclick = function() {//при нажатии на кнопку старт происходят след функции
    // startBlock.style.display = "none";//блок старт скрывается
    // gameBlock.style.display = "block"//игровой блок открывается
    startGame();//вызываем функцию стартгейм( она создана ниже)
}


 //if - если
 //else - иначе
 //музыка+значек
 //включение мелодии при клике на значек саунд
 audioPlayer = document.querySelector("audio");//переменная с музыкой
console.dir(player);

 sound = "off"
soundButton = document.querySelector("#sound img");//переменная с картинкой саунд
soundButton.onclick = function(){//функции 
    if (sound == "on"){
        soundButton.src = "./images/mute_sound.png";//картинка офф
        sound = "off";
        audioPlayer.pause();//музыка на паузе
    } else {
      soundButton.src = "./images/sound_on.png";
      sound = "on";
      audioPlayer.play();//включение мелодии при клике на значек саунд
      //если мелодия играет картинка он
    }
}

//движение игрока вверх вниз
 gamer = document.querySelector("#player");

document.onkeydown = function(event) {
    console.dir(event);
    // если кейкод кнопки W-87 двигаем вверх( -10пх вверх - минус пиксели)
    if(event.keyCode == 87){
        gamer.style.top = gamer.offsetTop - 50 + "px";
    }
    // если кейкод кнопки S-83 двигаем вниз( +10пх вниз - + пиксели)
    if(event.keyCode == 83){
        gamer.style.top = gamer.offsetTop + 50 + "px";
    }
    //пуля будет вылетать при нажатии на пробел 
    if(event.keyCode == 32) {
        createBullet();
    }

}
//урок5 
// Таймеры - setTimeout(выводится 1 раз)/(выводится много раз с указанным интервалом времени)setInterval
// setTimeout(function(){
//     console.dir("прошла 1 секунда");
//     }, 1000) 

// setInterval(function(){
//         console.dir("прошла 1 секунда");
//         }, 1000)

//переменная таймер
// timer = 1;
// setInterval(function(){
//     console.dir("прошла " + timer + " секунда");
//     timer = timer + 1;
//     }, 1000)

// сделаем функцию startGame
function startGame(){
    startBlock.style.display = "none";//блок старт скрывается
    gameBlock.style.display = "block"//игровой блок открывается
    gamer.className = gamerSkin;
    createLifes();
    createEnemy();
    //создание еще 1 врага
    // setInterval(createEnemy, 1000);
    //перемещение 1 врага
    // enemy1 = document.querySelector(".enemy.type-1");
    // moveEnemy(enemy1);
}
    function moveEnemy(enemy) {//создаем свою функцию moveEnemy перемещения игрока
        let timerID = setInterval(function() {
            enemy.style.left = enemy.offsetLeft - 10 + "px";
            console.dir(enemy.offsetLeft);
            if(enemy.offsetLeft < -100) {
                enemy.remove();
                createEnemy();
                //остановить таймер
                clearInterval(timerID);
                //функция смерть
                die();
            }
        }, 50);//теперь будем перемещать его
    }

//Урок 6
//createElement - создание элемента
//appendChild -  добавить элемент на страницу
//remove - удаление элемента

//работа с врагами

function createEnemy() {
    let enemy = document.createElement("div");
    enemy.className = "enemy " + typeEnemy();
    //задаем рандомное появление врага
    enemy.style.top = random(100, document.querySelector("#app").clientHeight - 150) + "px";
    //  position = position + 200;
    //помещаем врага в игровое поле
    gameBlock.appendChild (enemy);

    moveEnemy(enemy);
}

//сделать появление случайного скина врага
function typeEnemy() {
    if(random(1, 2) == 1) {
          return "type-1";
    } else {
          return "type-2";
    }
}

//cоздание выстрела
function createBullet() {
    let bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.top = gamer.offsetTop + 140 + "px";

    //поместить пулю в игровое поле 
    gameBlock.appendChild(bullet);
    moveBullet(bullet);
}
//функция для перемещения пули
function moveBullet(bullet) {
    let timerID = setInterval(function() {
        bullet.style.left = bullet.offsetLeft + 10 + "px";

        if(bullet.offsetLeft > document.querySelector("body").clientWidth) {
            bullet.remove();
            
            //остановить таймер
            clearInterval(timerID);
        }
        isBoom(bullet);
    }, 10);
}
//урок7
//попадание по врагу
function isBoom(bullet) {
    let enemy = document.querySelector(".enemy");

    if(bullet.offsetTop > enemy.offsetTop 
        && bullet.offsetTop < enemy.offsetTop + enemy.clientHeight
        && bullet.offsetLeft > enemy.offsetLeft) {
            createBoom(bullet.offsetTop, bullet.offsetLeft);
            //когда убиваем врага - увеличиваем очки 
            score.innerText = Number(score.innerText) + 1;
            bullet.remove();
            enemy.remove();
            createEnemy();
            
    }
}
// уменьшение жизней если враг пролетел 
//countLifes = 3; - переменная для жизни
function die() {
    countLifes = countLifes - 1;
    if ( countLifes <= 0 ) {
        endGame();
    }
    createLifes();
}

//благодаря функции пропивываем сколько жизней есть
function createLifes() {
    let lifesBlock = document.querySelector("#lifes");
        lifesBlock.innerHTML = "";
    let count = 0;
    while(count < countLifes) {
        let span = document.createElement("span");
        lifesBlock.appendChild(span);

        count = count + 1;
    }

}
//сделать взрыв на месте попадания пули по врагу 
function createBoom(top, left) {
    let boom = document.createElement("div");
        boom.className = "boom";
        boom.style.top = top - 100 + "px";
        boom.style.left = left - 100 + "px";
    
    //бум записываем в игровое поле
    gameBlock.appendChild(boom);
    setTimeout(function() {
        boom.remove();
    }, 1000);
}
//случ число от мин до макс(появление врага рандом)
function random(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

//завершение игры
function endGame() {
    let scoreBlock = document.querySelector("#end h3 span");
    scoreBlock.innerText = score.innerText;

    gameBlock.innerHTML = "";
    let endBlock = document.querySelector("#end");
    endBlock.style.display = "block"; 

    let restartButton = document.querySelector("#end button");
    restartButton.onclick = Restart;
}
//кнопка Restart
function Restart() {
    location.reload();
}

//выбор скина игрока
selectSkin1 = document.querySelector("#skin_1");

selectSkin1.onclick = function() {
    selectSkin1.className = "selected";
    selectSkin2.className = "";
    gamerSkin = "skin_1";
}
selectSkin2 = document.querySelector("#skin_2");
selectSkin2.onclick = function() {
    selectSkin2.className = "selected";
    selectSkin1.className = "";
    gamerSkin = "skin_2";
}