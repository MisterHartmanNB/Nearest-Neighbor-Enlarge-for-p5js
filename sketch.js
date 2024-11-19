//Resize an p5.image in a way that preserves the image's quality in a pixel art format
p5.Image.prototype.enlargeNN = function (m) {

  this.loadPixels();
  
  //Round and absolute value m
  m = ~~Math.abs(m);
  
  //Stop doing things if m is zero or one
  if(!m||(m==1)) {
    return this; 
  }
  
  //Stop doing things if we're not working with a square
  if(this.width != this.height) {
    return this; 
  }
  
  //Make a new array for the pixels, put the old pixels in an Array
  const oldPix = [...this.pixels];
  //const newPix = new Array(this.pixels.length*m*m);
  
  //Find the length of each row in the new array
  const rowLength = this.width*m*4;
  
  //Store the current width for later use
  const w = this.width;
  
  //Resize the canvas for the image to be the new dimensions
  this.canvas.width = this.width = rowLength/4;
  this.canvas.height = this.height = rowLength/4;
  this.loadPixels();
  
  //Map each pixel in the old image to the appropriate set of pixels in the enlarged array
  for (let i = 0; i < oldPix.length*m*m; i+=4) {
    
  //Find what row and column we are on in the new array
    let curRow = ~~(i / rowLength);
    
    let curCol = i%rowLength;
    
  //Find what row that means we should look for in the old array
    let tagRow = ~~(curRow / m);
    
  //Find what column we should look for in the old array
    let tagCol = ~~(~~(curCol / m)/4)*4;
    
  //Find the index of the current pixel in the old array
    let tagInd = tagRow * w * 4 + tagCol;
    
  //Map the RGBa from the old array to the new array
    this.pixels[i] = oldPix[tagInd];
    this.pixels[i+1] = oldPix[tagInd+1];
    this.pixels[i+2] = oldPix[tagInd+2];
    this.pixels[i+3] = oldPix[tagInd+3];

  }

  //Set the new array as the pixels of the image
  this.updatePixels();
}

//Change a color array in an image to a new color array
p5.Image.prototype.recolor = function (oldRBGa,newRBGa) {
  //Throw an error if there aren't exactly two arrays provided as arguments
  if(arguments.length!=2) {
    throw new Error('Exactly two arguments are required');
  }

  //Throw an error if the arrays aren't both of length 4
  if((oldRBGa.length!=4)||(newRBGa.length!=4)) {
    throw new Error('Both arrays must be of length 4');
  }

  this.loadPixels();
  let length = this.pixels.length;
  for(let i = 0; i < length; i+=4) {
    if((this.pixels[i]==oldRBGa[0])&&(this.pixels[i+1]==oldRBGa[1])&&(this.pixels[i+2]==oldRBGa[2])&&(this.pixels[i+3]==oldRBGa[3])) {
      this.pixels[i] = newRBGa[0];
      this.pixels[i+1] = newRBGa[1];
      this.pixels[i+2] = newRBGa[2];
    }
  }
  this.updatePixels();
}