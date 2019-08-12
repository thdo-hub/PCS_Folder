//Phone Charger Simulator
//Team 1%
//Teresa
//Preeti
//Thomas


// let's keep our code tidy with strict mode ??
"use strict";
//the start of the game 
var game = new Phaser.Game(600, 800, Phaser.AUTO);

//properties for main menu 
var start_button;
var bgMain;
var music;
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
		game.load.atlas('No_button', 'assets/img/No_Button.png', 'assets/img/No_Button.json');
		game.load.atlas('Start_button', 'assets/img/Start_Button.png', 'assets/img/Start_Button.json');
		game.load.atlas('Yes_button', 'assets/img/Yes_Button.png', 'assets/img/Yes_Button.json');
		game.load.audio('pop', 'assets/audio/pop01.mp3');
		game.load.audio('music', ['assets/music/Inspiration-pop-music.mp3', 'assets/music/Inspiration-pop-music.wav'] );
	},
	
	create: function(){
		//title 
		bgMain = game.add.sprite(0, 0, 'desk');
		var phoneMainMenu = game.add.sprite(game.width/2, game.height/2 - 100, 'phone');
		phoneMainMenu.anchor.set(0.5);
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
		text = "Press SPACEBAR to go to instructions";
		style = {font: "30px Arial", fill: "#fff", align: "center"};
		var begin = this.game.add.text(this.game.width/2, this.game.height - 200, text, style);
		begin.anchor.set(0.5);
		
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

//variable for instructions 
var instruction_desk;

//this will be used to instruct the player on how to play the game using text 
var Instructions = function(game){
	
};

Instructions.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		
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
		game.add.text(32, 100, this.story_text, text_style);
		
		this.story_text = "This is only a playtest for the multitasking portion of the game";
		game.add.text(32, 200, this.story_text, text_style);
		
		this.story_text = "The narrative of the game is being written in twine";
		game.add.text(32, 300, this.story_text, text_style);
		
		this.story_text = "click on start to begin the game";
		game.add.text(32, 400, this.story_text, text_style);
		
		start_button = game.add.button(game.width/2, game.height - 200, 'Start_button', startGame, this, 'START_Button1', 'START_Button2');
		start_button.anchor.set(0.5);
		
	},
	
	update: function(){
		
	}
}

function startGame(){
	//the action that happens when you press the button 
	game.state.start('Play');
}

//variables for the game 
//booleans
var pluggedIn = false; 
var bool = false;
//objects 
var phone;
var charger;

var wiggle;
var batteryTimer;
var batteryPercentage;
var batteryText;

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
		//stop music 
		music.stop();
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
		charger = game.add.sprite(game.width/2, game.height - 25, 'charger');
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
		charger.animations.add('wiggle', [0,1,2,3], 4, true);
		
		//Phone------------------------------------------------------------------------------------------------------
		//for phone image 
		//the rotation point is set to be the center of the phone so that the phone 
		//can be conpletely in the center of the game screen 
		phone = game.add.sprite(game.width/2, game.height/2 - 100, 'phone');
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
		batteryPercentage = game.rnd.integerInRange(5, 10);
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
		scoreText = game.add.text(10, 25, 'score: 0', {fontSize: '32px', fill: '#fff' });
		
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
		question_text = game.add.text(165, 75, questions_Array[arrayPoint], text_style);
		//random buttons to test out multitasking for our players and dialogue choice 
		no_button = game.add.button(game.width/2, game.height/2 + 75, 'No_button', NoButton, this, 'No_Button2', 'No_Button1', 'No_Button3');
		yes_button = game.add.button(game.width/2, game.height/2 + 20, 'Yes_button', YesButton, this, 'Yes_Button2', 'Yes_Button1', 'Yes_Button3');
		
		no_button.anchor.set(0.5);
		yes_button.anchor.set(0.5);
	},
	
	update: function(){
		//play an animation that show the charger may fall out of the phone 
		var charging = game.physics.arcade.overlap(phone, charger, collisionHandler, null, this);
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
			
			//now check again in another if statement to decide how long the charger will 
			//stay in the phone charging 
			if(charging == true && pluggedIn == true && bool == false){
				//find a random integer to use 
				var rndInteger = game.rnd.integerInRange(3, 6);
				//the animation is already playing as soon as the charger overlaps with the phone 
				//this will decide what to do next after the seconds are over 
				game.time.events.add(Phaser.Timer.SECOND*rndInteger, fallingCharger, this);
				//this function will only happen after the seconds are over 
				
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
		//charger is not pluggedIn---------------------------------------------------------------------------------------------------------
		
		//changes bool back to false when the charger falls out so that we can go through the if statements again 
		
		if(charging == false){
			//change bool back to false to use again when overlap 
			bool = false;
			//stop the animation 
			charger.animations.stop();
			
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
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//also a place where we can reset any values
			button_press_count = 0;
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


