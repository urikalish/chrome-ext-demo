const localStorageConfigKey = 'octanetopus-config';
const defaultConfigObj = {
	url: 'localhost:9090/ui/',
	btnColor: '#0079e7'
};

const log = (msg) => {
	console.log(`OCTANETOPUS BACKGROUND PAGE | ${msg}`);
};

const ensureConfigInStorage = () => {
	log('ensureConfigInStorage');
	if (localStorage.getItem(localStorageConfigKey) === null) {
		localStorage.setItem(localStorageConfigKey, JSON.stringify(defaultConfigObj));
	}
};

const addMessageListener = () => {
	chrome.runtime.onMessage.addListener((request, sender, responseFunc) => {
		if (request.type === 'octanetopus-content-to-background--greeting') {
			alert(`Background page received message "${request.data.greeting}"`);
			log('send greeting to content script');
			responseFunc(
				{
					type: 'octanetopus-background-to-content--greeting',
					data: {greeting: 'Hi from background page'}
				}
			);
		}
	});
};

log('background page loaded');
ensureConfigInStorage();
addMessageListener();
