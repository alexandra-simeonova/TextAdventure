
function Location (name, description, items, locked, enemy, secret) {
    this.name = name;
    this.description = description;
    this.items = items; 
    this.locked = locked;
    this.enemy = enemy;
	this.secret = secret;
};

var map = {
    locations: [
        new Location ("garden", "it is full of weeds and dead trees. You can go to the entrance", ["worm"], false, false, false),
        new Location ("entrance", "a narrow corridor. You can go to the garden, dining room or living room", ["no items"], false, false, false),
        new Location ("living room", "a room with a fireplace. You can go back to the entrance", ["no items"], false, false, true),
        new Location ("dining room", "a room with a a large mahogany table. You can go to the study, bedroom or entrance", ["no items"], false, false, false),
        new Location ("study", "a small study. Roderick sits on a chair, looking gloomy. You can go to the guest room or dining room", ["tombs key"], false, false, false),
        new Location ("bedroom", "a small bedroom. You see Madeline in bed, she says 'DO NOT TAKE THE SWORD'. You can go to the tombs or the dining room", ["sword"], false, false, false), 
        new Location ("guest room", "a room with a wooden floor and a bed with bloodstained sheets. You can go to the study", ["tell tale heart"], true, false, true),
        new Location ("tombs", "damp corridors in the basement. A stone coffin is in front of you. You can go to the bedroom", ["guest room key"], true, true, false)
        ],
    connections:[
	[0,0,0,0,0,0,0,0], 
	[0,0,0,0,0,0,0,0], 
	[0,0,0,0,0,0,0,0], 
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0]
	]
};


//connecting & disconnecting functions
function connect(map,from, to) {
    map.connections[from][to] = 1;
    map.connections[to][from] = 1;
}

function disconnect(map, from, to) {
    map.connections[from][to] = 0;
    map.connections[to][from] = 0;
}

//connecting locations 
connect (map, 0, 1);
connect (map, 1, 2);
connect (map, 1, 3);
connect (map, 3, 4);
connect (map, 3, 5);
connect (map, 4, 6);
connect (map, 5, 7);

//function for seeing if item is inside locations

Location.prototype.has = function(item) {
   return this.items.indexOf(item)>=0;
}


//function for removing items from location
Location.prototype.remove = function(item) {
    var itemNum = this.items.indexOf(item);
    if (itemNum>= 0) {
        this.items.splice(itemNum, 1);
	}
};

//function for adding items to location
Location.prototype.put = function(item) {
    this.items.push(item);
}

