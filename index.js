const fs = require('fs');
const event = require('./event.js');
const json = require('./json.js');
const base = require('./base64.js');

const ldb = {};

// put the event module in the main module
ldb.event = event;
// put the json module in the main module
ldb.json = json;
// put the base64 module in the main module
ldb.base64 = base;

// get the project dir path
ldb.dir = __dirname;

// crieate a folder to place the dbfiles
ldb.createDB = (path, name, callback)=>{
	fs.mkdir(`${path}/${name}`, { recursive: true }, (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// create dbfiles
ldb.createDBFile = (path, db, file, callback)=>{
	fs.writeFile(`${path}/${db}/${file}.ldb`, '', (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// delete files
ldb.deleteDBFile = (path, db, file, callback)=>{
	fs.unlink(`${path}/${db}/${file}.ldb`, (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// rename files
ldb.renameDBFile = (oldPath, oldDB, oldFile, newFile)=>{
	fs.rename(`${oldPath}/${oldDB}/${oldFile}.ldb`, `${oldPath}/${oldDB}/${newFile}.ldb`, (err)=>{
		if(err) throw err;
		// show the new stats in the console
		fs.stat(`${oldPath}/${oldDB}/${newFile}.ldb`, (err, stats)=>{
			if(err) throw err;

			console.log(`complete file stats: ${JSON.stringify(stats)}`);
		});
	});
}

// clone db file
ldb.cloneDBFile = (path, db, file, toPath, toDB, toFile, callback)=>{
	fs.copyFile(`${path}/${db}/${file}.ldb`, `${toPath}/${toDB}/${toFile}.ldb`, (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// overwrite db file data
ldb.overwriteData = (path, db, file, content, callback)=>{
	fs.writeFile(`${path}/${db}/${file}.ldb`, content, (err)=>{
		if(err) throw err;

		if(callback) callback();
	})
}

// send data to dbfile
ldb.sendData = (path, db, file, content, callback)=>{

	let beforeContent;

	fs.readFile(`${path}/${db}/${file}.ldb`, (err, data)=>{
		if(err) throw err;

		beforeContent = data;

		fs.writeFile(`${path}/${db}/${file}.ldb`, beforeContent+content+'\n', (err)=>{
			if(err) throw err;

			if(callback) callback();
		});
	});
}

// get data from dbfile
ldb.getData = (path, db, file, callback)=>{
	fs.readFile(`${path}/${db}/${file}.ldb`, (err, data)=>{
		if(err) throw err;

		if(callback) callback(data.toString());
	});
}

// list the db files in the folder, in a console table
ldb.getDBFiles = (path, db, callback)=>{
	fs.readdir(`${path}/${db}`, (err, files)=>{
		if(err) throw err;

		if(callback) callback(files);

		console.table(files);
	});
}

module.exports = ldb;