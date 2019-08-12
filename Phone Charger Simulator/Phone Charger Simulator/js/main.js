//Phone Charger Simulator
//Team 1%
//Teresa
//Preeti
//Thomas


// let's keep our code tidy with strict mode ??
"use strict";
//the start of the game 
var game = new Phaser.Game(600, 800, Phaser.AUTO);
var bgMain;
//use var Main Menu to create main menu 
var MainMenu = function(game){};//---------------------------------------------------------------------

//The main menu prototype
MainMenu.prototype = {
	
	preload: function(){
		//preload assets for the game 
		game.load.image('backgroundMain', 'assets/img/bg2.png');
		game.load.spritesheet('charger', 'assets/img/Charger.png', 98, 156);
		game.load.image('phone', 'assets/img/Phone_2.0.png');
		game.load.image('desk', 'assets/img/Desk.png');
		game.load.atlas('buttons', 'assets/img/Buttons.png', 'assets/img/Buttons.json');
	},
	
	create: function(){
		//title 
		bgMain = game.add.sprite(0, 0, 'backgroundMain');
		//scale to fit background on screen 
		//bgMain.scale.setTo(1, 1);
		//game.stage.backgroundColor = "#4bb1b4";
		
		//function for the text wrap
		function addText(x, y, text) {
			let textStyle = {
				font: "Zapfino, Verdana",
				align: "center",
				fontSize: 32
			};	
			let new_text_element = game.add.text(x, y, text, textStyle);
			this.text_elements.append(new_text_element);
		}
		
		//set up a pallete object
		this.palette = {
			A: '#1B1B3A',
			B: '#693668',
			C: '#A74482', 
			D: '#F84AA7',
			E: '#FF3562',
			F: '#FFFFFF'
		};
		
		//Title text 
		var text = "Phone Charger Simulator";
		var style = {font: "50px Arial", fill: "#fff", align: "center" };
		var title = this.game.add.text(this.game.width/2, this.game.height/4, text, style);
		title.anchor.set(0.5);
		//other text 
		this.story_text = "Keep Your Phone Charged While Texting Your Significant Other";
		
		//this allows us to change many things like the font or give the text the ability to wrap on its own 
		let text_style = {
			font: 'Times New Roman',
			fontSize: 32, 
			fill: this.palette.F,
			//added in to give word wrap to the text 
			wordWrap: true,
			wordWrapWidth: 570,
		};
		
		//pasting the text onto the screen 
		game.add.text(32, 250, this.story_text, text_style);
		
		//How to begin the game 
		text = "Press SPACEBAR to Play";
		style = {font: "30px Arial", fill: "#fff", align: "center"};
		var begin = this.game.add.text(this.game.width/2, this.game.height - 200, text, style);
		begin.anchor.set(0.5);
		
	},
	
	update: function(){
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Play');
		}
	}
}

//this will be used to instruct the player on how to play the game using text 
var Instructions = function(game){
	
};

Instructions.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		//How to move character 
		var text = "Press the arrow keys to move the player";
		var style = {font: "30px Arial", fill: "#fff", align: "center"};
		var instruction = this.game.add.text(0, 100, text, style);
		
		
		text = "Press down on the Z key to punch; hold down Z for rapid punching ";
		style = {font: "30px Arial", fill: "#fff", align: "center"};
		instruction = this.game.add.text(0, 150, text, style);
		//instruction.anchor.set(0.5);
		
		text = "Punch the aliens and blocks in your way for points";
		style = {font: "30px Arial", fill: "#fff", align: "center"};
		instruction = this.game.add.text(0, 200, text, style);
		game.add.sprite(650, 180, 'TrumpAlien');
		game.add.sprite(790, 190, 'kennyAtlas', 'bonus');
		//instruction.anchor.set(0.5);
		
		text = "Dodge the beams or you'll die";
		style = {font: "30px Arial", fill: "#fff", align: "center"};
		var instruction = this.game.add.text(0, 250, text, style);
		//instruction.anchor.set(0.5);
		
		//How to begin the game 
		text = "Press SPACEBAR to begin Playing";
		style = {font: "30px Arial", fill: "#fff", align: "center"};
		var begin = this.game.add.text(this.game.width/4, this.game.height - 200, text, style);
		//begin.anchor.set(0.5);
		
	},
	
	update: function(){
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Play');
		}
	}
}

//variables for the game 
//booleans
var pluggedIn = false; 
var bool = false;
//objects 
var phone;
var charger;
var scoreText;
var wiggle;
var batteryTimer;
var batteryPercentage;
var batteryText;

//use var GamePlay for the Play state
var Play = function(game){
	
	
	
};



//GamePlay prototype 
Play.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		//where we create the background, platforms, player, baddies, and collectibles
		game.stage.backgroundColor = "#4bb1b4";
		//physics for the game using ARCADE Physics 
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//The background desk for the game
		//The ratation point has been placed in the center 
		var desk = game.add.sprite(game.width/2, game.height/2, 'desk');
		desk.anchor.set(0.5);
		
		//Charger-----------------------------------------------------------------------------------------------------
		//the charger being added as a var in the game 
		charger = game.add.sprite(game.width/2, game.height - 100, 'charger');
		//set rotation point of charger to be at it's center 
		charger.anchor.set(0.5);
		//set scale for charger 
		//charger.scale.setTo(0.75, 0.75);
		
		//enables input such as drag to be true on the charger so we can drag it with the mouse
		charger.inputEnabled = true;
		charger.input.enableDrag(true);
		//enable body for the charger to use physics 
		charger.enableBody = true;
		game.physics.arcade.enable(charger);
		//changes the hitbox(width, height, x, y) so that only the tip of the charger does anything when hit 
		charger.body.setSize(29, 17, 38, 2);
		
		//animation for the charger wiggling out of the phone 
		charger.animations.add('wiggle', [0,1,2,3], 15, true);
		
		//Phone------------------------------------------------------------------------------------------------------
		//for phone image 
		//the rotation point is set to be the center of the phone so that the phone 
		//can be conpletely in the center of the game screen 
		phone = game.add.sprite(game.width/2, game.height/2, 'phone');
		phone.anchor.set(0.5);
		//phone.scale.setTo(0.75, 0.75);
		
		//phone is given a body to interact with the charger's body and given physics as well
		phone.enableBody = true;
		game.physics.arcade.enable(phone);
		//changes the hitbox(width, height, x, y) so that only a small part of the phone can interact with the charger 
		//for the charging function of the game 
		phone.body.setSize(44, 50, 144, 512);
		
		
		//battery life Timer-------------------------------------------------------------------------------------------
		//battery percentage begins at random number
		batteryPercentage = game.rnd.integerInRange(15, 20);
		//create a basic custom timer for the batterylife
		batteryTimer = game.time.create(false);
		
		//the loop to subtract one percent every few seconds 
		batteryTimer.loop(3000, updateCounter, this);
		//the integer is counting in thousands since it counts in milliseconds (i.e. 2000 is 2 seconds) 
		//for the custom timer you must remember to start it on your own for it to work
		batteryTimer.start();
		
		//add the battery life in as text 
		batteryText = game.add.text(100, 500, batteryPercentage + '%', {fontSize: '32px', fill: '#000'});

		//this is to help with testing------------------------------------------------------------------------------------------------------------
		scoreText = game.add.text(100, 400, 'bool: false', {fontSize: '32px', fill: '#000' });
		
		
		
	},
	
	update: function(){
		//play an animation that show the charger may fall out of the phone 
		var charging = game.physics.arcade.overlap(phone, charger, collisionHandler, null, this);
		scoreText.text = 'bool: ' + charging;
		//use if statement to decided when the charger will fall out of the phone
		
		//Charger is pluggedIn---------------------------------------------------------------------------------------------------------
		//bool is there to make sure that the update function doesn't continuously repeat the same process over and over 
		//unless bool is false
		//It will only go through the if statements at the initial first overlap 
		if(charging == true && pluggedIn == false && bool == false){
			//change the pluggedIn boolean to true since the charger will be plugged into the phone 
			pluggedIn = true;
			
			//now check again in another if statement to decide how long the charger will 
			//stay in the phone charging 
			if(charging == true && pluggedIn == true && bool == false){
				//find a random integer to use 
				var rndInteger = game.rnd.integerInRange(5, 10);
				//the animation is already playing as soon as the charger overlaps with the phone 
				//this will decide what to do next after the seconds are over 
				game.time.events.add(Phaser.Timer.SECOND*rndInteger, fallingCharger, this);
				//this function will only happen after the seconds are over 
				
			}
			//pause the timer for the battery life
			batteryTimer.pause();	
		}
		//charger is not pluggedIn---------------------------------------------------------------------------------------------------------
		
		//changes bool back to false when the charger falls out so that we can go through the if statements again 
		
		if(charging == false){
			//change bool back to false to use again when overlap 
			bool = false;
			//stop the animation 
			charger.animations.stop();
			
			//while the charger is not plugged in drain the battery life  
			batteryTimer.resume();
		}
		//other--------------------------------------------------------------------------------------------------------------
		//update the text displayed for the battery life 
		batteryText.text = batteryPercentage + '%';
		//if batteryPercentage hits zero you lose the game 
		if(batteryPercentage <= 0){
			game.state.start('GameOver');
		}
		
	}
}

//function fallingCharger 
function fallingCharger(){
	//move the y position of the charger to make it seem like it fell off 
	charger.y += 50;
	//change the booleans to so the if statements won't start when the charger is already in the phone 
	pluggedIn = false;
	bool = true;
}
//function updateCounter
//subtracts one percent by the alloted seconds in loop for the timer in Play create:function() 
function updateCounter(){
	//subtracts one from battery percentage 
	batteryPercentage -= 1;
	//changes text to match the new battery percentage 
	
	
}
//plays the animation  
function collisionHandler(){
	//pause the loop that subtracts one percent every few seconds
	//game.state.start('GameOver');
	charger.animations.play('wiggle');
	//console.log('wiggle');
}

//Use var GameOver for gameOver state 
var GameOver = function(game){};

//GameOver prototype 
GameOver.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		//Creating text for the game over screen 
		game.stage.backgroundColor = "#4bb1b4";
		var text = "You Got Blocked Loser";
		var style = {font: "30px Arial", fill: "#fff", align: "center" };
		var retry = this.game.add.text(this.game.width/2, this.game.height - 200, text, style);
		retry.anchor.set(0.5);
		
		text = "press SPACEBAR to go back to main menu";
		style = {font: "30px Arial", fill: "#fff", align: "center" };
		retry = this.game.add.text(this.game.width/2, this.game.height - 100, text, style);
		retry.anchor.set(0.5);
		
		//GAME OVER
		text = "GAME OVER";
		style = {font: "60px Arial", fill: "#fff", align: "center" };
		retry = this.game.add.text(this.game.width/2, 200, text, style);
		retry.anchor.set(0.5);
		
	},
	
	update: function(){
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//also a place where we can reset any values
			game.state.start('Play');
		}
	}
}


//adds the states for the game 
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.add('Instructions', Instructions);
game.state.start('MainMenu');


