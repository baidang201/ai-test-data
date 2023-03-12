'use strict';

const fs = require('fs');
let arr = []


for (let index = 1; index < 91; index++) {
  let rawdata= fs.readFileSync(index +'.json');
  let txs = JSON.parse(rawdata);
  let newtxs  = txs.data.transfers;
  for (let j = 0; j < newtxs.length; j++) {
    const e = newtxs[j];
    const x ={
      blockhight: e.block_num,
      hash: e.hash,
      timestamp: e.block_timestamp,
      module: e.module,
      call: "transfer",
      from: e.from,
      to: e.to,
      balance: e.amount_v2,
      flag: false,
    }
    arr.push(x)
  }
  
}
//console.log(arr);
fs.writeFile("normal-output.json", JSON.stringify(arr), 'utf8', function (err) {
  if (err) {
  console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
  }

  console.log("JSON file has been saved.");
});