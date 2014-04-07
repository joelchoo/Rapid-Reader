
var initialSpeed = 200; // Initial speed in WPM
var interval;
var words;
var index = 0;


// Execute content script as soon as DOM is loaded for extension box
// (Each time icon is clicked)
document.addEventListener('DOMContentLoaded', function () {
	initSlider();
  	chrome.tabs.executeScript(null, {file: "content_script.js"});
});


/* Keyboard shortcut */
chrome.commands.onCommand.addListener(function(command) {
        chrome.tabs.executeScript(null, {file: "content_script.js"});
      });

// Listens for selected text to be sent from content_script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	words = request.selectedText.split(/\s/);
  	readOnInterval(initialSpeed);
    return false;
    
  });


// Creates slider, binds event listener that is called when slider changes value
function initSlider(){

	$( "#slider" ).slider({min:15},{max:600},{value:initialSpeed});

	$( "#slider" ).on( "slidechange", function( event, ui ) 
		{
			var sliderSpeed = $( "#slider" ).slider( "option", "value");
			clearInterval(interval);
		 	readOnInterval(sliderSpeed);

		} );
}



function readOnInterval(speed){

	document.getElementById("wpm").innerHTML = "WPM: "+speed;

	interval = setInterval(function(){

		// Text is done being read
		if(index >= words.length){
			window.clearInterval(interval);
			return;
		}

		document.getElementById("words").innerHTML = words[index++];

	},wpmToDelay(speed));


}

// Converts WPM to the delay needed between words
function wpmToDelay(wpm){

	return 1/(wpm/60)*1000;

}