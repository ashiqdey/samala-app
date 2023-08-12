//when i click on my button
document.getElementById('fillForm').addEventListener('click', function () {
    //grab the text filed value from my tool
    var qty = document.getElementById('qty-input').value;
    console.log("loger a5", qty);

    chrome.tabs.executeScript({
        //send the value to be used by our script
        code: `var qty = ${qty};`
    }, function () {
        //run the script in the file injector.js
        chrome.tabs.executeScript({
            file: 'injector.js'
        });
    });
});