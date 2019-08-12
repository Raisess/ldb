# ldbjs
A lib to create and manage local db files and data, whit a simple send and get system,  
save any data, html content, js objects and arrays, JSON, some texts, anything.


##### The erros in the operations is automatically returned not include in yours callbacks.

### Creating a db location folder  

```javascript
const ldb = require('ldbjs');

ldb.createDB('.', 'myDB'); // optional callback

// this function create ldb DB and json DB
ldb.createDB('.', 'myJsonDB');
```

And your db are created.


### Creating DB file  

```javascript
const ldb = require('ldbjs');

ldb.createDB('.', 'myDB'); // optional callback
ldb.createDBFile('.', 'myDB', 'myDBFile'); // optional callback

// ldb.createDBFile(path, db, file);
```

The file extension are **.ldb**.


### Sending data to my dbfile  

```javascript
const ldb = require('ldbjs');

ldb.createDB('.', 'myDB');
ldb.createDBFile('.', 'myDB', 'myDBFile');

let myData = 'Hello World!';

ldb.sendData('.', 'myDB', 'myDBFile', myData, ()=>{
	// this callback is optional
	console.log(`${myData} as been sended to my ldb DB!`);
});
```

Sent data is saved **exactly** as sent


### Getting data from dbfile  

```javascript
const ldb = require('ldbjs');

ldb.getData('.', 'myDB', 'myDBFile', (data)=>{ // use callback
	console.log(data);
});
```

The returned value is the **data** of the file.  
This function is used only with a callback to get the parameter.

### Getting the DB files list

```javascript
const ldb = require('ldbjs');

ldb.createDB('.', 'db');

ldb.createDBFile('.', 'db', 'test');
ldb.createDBFile('.', 'db', 'hello');
ldb.json.createDBFile('.', 'db', 'world');

// this return a table on console with the all files in the db
ldb.getDBFiles('.', 'db');
```

To use a callback in that function use like this

```javascript
ldb.getDBFiles('.', 'db', (files)=>{
    console.log(files);
});
```

This function return the files name.

### To overwrite data of the file  

```javascript
const ldb = require('ldbjs');

ldb.createDB('.', 'myDB');
ldb.createDBFile('.', 'myDB', 'myDBFile');

let myData = 'I overwrited data!';

ldb.overwriteData('.', 'myDB', 'myDBFile', myData); // optional callback
```

That action is **irreversible**.


### Cloning the content to other dbfile  

```javascript
const ldb = require('ldbjs');

ldb.createDB('.', 'myDB');
ldb.createDBFile('.', 'myDB', 'myDBFile');

let myData = 'I overwrited data!';

ldb.sendData('.', 'myDB', 'myDBFile', myData); // optional callback

ldb.cloneDBFile('.', 'myDB', 'myDBFile', '.', 'myDB', 'myOtherDBFile', ()=>{ // optional callback
	console.log('cloned a db file');
});
```

To clone a file you need the two files created.

### Deleting a dbfile  

```javascript
const ldb = require('ldbjs');

ldb.deleteDBFile('.', 'myDB', 'myDBFile', ()=>{ // optional callback
	console.log('the dbfile as been deleted');
});
```

That action is **irreversible**.

### To rename a dbfile  

```javascript
const ldb = require('ldbjs');

ldb.renameDBFile('.', 'myDB', 'myDBFile', 'myNewDBFileName');
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

### Sending and getting data from json

```javascript
const ldb = require('ldbjs');

// creating a json dbfile
ldb.json.createDBFile('.', 'myJSONDBName', 'myJSONFileName', ()=>{
  // optional callback
  console.log('json dbfile created');
});

// sending the data

let myJSObj = {
  name: "Jhon",
  age: 27
};

ldb.json.sendData('.', 'myJSONDBName', 'myJSONFileName', myJSObj);

// getting the data
ldb.json.getData('.', 'myJSONDBName', 'myJSONFileName', (data)=>{
  cosole.log(data);
});
```

While a data are getted a js obj are return, the api automatically convert the  json to a js object for you.

### JSON insert and delete

```javascript
const ldb = require('ldbjs');

ldb.json.createDBFile('.', 'myJSONDBName', 'myJSONFileName');

let myJSObj = {
  name: "Jhon",
  age: 27,
  parents: {
    bro: "Fred"
  }
};

ldb.json.sendData('.', 'myJSONDBName', 'myJSONFileName', myJSObj);

// without args
ldb.json.insert('.', 'myJSONDBName', 'myJSONFileName', null, 'name', 'Alex', ()=>{
  // some code
});

// with args
ldb.json.insert('.', 'myJSONDBName', 'myJSONFileName', 'parents', 'bro', 'Daniel');

// to create new property
ldb.json.insert('.', 'myJSONDBName', 'myJSONFileName', null, 'lastName', 'Drake');

// to delete a property
ldb.json.delete('.', 'myJSONDBName', 'myJSONFileName', null, 'parents');
```

To insert data use the index propertie to put a new value, this function must  
have a json file not empty to work.

### JSON push, add and remove

```javascript
const ldb = require('ldbjs');

ldb.json.createDBFile('.', 'myJSONDBName', 'myJSONFileName');

let obj = {
  arr: []
};

ldb.json.sendData('.', 'myJSONDBName', 'myJSONFileName', obj);
ldb.json.push('.', 'myJSONDBName', 'myJSONFileName', null, 'arr', 1);
// push 1 to json 'arr' array
ldb.json.add('.', 'myJSONDBName', 'myJSONFileName', null, 'arr', 2);
// add sum 2 to json 'arr' array

// results its like {"arr": [3]}

ldb.json.remove('.', 'myJSONDBName', 'myJSONFileName', null, 'arr', 1);
// remove 1 from original value 3

// results its like {"arr": [2]}
```

### Base64 encode and decode

```javascript
const ldb = require('ldbjs');

let str = 'Hello World!';

// to encode a string
ldb.base64.encode(str);
// returns SGVsbG8gV29ybGQh

// to decode a string
ldb.base64.decode(str);
// returns Hello World!
```

This process use the base-64 module, this is downloaded like a dependecie.

### Backup and rollback

```javascript
const ldb = require('ldbjs');

ldb.backup('.', 'dbName', 'fileName');
// create a fileName.backup.ldb file

ldb.rollback('.', 'dbName', 'fileName');
// get the fileName.backup.ldb data and put in fileName.ldb

// To use in json is very similar, put the json module
ldb.json.backup('.', 'dbName', 'fileName');
// use the same logic
```

#### To report bugs or open a inssue in [github repo](https://github.com/raisess/ldbjs) or send a email to **danilosantana456789@gmail.com** no spam pls.