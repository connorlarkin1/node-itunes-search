"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("../result/result");
exports.itunesSearchRoot = "https://itunes.apple.com/search";
function searchItunes(options) {
    return new Promise((resolve, reject) => {
        const phin = require("phin");
        phin(`${exports.itunesSearchRoot}?${options.toURI()}`, (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                try {
                    res.body = JSON.parse(res.body);
            
                    // Handle non-exception-throwing cases:
                    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
                    // but... JSON.parse(null) returns null, and typeof null === "object", 
                    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
                    if (o && typeof o === "object") {
                        resolve(result_1.ItunesResult.from(res.body));
                    }
                    else {
                        console.log('QUERY FAIL',options.toURI())
                        reject('itunes query not an object');
                    }
                }
                catch (e) { 
                    console.log('QUERY FAIL',options.toURI())
                    reject(e);
                }
            }
        });
    });
}
exports.searchItunes = searchItunes;
