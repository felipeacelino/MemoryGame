(function(win, doc){
	'use strict';

	// DOM
	var DOM = function(selector) {

		this.elements = doc.querySelectorAll(selector);

		this.get = function() {
			return this.elements;
		}

		this.on = function(event, callback) {
			this.elements.forEach(function(element) {
				element.addEventListener(event, callback, false);
			});
		}

		this.html = function(html) {
			this.elements.forEach(function(element) {
				element.innerHTML = html;
			});
		}

		this.addClass = function(className) {
			this.elements.forEach(function(element) {
				element.classList.add(className);
			});
		}

		this.removeClass = function(className) {
			this.elements.forEach(function(element) {
				element.classList.remove(className);
			});
		}

		this.toggle = function(className) {
			this.elements.forEach(function(element) {
				element.classList.toggle(className);
			});
		}

	}

	function randomArray(array) {
		var newArray = [];
		while (newArray.length < array.length) {
			var newItem = array[Math.floor(Math.random() * array.length + 0)];
			!newArray.some(function(item) {
				return item === newItem;
			}) ? newArray.push(newItem) : '';
		}
		return newArray;
	}

	// Player
	var Player = function(name, dom) {

		this.name = name;
		this.score = 0;
		this.playing = false;
		this.domContainer = new DOM(dom);
		this.domName = new DOM(dom + ' .player-name');
		this.domName.html(this.name); 
		this.domScore = new DOM(dom + ' .player-score');
		this.domScore.html(this.score); 

		this.scoreUp = function() {
			this.score += 1;
		}

		this.clearScore = function() {
			this.score = 0;
		}

		this.toggle = function() {
			this.domContainer.toggle('active');
		}

		this.statusPlay = function(stutus) {
			this.playing = status;

			if (this.playing) {
				this.toggle();
			} else {
				this.toggle();
			}	
		}
	}

	var Game = function(images) {

		this.images = images;
		this.maxScore = this.images.length;

		this.getPlaying = function() {
			return this.playing;
		}
		
		this.createCards = function() {

			var imagesObj = [];

			this.images.forEach(function(image, index) {
				imagesObj.push({image: image, index: index});
				imagesObj.push({image: image, index: index});
			});

			var imagesRandom = randomArray(imagesObj);
			
			var cardsContainer = doc.querySelector('.section-cards');
			cardsContainer.innerHTML = '';

			imagesRandom.forEach(function(item, index) {

				var card = doc.createElement('div');
				card.setAttribute('class', 'card');
				card.setAttribute('data-pair-index', item.index);
				card.setAttribute('data-card-index', index);

				var front = doc.createElement('figure');
				front.setAttribute('class', 'front');

				var imgFront = doc.createElement('img');
				imgFront.setAttribute('src', 'images/question.jpg');
				front.appendChild(imgFront);
				card.appendChild(front);

				var back = doc.createElement('figure');
				back.setAttribute('class', 'back');

				var imgBack = doc.createElement('img');
				imgBack.setAttribute('src', 'images/' + item.image);
				back.appendChild(imgBack);
				card.appendChild(back);
				
				cardsContainer.appendChild(card);

			});

		}

		this.showCard = function(cardIndex) {
			var card = new DOM('div[data-card-index="'+cardIndex+'"]');
			card.addClass('flip');
		}

		this.hideCard = function(cardIndex) {
			var card = new DOM('div[data-card-index="'+cardIndex+'"]');
			card.removeClass('flip');
		}

		this.toggleCard = function(cardIndex) {
			var card = new DOM('div[data-card-index="'+cardIndex+'"]');
			card.toggle('flip');
		}

		this.showAllCards = function() {
			var cards = new DOM('.card');
			cards.addClass('flip');
		}

		this.hideAllCards = function() {
			var cards = new DOM('.card');
			cards.removeClass('flip');
		}

	}

	function play(player) {

	}
	
	var init = function init() {

		var player1 = new Player('Player 1', '.player-one');
		var player2 = new Player('Player 2', '.player-two');
		var images = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'];

		var game = new Game(images);
		
		game.createCards();

		var cards = new DOM('.card');
		cards.on('click', function(e){
			player1.statusPlay(true);
			game.toggleCard(this.dataset.cardIndex);
			e.preventDefault();
		});

		console.log('Vez do ' + game.firstPlayerPlay.name);
		
		while (player1.score < game.maxScore || player2.score < game.maxScore) {



		}

	}
	
	win.onload = init;

}(window, document));