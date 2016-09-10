//@author: https://github.com/waqidvolli

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == 'getSource') {
      console.log(request.source)
        course.value = request.source.course ? request.source.course : '';
        title.value = request.source.title ? request.source.title : '';
        due.value = request.source.due ? request.source.due : '' ;
    }
});

function onWindowLoad() {

    var wrapper = document.querySelector('#wrapper');
    var course = document.querySelector('#course');
    var title = document.querySelector('#title');
    var due = document.querySelector('#due');

    chrome.tabs.executeScript(null, {
        file: 'get-assignment-info.js'
    }, function() {

        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            wrapper.innerText = 'There was an error : \n' + chrome.runtime.lastError.message;
        }
    });

}

window.onload = onWindowLoad;
