var sha256 = require('./sha256');
let MersenneTwister = require('./MersenneTwister');
var mersenneTwister = new MersenneTwister();

if (process.argv.length < 3) {
	printUsage();
}

if (isNaN(process.argv[4])) {
	printUsage();
}

if (!isHex(process.argv[3]) || !isHex(process.argv[2])) {
        console.log("Argument is not a hex string");
        printUsage();
}

var voutHex = process.argv[4].toString(16);
if (voutHex.length < 8) {
	var neededZeroes = 8-voutHex.length;
	for (var i=0; i<neededZeroes; i++) {
		voutHex = "0" + voutHex;
	}
}

var randomSeedCheck = process.argv[2] + process.argv[3] + voutHex
var generatedRandomNumberSeed = sha256(hexStringToByte(randomSeedCheck));
var serverSeedHash = sha256(hexStringToByte(process.argv[2]));

console.log("Random Number Seed: " + generatedRandomNumberSeed);

console.log("Server Seed Hash: " + serverSeedHash);

var rolledNumber = getRandomNumber(generatedRandomNumberSeed);

console.log("Rolled number: " + rolledNumber);

// ================================================================
// ================================================================
// ================================================================

function printUsage() {
	console.log("Usage: secret_seed txid vout_index");
	process.exit(1);
}

function isHex(input) {
	var hexRegEx = /([0-9]|[a-f])/gim;
	return typeof input === 'string' && (input.match(hexRegEx) || []).length === input.length;
}

function getRandomNumber(sha256) {
	var seed = new Array();
	for (var s = 0; s < 8; s++) {
	    var intText = sha256.substring(s * 8, (s + 1) * 8);
	    seed.push(parseInt(intText, 16));
	    mersenneTwister.seedArray(seed);
	}
	return mersenneTwister.short();
}

function hexStringToByte(str) {
	  if (!str) {
	    return new Uint8Array();
	  }
	  
	  var a = [];
	  for (var i = 0, len = str.length; i < len; i+=2) {
	    a.push(parseInt(str.substr(i,2),16));
	  }
	  
	  return new Uint8Array(a);
}

function intToByteArray(int) {
    var byteArray = [0, 0, 0, 0];

    for ( var index = 0; index < byteArray.length; index ++ ) {
        var byte = int & 0xff;
        byteArray [ index ] = byte;
        int = (int - byte) / 256 ;
    }

    return byteArray;
}

function byteArrayToHexString(hexx) {
	var hex = hexx.toString(); //force conversion
	var str = '';
	for (var i = 0; i < hex.length; i += 2) {
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));		
	}
	return str;
}
