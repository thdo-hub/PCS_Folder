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
		game.load.atlas('No_button', 'assets/img/No_Button.png', 'assets/img/No_Button.json');
		game.load.atlas('Start_button', 'assets/img/Start_Button.png', 'assets/img/Start_Button.json');
		game.load.atlas('Yes_button', 'assets/img/Yes_Button.png', 'assets/img/Yes_Button.json');
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
		music = game.add.audio('music', 0.5, true)
		
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

//testing objects 
var no_button;
var yes_button;
var scoreText;
var questions_Array;
var question_text;
var arrayPoint = 0;
var button_press_count = 0;
var button_bool = true;

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
		music.stop();
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
		phoneFramePlay = game.add.sprite(game.width/2, 400, 'phoneFrame');
		phoneFramePlay.anchor.set(0.5);
		phoneFramePlay.scale.setTo(1.35, 1.35);
		
		phoneScreenPlay = game.add.sprite(game.width/2 + 3, 366, 'phoneScreen');
		phoneScreenPlay.anchor.set(0.5);
		phoneScreenPlay.scale.setTo(1.35, 1.35);
		
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

		//this is to help with testing------------------------------------------------------------------------------------------------------------
		scoreText = game.add.text(10, game.height - 100, 'score: 0', {fontSize: '32px', fill: '#fff' });
		
		//dialogue beginning
		//so dialogue begins at the first node called start
		//storyrunner has the yarn data for the narrative 
		//run() will start the yarn game at the name of the node given 
		dialogue = storyrunner.run('Start');
		
		//result contains the first text that is in dialogue
		//saying dialogue.next() again will give result the options under the text in an array 
		result = dialogue.next();
		
		//array for random questions testing 
		questions_Array = ['will you play?', 'are you sure?', 'can you hit the buttons?', 'how about now?', 'now?', 'I wonder how long you will last?', 'ready?', 'Go!'];
		
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
		
		//this allows us to change many things like the font or give the text the ability to wrap on its own 
		let text_style = {
			font: 'Times New Roman',
			fontSize: 32, 
			fill: this.palette.F,
			//added in to give word wrap to the text 
			wordWrap: true,
			wordWrapWidth: 250,
		};
		
		//pasting the text onto the screen 
		question_text = game.add.text(175, 250, result, text_style);
		//random buttons to test out multitasking for our players and dialogue choice 
		no_button = game.add.button(game.width/2, 610, 'No_button', NoButton, this, 'No_Button2', 'No_Button1', 'No_Button3');
		yes_button = game.add.button(game.width/2, 550, 'Yes_button', YesButton, this, 'Yes_Button2', 'Yes_Button1', 'Yes_Button3');
		
		no_button.anchor.set(0.5);
		yes_button.anchor.set(0.5);
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
		//scoreText.text = 'score: ' + button_press_count;
		scoreText.text = 'score: ' + button_press_count;
		question_text.text = questions_Array[arrayPoint];
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
			
			//if charger is plugged in make buttons visible 
			if(button_bool == false){
				//decides whether the player can see the buttons or not 
				yes_button.visible =! yes_button.visible;
				no_button.visible =! no_button.visible;
				//button boolean variable
				button_bool = true;
			}
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
			//make the button invisible if charger is not plugged in(testing)
			if(button_bool == true){
				//decides whether the player can see the buttons or not 
				yes_button.visible =! yes_button.visible;
				no_button.visible =! no_button.visible;
				//button boolean variable 
				button_bool = false;
			}
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

//function NoButton 
function NoButton(){
	game.state.start('GameOver');
}

//function YesButton 
function YesButton(){
	//play audio 
	game.sound.play('pop');
	
	//the buttons will move around at a certain point 
	if(arrayPoint >= 2){
		yes_button.x = game.rnd.integerInRange(0, game.width);
		yes_button.y = game.rnd.integerInRange(0, game.height - 50);
		
		no_button.x = game.rnd.integerInRange(0, game.width);
		no_button.y = game.rnd.integerInRange(0, game.height - 50);
	}
	
	if(arrayPoint < 7){
		//this statement will stop adding when the array reaches the end
		arrayPoint += 1;
	}
	//an if statement to create a score for fun 
	if(arrayPoint >= 7){
		button_press_count += 25;
	}
	
}

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
		
		//score (testing process)
		text = scoreText.text;
		style = {font: "32px", fill: "#fff", align: "center" };
		var score = this.game.add.text(10, 25, text, style);
		
	},
	
	update: function(){
		
		//make the buttons invisible at the start if they lose when charger is pluggedIn 
		//since when the charger is pluggedIn and they lose the buttons will become visible
		//when they play again instead of refreshing the page.
		if(button_bool == true){
			yes_button.visible =! yes_button.visible;
			no_button.visible =! no_button.visible;
			//change the boolean so that update doesn't continuously activate the if statement 
			button_bool = false;
		}
			
		//change booleans back to original values 
		pluggedIn = false;
		bool = false;
		timerBool = false;
		button_press_count = 0;
		arrayPoint = 0;
		
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//also a place where we can reset any values
			button_bool = true;
			
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
