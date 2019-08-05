// base64 module
const base64 = require('base-64');
const utf8 = require('utf8');

const base = {};

base.encode = (toEncode, callback)=>{
	let str = utf8.encode(toEncode);
	return base64.encode(str);
}

base.decode = (toDecode)=>{
	let str = base64.decode(toDecode);
	return utf8.decode(str);
}

module.exports = base;
