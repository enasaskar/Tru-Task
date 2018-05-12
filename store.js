const fileSystem = require('fs');
//read from terminal the arguments passed when the Node.js process launched and then parse it
var args = process.argv.slice(2);

var operation = args[0];
var storeFile = 'store.json';
var storeObject = readStore(storeFile);

// Read store from file.
function readStore(storeFile) {
    var data = fileSystem.readFileSync(storeFile, 'utf8', function (error) {
        if (error) {
            console.log('Unable to read store file: ' + error);
        }
    });
    return JSON.parse(data);
}

//save store to file.
function writeStore() {
    var json = JSON.stringify(storeObject);
    fileSystem.writeFileSync(storeFile, json, 'utf8', function (error) {
        if (error) {
            console.log('error: ' + error);
        }
    });
}

switch (operation) {
    case 'add':
        add(args[1], args[2]);
        break;
    case 'list':
        list();
        break;
    case 'get':
        get(args[1]);
        break;
    case 'remove':
        remove(args[1]);
        break;
    default:
        console.log('Invalid operation');
}


function add(key, value) {
    storeObject.dictionary.push({ 'key': key, 'value': value });
    writeStore();
}

function list() {
    storeObject.dictionary.forEach(function (item) {
        console.log(item['key'] + ' ' + item['value']);
    });
}

function get(key) {
    storeObject.dictionary.forEach(function (item) {
        if (item['key'] === key) {
            console.log(item['value']);
        }
    });
}

function remove(key) {
    storeObject.dictionary.forEach(function (item, index, object) {
        if (item['key'] === key) {
            object.splice(index, 1);
            count++;
        }
    });
    writeStore();
}