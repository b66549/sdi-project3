// JSON Data Structure

var json = {
	"hero": [
		{
			"name": "Sir Lot the Brave",
			"HP": 30,
			"attack": 5,
			"haveItems": true,
			"items": [
				["potion", 1, 10, "Restores HP by 10"],
				["rage", 1, 5, "Increases attack power temporarily by 5"],
				["revive", 1, 30, "Come back to life with 30 HP"]			
			],
			"equipment": {
				"weapon": "Sword",
				"armor": "Tunic",
				"head": "Hat"
			}
		}		
	],
	"enemies": [
		{
			"name": "Worm",
			"HP": 5,
			"attack": 2,
			"haveItems": false,
			"items": [],
			"equipment": {}
		},
		{
			"name": "Spider",
			"HP": 7,
			"attack": 4,
			"haveItems": false,
			"items": [],
			"equipment": {}
		},
		{
			"name": "Scorpion",
			"HP": 10,
			"attack": 5,
			"haveItems": false,
			"items": [],
			"equipment": {}
		},
		{
			"name": "Thief",
			"HP":  20,
			"attack": 7,
			"haveItems": false,
			"items": [],
			"equipment": {}
		},
		{
			"name": "Troll",
			"HP":  25,
			"attack": 5,
			"haveItems": false,
			"items": [],
			"equipment": {}
		},
		{
			"name": "Lizardman",
			"HP":  30,
			"attack": 10,
			"haveItems": false,
			"items": [],
			"equipment": {}
		}
	]
};
