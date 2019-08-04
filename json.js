const fs = require('fs');

const json = {};

json.createDBFile = (path, db, file, callback)=>{
	fs.writeFile(`${path}/${db}/${file}.json`, '', (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

json.sendData = (path, db, file, jsObj, callback)=>{
	fs.writeFile(`${path}/${db}/${file}.json`, JSON.stringify(jsObj), (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

json.getData = (path, db, file, callback)=>{
	fs.readFile(`${path}/${db}/${file}.json`, (err, data)=>{
		if(err) throw err;

		if(callback) callback();;


		return JSON.parse(data);
	});
}

module.exports = json;