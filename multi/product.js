'use strict';

const fs = require('fs');
const Keyring = require('@polkadot/keyring');
const Util = require('@polkadot/util-crypto');
const CryptoJS = require('crypto-js');

// create a keyring with some non-default values specified
const keyring = new Keyring.Keyring({ type: 'sr25519', ss58Format: 2 });

function GetRandomNum(Min,Max)
{   
  var Range = Max - Min;   
  var Rand = Math.random();   
  return(Min + Math.round(Rand * Range));
}  

let arr = [];
let base_block = 1;

for (let i =0; i< 200; i++) {
  let base = GetRandomNum(12560000000, 109839988207770);

  const mnemonic = Util.mnemonicGenerate();
  // create & add the pair to the keyring with the type and some additional
  // metadata specified
  const pair = keyring.addFromUri(mnemonic, { name: 'first pair' }, 'ed25519');
  let from = pair.address;

  {
    const mnemonic_to = Util.mnemonicGenerate();
    const pair_to = keyring.addFromUri(mnemonic_to, { name: 'first pair' }, 'ed25519');

    let hash = CryptoJS.SHA256(pair.address + pair_to.address);

    let block_diff_little = GetRandomNum(1,5);
    base_block += block_diff_little;

    let multiple = GetRandomNum(1,5);
    arr.push({
      blockhigh: base_block,
      hash: "0x" + hash.toString(CryptoJS.enc.Hex),
      timestamp: Date.now() + base_block * 5000,
      module: "balances",
      call: "tranfer",
      from: from,
      to: pair_to.address,
      balance: base * multiple + GetRandomNum(1256000, 10983998820),
      flag: false
    })
  }

  let times = GetRandomNum(3,6);
  for (let index = 0; index < times; index++) {

    let chose_little_more =  GetRandomNum(1,10);

    if (0 === chose_little_more%2)
    {
      const mnemonic_to = Util.mnemonicGenerate();
      const pair_to = keyring.addFromUri(mnemonic_to, { name: 'first pair' }, 'ed25519');

      let hash = CryptoJS.SHA256(pair.address + pair_to.address);

      let block_diff_little = GetRandomNum(1,5);
      base_block += block_diff_little;

      let multiple = GetRandomNum(1,5);
      arr.push({
        blockhigh: base_block,
        hash: "0x" + hash.toString(CryptoJS.enc.Hex),
        timestamp: Date.now() + base_block * 5000,
        module: "balances",
        call: "tranfer",
        from: from,
        to: pair_to.address,
        balance: base * multiple + GetRandomNum(1256000, 10983998820),
        flag: true
      })
    } else {
      const mnemonic_to = Util.mnemonicGenerate();
      const pair_to = keyring.addFromUri(mnemonic_to, { name: 'first pair' }, 'ed25519');

      let hash = CryptoJS.SHA256(pair.address + pair_to.address);

      let block_diff_more = GetRandomNum(1000,5000);
      base_block += block_diff_more;

      let multiple = GetRandomNum(1,5);
      arr.push({
        blockhigh: base_block,
        hash: "0x" + hash.toString(CryptoJS.enc.Hex),
        timestamp: Date.now() + base_block * 5000,
        module: "balances",
        call: "tranfer",
        from: from,
        to: pair_to.address,
        balance: base * multiple + GetRandomNum(1256000, 10983998820),
        flag: false
      })
    }

  }


}
//console.log(arr);
fs.writeFile("multi-product.json", JSON.stringify(arr), 'utf8', function (err) {
  if (err) {
  console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
  }

  console.log("JSON file has been saved.");
});