
//Ленивая загрузка видео
document.addEventListener('DOMContentLoaded', () => {
	let lazyYoutube = document.querySelectorAll('.youtube');
	if (lazyYoutube !== null) {
		lazyYoutube.forEach(el => {
			if (el.dataset.id) {
				let wrapper = document.createElement('div');
				wrapper.style.backgroundImage = 'url("https://img.youtube.com/vi/' + el.dataset.id + '/sddefault.jpg")';
				if (el.dataset.width && Number(el.dataset.width) !== NaN) {
					el.style.maxWidth = Number(el.dataset.width) + 'px';
				}
				el.append(wrapper);
				el.addEventListener('mouseover', function () {
					this.classList.add('loading');
					wrapper.style.backgroundImage = null;
					let frame = document.createElement('iframe');
					frame.src = 'https://www.youtube.com/embed/' + this.dataset.id;
					frame.setAttribute('frameborder', '0');
					frame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
					frame.setAttribute('allowfullscreen', '');
					wrapper.append(frame);
				}, { once: true });
			}
		});
	}
	// слайдер
	const swiper = new Swiper('.swiper', {
		// Optional parameters
		direction: 'horizontal',
		loop: true,
		slidesPerView: 4,
		spaceBetween: 45,
		breakpoints: {
			1880: {
				slidesPerView: 4,
				spaceBetween: 40,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			490: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			400: {
				slidesPerView: 1.5,
				spaceBetween: 30,
			},
			320: {
				slidesPerView: 1.5,
				spaceBetween: 40,
			},
			0: {
				slidesPerView: 1,
				spaceBetween: 60,
			},
		}

	});

	//акардеон

	const boxes = Array.from(document.querySelectorAll(".faq-box")); // считываем все элементы аккордеона в массив

	boxes.forEach((box) => {
		box.addEventListener("click", boxHandler); // при нажатии на бокс вызываем ф-ию boxHanlder
	});

	function boxHandler(e) {
		e.preventDefault(); // сбрасываем стандартное поведение
		let currentBox = e.target.closest(".faq-box"); // определяем текущий бокс
		let currentContent = e.target.nextElementSibling; // находим скрытый контент
		currentBox.classList.toggle("active"); // присваиваем ему активный класс
		if (currentBox.classList.contains("active")) {
			// если класс активный ..
			currentContent.style.maxHeight = currentContent.scrollHeight + "px"; // открываем контент
		} else {
			// в противном случае
			currentContent.style.maxHeight = 0; // скрываем контент
		}
	}

	window.onresize = resizeReviews;

	var t = null;
	function resizeReviews() {
		clearTimeout(t);
		t = setTimeout(function () {
			var reviewsList = document.querySelector('.reviews-block__items');
			var column1 = reviewsList.querySelectorAll('.reviews-block__item:nth-child(3n+1)'),
				column2 = reviewsList.querySelectorAll('.reviews-block__item:nth-child(3n+2):not(:last-child)'),
				column3 = reviewsList.querySelectorAll('.reviews-block__item:nth-child(3n), .reviews-block__item:last-child'),
				reviews = reviewsList.querySelectorAll('.reviews-block__item');
			if (window.matchMedia('(min-width: 1401px)').matches) {
				var heihgts = [].map.call(reviews, function (item) {
					console.log(getComputedStyle(item).height);
					return parseFloat(getComputedStyle(item).height);
				});
				var maxHeightItem = Math.max.apply(null, heihgts);
				function summ(prev, next) {
					return prev + parseFloat(getComputedStyle(next).height) + parseFloat(getComputedStyle(next).marginBottom);
				}
				var column1Height = [].reduce.call(column1, summ, 0);
				var column2Height = [].reduce.call(column2, summ, 0);
				var column3Height = [].reduce.call(column3, summ, 0);
				console.log(column1Height, column2Height, column3Height, maxHeightItem);
				reviewsList.style.height = Math.max(column1Height, column2Height, column3Height) + maxHeightItem * 0.1 + 'px';
			} else reviewsList.style.height = null
		}, 10);
	}
	resizeReviews();

});



