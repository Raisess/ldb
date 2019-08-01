const fs = require('fs');

const ldb = {};

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
	});
}

module.exports = ldb;