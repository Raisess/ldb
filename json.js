// json module
const fs = require('fs');

const json = {};

// create a json file
json.createDBFile = (path, db, file, callback)=>{
	fs.writeFile(`${path}/${db}/${file}.json`, '', (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// parse a JS obj to JSON string notation and send
json.sendData = (path, db, file, jsObj, callback)=>{
	fs.writeFile(`${path}/${db}/${file}.json`, JSON.stringify(jsObj), (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// insert data to a exists json
json.insert = (path, db, file, args, index, insert, callback)=>{
	fs.readFile(`${path}/${db}/${file}.json`, (err, data)=>{
		if(err) throw err;

		let json;

		json = JSON.parse(data);

		if(args === '' || args === null || args === undefined) json[index] = insert;

		if(args !== '' && args !== null && args !== undefined) json[args][index] = insert;

		fs.writeFile(`${path}/${db}/${file}.json`, JSON.stringify(json), (err)=>{
			if(err) throw err;

			if(callback) callback();
		});
	});
}

// parse a JSON to JS obj and get data
json.getData = (path, db, file, callback)=>{
	fs.readFile(`${path}/${db}/${file}.json`, (err, data)=>{
		if(err) throw err;

		if(callback) callback(JSON.parse(data));
	});
}

// delete json file
json.deleteDBFile = (path, db, file, callback)=>{
	fs.unlink(`${path}/${db}/${file}.json`, (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// backup of file data
json.backup = (path, db, file, callback)=>{
	fs.writeFile(`${path}/${db}/${file}.backup.json`, '', (err)=>{
		if(err) throw err;
		fs.copyFile(`${path}/${db}/${file}.json`, `${path}/${db}/${file}.backup.json`, (err)=>{
			if(err) throw err;

			if(callback) callback();
		});
	});
}

// rollback backup to file
json.rollback = (path, db, file, callback)=>{
	fs.copyFile(`${path}/${db}/${file}.backup.json`, `${path}/${db}/${file}.json`, (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

module.exports = json;