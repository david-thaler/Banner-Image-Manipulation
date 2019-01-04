//The JSON Object of the variations of the name and their url.
var variations = {
  "Variation 1": {
    "url": "image1.png",
    "nX": 295,
    "nY": 60,
    "maxN": 70,
    "tX": 440,
    "tY": 55,
    "maxT": 185,
    "maxSize": 32
  },
  "Variation 2": {
    "url": "image2.png",
    "nX": 300,
    "nY": 55,
    "maxN": 120,
    "tX": 400,
    "tY": 45,
    "maxT": 270,
    "maxSize": 48
  }
}
//Variable to store the current variation selected.
var selectedV;

//Variable for number and text sizes
var numSize = 32;
var textSize = 26;

//Variables for finding the first key in the JSON Object.
var first;
var done = false;

//Loop through JSON Object and create a hidden copy of the image at the end of the page.
//This is so that the browser will render the image and have it in cache to ensure it draws properly.
for (var key in variations) {
  if (!done) {
    done = true;
    first = key;
  }
  $('body').append('<img id="bgIMG" style="display:none" src="' + variations[key].url + '"/>');
  //Adds the variation to the select box.
  $('#variation').append('<option value="' + key + '">' + key + '</option>');
}
//Set placeholder image to the first variation.
$('#bgIMG').attr('src', variations[first].url);
selectedV = first;

//Create the canvas.
var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
  setTimeout(redraw, 100);
redraw();

//Listen for the select box to change.
$('#variation').change(() => {
  //Set the placeholder image to the url of the selected item and redraw.
  $('#bgIMG').attr('src', variations[$('#variation').val()].url);
  selectedV = $('#variation').val();
  redraw();
});

//Listen for Number textbox to change.
$(document).on('input', '#number', function() {
  //Check for width
  var correct = false;
  //Reset font to current font.
  ctx.font = "bold " + numSize + "pt Montserrat";
  //Check to see if the text is bigger or smaller with the current size
  if (ctx.measureText($("#number").val()).width > variations[selectedV].maxN) {
  	//Scale the text down until it is less than the maximum width
    while (!correct) {
      ctx.font = "bold " + numSize + "pt Montserrat";
      if (ctx.measureText($("#number").val()).width > variations[selectedV].maxN) {
        numSize--;
      } else {
        correct = true;
      }
    }
  } else {
  //Scale the text up until it is less than the maximum width or 32px(the default)
    while (!correct) {
      ctx.font = "bold " + (numSize + 1) + "pt Montserrat";
      if (ctx.measureText($("#number").val()).width > variations[selectedV].maxN || numSize == variations[selectedV].maxSize) {
        correct = true;
      } else {
        numSize++;
      }
    }
  }

  //Redraw the canvas.
  redraw();
});

//Listen for Text textbox to change.
$(document).on('input', '#mainText', function() {
  //Check for width
  var correct = false;
  //Reset font to current font.
  ctx.font = "bold " + textSize + "pt Montserrat";
  //Check to see if the text is bigger or smaller with the current size
  if (ctx.measureText($("#mainText").val()).width > variations[selectedV].maxT) {
  	//Scale the text down until it is less than the maximum width
    while (!correct) {
      ctx.font = "bold " + textSize + "pt Montserrat";
      if (ctx.measureText($("#mainText").val()).width > variations[selectedV].maxT) {
        textSize--;
      } else {
        correct = true;
      }
    }
  } else {
  //Scale the text up until it is less than the maximum width or 32px(the default)
    while (!correct) {
      ctx.font = "bold " + (textSize + 1) + "pt Montserrat";
      if (ctx.measureText($("#mainText").val()).width > variations[selectedV].maxT || textSize == variations[selectedV].maxSize) {
        correct = true;
      } else {
        textSize++;
      }
    }
  }

  //Redraw the canvas.
  redraw();
});

//Function to redraw the canvas.
function redraw() {
  //Set canvas height and width to image sizes.
  canvas.width = $('img').width();
  canvas.height = $('img').height();
  //Clear the canvas.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Draw the background onto the canvas from the placeholder img.
  ctx.drawImage($('img').get(0), 0, 0);
  //Set the font of the canvas.
  ctx.font = "bold " + numSize + "pt Montserrat";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  //Draw the text from the number box.
  ctx.fillText($("#number").val(), variations[selectedV].nX, variations[selectedV].nY);


  ctx.font = "bold " + textSize + "pt Montserrat";
  ctx.textAlign = "left";
  //Draw the text from the text box.
  ctx.fillText($("#mainText").val(), variations[selectedV].tX, variations[selectedV].tY);
}
