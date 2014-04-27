

// Execute content script as soon as DOM is loaded for extension box
// (Each time icon is clicked)
document.addEventListener('DOMContentLoaded', function () {

	restore_options();
	document.getElementById('save').addEventListener('click',save_options);
	
});



// Saves options to chrome.storage
function save_options() {
  var wpm = document.getElementById('wpmSetting').value;
  var chunkSize = document.getElementById('chunkSizeSetting').value;

  chrome.storage.local.set({
        'rapidReadWPM': wpm,
        'rapidReadChunkSize': chunkSize
    }, function(){

    	window.location = "popup.html";
    });

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  chrome.storage.local.get(null, function (result) {

    document.getElementById('wpmSetting').value = result.rapidReadWPM;
    document.getElementById('chunkSizeSetting').value = result.rapidReadChunkSize;
  
});
}
