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

var bgMain;
var start_button;
var credits_button;

//music is a global variable because we need to stop it from playing continuously in the Play state 
var music;
//use var Main Menu to create main menu 
var MainMenu = function(game){};//---------------------------------------------------------------------

//The main menu prototype
MainMenu.prototype = {
	
	preload: function(){
		//preload assets for the game 
		//spritesheets 
		game.load.spritesheet('charger', 'assets/img/Charger_Broken_Full.png', 64, 225);
		//images 
		game.load.image('phoneFrame', 'assets/img/Phone_Frame.png');
		game.load.image('phoneScreen', 'assets/img/Phone_Background.png');
		game.load.image('desk', 'assets/img/Desk.png');
		game.load.image('deskHole', 'assets/img/Desk_Hole.png');
		game.load.image('phoneMainMenu', 'assets/img/menu.png');
		game.load.image('wordBar', 'assets/img/Word_Bar.png');
		game.load.image('textBar', 'assets/img/Text_Bar.png');
		game.load.image('credits', 'assets/img/creditScene.png');
		game.load.image('topBar', 'assets/img/Top_Bar.png');
		game.load.image('goodEnding', 'assets/img/Good_Ending.png');
		game.load.image('mutualEnding', 'assets/img/Mutual_Ending.png');
		//atlases
		game.load.atlas('button', 'assets/img/Buttons_2.0.png', 'assets/img/Buttons_2.0.json');
		game.load.atlas('optionButton', 'assets/img/Options_Button_2.png', 'assets/img/Options_Button_2.json');
		//audio
		game.load.audio('pop', 'assets/audio/pop01.mp3');
		game.load.audio('music', 'assets/music/Menu_Music.mp3' );
		game.load.audio('playMusic', 'assets/music/Background_Music.mp3' );
		game.load.audio('texting', 'assets/audio/Texting.mp3');
		game.load.audio('messageReceived', 'assets/audio/Message_Received.mp3');
		//json file 
		game.load.json('story', 'assets/json/phonestory_Version_2.json');
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
		
		start_button = game.add.button(game.width/2, 860, 'button', instructions, this, 'NEXT_Button2', 'NEXT_Button1', 'NEXT_Button3');
		start_button.anchor.set(0.5);
		
		credits_button = game.add.button(game.width/2, 800, 'button', creditsPage, this, 'CREDITS_Button2', 'CREDITS_Button1', 'CREDITS_Button3');
		credits_button.anchor.set(0.5);
		
		
		
	},
	
	update: function(){
		
	}
}

function instructions(){
	game.state.start('Instructions');
}
function start(){
	music.play();
}

//global variable used only for Instructions state 
var instruction_desk;

//this will be used to instruct the player on how to play the game using text-----------------------------------------------------------------------------------------------------------------------
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
		
		this.story_text = "Welcome to Phone Charger Simulator";
		
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
		
		this.story_text = "Keep Your Phone Charged While answering questions";
		game.add.text(32, 400, this.story_text, text_style);
		
		this.story_text = "Click on the options at the bottom of the phone to deceive your significant other";
		game.add.text(32, 475, this.story_text, text_style);
		
		this.story_text = "Use the mouse to click and drag the charger and press the buttons";
		game.add.text(32, 550, this.story_text, text_style);
		
		this.story_text = "Use W to move camera up and S to move camera down";
		game.add.text(32, 625, this.story_text, text_style);
		
		this.story_text = "Click on start to begin the game";
		game.add.text(32, 700, this.story_text, text_style);
		
		start_button = game.add.button(game.width/2, 775, 'button', startGame, this, 'START2_Button2', 'START2_Button1', 'START2_Button3');
		start_button.anchor.set(0.5);
		
		credits_button = game.add.button(game.width/2, 840, 'button', creditsPage, this, 'CREDITS_Button2', 'CREDITS_Button1', 'CREDITS_Button3');
		credits_button.anchor.set(0.5);
		
	},
	
	update: function(){
		//camera controls with wasd keys
		if(game.input.keyboard.isDown(Phaser.Keyboard.W) ){
			game.camera.y -= 10;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.S) ){
			game.camera.y += 10;
		}
	}
}

function startGame(){
	//the action that happens when you press the button 
	game.state.start('Play');
}

function creditsPage(){
	//takes you to the credits page 
	game.state.start('Credits');
}

//global variables for the Play state 
//booleans
var pluggedIn = false; 
var bool = false;
var timerBool = false;
var textBool = false;
//objects 
var phoneFramePlay;
var phoneScreenPlay;
var charger;

var batteryTimer;
var batteryPercentage;
var batteryText;
var keepChargerInPlaceY = 0;
var keepChargerInPlaceX = 0;
var backgroundMusic;
var clock;
var hour = 9;
var minute1 = 2;
var minute2 = 7;
var clockText;

//dialogue variables 
var dialogue;
var result;
var sigOtherText;
var yourText;
var Option1;
var Option2;
var optionButton1;
var optionButton2;

//arrays
var peopleArray;
var pastTextsArray;
var mutualArray;
var blockArray;
var savedArray;

//variables for the text appearing on screen 
var box1;
var box2;
var box3;
var box4;
var nameText;
var PlayStyle;
var PlayTitle1;
var PlayTitle2;
var PlayTitle3;
var PlayTitle4;
var SigOtherReplay;
var endingText;
var clock1;
var clock2;
var clock3;
var clock4;

//use var GamePlay for the Play state-----------------------------------------------------------------------------------------------------------------------------------------------------
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
		game.camera.setPosition(0, 0);
		//720 is the width of the game world not the canvas and 960 is the height 
		//of the game world not the canvas 
		//game.width and game.height takes the size of the canvas not the world 
		
		//stop music from the menu from playing any further
		music.stop();
		//start music for play state 
		//play music background
		backgroundMusic = game.add.audio('playMusic', 0.5, true);
		
		backgroundMusic.play();
		//array for names 
		peopleArray = ['Bae', 'Me', 'Bae is texting...'];
		//array for the past text 
		pastTextsArray = ["Where are you?", "Why aren't you picking up?", "Okay, ttyl"];
		
		//array for ending text 
		mutualArray = ["You have blocked this user", "Good to know we're on the same page. Well I was happy we could amically break up. I'll see you around in school then.", "The End"];
		savedArray = ["ttyl"];
		blockArray = ["You are blocked", "You have been blocked"];
		
		clock1 = "10:48";
		clock2 = "11:52";
		clock3 = "11:59";
		clock4 = "9:19";
		
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
		var textGroup = game.add.group();
		var textBar = textGroup.create(160, 420, 'textBar');
		textBar = textGroup.create(160, 300, 'textBar');
		textBar = textGroup.create(160, 180, 'textBar');
		
		//buttons so the player can progress throught the narrative------------------------------------------------------------
		
		//the button will be on top of the phone screen but behind everything else //560
		optionButton1 = game.add.button(160, 565, 'optionButton', choice1, this, 'Options2_Button2', 'Options2_Button1', 'Options2_Button3');
		optionButton2 = game.add.button(160, 625, 'optionButton', choice2, this, 'Options2_Button2', 'Options2_Button1', 'Options2_Button3');
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
			F: '#FFFFFF',
			G: '#000000'
		};
		
		let text_style1 = {
			font: 'Times New Roman',
			fontSize: 14, 
			fill: this.palette.F,
			//added in to give word wrap to the text 
			wordWrap: true,
			wordWrapWidth: 375,
		};
		//this allows us to change many things like the font or give the text the ability to wrap on its own
		//this is also the style of font 
		let text_style2 = {
			font: 'Times New Roman',
			fontSize: 12, 
			fill: this.palette.G,
			//added in to give word wrap to the text 
			wordWrap: true,
			wordWrapWidth: 375,
		};

		//pasting the text onto the screen 
		
		//this is for the username that people see on text 
		
		nameText = peopleArray[0];
		PlayStyle = {font: "15px Arial", fill: "#fff", align: "center" };
		PlayTitle1 = game.add.text(200, 420, nameText + " " + clock4, PlayStyle);
		
		PlayTitle2 = game.add.text(200, 300, nameText + " " + clock3, PlayStyle);

		PlayTitle3 = game.add.text(200, 180, nameText + " " + clock2, PlayStyle);

		//switch text of array 
		nameText = peopleArray[1];
		PlayTitle4 = game.add.text(200, 60, nameText + " " + clock1, PlayStyle);
		//this text is to indicate to the player that they have to wait before selecting options again 
		nameText = peopleArray[2];
		PlayStyle = {font: "10px Arial", fill: "#000", align: "center"};
		SigOtherReplay = game.add.text(175, 545, nameText, PlayStyle);
		//It stays invisible until a choice is selected 
		SigOtherReplay.visible =! SigOtherReplay.visible;
		//this will be where the text that have word wrap be located 
		
		box1 = game.add.text(175, 440, sigOtherText, text_style1);
		box2 = game.add.text(175, 320, pastTextsArray[1], text_style1);
		box3 = game.add.text(175, 200, pastTextsArray[0], text_style1);
		box4 = game.add.text(175, 80, pastTextsArray[2], text_style1);
		//look at the options given by having result go to the next dialogue in the Yarn node 
		result = dialogue.next();
		//now result has the options in an array result.value.options
		//put the options available in the global variables for the options;
		
		Option1 = game.add.text(175, 565, result.value.options[0], text_style2);
		Option2 = game.add.text(175, 625, result.value.options[1], text_style2);
		
		//the bar up top that needs to be on top of the text 
		wordBar = game.add.sprite(161, 47, 'topBar');
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
		batteryPercentage = 10;
		//create a basic custom timer for the batterylife
		batteryTimer = game.time.create(false);
		
		//the loop to subtract one percent every few seconds 
		batteryTimer.loop(15000, updateCounter, this);
		//the integer is counting in thousands since it counts in milliseconds (i.e. 2000 is 2 seconds) 
		//for the custom timer you must remember to start it on your own for it to work
		batteryTimer.start();
		
		//add the battery life in as text 
		batteryText = game.add.text(500, 50, batteryPercentage + '%', {fontSize: '13px', fill: '#fff'});
		
		//clock------------------------------------------------------------------------------------------------------------
		//basic custom time for the clock 
		clock = game.time.create(false);
		//the loop that will add one to the minutes
		clock.loop(3000, updateClock, this);
		//the custom timer needs to be start manuelly 
		clock.start();
		
		//now for the text of the clock 
		clockText = game.add.text(450, 50, hour + ':' + minute1 + minute2, {fontSize: '13px', fill: '#fff'});
		
	},
	//end of Play state create function()
	
	
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
				var rndInteger = game.rnd.integerInRange(9, 12);
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
			game.state.start('DeadBattery');
		}
		clockText.text = hour + ':' + minute1 + minute2;
		
		//this is to help with the changing dialogue 
		
	}//end of Play state update function()
	
	
}

//function fallingCharger 
function fallingCharger(){
	//everything in fallingCharger happens after a certain amount of time from the timer event 
	
	//move the y position of the charger to make it seem like it fell off 
	//since the if statement in update has charger.y be this (var - 17) then it's okay to say this
	keepChargerInPlaceY = 960;
	game.sound.play('pop');
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
//function updateClock 
function updateClock(){
	if(minute1 < 6 && minute2 < 9 ){
		minute2 += 1;
		
	}else if(minute2 >= 9 ){
		minute2 = 0;
		minute1 += 1;
	}else if(minute1 >= 6){
		minute2 = 0;
		minute1 = 0;
		hour += 1;
	}else if(hour >= 12){
		hour = 1;
		minute1 = 0;
		minute2 = 0;
	}
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
	
	//play a sound to indicate the choice was selected 
	game.sound.play('texting');
	//move text up 
	PlayTitle4.text = PlayTitle3.text;
	PlayTitle3.text = PlayTitle2.text;
	PlayTitle2.text = PlayTitle1.text;
	
	box4.text = box3.text;
	box3.text = box2.text;
	box2.text = box1.text;
	
	
	
	//now for the responce 
	PlayTitle1.text = peopleArray[1] + " " + clockText.text;
	box1.text = result.value.options[0];

	//since the player chooses option 1
	//select the first element in the array result.value.options[]
	
	result.value.select(0);
	result = dialogue.next();
	
	//change the options to blank so the player won't choose one right away
	Option1.text = " ";
	Option2.text = " ";
	
	//play waiting for text from Significant Other animation here
	//before game.time.events.add() so that it stop playing at the end 
	//the text is invisible until here 
	SigOtherReplay.visible =! SigOtherReplay.visible;
	//make the buttons invisible to so they don't press them 
	optionButton1.visible =! optionButton1.visible;
	optionButton2.visible =! optionButton2.visible;
	
	//allow a few seconds to be wasted like in real life 
	game.time.events.add(Phaser.Timer.SECOND*3, SigOtherText, this);
	//play text sound effect
	
}

//function choice2 
function choice2(){
	//what happens when player chooses second choice 
	
	//play a sound to indicate the choice was selected 
	game.sound.play('texting');
	//move text up  
	PlayTitle4.text = PlayTitle3.text;
	PlayTitle3.text = PlayTitle2.text;
	PlayTitle2.text = PlayTitle1.text;
	
	box4.text = box3.text;
	box3.text = box2.text;
	box2.text = box1.text;
	
	//now for the responce 
	PlayTitle1.text = peopleArray[1] + " " + clockText.text;
	box1.text = result.value.options[1];

	//since the player chooses option 2
	//select the second element in the array result.value.options[]
	
	result.value.select(1);
	result = dialogue.next();
	
	//change the options to blank so the player won't choose one right away
	Option1.text = " ";
	Option2.text = " ";
	
	//play waiting for text from Significant Other animation here
	//before game.time.events.add() so that it stop playing at the end 
	//the text is invisible until here 
	SigOtherReplay.visible =! SigOtherReplay.visible;
	//make the buttons invisible to so they don't press them 
	optionButton1.visible =! optionButton1.visible;
	optionButton2.visible =! optionButton2.visible;
	
	//allow a few seconds to be wasted like in real life 
	game.time.events.add(Phaser.Timer.SECOND*3, SigOtherText, this);
	//play text sound effect
}

//function SigOtherText
function SigOtherText(){
	//the significant other text 
	game.sound.play('messageReceived');
	//move text up 
	PlayTitle4.text = PlayTitle3.text;
	PlayTitle3.text = PlayTitle2.text;
	PlayTitle2.text = PlayTitle1.text;
	
	box4.text = box3.text;
	box3.text = box2.text;
	box2.text = box1.text;

	//now for the responce 
	PlayTitle1.text = peopleArray[0] + " " + clockText.text;
	box1.text = result.value.text;

	endingText = result.value.text;
	//box1.text is a text value instead of an options value because it is from the significant other side 
	result = dialogue.next();
	
	//the if statement check to make sure the player heads to the right ending 
	//first check to see if result.done == true 
	if(result.done == true){
		
		if(result.done == true && endingText == blockArray[0] ){
			game.state.start('Blocked');
		}else if(result.done == true && endingText == blockArray[1] ){
			game.state.start('Blocked');
		}else if(result.done == true && endingText == mutualArray[0] ){
			game.state.start('MutualBreakUp');
		}else if(result.done == true && endingText == mutualArray[1] ){
			game.state.start('MutualBreakUp');
		}else if(result.done == true && endingText == mutualArray[2] ){
			game.state.start('MutualBreakUp');
		}else if(result.done == true && endingText == savedArray[0] ){
			game.state.start('SavedIt');
		}else{
			//if nothing else worked 
			game.state.start('MutualBreakUp');
		}
		
		
		
	}else if(result.value.text == blockArray[0] || result.value.text == blockArray[1] || result.value.text == mutualArray[0] || result.value.text == mutualArray[1] || result.value.text == mutualArray[2] || result.value.text == savedArray[0]){
	
		//you can use text as a boolean to say that if the text is like this then do that
		//this needs to be done because the narrative doesn't go through all the way for 
		//result.done to be true on some of the branches taken
		if(result.done == false){
			result = dialogue.next();
		}
		
		
		if(result.done == true && result.value.text == blockArray[0] ){
			game.state.start('Blocked');
		}else if(result.done == true && result.value.text == blockArray[1] ){
			game.state.start('Blocked');
		}else if(result.done == true && result.value.text == mutualArray[0] ){
			game.state.start('MutualBreakUp');
		}else if(result.done == true && result.value.text == mutualArray[1] ){
			game.state.start('MutualBreakUp');
		}else if(result.done == true && result.value.text == mutualArray[2] ){
			game.state.start('MutualBreakUp');
		}else if(result.done == true && result.value.text == savedArray[0] ){
			game.state.start('SavedIt');
		}
		
	}else{
		//now give the options boxes the different text 
		Option1.text = result.value.options[0];
		Option2.text = result.value.options[1];
	}
	

	//make this invisible again 
	SigOtherReplay.visible =! SigOtherReplay.visible;
	//make the buttons visible again so they can press them  
	optionButton1.visible =! optionButton1.visible;
	optionButton2.visible =! optionButton2.visible;
}
//global variables used only for GameOver 
var deskGameOver;
//Use var Blocked for You got blocked state------------------------------------------------------------------------------------------------------------------------------------------------ 
var Blocked = function(game){};

//You got blocked ending prototype 
Blocked.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		
		//stop music from play state 
		backgroundMusic.stop();
		
		//changes the bounds of the world to not be just the canvas
		game.world.setBounds(0, 0, 720, 960);
		game.camera.setPosition(0, 0);
		//Creating text for the game over screen 
		deskGameOver = game.add.sprite(game.width/2, game.height/2, 'desk');
		deskGameOver.anchor.set(0.5);
		
		
		var text = "You got blocked";
		var style = {font: "30px Arial", fill: "#fff", align: "center" };
		var retry = this.game.add.text(this.game.width/2, 300, text, style);
		retry.anchor.set(0.5);
		
		text = "Press SPACEBAR to go back to main menu";
		style = {font: "30px Arial", fill: "#fff", align: "center" };
		retry = this.game.add.text(this.game.width/2, 400, text, style);
		retry.anchor.set(0.5);
		
		//GAME OVER
		text = "Well, sucks to be you ";
		style = {font: "60px Arial", fill: "#fff", align: "center" };
		retry = this.game.add.text(this.game.width/2, 200, text, style);
		retry.anchor.set(0.5);
		
		start_button = game.add.button(game.width/2, 540, 'button', instructions, this, 'NEXT_Button2', 'NEXT_Button1', 'NEXT_Button3');
		start_button.anchor.set(0.5);
		
		credits_button = game.add.button(game.width/2, 590, 'button', creditsPage, this, 'CREDITS_Button2', 'CREDITS_Button1', 'CREDITS_Button3');
		credits_button.anchor.set(0.5);
		
	},
	
	update: function(){
			
		//change booleans back to original values 
		pluggedIn = false;
		bool = false;
		timerBool = false;
		
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//changing the state must come last 
			game.state.start('MainMenu');
		}
	}
}

//Battery Died end state----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Use var DeadBattery for gameOver state 
var DeadBattery = function(game){};

//GameOver prototype 
DeadBattery.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		
		//stop music from play state 
		backgroundMusic.stop();
		
		//changes the bounds of the world to not be just the canvas
		game.world.setBounds(0, 0, 720, 960);
		game.camera.setPosition(0, 0);
		//Creating text for the game over screen 
		deskGameOver = game.add.sprite(game.width/2, game.height/2, 'desk');
		deskGameOver.anchor.set(0.5);
		
		
		var text = "Your battery died and she got fed up.";
		var style = {font: "30px Arial", fill: "#fff", align: "center" };
		var retry = this.game.add.text(this.game.width/2, 200, text, style);
		retry.anchor.set(0.5);
		
		text = "Press SPACEBAR to go back to main menu";
		style = {font: "30px Arial", fill: "#fff", align: "center" };
		retry = this.game.add.text(this.game.width/2, 400, text, style);
		retry.anchor.set(0.5);
		
		//GAME OVER
		text = " You need to remember to charge your phone more ";
		style = {font: "60px Arial", fill: "#fff", align: "center" };
		retry = this.game.add.text(this.game.width/2, 300, text, style);
		retry.anchor.set(0.5);
		
		start_button = game.add.button(game.width/2, 540, 'button', instructions, this, 'NEXT_Button2', 'NEXT_Button1', 'NEXT_Button3');
		start_button.anchor.set(0.5);
		
		credits_button = game.add.button(game.width/2, 590, 'button', creditsPage, this, 'CREDITS_Button2', 'CREDITS_Button1', 'CREDITS_Button3');
		credits_button.anchor.set(0.5);
		
		
	},
	
	update: function(){
			
		//change booleans back to original values 
		pluggedIn = false;
		bool = false;
		timerBool = false;
		
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//changing the state must come last 
			game.state.start('MainMenu');
		}
	}
}

//mutual split up ending---------------------------------------------------------------------------------------------------------------------------------------------------------------- 
//Use var GameOver for gameOver state 
var MutualBreakUp = function(game){};

//GameOver prototype 
MutualBreakUp.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		
		//stop music from play state 
		backgroundMusic.stop();
		
		//changes the bounds of the world to not be just the canvas
		game.world.setBounds(0, 0, 720, 960);
		game.camera.setPosition(0, 0);
		game.add.sprite(0, 0, 'desk');
		//Creating text for the game over screen 
		deskGameOver = game.add.sprite(game.width/2, game.height/2, 'mutualEnding');
		deskGameOver.anchor.set(0.5);
		
		start_button = game.add.button(game.width/2, 540, 'button', instructions, this, 'NEXT_Button2', 'NEXT_Button1', 'NEXT_Button3');
		start_button.anchor.set(0.5);
		
		credits_button = game.add.button(game.width/2, 590, 'button', creditsPage, this, 'CREDITS_Button2', 'CREDITS_Button1', 'CREDITS_Button3');
		credits_button.anchor.set(0.5);
		
		
	},
	
	update: function(){
			
		//change booleans back to original values 
		pluggedIn = false;
		bool = false;
		timerBool = false;
		
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//changing the state must come last 
			game.state.start('MainMenu');
		}
	}
}

//Saved relationship state---------------------------------------------------------------------------------------------------------------------------------------------------------------
//Use var GameOver for gameOver state 
var SavedIt = function(game){};

//GameOver prototype 
SavedIt.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		
		//stop music from play state 
		backgroundMusic.stop();
		
		//changes the bounds of the world to not be just the canvas
		game.world.setBounds(0, 0, 720, 960);
		game.camera.setPosition(0, 0);
		game.add.sprite(0, 0, 'desk');
		//Creating text for the game over screen 
		deskGameOver = game.add.sprite(game.width/2, game.height/2, 'goodEnding');
		deskGameOver.anchor.set(0.5);
		
		start_button = game.add.button(game.width/2, 540, 'button', instructions, this, 'NEXT_Button2', 'NEXT_Button1', 'NEXT_Button3');
		start_button.anchor.set(0.5);
		
		credits_button = game.add.button(game.width/2, 590, 'button', creditsPage, this, 'CREDITS_Button2', 'CREDITS_Button1', 'CREDITS_Button3');
		credits_button.anchor.set(0.5);
		
		
	},
	
	update: function(){
			
		//change booleans back to original values 
		pluggedIn = false;
		bool = false;
		timerBool = false;
		
		//updates to check if the player presses the SPACEBAR to begin Play state, which has the game.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//changing the state must come last 
			game.state.start('MainMenu');
		}
	}
}

//credits page--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Use var GameOver for gameOver state 
var Credits = function(game){};

//GameOver prototype 
Credits.prototype = {
	preload: function(){
		
	},
	
	create: function(){
		
		//stop music from play state
		if(music.isPlaying == true){
			music.stop();
		}else if(backgroundMusic.isPlaying == true){
			backgroundMusic.stop();
		}else{
			//do nothing if neither music is playing 
		}
		//changes the bounds of the world to not be just the canvas
		game.world.setBounds(0, 0, 720, 960);
		game.camera.setPosition(0, 0);
		
		game.add.sprite(0, 0, 'desk');
		//Creating text for the game over screen 
		deskGameOver = game.add.sprite(game.width/2, game.height/2, 'credits');
		deskGameOver.anchor.set(0.5);
		deskGameOver.scale.setTo(0.3, 0.3);
		
		
		
		
		//play the game 
		start_button = game.add.button(game.width/2 + 15, 600, 'button', startGame, this, 'START2_Button2', 'START2_Button1', 'START2_Button3');
		start_button.anchor.set(0.5);
		
	},
	
	update: function(){
			
		//change booleans back to original values 
		pluggedIn = false;
		bool = false;
		timerBool = false;
	}
}
//adds the states for the game 
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('Blocked', Blocked);
game.state.add('Instructions', Instructions);
game.state.add('DeadBattery', DeadBattery);
game.state.add('MutualBreakUp', MutualBreakUp);
game.state.add('SavedIt', SavedIt);
game.state.add('Credits', Credits);
game.state.start('MainMenu');
