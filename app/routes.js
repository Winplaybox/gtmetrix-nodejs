module.exports = function (app) {
    var fs = require('fs'),
     filter = require('content-filter'),
     JSZip = require("jszip"),
     request = require('request'),
     http = require("https"),
     path    = require("path"),
    // unzipper = require("unzipper"),
    unzip =require("unzip"),
    //  extract = require('extract-zip');
    // zlib = require('zlib');
    admzip  = require('adm-zip'), // a module for extracting files
    multer=require('multer'); // a module for saving file from form.
    // tar = require("node-tar");
    // var DOMParser = require('xmldom').DOMParser;
    var HTMLParser = require('node-html-parser');
    app.get('/api/react-native', function (req, res) {
        var jsonObject = fs.readFileSync("pagespeed(demo.ewizsaas.com).json");
        var jsonContent = JSON.parse(jsonObject);
                for(var listarray of jsonContent.rules) {  
                   var finallist;
                    if(listarray.shortName == 'OptImgs' ){
                        finallist=listarray.warnings;
                        var fg1=finallist;
                            if(fg1== undefined || fg1 == null){
                                console.log('Empty: '+fg1);
                            }
                            else{
                                var ek=fg1.match(/https.*?(?:png|jpg|jpeg|svg|bmp|gif)/gi);
                                var unique = ek.filter((v, i, a) => a.indexOf(v) === i); 
                                console.log(unique)
                                //res.send(unique);
                                unique.forEach(element => {
                                    var gh=element.toString().match(/.*\/(.+?)\./);
                                    var result=gh[1];
                                    console.log("filename: "+result);
                                    res.send(result);
                                var destPath = "./extractfiles";
                                var dirPath ='./pagespeed_files(demo.ewizsaas.com).zip';
                                var zip = new admzip(dirPath);
                                zipEntries = zip.getEntries();
                                var findwords,entry,spli,encrpyt,findwords1,fg,re,fg1;
                                fg=unique.toString();
                                re = /(?:\.([^.]+))?$/;
                                
                                zipEntries.forEach(function(zipEntry) {
                                  // console.log(zipEntry.toString()); // entries zip
                                    entry=zipEntry.entryName.split('/')[0];
                                    spli=zipEntry.name.substring(zipEntry.name.lastIndexOf('_')+1, zipEntry.name.length);
                                    encrpyt=spli.split('.')[0];
                                   if(re.exec(zipEntry.name)[0] == '.jpg'){
                                        fg1=re.exec(zipEntry.name)[0];
                                        findwords=result+'_'+encrpyt+fg1; // 7df40516-a11e-42e3-a417-7d1c808cfd2e_bd33dbea0eb3e6d7f741c9cf8b0c561a.jpg
                                        findwords1=re.exec(findwords)[0];
                                        if (zipEntry.name == findwords) {
                                            //console.log(zipEntry.getData().toString('utf8'));
                                            console.log('Data found');
                                        }
                                        else{
                                            console.log('Data not found')
                                        }
                                   }
                                });
                                console.log(entry);
                                console.log('gtmetrix no : '+encrpyt);
                                console.log('extnesion : '+fg1);
                                console.log('file name : '+findwords);
                                console.log('Extnesion : '+findwords1);
                                
                                if(findwords1 == ".jpg"){
                                  zip.extractEntryTo(entry+'/'+findwords,destPath,false,true);
                                     console.log('successful');
                                  }   
                                  else{
                                      console.log('unsuccessful');
                                  }  
                                });
                            }
                    }
                }
    });
};