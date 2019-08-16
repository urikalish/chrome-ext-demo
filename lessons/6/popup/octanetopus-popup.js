const log = (msg) => {
	console.log(`OCTANETOPUS POPUP DIALOG | ${msg}`);
};

let configTextarea;
let cancelButton;
let saveButton;

const setDomElements = () => {
	log('setDomElements');
	configTextarea = document.getElementById('octanetopus-popup__content__config');
	cancelButton = document.getElementById('octanetopus-popup-cancel-button');
	saveButton = document.getElementById('octanetopus-popup-save-button');
	configTextarea.addEventListener('keyup', onConfigChange);
	cancelButton.addEventListener('click', onClickCancel);
	saveButton.addEventListener('click', onClickSave);
};

const onPopupLoad = () => {
	log('onPopupLoad');
	setDomElements();
};

const onConfigChange = () => {
	log('onConfigChange');
};

const onClickCancel = () => {
	window.close();
};

const onClickSave = () => {
	window.close();
};

document.addEventListener('DOMContentLoaded', onPopupLoad, false);
