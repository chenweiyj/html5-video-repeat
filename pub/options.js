function init() {
    document.getElementById('options').innerHTML = chrome.i18n.getMessage("optionsTitle");
    document.getElementById('optionLabel').innerHTML = chrome.i18n.getMessage("optionStartLabel");
    document.getElementById('save').innerText = chrome.i18n.getMessage("optionSave");
}

function save_options() {
    if ($("#optionCheckbox").is(":checked"))
        localStorage["isRepeat"] = "true";
    else
        localStorage["isRepeat"] = "false";
    
    document.getElementById('successLabel').innerHTML = 
        chrome.i18n.getMessage("saveSuccess") + localStorage["isRepeat"];
}

function restore_options() {
    var isRepeat = localStorage["isRepeat"];
    if (isRepeat == "true")
        $("#optionCheckbox").attr("checked", true);
    else
        $("#optionCheckbox").removeAttr("checked");
}

init();
document.addEventListener('DOMContentLoaded', function () {
    restore_options();
    $("#save").click(save_options);
//    document.getElementById('save').addEventListener('click', save_options);
});
