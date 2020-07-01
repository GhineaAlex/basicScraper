const axios = require('axios');
const cheerio = require('cheerio');
const createTextVersion = require("textversionjs");
const extractor = require("phonenumbers-extractor");
const validatePhoneNumber = require('validate-phone-number-node-js');
const PhoneNumber = require('@reallyuseful/phonenumber');
const email = require('node-email-extractor').default;
const csv = require('csv-parser');
const fs = require('fs');

var arrayDomain = [];

fs.createReadStream('websites.csv')
    .pipe(csv())
    .on('data', (row) => {
        arrayDomain.push(row.domain);
    })
    .on('end', () => {
        (async () => {
            for(let i = 0; i < arrayDomain.length; i++){
                var data = await email.url("https://" + arrayDomain[i] + "/");
                if(data.emails != null || data != null){
                    //let datat = JSON.stringify(data);
                    fs.appendFile('file.json', arrayDomain[i] + "    ", function(err){
                        if(err) throw err;
                    });
                    fs.appendFile('file.json', data.emails + "   ", function(err){
                        if(err) throw err;
                        console.log('IS WRITTEN')
                        })
                }
                async function b(){
                    await a("https://" + arrayDomain[i] + "/", 1);
                    fs.appendFile('file.json', [...phoneTable].join(' ') + "\n", function(err){
                        if(err) throw err;
                        console.log('IS WRITTEN')
                        })
                }
                b(); 
            }
            
        })()
        
    });
console.log(arrayDomain);
lookupTable = new Set();
phoneTable = new Set();

async function a(website, depth) {
    if (depth <= 0) {
        return;
    }
    try {
        let res = await axios.get(website);
        const $ = cheerio.load(res.data, { decodeEntities: false });
        $('a').each(function (index, element) {
            let aUrl = $(element).attr('href');
            aUrl = startWithSlash(aUrl, website);
            if (matchSameWebsite(aUrl, website) == false) {
                return;
            }

            if (lookupTable.has(aUrl)) {
                return;
            }
            lookupTable.add(aUrl);

            var textVersion = createTextVersion(res.data);
            //console.log(textVersion);
            //let match = textVersion.match(/[^\s@]+@[^\s@]+\.[^\s@]+/img);
            //let phoneMatch = textVersion.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/img);
            
             
            let extr = extractor.extractNumbers(textVersion, 6);
            for (let i = 0; i < extr.length; i++) {
                //console.log(PhoneNumber.valid(extr[i].originalFormat));
                try {
                    if (PhoneNumber.valid(extr[i].originalFormat) == true) {
                        if (validatePhoneNumber.validate(extr[i].originalFormat) == true) {
                            phoneTable.add(extr[i].originalFormat);
                            //console.log(phoneTable);
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
            a(aUrl, depth - 1);
        });
    }
    catch (e) {
        return;
    }

}

function startWithSlash(url, website) {
    let regexp = /^\/.*$/g;
    let match = url.match(regexp);
    if (match != null) {
        website = website.replace(/\/+$/, '');
        url = url.replace(/^\/+/, '');
        url = website + "/" + url;
    }
    return url;
}

function matchSameWebsite(url, website) {
    let regexp = new RegExp("^" + website + ".*$");
    let match = url.match(regexp);

    if (match == null) {
        return false;
    }
    return true;
}


