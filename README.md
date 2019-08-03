# ldb
A lib to create and manage local db files and data, whit a simple send and get system,  
save any data, html content, js objects and arrays, some texts, anything.


##### The erros in the operations is automatically returned not include in yours callbacks.

### Creating a db location folder

```javascript
const ldb = require('ldbjs');

ldb.createDB('.', 'myDB'); // optional callback
```

And your db are created.


### Creating DB file

```javascript
const ldb = require('ldbjs');

ldb.createDB('.', 'myDB'); // optional callback
ldb.createDBFile('./myDB', 'myDBFile'); // optional callback
```

The file extension are **.ldb**.


### Sending data to my dbfile

```javascript
const ldb = require('ldbjs');

ldb.createDB('.', 'myDB');
ldb.createDBFile('./myDB', 'myDBFile');

let myData = 'Hello World!';

ldb.sendData('./myDB', 'myDBFile', myData, ()=>{
	// this callback is optional
	console.log(`${myData} as been sended to my ldb DB!`);
});
```

Sent data is saved **exactly** as sent


### Getting data from dbfile

```javascript
// electron example
const ldb = require('ldbjs');

let myPTag = document.getElementById('myP');

myPTag.innerHTML = ldb.getData('./myDB', 'myDBFile'); // returns data of the file
console.log(ldb.getData('./myDB', 'myDBFile')); // returns data in buffer format of the file

ldb.getData('./myDB', 'myDBFile', (data)=>{ // optional callback
	myPTag.innerHTML = data;
});
```

The returned value is a json with the properties type and data, type is buffer and data is content,  
while **on console** prints **array with buffer**, while on **html component returns  
exactly the data on the screen**.


### To overwrite data of the file

```javascript
const ldb = require('ldbjs');

ldb.createDB('.', 'myDB');
ldb.createDBFile('./myDB', 'myDBFile');

let myData = 'I overwrited data!';

ldb.overwriteData('./myDB', 'myDBFile', myData); // optional callback
```

That action is **irreversible**.


### Cloning the content to other dbfile

```javascript
const ldb = require('ldbjs');

ldb.createDB('.', 'myDB');
ldb.createDBFile('./myDB', 'myDBFile');
ldb.createDBFile('./myDB', 'myOtherDBFile');

let myData = 'I overwrited data!';

ldb.sendData('./myDB', 'myDBFile', myData); // optional callback

ldb.cloneDBFile('./myDB', 'myDBFile', './myDB', 'myOtherDBFile', ()=>{ // optional callback
	console.log('')
});
```

To clone a file you need the two files created.

### Deleting a dbfile

```javascript
const ldb = require('ldbjs');

ldb.deleteDBFile('./myDB', 'myDBFile', ()=>{ // optional callback
	console.log('the dbfile as been deleted');
});
```

That action is **irreversible**.

### To rename a dbfile

```javascript
const ldb = require('ldbjs');
ldb.renameDBFile('./myDB', 'myDBFile', 'myNewDBFileName');
```

This function **not receive a callback**, are shown in the console the new stats of the file

### Using events

```javascript
const ldb = require('ldbjs');

ldb.event.on('create a DB', (path, name)=>{
	ldb.createDB(path, name);
});

ldb.event.emit('create a DB', '.', 'myDB');
```

Events are a very simple way to create and manage DBs and DBfiles in your application, don't repeat code anymore.