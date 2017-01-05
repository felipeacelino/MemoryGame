(function(win, doc){
	'use strict';

	var DOM = function(selector) {

		this.elements = doc.querySelectorAll(selector);

		this.get = function() {
			return this.elements;
		}

		this.on = function(event, callback) {
			this.elements.forEach(function(element) {
				element.addEventListener(event, callback);
			});
		}

		this.off = function(event, callback) {
			this.elements.forEach(function(element) {
				element.removeEventListener(event, callback);
			});
		}

		this.remove = function() {
			this.elements.forEach(function(element) {
				element.parentNode.removeChild(element);
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

		this.show = function() {
			this.elements.forEach(function(element) {
				element.style.display = 'block';
			});
		}

		this.hide = function() {
			this.elements.forEach(function(element) {
				element.style.display = 'none';
			});
		}

		this.fadeOut = function() {
			this.elements.forEach(function(element) {
				element.style.opacity = 0;				
			});
		}

		/*this.fadeOut = function(speed) {
			speed = speed / 10;
			this.elements.forEach(function(element) {
				var opacity = 1.0;
				var timeout;
				function processing() {
					timeout = setTimeout(function(){
						if (opacity > 0) {
							element.style.opacity = opacity;
							opacity = opacity -  0.1;
							processing();
						} else {
							clearTimeout(timeout);
						}
					}, speed);
				}
				processing();				
			});
		}*/

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

	var Game = function(images) {

		this.images = images;
		this.score = 0;
		this.maxScore = this.images.length - 1;

		this.createCards = function() {

			var imagesObj = [];

			this.images.forEach(function(image, index) {
				imagesObj.push({image: image, index: index});
				imagesObj.push({image: image, index: index});
			});

			var imagesRandom = randomArray(imagesObj);
			
			var cardsContainer = doc.querySelector('.section-cards');
			cardsContainer.innerHTML = '';

			var delay = 1000;

			imagesRandom.forEach(function(item, index) {

				var card = doc.createElement('div');
				card.setAttribute('class', 'card animated slideInDown');
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

				setTimeout(function() {					
					cardsContainer.appendChild(card);
					setTimeout(function() {					
						card.setAttribute('class', 'card');
						card.addEventListener('click', click);
					},(100));
				},(delay+=200));

			});

		}

		this.flipShow = function(cardIndex) {
			var card = new DOM('div[data-card-index="'+cardIndex+'"]');
			card.addClass('flip');
			this.play();
		}

		this.hide = function(cardIndex) {
			var card = new DOM('div[data-card-index="'+cardIndex+'"]');
			card.fadeOut(100);
		}

		this.flipShowAll = function() {
			var cards = new DOM('.card');
			cards.addClass('flip');
		}

		this.flipHideAll = function() {
			var cards = new DOM('.card');
			cards.removeClass('flip');
		}

		this.enableClick = function() {
			var cards = new DOM('.card');
			cards.on('click', click);
		}

		this.disableClick = function() {
			var cards = new DOM('.card');
			cards.off('click', click);
		}

		this.getShowCards = function()  {
			return doc.querySelectorAll('.flip');
		}

		this.isValid = function(card1, card2) {
			return card1.dataset.pairIndex === card2.dataset.pairIndex;	
		}

		this.play = function() {

			if (this.getShowCards().length == 2) {

				var that = this;
				this.disableClick();

				var card1 = this.getShowCards()[0];
				var card2 = this.getShowCards()[1];

				if (this.isValid(card1, card2)) {
					
					setTimeout(function() {

						that.hide(card1.dataset.cardIndex);
						that.hide(card2.dataset.cardIndex);
						
						if (that.score == that.maxScore) {
							console.log('PARABÉNS!');
							that.reset();
						} else {
							console.log('acertou!');
							that.score++;
							that.flipHideAll();
							that.enableClick();
						}							
											
					},1500);
					
				} else {

					console.log('errou!');

					setTimeout(function() {

						that.flipHideAll();

						setTimeout(function() {
							that.enableClick();
						},800);
						
					},1500);

				}

			} 

		}

		this.reset = function() {
			this.score = 0;
			this.maxScore = this.images.length - 1;			
			var cards = new DOM('.card');
			cards.remove();
			this.createCards();	
			cards = new DOM('.card');
			cards.on('click', click);
		}

	}

	var images = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'];
	//var images = ['1.jpg','2.jpg'];
	
	var game = new Game(images);

	game.createCards();

	function click(e) {
		game.flipShow(this.dataset.cardIndex);
		e.preventDefault();
	}

}(window, document));