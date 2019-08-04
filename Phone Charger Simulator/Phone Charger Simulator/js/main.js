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
		game.load.image('placeholder', 'assets/img/Demo visual.png');
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
		
		
		var text = "Phone Charger Simulator";
		var style = {font: "50px Arial", fill: "#fff", align: "center" };
		var title = this.game.add.text(this.game.width/2, this.game.height/4, text, style);
		title.anchor.set(0.5);
		
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
		game.add.text(32, 250, this.story_text, text_style);
		//A little bit of story 
		/*text = "Keep Your Phone Charged While Texting Your Significant Other";
		style = {font: "30px Arial", fill: "#fff", align: "center"};
		var begin = this.game.add.text(this.game.width/2, 250, text, style);
		begin.anchor.set(0.5);
		*/
		
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
var pluggedIn = false;
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
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//for now the place holder for the game 
		var pH = game.add.sprite(game.width/2, game.height/2, 'placeholder');
		pH.anchor.set(0.5);
		pH.scale.setTo(0.75, 0.75);
	},
	
	update: function(){
		
	}
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
		var text = "Press SPACEBAR to retry";
		var style = {font: "30px Arial", fill: "#fff", align: "center" };
		var retry = this.game.add.text(this.game.width/2, this.game.height - 200, text, style);
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


