const fs = require('fs');
const event = require('./event.js');
const json = require('./json.js');

const ldb = {};

ldb.event = event;

ldb.json = json;

// criar uma pasta para armazenar os dados
ldb.createDB = (path, name, callback)=>{
	fs.mkdir(`${path}/${name}`, { recursive: true }, (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// criar arquivo
ldb.createDBFile = (path, db, file, callback)=>{
	fs.writeFile(`${path}/${db}/${file}.ldb`, '', (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// deletar arquivo
ldb.deleteDBFile = (path, db, file, callback)=>{
	fs.unlink(`${path}/${db}/${file}.ldb`, ()=>{
		if(callback) callback();
	});
}

// renomear arquivo
ldb.renameDBFile = (oldPath, oldDB, oldFile, newFile)=>{
	fs.rename(`${oldPath}/${oldDB}/${oldFile}.ldb`, `${oldPath}/${oldDB}/${newFile}.ldb`, (err)=>{
		if(err) throw err;

		fs.stat(`${oldPath}/${oldDB}/${newFile}.ldb`, (err, stats)=>{
			if(err) throw err;

			console.log(`complete file stats: ${JSON.stringify(stats)}`);
		});
	});
}

// clonar os dados de um arquivos
ldb.cloneDBFile = (path, db, file, toPath, toDB, toFile, callback)=>{
	fs.copyFile(`${path}/${db}/${file}.ldb`, `${toPath}/${toDB}/${toFile}.ldb`, (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// sobrescrever dados
ldb.overwriteData = (path, db, file, content, callback)=>{
	fs.writeFile(`${path}/${db}/${file}.ldb`, content, (err)=>{
		if(err) throw err;

		if(callback) callback();
	})
}

// enviar dados, gera um erro se o arquivo não existir
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

// pegar os dados de um arquivo
ldb.getData = (path, db, file, callback)=>{
	fs.readFile(`${path}/${db}/${file}.ldb`, (err, data)=>{
		if(err) throw err;

		if(callback) callback(data);

		return data;
	});
}

module.exports = ldb;