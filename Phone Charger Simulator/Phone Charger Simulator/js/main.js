//Phone Charger Simulator
//Team 1%
//Teresa
//Preeti
//Thomas
//github link: https://github.com/thdo-hub/PCS_Folder     
// there is an ' _ ' between the PCS and Folder just so you know 


// let's keep our code tidy with strict mode ??
"use strict";
//the start of the game 
var game = new Phaser.Game(720, 650, Phaser.AUTO);
//a storyrunner for grabbing narrative text from our json file created by yarn
//used for the narrative portion of the game.
var storyrunner = new bondage.Runner();

//properties for main menu 
//global variables but not used in anywhere but MainMenu state 
var start_button;
var bgMain;
//music is a global variable because we need to stop it from playing continuously in the Play state 
var music;
//use var Main Menu to create main menu 
var MainMenu = function(game){};//---------------------------------------------------------------------

//The main menu prototype
MainMenu.prototype = {
	
	preload: function(){
		//preload assets for the game 
		game.load.image('backgroundMain', 'assets/img/bg2.png');
		game.load.spritesheet('charger', 'assets/img/Charger_Broken_Full.png', 64, 225);
		game.load.image('phoneFrame', 'assets/img/Phone_Frame.png');
		game.load.image('phoneScreen', 'assets/img/Phone_Background.png');
		game.load.image('desk', 'assets/img/Desk.png');
		game.load.atlas('Start_button', 'assets/img/Start_Button.png', 'assets/img/Start_Button.json');
		game.load.audio('pop', 'assets/audio/pop01.mp3');
		//music by PapaninKasettratat
		game.load.audio('music', ['assets/music/Inspiration-pop-music.mp3', 'assets/music/Inspiration-pop-music.wav'] );
		//json file 
		game.load.json('story', 'assets/json/phonestory.json');
	},
	
	create: function(){
		//changes the bounds of the world to not be just the canvas
		game.world.setBounds(0, 0, 720, 960);
		game.camera.setPosition(0, 800);
		
		//loading storyrunner into phaser
		storyrunner.load(game.cache.getJSON('story'));
		
		//title 
		bgMain = game.add.tileSprite(0, 0, 720, 960, 'desk');
		
		
		
		var phoneFrameMainMenu = game.add.sprite(game.width/2, 480, 'phoneFrame');
		phoneFrameMainMenu.scale.setTo(1.35, 1.35);
		phoneFrameMainMenu.anchor.set(0.5);
		
		var phoneScreenMainMenu = game.add.sprite(game.width/2 + 3, 447, 'phoneScreen');
		phoneScreenMainMenu.scale.setTo(1.35, 1.35);
		phoneScreenMainMenu.anchor.set(0.5);
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
		var title = this.game.add.text(this.game.width/2, 400, text, style);
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
		game.add.text(32, 550, this.story_text, text_style);
		
		//How to begin the game 
		text = "Press SPACEBAR to go to instructions";
		style = {font: "30px Arial", fill: "#fff", align: "center"};
		var begin = this.game.add.text(32, 650, text, style);
		
		
		//play music background
		//music = game.add.audio('music', 0.5, true);
		
		//game.sound.setDecodedCallback(music, start, this);
		
		
	},
	
	update: function(){
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Instructions');
		}
	}
}

function start(){
	//music.play();
}

//global variable used only for Instructions state 
var instruction_desk;

//this will be used to instruct the player on how to play the game using text 
var Instructions = function(game){
	
};

Instructions.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		//changes the bounds of the world to not be just the canvas
		game.world.setBounds(0, 0, 720, 960);
		game.camera.setPosition(0, 800);
		
		instruction_desk = game.add.sprite(0, 0, 'desk');
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
		
		this.story_text = "Keep Your Phone Charged While answering questions";
		
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
		game.add.text(32, 350, this.story_text, text_style);
		
		this.story_text = "This is only a playtest for the multitasking portion of the game";
		game.add.text(32, 425, this.story_text, text_style);
		
		this.story_text = "The narrative of the game is being written in twine";
		game.add.text(32, 500, this.story_text, text_style);
		
		this.story_text = "click on start to begin the game";
		game.add.text(32, 575, this.story_text, text_style);
		
		this.story_text = "Use the mouse to click and drag the charger and press the buttons";
		game.add.text(32, 625, this.story_text, text_style);
		
		this.story_text = "The charger must be plugged in to press the buttons";
		game.add.text(32, 700, this.story_text, text_style);
		
		this.story_text = "Use W to move camera up and S to move camera down";
		game.add.text(32, 775, this.story_text, text_style);
		
		start_button = game.add.button(game.width/2, 850, 'Start_button', startGame, this, 'START_Button1', 'START_Button2');
		start_button.anchor.set(0.5);
		
	},
	
	update: function(){
		
	}
}

function startGame(){
	//the action that happens when you press the button 
	game.state.start('Play');
}

//global variables for the Play state 
//booleans
var pluggedIn = false; 
var bool = false;
var timerBool = false;
//objects 
var phoneFramePlay;
var phoneScreenPlay;
var charger;

var batteryTimer;
var batteryPercentage;
var batteryText;
var keepChargerInPlaceY = 0;
var keepChargerInPlaceX = 0;

//dialogue variables 
var dialogue;
var result;
var SigOtherText;
var YourText;


//use var GamePlay for the Play state
var Play = function(game){
	
	
	
};



//GamePlay prototype 
Play.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		//changes the bounds of the world to not be just the canvas
		game.world.setBounds(0, 0, 720, 960);
		//have the camera start at the bottom 
		game.camera.setPosition(0, 960);
		//720 is the width of the game world not the canvas and 960 is the height 
		//of the game world not the canvas 
		//game.width and game.height takes the size of the canvas not the world 
		
		//stop music 
		//music.stop();
		
		
		//where we create the background, platforms, player, baddies, and collectibles
		game.stage.backgroundColor = "#4bb1b4";
		//physics for the game using ARCADE Physics 
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//The background desk for the game
		//The ratation point has been placed in the center 
		var desk = game.add.sprite(360, 480, 'desk');
		desk.anchor.set(0.5);
		
		//Charger-----------------------------------------------------------------------------------------------------
		//the charger being added as a var in the game 
		charger = game.add.sprite(game.width/2, 960, 'charger');
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
		charger.body.setSize(26, 19, 18, 0);
		
		//animation for the charger wiggling out of the phone 
		charger.animations.add('wiggle', [0,1,2,3], 4, true);
		charger.frame = 5;
		//charger.animations.add();
		
		//Phone------------------------------------------------------------------------------------------------------
		//for phone image 
		//the rotation point is set to be the center of the phone so that the phone 
		//can be conpletely in the center of the game screen 
		
		phoneScreenPlay = game.add.sprite(game.width/2 + 3, 366, 'phoneScreen');
		phoneScreenPlay.anchor.set(0.5);
		phoneScreenPlay.scale.setTo(1.35, 1.35);
		
		phoneFramePlay = game.add.sprite(game.width/2, 400, 'phoneFrame');
		phoneFramePlay.anchor.set(0.5);
		phoneFramePlay.scale.setTo(1.35, 1.35);

		//phone is given a body to interact with the charger's body and given physics as well
		phoneFramePlay.enableBody = true;
		game.physics.arcade.enable(phoneFramePlay);
		
		//changes the hitbox(width, height, x, y) so that only a small part of the phone can interact with the charger 
		//for the charging function of the game 
		//phone.body.setSize(44, 50, 144, 512);
		
		
		//battery life Timer-------------------------------------------------------------------------------------------
		//battery percentage begins at random number
		batteryPercentage = game.rnd.integerInRange(5, 10);
		//create a basic custom timer for the batterylife
		batteryTimer = game.time.create(false);
		
		//the loop to subtract one percent every few seconds 
		batteryTimer.loop(3000, updateCounter, this);
		//the integer is counting in thousands since it counts in milliseconds (i.e. 2000 is 2 seconds) 
		//for the custom timer you must remember to start it on your own for it to work
		batteryTimer.start();
		
		//add the battery life in as text 
		batteryText = game.add.text(500, 50, batteryPercentage + '%', {fontSize: '32px', fill: '#000'});
		
		//dialogue beginning----------------------------------------------------------------------------------------------
		//so dialogue begins at the first node called start
		//storyrunner has the yarn data for the narrative 
		//run() will start the yarn game at the name of the node given 
		dialogue = storyrunner.run('Start');
		
		//result contains the first text that is in dialogue
		//saying dialogue.next() again will give result the options under the text in an array 
		result = dialogue.next();
		//so now result has the text dialogue from Yarn
		//now result.value contains the text we need but it is an object 
		//so before we can use the text we want to say result.value.text to get what we need 
		SigOtherText = result.value.text;
		
		//function for the text wrap
		function addText(x, y, text) {
			let textStyle = {
				font: "Zapfino, Verdana",
				align: "center",
				fontSize: 32
			};	
			//new way to add in text to use the text wrap function 
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
		
		//this allows us to change many things like the font or give the text the ability to wrap on its own
		//this is also the style of font 
		let text_style = {
			font: 'Times New Roman',
			fontSize: 32, 
			fill: this.palette.F,
			//added in to give word wrap to the text 
			wordWrap: true,
			wordWrapWidth: 375,
		};
		
		//pasting the text onto the screen 
		game.add.text(175, 250, SigOtherText, text_style);
		
	},
	
	update: function(){
		//camera controls with wasd keys
		if(game.input.keyboard.isDown(Phaser.Keyboard.W) ){
			game.camera.y -= 50;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.S) ){
			game.camera.y += 50;
		}
		
		//play an animation that show the charger may fall out of the phone 
		var charging = game.physics.arcade.overlap(phoneFramePlay, charger, collisionHandler, null, this);
		//use if statement to decided when the charger will fall out of the phone
		
		//Charger is pluggedIn---------------------------------------------------------------------------------------------------------
		//bool is there to make sure that the update function doesn't continuously repeat the same process over and over 
		//unless bool is false
		//It will only go through the if statements at the initial first overlap 
		if(charging == true && pluggedIn == false && bool == false){
			//change the pluggedIn boolean to true since the charger will be plugged into the phone 
			pluggedIn = true;
			//the y is a magic number 
			keepChargerInPlaceY = 890;
			//the x is a magic number 
			keepChargerInPlaceX = 359;
			
			//now check again in another if statement to decide how long the charger will 
			//stay in the phone charging 
			while(charging == true && pluggedIn == true && bool == false){
				
				if(timerBool == true){
					// get out of the loop if timerBool is true;
					break;
				}
				//find a random integer to use 
				var rndInteger = game.rnd.integerInRange(3, 6);
				//the animation is already playing as soon as the charger overlaps with the phone 
				//this will decide what to do next after the seconds are over 
				game.time.events.add(Phaser.Timer.SECOND*rndInteger, fallingCharger, this);
				//this function will only happen after the seconds are over 
				timerBool = true;
			}
			//pause the timer for the battery life
			batteryTimer.pause();	
		}
		
		//keep charger in place 
		if(charging == true){
			charger.y = keepChargerInPlaceY - 17;
			charger.x = keepChargerInPlaceX;
		}
		//charger is not pluggedIn---------------------------------------------------------------------------------------------------------
		
		//changes bool back to false when the charger falls out so that we can go through the if statements again 
		
		if(charging == false){
			//change booleans back to false to use again when overlap 
			bool = false;
			pluggedIn = false;
			//stop the animation 
			charger.animations.stop();
			charger.frame = 5;
			
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
	//everything in fallingCharger happens after a certain amount of time from the timer event 
	
	//move the y position of the charger to make it seem like it fell off 
	//since the if statement in update has charger.y be this (var - 17) then it's okay to say this
	keepChargerInPlaceY = 960;
	
	//change the booleans to so the if statements won't start when the charger is already in the phone 
	pluggedIn = false;
	bool = true;
	timerBool = false;
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


//global variables used only for GameOver 
var deskGameOver;
//Use var GameOver for gameOver state 
var GameOver = function(game){};

//GameOver prototype 
GameOver.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		//changes the bounds of the world to not be just the canvas
		game.world.setBounds(0, 0, 720, 960);
		game.camera.setPosition(0, 0);
		//Creating text for the game over screen 
		deskGameOver = game.add.sprite(game.width/2, game.height/2, 'desk');
		deskGameOver.anchor.set(0.5);
		
		
		var text = "You Lose";
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
			
		//change booleans back to original values 
		pluggedIn = false;
		bool = false;
		timerBool = false;
		
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//also a place where we can reset any values
			
			//changing the state must come last 
			game.state.start('MainMenu');
		}
	}
}


//adds the states for the game 
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.add('Instructions', Instructions);
game.state.start('MainMenu');
