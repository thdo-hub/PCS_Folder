//Phone Charger Simulator
//Team 1%
//Teresa Chen
//Preeti Mal
//Thomas Do
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
		game.load.spritesheet('charger', 'assets/img/Charger_Broken_Full.png', 64, 225);
		game.load.image('phoneFrame', 'assets/img/Phone_Frame.png');
		game.load.image('phoneScreen', 'assets/img/Phone_Background.png');
		game.load.image('desk', 'assets/img/Desk.png');
		game.load.image('deskHole', 'assets/img/Desk_Hole.png');
		game.load.image('phoneMainMenu', 'assets/img/menu.png');
		game.load.image('wordBar', 'assets/img/Word_Bar.png');
		game.load.image('textBar', 'assets/img/Text_Bar.png');
		game.load.atlas('Start_button', 'assets/img/Start_Button.png', 'assets/img/Start_Button.json');
		game.load.audio('pop', 'assets/audio/pop01.mp3');
		game.load.atlas('optionButton', 'assets/img/Options_Button.png', 'assets/img/Options_Button.json');
		//music by PapaninKasettratat
		game.load.audio('music', 'assets/music/Menu_Music.mp3' );
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
		
		var phoneFrameMainMenu = game.add.sprite(game.width/2, 520, 'phoneMainMenu');
		phoneFrameMainMenu.scale.setTo(1.35, 1.35);
		phoneFrameMainMenu.anchor.set(0.5);
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
		var title = this.game.add.text(this.game.width/2, 350, text, style);
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
		game.add.text(32, 500, this.story_text, text_style);
		
		//How to begin the game 
		text = "Press SPACEBAR to go to instructions";
		style = {font: "30px Arial", fill: "#fff", align: "center"};
		var begin = this.game.add.text(32, 700, text, style);
		
		
		//play music background
		music = game.add.audio('music', 0.5, true);
		
		game.sound.setDecodedCallback(music, start, this);
		
		
	},
	
	update: function(){
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Instructions');
		}
	}
}

function start(){
	music.play();
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
var sigOtherText;
var yourText;
var Option1;
var Option2;
var otherTextGroup;
var yourTextGroup;
var optionButton1;
var optionButton2;
var nameText;
var PlayStyle;
var PlayTitle1;
var PlayTitle2;
var PlayTitle3;
var PlayTitle4;
//arrays
var peopleArray;
var pastTextsArray;

//variables for the text appearing on screen 
var box1;
var box2;
var box3;
var box4;

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
		
		//stop music from the menu from playing any further
		music.stop();
		
		//array for names 
		peopleArray = ['Bae', 'Me'];
		//array for the past text 
		pastTextsArray = ["Where are you?", "Why aren't you picking up?", "Okay, ttyl"];
		//where we create the background, platforms, player, baddies, and collectibles
		game.stage.backgroundColor = "#4bb1b4";
		//physics for the game using ARCADE Physics 
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//PhoneScreen------------------------------------------------------------------------------------------------------
		//for phone image 
		//the rotation point is set to be the center of the phone so that the phone 
		//can be completely in the center of the game screen 
		//everything will be in front of the phone screen
		
		phoneScreenPlay = game.add.sprite(game.width/2 + 3, 366, 'phoneScreen');
		phoneScreenPlay.anchor.set(0.5);
		phoneScreenPlay.scale.setTo(1.35, 1.35);
		
		//art asset to make the phone look better
		var wordBar = game.add.sprite(161, 545, 'wordBar');
		wordBar = game.add.sprite(161, 47, 'wordBar');
		var textGroup = game.add.group();
		var textBar = textGroup.create(160, 420, 'textBar');
		textBar = textGroup.create(160, 300, 'textBar');
		textBar = textGroup.create(160, 180, 'textBar');
		
		//buttons so the player can progress throught the narrative------------------------------------------------------------
		
		//the button will be on top of the phone screen but behind everything else //560
		optionButton1 = game.add.button(160, 565, 'optionButton', choice1, this, 'Options_Button2', 'Options_Button1', 'Options_Button3');
		optionButton2 = game.add.button(160, 625, 'optionButton', choice2, this, 'Options_Button2', 'Options_Button1', 'Options_Button3');
		//Text-------------------------------------------------------------------------------------------------------------
		//The texting style will resemble discord a lot but not really
		
		
		//so dialogue begins at the first node called start
		//storyrunner has the yarn data for the narrative 
		//run() will start the yarn game at the name of the node given
		//the text will appear in front of the phone screen but be heind everything else, to look more like messaging on a phone 
		dialogue = storyrunner.run('Start');
		
		//result contains the first text that is in dialogue
		//saying dialogue.next() again will give result the options under the text in an array 
		result = dialogue.next();
		//so now result has the text dialogue from Yarn
		//now result.value contains the text we need but it is an object 
		//so before we can use the text we want to say result.value.text to get what we need 
		sigOtherText = result.value.text;
		
		//function for the text wrap
		function addText(x, y, text) {
			let textStyle = {
				font: "Zapfino, Verdana",
				align: "center",
				fontSize: 12
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
			fontSize: 18, 
			fill: this.palette.F,
			//added in to give word wrap to the text 
			wordWrap: true,
			wordWrapWidth: 375,
		};
		
		//pasting the text onto the screen 
		
		//this is for the username that people see on text 
		
		nameText = peopleArray[0];
		PlayStyle = {font: "15px Arial", fill: "#fff", align: "center" };
		PlayTitle1 = game.add.text(175, 432, nameText, PlayStyle);
		
		PlayTitle2 = game.add.text(175, 312, nameText, PlayStyle);
		
		PlayTitle3 = game.add.text(175, 192, nameText, PlayStyle);
		
		nameText = peopleArray[1];
		PlayTitle4 = game.add.text(175, 72, nameText, PlayStyle);
		//this will be where the text that have word wrap be located 
		
		box1 = game.add.text(175, 450, sigOtherText, text_style);
		box2 = game.add.text(175, 330, pastTextsArray[1], text_style);
		box3 = game.add.text(175, 210, pastTextsArray[0], text_style);
		box4 = game.add.text(175, 90, pastTextsArray[2], text_style);
		//look at the options given by having result go to the next dialogue in the Yarn node 
		result = dialogue.next();
		//now result has the options in an array result.value.options
		//put the options available in the global variables for the options 
		Option1 = result.value.options[0];
		Option2 = result.value.options[1];
		
		//now paste the options on screen 
		game.add.text(175, 565, Option1, text_style);
		game.add.text(175, 625, Option2, text_style);
		
		//desk--------------------------------------------------------------------------------------------------------------
		//the desk has a hole where the text will appear on the phone screen and behind the desk 
		//The background desk for the game
		//The rotation point has been placed in the center 
		var desk = game.add.sprite(360, 480, 'deskHole');
		desk.anchor.set(0.5);
		
		//Charger-------------------------------------------------------------------------------------------------------------
		//the charger being added as a var in the game 
		charger = game.add.sprite(game.width/2, 960, 'charger');
		//set rotation point of charger to be at it's center 
		charger.anchor.set(0.5);
		
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
		
		
		
		//PhoneFrame----------------------------------------------------------------------------------------------------
		//goes on top of everything to cover any holes and have the text only look like it appears on the phone screen 
		
		phoneFramePlay = game.add.sprite(game.width/2, 400, 'phoneFrame');
		phoneFramePlay.anchor.set(0.5);
		phoneFramePlay.scale.setTo(1.35, 1.35);

		//phone is given a body to interact with the charger's body and given physics as well
		phoneFramePlay.enableBody = true;
		game.physics.arcade.enable(phoneFramePlay);
		
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
		batteryText = game.add.text(500, 50, batteryPercentage + '%', {fontSize: '13px', fill: '#fff'});
		
		
	},
	
	update: function(){
		//camera controls with wasd keys
		if(game.input.keyboard.isDown(Phaser.Keyboard.W) ){
			game.camera.y -= 10;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.S) ){
			game.camera.y += 10;
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

//choice1
function choice1(){
	//what happens when player chooses first choice
	
	//play text sound effect
	
}

function choice2(){
	//what happens when player chooses second choice 
	
	//play text sound effect 
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
