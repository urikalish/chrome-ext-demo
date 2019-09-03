const log = (msg) => {
	console.log(`OCTANETOPUS CONTENT SCRIPT | ${msg}`);
};

const waitForAppReadyMaxNumberOfTries = 30;
const waitForAppReadyRetryFrequencyMillis = 1000;
const waitForAppReady = (selectorToFind, onAppReady, curTryNumber = 1) => {
	log(`waitForAppReady - try #${curTryNumber}`);
	const elm = document.querySelector(selectorToFind);
	if (elm) {
		log('app ready');
		onAppReady();
	} else if (curTryNumber < waitForAppReadyMaxNumberOfTries) {
		log('Unable to find DOM element - will try again');
		setTimeout(() => {
			waitForAppReady(selectorToFind, onAppReady, curTryNumber+1);
		},
		waitForAppReadyRetryFrequencyMillis
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

const go = () => {
	log('go');
	waitForAppReady('.mqm-masthead', onAppReady);
};

log('content script loaded');
go();
