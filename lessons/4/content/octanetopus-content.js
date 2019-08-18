const log = (msg) => {
	console.log(`OCTANETOPUS | ${msg}`);
};

const waitForLoad = (selectorToFind, onLoadCallback, maxNumberOfTries = 30, retryFrequencyMillis = 1000, curTryNumber = 1) => {
	log(`waitForLoad - try #${curTryNumber}`);
	const elm = document.querySelector(selectorToFind);
	if (elm) {
		log('loaded');
		onLoadCallback();
	} else if (curTryNumber < maxNumberOfTries) {
		log('Unable to find DOM element - will try again');
		setTimeout(() => {
			waitForLoad(selectorToFind, onLoadCallback, maxNumberOfTries, retryFrequencyMillis, curTryNumber+1);
			},
			retryFrequencyMillis
		);
	} else {
		log('max number of retries exceeded - give up');
	}
};

const onLoad = () => {
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
waitForLoad('.mqm-masthead > .masthead-bg-color > div > div:nth-child(2)', onLoad);
