var pdf2img = require('pdf-img-convert');
var fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const model = genAI



var pdfFilePath = './example.pdf'; // Change this to your PDF file path
var outputDirectory = './output';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
}

var options = {

    density: 100,           // Output image density (DPI)
    scale: 2.0,
    outputDirectory: outputDirectory
};

var outPut = pdf2img.convert(pdfFilePath, options);

outPut.then(function (outputImages) {
    for (var i = 0; i < outputImages.length; i++) {
        var imagePath = `${outputDirectory}/output${i}.png`;
        fs.writeFile(imagePath, outputImages[i], function (error) {
            if (error) {
                console.error("Error: " + error);
            } else {
                console.log(`Image saved to ${imagePath}`);
            }
        });
    }
}).then(() =>
    run());
