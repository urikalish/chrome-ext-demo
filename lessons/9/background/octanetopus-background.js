const localStorageConfigKey = 'octanetopus-config';
const defaultConfigObj = {
	url: 'localhost:9090/ui/',
	btnColor: '#0079e7'
};
const jsCheckScript = 'content/octanetopus-check.js';
const cssContentScript = 'content/octanetopus-content.css';
const jsContentScript = 'content/octanetopus-content.js';
let updatedTabId = 0;

const log = (msg) => {
	console.log(`OCTANETOPUS BACKGROUND PAGE | ${msg}`);
};

const ensureConfigInStorage = () => {
	log('ensureConfigInStorage');
	if (localStorage.getItem(localStorageConfigKey) === null) {
		localStorage.setItem(localStorageConfigKey, JSON.stringify(defaultConfigObj));
	}
};

const injectCss = async (tabId, cssFilePath) => {
	log(`injecting ${cssFilePath}`);
	await chrome.tabs.insertCSS(tabId, {file: cssFilePath});
};

const injectJs = async (tabId, jsFilePath) => {
	log(`injecting ${jsFilePath}`);
	await chrome.tabs.executeScript(tabId, {file: jsFilePath});
};

const addMessageListener = () => {
	chrome.runtime.onMessage.addListener((request, sender, responseFunc) => {
		if (request.type === 'octanetopus-content-to-background--inject') {
			log(request.type);
			log('injecting content scripts');
			(async () => {
				await injectCss(updatedTabId, cssContentScript);
				await injectJs(updatedTabId, jsContentScript);
			})();
		} else if (request.type === 'octanetopus-content-to-background--init') {
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

const addOnTabCompleteListener = () => {
	chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
		const config = JSON.parse(localStorage.getItem(localStorageConfigKey));
		if (changeInfo.status === 'complete' && config.url && tab.url.includes(config.url)) {
			updatedTabId = tabId;
			await injectJs(tabId, jsCheckScript);
		}
	});
};

log('background page loaded');
ensureConfigInStorage();
addMessageListener();
addOnTabCompleteListener();
