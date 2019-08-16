const localStorageConfigKey = 'octanetopus-config';
const defaultConfigObj = {
	url: 'localhost:9090/ui/',
	color: '#0073e7'
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
		if (request.type === 'octanetopus-content-to-background--init') {
			log(request.type);
			log('send response to content script');
			responseFunc(
				{
					type: 'octanetopus-background-to-content--config',
					data: localStorage.getItem(localStorageConfigKey)
				}
			);
		}
	});
};

log('background page loaded');
ensureConfigInStorage();
addMessageListener();
