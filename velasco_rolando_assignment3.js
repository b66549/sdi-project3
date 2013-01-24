// Rolando Velasco
// 01-24-2013
// Project 3
// Theme: Knights

var character = function (name, hp, attack, haveItems, items) {

	// Method to get the character's name as a string
	var getName = function() {
		return name;
	};

	// Method to get the character's HP as a number
	var getHP = function() {
		return hp;
	};

	// Method to set the character's HP with a number
	var setHP = function(newHP) {
		hp = newHP;
		return;
	};

	// Method to get the character's attack power as a number
	var getAttack = function() {
		return attack;
	};

	// Method to check if the character has items in the inventory and return a boolean
	var haveItems = function() {
		return haveItems;
	};

	// Method to add an item to the character's inventory
	var addItem = function(item) {
		if (item === "potion") {
			items.potion[0]++;
		} else {
			if (item === "rage") {
				items.rage[0]++;
			} else {
				if (item === "revive") {
					items.revive[0]++;
				};
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
			HP = HP + items.potion[1];
			items.potion[0]--;
		} else {
			if (item === "rage") {
				attack = attack + items.rage[1];
				items.rage[0]--;
			} else {
				if (item === "revive") {
					HP = HP + items.revive[1];
					items.revive[0]--;
				};
			};
		};
		
		// If there are no more items in the inventory, change haveItems to false
		if (items.potion[0] === 0 && items.rage[0] === 0 && items.revive[0] === 0) {
			haveItems = false;
		};
		
		return;
	};
	
	// Method to get the character's item list as an object
	var getItems = function() {
		return items;
	};
	
	// Method to initiate a battle sequence between two characters.
	var attacks = function(enemy) {
		// local variables
		enemyName = enemy.getName();
		enemyHP = enemy.getHP();
		enemyAttack = enemy.getAttack();
		enemyHasItems = enemy.hasItems();
		
		while (HP >= 0 || enemyHP >= 0) {
			// if my HP low, use a potion if available
			if (HP < 10) {
				if (items.potion[0] > 0) {
					useItem("potion");
				};
			};
			
			// if enemy attack power is greater than mine, use rage if available
			if (attack < enemyAttack) {
				if (items.rage[0] > 0) {
					useItem("rage");
				};
			};
			
			// attack sequence: calculate remaining HP from the current HP minus the attack dealt
			HP = HP - enemyAttack;
			enemyHP = enemyHP - attack;
			
			// if my HP is 0, use revive if available
			if (HP <= 0) {
				HP = 0;
				if (items.revive[0] > 0) {
					useItem("revive");
				};
			};
		};
		
		return;
	};

	return {
		"getName": getName,
		"getHP": getHP,
		"setHP": setHP,
		"getAttack": getAttack,
		"haveItems": haveItems,
		"addItem": addItem,
		"useItem": useItem,
		"getItems": getItems
	};
};


// Main code

// Initialize variables
// Initialize hero character
var hero = json.hero[0];
// console.log(hero); // test that the right hero data is pulled.
hero = character(hero.name, hero.HP, hero.attack, hero.haveItems, hero.items);
console.log("hero name: " + hero.getName()); // test that the object was created successfully.



// Initialize enemy characters
var enemies = [];
for (var i = 0; i < json.enemies.length; i++) {
	var enemy = json.enemies[i];
//	console.log(enemy); // test that the right enemy data is pulled.
	enemies.push(character(enemy.name, enemy.HP, enemy.attack, enemy.haveItems, enemy.items));
	console.log("enemy" + i + " name: " + enemies[i].getName()); // test that the object was created successfully.

};