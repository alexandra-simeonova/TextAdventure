//intro function

function gameIntro() {
var para = document.querySelector ("#descrip");
	para.textContent = "You decide to visit your friend Roderick (owner of the House of Usher), because his sister Madeline is gravely ill. Your goal is to get out of the house alive and find all the Edgar Allan Poe references."
var prompt = (document.querySelector("label"));
	prompt.textContent = "Enter your name and press Enter."
    var inputBox = document.querySelector("#input");
    var listener = function(event) {
        if (event.keyCode === 13) {
            event.target.removeEventListener("keyup", listener);
            customizePlayer(this.value);
            gameStart();
        }
    }
    inputBox.addEventListener ("keyup", listener);
};

//start game

var gameStart = function() {
	var inputBox = document.querySelector("#input");
	inputBox.addEventListener("keyup", function(event){
		if (event.keyCode === 13) {
			gameStep(this.value);
		}
	});
	var prompt = (document.querySelector("label"));
	prompt.textContent = "Type an action and press Enter."
	displayActions();
	healthPoints(0);
	displayScene (); 
}

//run one part of game

function gameStep (input){
  var command = interpret (input);
  var result = execute (command);
  report (result);
};

//function that customizes player
function customizePlayer(input) {
	player.name = input;
};

 //interpret the input
function interpret (input){
     var cmd = {}, tokens = input.trim().toLowerCase().split(" ");
      cmd.action = tokens.shift();
      cmd.target = tokens.join(" ");
          return cmd;
};

//executing user's command
function execute (command){
    console.log (" execute");
      player[command.action](command.target);
};

//display result on page
function report (result){
    displayActions();
    displayInventory();
    displayScene();
};

//clearing content before putting new stuff in

function clearContent(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}

//function for displaying feedback

function displayFeedback (message) {
   var message = message;
   var para = document.querySelector ("#feedback");
   clearContent(document.querySelector("#feedback"));
   para.textContent = "\n" + message;
};
	
//function for displaying actions

function displayActions() {
    var field, action, actionList;
    actionList = document.querySelector("#help > ul");
    clearContent(actionList);
    for (field in player) {
        if (player[field] instanceof Function) {
            action = document.createElement("li");
            action.textContent = field;
            actionList.appendChild(action);
        }
    }
}

//function for displaying inventory

function displayInventory() {
    var i, item, inventory;
    inventory = document.querySelector("#inventory > ul");
    clearContent(inventory);
    for (i in player.items) {
        item = document.createElement ("li");
        item.textContent = player.items[i];
        inventory.appendChild(item);
    }
}

//function for displaying scene 

function displayScene() {
   var para = document.querySelector ("#descrip");
      para.textContent = "You are in the " + player.currLoc.name + "-" + "\n" + 
      player.currLoc.description + "." + "\n" +
      "The items you can take are: " + player.currLoc.items 
};

//function for ending game
function gameEnd () {
  addEventListener("keydown", function(event) {
    if (event.keyCode == 13)
      window.close();
  });
}

window.onload = gameIntro;
