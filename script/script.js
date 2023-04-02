let character = document.getElementById('character');
let playground = document.getElementById('playground');
let characterBottom = window.getComputedStyle(character).getPropertyValue(('bottom'));
let characterRight = window.getComputedStyle(character).getPropertyValue(('right'));
let characterWidth = window.getComputedStyle(character).getPropertyValue(('width'));

let ground = document.getElementById('ground');
let groundBottom = window.getComputedStyle(ground).getPropertyValue(('bottom'));
let groundHeight = window.getComputedStyle(ground).getPropertyValue(('height'));

let isJumping = false;
let upTime;
let downTime;

let newBottomValue = parseInt(characterBottom.replace('px', ''));
let newGroundHeightValue = parseInt(groundHeight.replace('px', ''));
let newCharacterRightValue = parseInt(characterRight.replace('px', ''));
let newCharacterWidthValue = parseInt(characterWidth.replace('px', ''));

let audioSound = new Audio('./audio/sound.mp3');

function playAudio(){
    
    audioSound.pause();
    
    setTimeout(()=>{
        audioSound.play();
    }, 2000);
}
function jumpSound(){
    let audio = new Audio('./audio/jump.mp3');
    
    audio.play();
}

function deathSound(){
    // let audio = new Audio('./death.mp3');
    
    // audio.play();
}

function jump(){
    if(isJumping)return;

    upTime = setInterval(()=>{
        if(newBottomValue >= newGroundHeightValue + 250){  
            clearInterval(upTime)

            downTime = setInterval(() => {

                if(newBottomValue <= newGroundHeightValue + 10){
                    clearInterval(downTime);
                    isJumping = false;
                }

                newBottomValue -= 10;
                character.style.bottom = newBottomValue + 'px';
            }, 20);
        }
        newBottomValue += 10;
        character.style.bottom = newBottomValue + 'px';
        isJumping = true;
    }, 20);
}

function generateObstacle(){
    let obstacles =  document.querySelector('.obstacles');
    
    let obstacle = document.createElement('img');
    // obstacle.setAttribute('class', 'obstacle');
    obstacle.setAttribute('src', './image/pipa.png');
    obstacle.style.width = 50+"px";
    obstacle.style.height = 80+"px";
    obstacle.setAttribute('class', 'obstacle');
    obstacles.appendChild(obstacle);

    let randomTimeOut = Math.floor(Math.random() * 1000) + 1000;

    let obstacleRight = -30;
    let obstacleBottom = 100;
    let obstacleWidth = 30;
    let obstacleHeight = Math.floor(Math.random() * 50) + 50;

    function moveObstacle(){
        obstacleRight += 5;
        obstacle.style.right = obstacleRight + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        obstacle.style.width = obstacleWidth + 'px';
        obstacle.style.height = obstacleHeight + 'px';

        if(newCharacterRightValue >= obstacleRight - newCharacterWidthValue && newCharacterRightValue <= obstacleRight + obstacleWidth && newBottomValue <= obstacleBottom + obstacleHeight){
            
            audioSound.pause();

            let audio = new Audio('./audio/death.mp3');
            audio.play();
            clearInterval(obstacleInterval);
            clearTimeout(obstacleTimeOut);

            setTimeout(()=>{
                alert('Game Over! \nDo you want to play again?');
                const element = document.createElement('a');
                element.setAttribute('href', './index.html');
                element.click();
                // location.reload();
            }, 10);
        }
    }

    let obstacleInterval = setInterval(moveObstacle, 20);
    let obstacleTimeOut = setTimeout(generateObstacle, randomTimeOut); 
     
}

generateObstacle();
playAudio();

document.body.addEventListener('click', function(){
    jumpSound();
    jump();
});

// function control(e){
//     console.log(e.key);
//     if(e.key === 'ArrowUp' || e.key == ' '){
//         console.log('masuk ke if')
//         jumpSound();
//         jump();
//     }
// }

// document.addEventListener('keydown', control);

