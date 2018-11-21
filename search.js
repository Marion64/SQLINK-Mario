
function searchtxt(ext,text){


  var walk    = require('walk');
  var fs = require('fs');
  var files   = [];
  var text = text;
  var ext = ext;

// Walker options
var walker  = walk.walk(__dirname, { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files

    if(stat.name.split('.').pop() === ext)
    {

      fs.readFile(root + '/' + stat.name, 'utf8', function(err, contents) {
        if(contents.indexOf(text) >= 0){

          files.push(root + '/' + stat.name);

        }

  });
    }
    //console.log(root);

    //files.push(root + '/' + stat.name);

    next();
});

walker.on('end', function() {
  if(files.length < 1 || files == undefined){
    console.log("No files were found");
}
else {
  console.log(files);
}

});



}

function searchdocx(ext,text){

  var mammoth = require("mammoth");
  var walk    = require('walk');
  var files   = [];
  var text = text;
  var ext = ext;

// Walker options
var walker  = walk.walk(__dirname, { followLinks: false });




walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    if(stat.name.split('.').pop() === ext)
    {

      mammoth.extractRawText({path: root + '/' + stat.name})
        .then(function(result){


        var strings = result.value; // The raw text
        if(strings.indexOf(text) >= 0){

          files.push(root + '/' + stat.name);

        }

    })



    }

    next();
});

walker.on('end', function() {
  if(files.length < 1 || files == undefined){
    console.log("No files were found");
}
else {
  console.log(files);
}

});



}

function Main(){

  var ext = process.argv[2];
  var text = process.argv[3];

  if(ext == undefined || text == undefined)
  {
    console.log("Usage: node search.js [EXT] [TEXT]");

  }
  else if (ext === "txt")
  {
    searchtxt(ext,text);
  }
  else if(ext === "docx")
  {
    searchdocx(ext,text);

  }
  else
  {
    console.log("Unsupported Extension")
  }
}

Main();
