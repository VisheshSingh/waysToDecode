var map = {
    "01":  "A",
    "100": "B",
    "101": "C",
    "10":  "D",
    "111": "E",
    "000": "F"
}

function chunkArr(arr, chunk) {
  let i = 0;
  const chunkedArr= [];
  while (i < arr.length) {
    chunkedArr.push(arr.slice(i, i+chunk));
    i+=chunk;
  }
  return chunkedArr;
}

// function waysToDecode(input, keys, values) {
//     const arrayOfPossibleDecodings = [];
//     input = input.split('')
    
//     let chunkArr1 = chunkArr(input, 2);
//     chunkArr1 = (chunkArr1.map(inp => inp.join('')).filter(val => val.length > 1));
//     let chunkArr2 = chunkArr(input, 3);
//     chunkArr2 = (chunkArr2.map(inp => inp.join('')).filter(val => val.length > 2));
//     let possibleCombs = [...chunkArr1, ...chunkArr2];
//     console.log(possibleCombs)
//     console.log('object keys', Object.keys(map));
    
//     possibleCombs.forEach(val => {
//        if(Object.keys(map).includes(val)) {
//          arrayOfPossibleDecodings.push(map[val])
//        }
//     })
//     return arrayOfPossibleDecodings;
// }

const buildTree = (input) => {
	if (!input) {
  	return [];
  }
	// if input length is less than 2 return
  // we came down the wrong path
	if (input.length < 2) { 
  	return;
  }
  
	if (input.length == 2 || input.length == 3 ) {
  	// if its a valid entry we will have the mapped value for the key, if not its a invlaid path
    if (map[input]) {
      return [map[input]];
    } else {
    	return;
    }
  }

	// if we have length more than 3 then we try to break it into 2 paths
  // 1. with length 2
  // 2. with length 3
  let valueTwo = map[input.slice(0, 2)];
  let valueThree = map[input.slice(0, 3)];
  console.log('valueTwo', valueTwo)
  console.log('valueThree', valueThree)
  let possibleCombinations = [];
  if (valueTwo) {
  	let subCombinations = buildTree(input.slice(2));
    if (subCombinations) {
    	possibleCombinations = [...subCombinations.map(value => `${valueTwo}${value}`)];
    }
  }
  if (valueThree) {
  	let subCombinations = buildTree(input.slice(3));
    if (subCombinations) {
    	possibleCombinations = [...possibleCombinations, ...subCombinations.map(value => `${valueThree}${value}`)];
    }
  }
  
  return possibleCombinations;
};

function waysToDecode(input) {
    let arrayOfPossibleDecodings = buildTree(input);
    return arrayOfPossibleDecodings || [];
}

waysToDecode("1010110", Object.keys(map), Object.values(map)); // ["DCD", "CAD"]