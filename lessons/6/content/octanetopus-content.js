const log = (msg) => {
	console.log(`OCTANETOPUS CONTENT SCRIPT | ${msg}`);
};

const init = () => {
	log('init');
	log('send greeting to background page');
	chrome.runtime.sendMessage(
		{
			type: 'octanetopus-content-to-background--greeting',
			data: {greeting: 'Hi from content script'}
		},
		(response) => {
			if (response.type === 'octanetopus-background-to-content--greeting') {
				alert(`Content script received message "${response.data.greeting}"`);
			}
		}
	);
};

const waitForAppReady = (selectorToFind, onLoadCallback, maxNumberOfTries = 10, retryFrequencyMillis = 1000, curTryNumber = 1) => {
	log(`waitForAppReady - try #${curTryNumber}`);
	const elm = document.querySelector(selectorToFind);
	if (elm) {
		log('app ready');
		onAppReady();
	} else if (curTryNumber < maxNumberOfTries) {
		log('Unable to find DOM element - will try again');
		setTimeout(() => {
			waitForAppReady(selectorToFind, onLoadCallback, maxNumberOfTries, retryFrequencyMillis, curTryNumber+1);
		},
		retryFrequencyMillis
		);
	} else {
		log('max number of retries exceeded - give up');
	}
};

const onAppReady = () => {
	log('onAppReady');
	addSelfEsteemBooster();
};

const addSelfEsteemBooster = () => {
	log('add self esteem booster');
	const parentElm = document.querySelector('.mqm-masthead > .masthead-bg-color > div > div:nth-child(2)');
	if (parentElm) {
		const btnElm = document.createElement('button');
		btnElm.textContent = 'SELF-ESTEEM++';
		btnElm.classList.add('button--primary', 'margin-r--sm');
		btnElm.style['border'] = '1px solid #fff';
		btnElm.addEventListener('click', () => {alert('You Are Amazing!');});
		parentElm.appendChild(btnElm);
		log('self esteem booster added');
	}
};

log('content script loaded');
init();
waitForAppReady('.mqm-masthead > .masthead-bg-color > div > div:nth-child(2)', onAppReady);
