const fs = require('fs');
const event = require('./event.js');

const ldb = {};

ldb.event = event;

// criar uma pasta para armazenar os dados
ldb.createDB = (path, name, callback)=>{
	fs.mkdir(`${path}/${name}`, { recursive: true }, (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// criar arquivo
ldb.createDBFile = (path, file, callback)=>{
	fs.writeFile(`${path}/${file}.ldb`, '', (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// deletar arquivo
ldb.deleteDBFile = (path, file, callback)=>{
	fs.unlink(`${path}/${file}.ldb`, ()=>{
		if(callback) callback();
	});
}

// renomear arquivo
ldb.renameDBFile = (oldPath, oldFile, newFile)=>{
	fs.rename(`${oldPath}/${oldFile}.ldb`, `${oldPath}/${newFile}.ldb`, (err)=>{
		if(err) throw err;

		fs.stat(`${newPath}/${newFile}.ldb`, (err, stats)=>{
			if(err) throw err;

			console.log(`complete file stats: ${JSON.stringify(stats)}`);
		});
	});
}

// clonar os dados de um arquivos
ldb.cloneDBFile = (path, file, toPath, toFile, callback)=>{
	fs.copyFile(`${path}/${file}.ldb`, `${toPath}/${toFile}.ldb`, (err)=>{
		if(err) throw err;

		if(callback) callback();
	});
}

// sobrescrever dados
ldb.overwriteData = (path, file, content, callback)=>{
	fs.writeFile(`${path}/${file}.ldb`, content, (err)=>{
		if(err) throw err;

		if(callback) callback();
	})
}

// enviar dados, gera um erro se o arquivo não existir
ldb.sendData = (path, file, content, callback)=>{
	fs.readFile(`${path}/${file}.ldb`, (err, data)=>{
		if(err) throw err;

		let beforeContent = data;

		fs.writeFile(`${path}/${file}.ldb`, `${beforeContent} ${content}`, (err)=>{
			if(err) throw err;

			if(callback) callback();
		});
	});
}

// pegar os dados de um arquivo
ldb.getData = (path, file, callback)=>{
	fs.readFile(`${path}/${file}.ldb`, (err, data)=>{
		if(err) throw err;

		if(callback) callback(data);

		return data;
	});
}

module.exports = ldb;