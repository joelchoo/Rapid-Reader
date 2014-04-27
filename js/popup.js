
var wordsPerMin; // Initial speed in WPM
var chunkSize; //Number of words displayed at once
var interval;
var words;
var index = 0;



// Execute content script as soon as DOM is loaded for extension box
// (Each time icon is clicked)
document.addEventListener('DOMContentLoaded', function () {

	//Cant do this till DOM loaded
	document.getElementById('settingsBtn').addEventListener('click',editSettings);

	  chrome.storage.local.get(null, function (result) {
	
	    if(result.rapidReadWPM == undefined || result.rapidReadChunkSize == undefined){

	    	  chrome.storage.local.set({
			        'rapidReadWPM': 200,
			        'rapidReadChunkSize': 1
			    });

	    	wordsPerMin = 200;
	    	chunkSize = 1;
	    }
	    else{

	    	 wordsPerMin = result.rapidReadWPM;
	   		 chunkSize = result.rapidReadChunkSize;
	    }

	    initSlider();
	    document.getElementById("wpm").innerHTML = "WPM: "+wordsPerMin+"<br>"+"Chunks: "+chunkSize;
	});	


  	chrome.tabs.executeScript(null, {file: "js/content_script.js"});

	});
	    

// Listens for selected text to be sent from content_script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	words = request.selectedText.split(/\s/);
  	readOnInterval(wordsPerMin);
    return false;
    
  });

function editSettings(){

	window.location  = "options.html";
}



// Creates slider, binds event listener that is called when slider changes value
function initSlider(){



	$( "#slider" ).slider({min:15},{max:600},{value:wordsPerMin});

	$( "#slider" ).on( "slidechange", function( event, ui ) 
		{
			var sliderSpeed = $( "#slider" ).slider( "option", "value");
			clearInterval(interval);
		 	readOnInterval(sliderSpeed);

		} );
}

function getWords(){

	var concat = "";

	for(var i=0; i < chunkSize; i++){

		if(index >= words.length)
			break;
		
		concat += words[index++]+" ";
	}
	
	return concat;
}

function readOnInterval(speed){

	document.getElementById("wpm").innerHTML = "WPM: "+speed+"<br>"+"Chunks: "+chunkSize;

	interval = setInterval(function(){

		// Text is done being read
		if(index >= words.length){
			window.clearInterval(interval);
			return;
		}

		document.getElementById("words").innerHTML = getWords();

	},wpmToDelay(speed));


}

// Converts WPM to the delay needed between words
function wpmToDelay(wpm){

	return 1/(wpm/60)*1000;

}
