"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("../result/result");
const search_options_1 = require("./search-options");
exports.itunesSearchRoot = "https://itunes.apple.com/search";
function searchItunes(options) {
    return new Promise((resolve, reject) => {
        const phin = require("phin");
        //Initializing passed options (adding methods when directly passing an object)
        const searchOptions = search_options_1.ItunesSearchOptions.from(options);
        phin(`${exports.itunesSearchRoot}?${searchOptions.toURI()}`, (err, res) => {
            if (err || !res || res.statusCode!== 200) {
                console.log('QUERY FAIL',res)

                reject(res);
            }
            else {
                try {
                    res.body = JSON.parse(res.body);
                    resolve(result_1.ItunesResult.from(res.body));
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
