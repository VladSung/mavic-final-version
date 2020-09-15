function testWebP(callback) {

var webP = new Image();
webP.onload = webP.onerror = function () {
callback(webP.height == 2);
};
webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

if (support == true) {
document.querySelector('body').classList.add('webp');
}else{
document.querySelector('body').classList.add('no-webp');
}
});;

const accordion = document.querySelector('.accordion'),
	accordionItems = document.querySelectorAll('.accordion__item');

accordion.addEventListener('click', function (e) {
	const target = e.target.closest('.accordion__item-header');
	if (!target) return false;
	for (let i of accordionItems) {
		i.classList.remove('_active');
	}

	target.parentElement.classList.add('_active');
});

window.addEventListener('hashchange', () => {
	const header = document.querySelector('.header');
	const hash = window.location.hash;
	if (hash === '#main' || hash === '') {
		header.classList.remove('fixed');
	} else {
		header.classList.add('fixed');
	}
});

function _createModal(options) {
	const modal = document.createElement('div');
	modal.classList.add('modal')

	modal.insertAdjacentHTML('afterbegin', `
		<div class="modal-overlay" data-close="true">
			<div class="modal-window" ${options.width ? 'style=width:' + options.width + '' : ''}>
				<div class="modal-header">
					<p class="modal-title">${options.title}</p>
					${options.closable ? '<p class="modal-close" data-close="true">&times;</p>' : ''}
					
				</div>
				<div class="modal-body" data-content>
					${options.content || ''}
				</div>
				<div class="modal-footer">
					<button class="btn modal-btn" data-close="true"><span data-close="true">Ок</span></button>					
				</div>
			</div>
		</div>
		`)
	document.body.appendChild(modal);
	return modal
}
const modal = (options) => {
	const _modal = _createModal(options);
	const modalOverlay = _modal.querySelector('.modal-overlay')
	const modalClose = _modal.querySelector('.modal-close')
	let closing = false
	let destroyed = false
	const modal = {
		open() {
			if (destroyed) return console.log('modal is destroyed');
			!closing && _modal.classList.add('modal--open');
		},
		close() {
			closing = true
			_modal.classList.remove('modal--open');
			setTimeout(function () { closing = false }, 500);
		}
	}
	const listener = (e) => {
		if (e.target.dataset.close) modal.close()
	}
	_modal.addEventListener('click', listener);

	return Object.assign(modal, {
		destroy() {
			_modal.removeEventListener('click', listener);
			_modal.parentNode.removeChild(_modal)
			destroyed = true
		},
		setContent(content) {
			const modalBody = _modal.querySelector('[data-content]');
			modalBody.innerHTML = content;
		}
	})
}

const modalInfo = modal({
	title: 'Внимание',
	content: "<p>Это демонстрационная страница и некоторые функции могут быть недоступны!</p>",
	closable: true,
});

const buttons = document.querySelectorAll('.js-modal-btn');
for (const i of buttons) {
	i.addEventListener('click', function (e) {
		e.preventDefault();
		modalInfo.open();
	});
}

(function () {
	const menuBtn = document.querySelector('.header__menu-btn'),
		menu = document.querySelector('.nav');
	let navLock = true;

	menuBtn.addEventListener('click', function (e) {
		e.preventDefault();
		if (!navLock) return false;
		navLock = false;
		if (!menu.classList.contains('active')) {
			document.body.style.overflow = 'hidden';
			menu.classList.add('active');
		} else {
			menu.classList.remove('active');
			document.body.style.overflow = 'visible';
		}
		menuBtn.classList.toggle('active');
		setTimeout(function () { navLock = true }, 500);
	});
}());

alert('w' + window.innerWidth + 'h' + window.innerHeight)