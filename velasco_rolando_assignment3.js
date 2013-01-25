// Rolando Velasco
// 01-24-2013
// Project 3
// Theme: Knights

var character = function (newName, newHP, newAttack, newHaveItems, newItems, newEquipment) {
	var name = newName;
	var HP = newHP;
	var attack = newAttack;
	var haveItems = newHaveItems;
	var items = newItems;
	var equipment = newEquipment;

	// Method to get the character's name as a string
	var getName = function() {
		return name;
	};

	// Method to get the character's HP as a number
	var getHP = function() {
		return HP;
	};

	// Method to set the character's HP with a number
	var setHP = function(newHP) {
		HP = newHP;
		return;
	};

	// Method to get the character's attack power as a number
	var getAttack = function() {
		return attack;
	};

	// Method to check if the character has items in the inventory and return a boolean
	var checkHaveItems = function() {
		return haveItems;
	};

	// Method to add an item to the character's inventory
	// Accepts String as argument 
	var addItem = function(item) {
		for (var i = 0; i < items.length; i++) {
			if (item === items[i][0]) {
				items[i][1]++;
			};
		};
		
		// If haveItems is false, set it to true
		if (haveItems === false) {
			haveItems = true;
		};
		
		return;
	};

	// Method to use an item from the character's inventory
	var useItem = function(item) {
		if (item === "potion") {
			HP = HP + items[0][2];
			items[0][1]--;
			console.log(name + " used a potion and regained " + items[0][2] + " hit points. HP now at " + HP + ".");
		} else {
			if (item === "rage") {
				attack = attack + items[1][2];
				items[1][1]--;
				console.log(name + " used rage and increased attack power by " + items[1][2] + " for this battle. Attack power at " + attack + ".");
			} else {
				if (item === "revive") {
					HP = HP + items[2][2];
					items[2][1]--;
					console.log(name + "'s HP is at 0, but used revive just in time. HP is back to " + items[2][2] + ".");
				};
			};
		};
		
		// If there are no more items in the inventory, change haveItems to false
		if (items[0][1] === 0 && items[1][1] === 0 && items[2][1] === 0) {
			haveItems = false;
		};
		
		return;
	};
	
	// Method to get the character's item list as an array
	var getItems = function() {
		return items;
	};
	
	// Method to get the character's equipment as an object
	var getEquipment = function() {
		return equipment;
	};
	
	// Method to initiate a battle sequence between two characters.
	var attacks = function(enemy) {
		// local variables
		var enemyName = enemy.getName();
		var enemyHP = enemy.getHP();
		var enemyAttack = enemy.getAttack();
		var enemyHasItems = enemy.checkHaveItems();
		
		// Output declaration of battle
		console.log(name + " has encountered a " + enemyName + ". Let the battle begin!");
		console.log(name + ":\tHP: " + HP + "\tAttack: " + attack);
		console.log(enemyName + ":\tHP: " + enemyHP + "\tAttack: " + enemyAttack);
		
		// Store the attack value locally so if I use rage I can reset the attack power
		// after the battle sequence has ended
		var tempAttack = attack;
		
		while (HP > 0 && enemyHP > 0) {
			// if my HP low, use a potion if available
			if (HP < 10) {
				if (items[0][1] > 0) {
				//	console.log(items.potion[0]);
					useItem("potion");
				//	console.log(items.potion[0]);
				};
			};
			
			// if enemy attack power is greater than mine, use rage if available
			if (attack < enemyAttack) {
				if (items[1][1] > 0) {
					useItem("rage");
				};
			};
			
			// attack sequence: calculate remaining HP from the current HP minus the attack dealt
			HP = HP - enemyAttack;
			enemyHP = enemyHP - attack;
			console.log(name + " attacks " + enemyName + ", dealing " + attack + " points of damage.");
			console.log(enemyName + " attacks " + name + ", dealing " + enemyAttack + " points of damage.");
			
			// if my HP is 0, use revive if available
			if (HP <= 0) {
				if (items[2][1] > 0) {
					HP = 0;
					useItem("revive");
				};
			};
			
		console.log(name + ":\tHP: " + HP + "\tAttack: " + attack);
		console.log(enemyName + ":\tHP: " + enemyHP + "\tAttack: " + enemyAttack);
		};
		
		// end of battle declaration
		if (HP <= 0) {
			console.log(name + " has perished. This is the end of the story. Game over!");
		} else {
			if (enemyHP <= 0) {
				console.log(enemyName + " has perished. " + name + " is victorious!");
			};
		};
						
		// set enemy's remaining HP and reset my attack power
		enemy.setHP(enemyHP);
		attack = tempAttack;
		
		return enemy;
	};

	// Return public methods only
	// Properties are private
	return {
		"getName": getName,
		"getHP": getHP,
		"setHP": setHP,
		"getAttack": getAttack,
		"checkHaveItems": checkHaveItems,
		"addItem": addItem,
		"useItem": useItem,
		"getItems": getItems,
		"attacks": attacks
	};
};


// Main code

// Initialize global variables
// Initialize hero character
var hero = json.hero[0];
// console.log(hero); // test that the right hero data is pulled.
hero = character(hero.name, hero.HP, hero.attack, hero.haveItems, hero.items);
// console.log("hero name: " + hero.getName()); // test that the object was created successfully.

// Initialize enemy characters
var enemies = [];
for (var i = 0; i < json.enemies.length; i++) {
	var enemy = json.enemies[i];
//	console.log(enemy); // test that the right enemy data is pulled.
	enemies.push(character(enemy.name, enemy.HP, enemy.attack, enemy.haveItems, enemy.items));
//	console.log("enemy" + i + " name: " + enemies[i].getName()); // test that the object was created successfully.

};

// Use accessor methods to get info on the hero character
var heroName = hero.getName();
var heroHP = hero.getHP();
var heroAttackPower = hero.getAttack();
var heroHaveItems = hero.checkHaveItems();
var heroItems = hero.getItems();

// Output hero information in the story
console.log("Greetings, " + heroName + ", to the forest. This is the start of your quest and your journey to become one of King Arthur's knights.\n"
	+ "It is a perilous journey, full of monsters, so be on guard and vigilant. Use your strength and cunning to vanquish your enemies,\n"
	+ "and remember to use your items when needed. You may even find more along your way. Good luck!");
console.log("Thanks to your training earlier you have " + heroHP + " HP with an attack strength of " + heroAttackPower + ".");
console.log("You purchased items before beginning your quest, is that right? " + heroHaveItems + ".");
console.log("Okay, let's look at your inventory:");

//nested for loop
for (var i = 0; i < heroItems.length; i++) {
	var outputString = "";
	for (var j = 0; j < heroItems[i].length; j++) {
		outputString = outputString + heroItems[i][j] + "\t";
	};
	console.log(outputString);
}
// console.log("Potion:\t" + heroItems[0][1] + "\t" + heroItems[0][3] + ".");
// console.log("Rage:\t" + heroItems[1][1] + "\t" + heroItems[1][3] + ".");
// console.log("Revive:\t" + heroItems[2][1] + "\t" + heroItems[2][3] + ".");

enemies[0] = hero.attacks(enemies[0]);
enemies[1] = hero.attacks(enemies[1]);
enemies[2] = hero.attacks(enemies[2]);
enemies[3] = hero.attacks(enemies[3]);
enemies[4] = hero.attacks(enemies[4]);
enemies[5] = hero.attacks(enemies[5]);

