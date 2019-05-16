// create player object
var player = {
    name: "",
    items: [],
    currLoc: map.locations[0],
	health: 100
};


// add methods to player object
player.take = function(item) {
    if(this.currLoc.has(item)){
            this.currLoc.remove(item);
            this.items.push(item);
            displayFeedback("You took the "+item);
    } else {
        displayFeedback("There is no " + item + " here.");
    }    
};

//return an item to the location
player.drop = function (item){
        if (player.has(item)){
            this.items.splice(item, 1);
			this.currLoc.put(item);
			displayFeedback ("You dropped the "+item);
        } else {
			displayFeedback ("You don't have this item!");
		}
};

//helper function for goto-------------------------------------------------
function indexOfLoc (locName) {
var locNum;
    for (var i = 0; i < map.locations.length; i++){
        if (map.locations[i].name === locName){
            locNum = i;
        }
    }
        if (locNum >=0) {
            return locNum;
        } else {
            displayFeedback ("This location does not exist.");
        }
};
//--------------------------------------------------
	
player.goto = function (locName) {

  var nextLocNum = indexOfLoc(locName);
  var currLoc = player.currLoc;
  var currLocNum = indexOfLoc (player.currLoc.name);

        if (player.currLoc.name === locName) {
            displayFeedback ("You are already here.");
        }
         
        else if (map.connections[currLocNum][nextLocNum] === 0) {
             displayFeedback ("These locations are not connected.");
        }
		else if(map.locations[nextLocNum].enemy){
// RANDOM EVENT --> DEATH
			var r = Math.random ();
				if (r<0.5) {
					player.currLoc = map.locations[nextLocNum];
					displayScene ();
					clearContent(document.querySelector("label"));
					healthPoints(100);
					displayFeedback("The Madeline you saw was a ghost! The real one lies in the coffin! Oh no, the ghost reappears and kills you! You can start again, find a weapon, and hope the ghost will not be so fast.");
					gameEnd();
				}else{ 
					player.currLoc = map.locations[nextLocNum];
					displayScene ();
					displayFeedback("The Madeline you saw was a ghost! The real one lies in the coffin! Oh no, the ghost reappears and start chasing you. Do you have a weapon to use?");
				}
		}			
		else if(map.locations[nextLocNum].locked){
			displayFeedback("This room is locked. Find the key.");
		}
		else if(map.locations[nextLocNum].secret){
			if (nextLocNum === 2) {
			player.currLoc = map.locations[nextLocNum];
			displayScene ();
			displayFeedback("A raven stands on top of the fireplace, saying: 'I must conquer the Conqueror Worm!'");
			}
			else if (nextLocNum === 6) {
				displayFeedback ("Oh my God... What is this terrible sound? Sounds like a beating heart.");
			}
		} else {
            player.currLoc = map.locations[nextLocNum];
			displayFeedback (" ");
		}
};
	
//function to check if player has an item
player.has = function (item) {
var itemNum = this.items.indexOf(item);
    for (i in this.items) {
		if (itemNum >= 0) {
			return true;
		}
	}
};

//function for the instances where items are used
player.use = function (item) {
	 for (i in this.items) {
        if (this.items[i] === item) {
            if (player.currLoc === map.locations[2] && player.has("worm")) {
				displayFeedback ("A-ha! I am stronger than you all! Now go away and don't come back, " + player.name + ". Nevermore!");
			}
			else if (player.currLoc === map.locations[7] && player.has("sword")) {
				healthPoints(20);
				displayFeedback ("Yes! You defeated the ghost.You only lost 20 health points.");
      } 
	  } else {
            displayFeedback ("You don't have this item!");
    }
  }
 };
 
//unlocking rooms
player.unlock = function(locName) {
    var locNum = indexOfLoc(locName);
    for(var i = 0; i < this.items.length; i ++) {
        token = this.items[i].split(" ");
		if(token[0] === locName){
		    map.locations[locNum].locked = false;
				displayFeedback ("You've unlocked the room, now you can go there.");
		}
	}
};

//function for taking player's health points 
function healthPoints(n){
	var newHealth = player.health - n;
	var healthDisplay = document.querySelector("#health > ul");
	clearContent(healthDisplay);
	healthDisplay.textContent = newHealth;
}

