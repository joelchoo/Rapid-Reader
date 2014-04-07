var selected = ""

if(window.getSelection().toString() != "")
	selected = window.getSelection().toString();

else{

	for(var i=0; i < window.frames.length; i++){

		if(window.frames[i].getSelection().toString() != ""){

			selected = window.frames[i].getSelection().toString();
			break;
		}
	}

}


//Send selected text to Rapid Reader extension
chrome.runtime.sendMessage({selectedText:selected});