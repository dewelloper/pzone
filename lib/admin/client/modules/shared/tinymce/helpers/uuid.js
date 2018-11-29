'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = uuid;
var count = 0;
function uuid() {
	return 'react-tinymce-' + count++;
}
