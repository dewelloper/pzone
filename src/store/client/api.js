import PzClient from 'pz-client';
import clientSettings from './settings';

const api = new PzClient({
	ajaxBaseUrl: clientSettings.ajaxBaseUrl || '/ajax'
});

export default api;
