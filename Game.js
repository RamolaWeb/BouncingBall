/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

var width=canvas.width;
var height=canvas.height;

var blockSize=10;
var blockHoz=width/blockSize;
var blockVer=height/blockSize;

var Score=0;

var ballBounce=new BouncingBall();
var ballRandom=new RandomBall();
var racket=new Racket();
var keys={
37: "left",
39: "right"
};


function checkRacket(){
  if(racket.x<ballBounce.poistion.x+ballBounce.poistion.raidus&&
      racket.x+blockSize*5>ballBounce.poistion.x-ballBounce.poistion.raidus&&
      height-(blockSize*2)<ballBounce.poistion.y+ballBounce.poistion.raidus&&
      (height-(blockSize*2))+blockSize>ballBounce.poistion.y-ballBounce.poistion.raidus)  {
  
  
  ballBounce.yspeed=-(blockSize/5);
  ballBounce.poistion.y=(height-blockSize*2)-ballBounce.poistion.raidus;
  playme();
 
      }  
}
function checkBall(){
    if(ballRandom.pos.x-ballRandom.pos.raidus<ballBounce.poistion.x+ballBounce.poistion.raidus&&
       ballRandom.pos.x+ballRandom.pos.raidus>ballBounce.poistion.x-ballBounce.poistion.raidus&&
       ballRandom.pos.y-ballRandom.pos.raidus<ballBounce.poistion.y+ballBounce.poistion.raidus&&
       ballRandom.pos.y+ballRandom.pos.raidus>ballBounce.poistion.y-ballBounce.poistion.raidus){
        Score++;
        playme();
        ballRandom.move();
        ballRandom.drawRandom();
    
        
    }
    
    
    
    
}

function ko(){
        
var audio1= document.getElementsByTagName("audio")[1];
audio1.play();
    
}
function playme(){
    
var audio = document.getElementsByTagName("audio")[0];
audio.play();
}
function circle(x,y,raidus,color){
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.strokeStyle=color;
    ctx.arc(x,y,raidus,0,Math.PI*2,true);
        ctx.fill();
}

function drawBorder(color){
    ctx.fillStyle=color;
    ctx.fillRect(0,0,width,blockSize);
    ctx.fillRect(0,0,blockSize,height);
    ctx.fillRect(height-blockSize,0,blockSize,height);
    ctx.fillRect(0,height-blockSize,width,blockSize);
    
}

function ScoreBoard(color){
    ctx.font = "10px Comic Sans MS";
ctx.fillStyle =color ;
ctx.textAlign ="Left" ;
ctx.textBaseline = "Top";
ctx.fillText("SCORE: "+Score,blockSize,blockSize*2);
   
}
function EndGame(color){
     ctx.font = "10px Comic Sans MS";
ctx.fillStyle =color ;
ctx.textAlign ="center" ;
ctx.textBaseline = "center";
ctx.fillText("GAMEOVER!! SCORE WAS "+Score,width/2,height/2);

    
}
function Ball(x,y){
    this.x=x;
    this.y=y;
    this.raidus=blockSize;
    
}
Ball.prototype.drawBall=function(){
    circle(this.x,this.y,this.raidus,"Green");
};


function BouncingBall(){
    this.poistion=new Ball(blockSize*10,blockSize);
    this.xspeed=blockSize/2;
    this.yspeed=blockSize/2;
}
BouncingBall.prototype.drawBouncing=function(){
    this.poistion.drawBall();
    
    
};
BouncingBall.prototype.move=function(){
    this.poistion.x+=this.xspeed;
    this.poistion.y+=this.yspeed;
    
    if(this.poistion.x-this.poistion.raidus<blockSize){
        this.poistion.x=blockSize+this.poistion.raidus;
        this.xspeed=blockSize/2;
    }
   
     if(ballBounce.poistion.y+ballBounce.poistion.raidus>=height-blockSize){
         this.poistion.y=height-blockSize-this.poistion.raidus;
         this.xspeed=0;
         this.yspeed=0;
         EndGame("Red");
         ko();
     window.alert("DO U WANT TO CONTINUE");
       location.reload(true);
     
 }
      if(this.poistion.y-this.poistion.raidus<blockSize){
           this.poistion.y=blockSize+this.poistion.raidus;
        this.yspeed=blockSize/2;
    }
     if(this.poistion.x+this.poistion.raidus>width-blockSize){
         this.poistion.x=width-blockSize-this.poistion.raidus;
        this.xspeed=-blockSize/2;
     }
};
function RandomBall(){
    this.pos=new Ball(blockSize*10,blockSize*10);
    
}
RandomBall.prototype.drawRandom=function(){
    this.pos.drawBall(this.pos.x,this.pos.y);
};
RandomBall.prototype.move=function(){
   this.pos.x=Math.random()*230;
   this.pos.y=Math.random()*350;
    if(this.pos.x-this.pos.raidus<blockSize||this.pos.x+this.pos.raidus>width-blockSize){
        this.pos.x=blockSize*10;
    }
      if(this.pos.y-this.pos.raidus<blockSize||this.pos.y+this.pos.raidus>height-blockSize){
        this.pos.y=blockSize*4;
    }
};
function Racket(){
    this.x=blockSize;
    this.xspeed=0;
} 
Racket.prototype.drawRacket=function(){
   ctx.fillRect(this.x,height-(blockSize*2),blockSize*5,blockSize);
};
Racket.prototype.move=function(direction){
   
    if(direction==="left")
    {
        this.xspeed=-(blockSize);
    }
   else if(direction==="right")
    {
        this.xspeed=blockSize;
    }
    
   
};
Racket.prototype.rest=function(){
    this.xspeed=0;
};
Racket.prototype.setMove=function(){
    this.x+=this.xspeed;
    if(this.x<blockSize){
        this.x=blockSize;
    }
    else if(this.x>width-blockSize*6){
        this.x=width-blockSize*6;
    }
};


$("body").keydown(function (event) {
var direction=keys[event.keyCode];
racket.move(direction);
});
$("body").keyup(function(){
  
    racket.rest();});


 
setInterval(function(){
    ctx.clearRect(0,0,width,height);
     drawBorder("Red");
    ScoreBoard("Blue");
    ballBounce.drawBouncing();
    ballBounce.move();
   racket.drawRacket();
   racket.setMove();
    checkRacket();
   ballRandom.drawRandom();
    checkBall();
   
},30);


