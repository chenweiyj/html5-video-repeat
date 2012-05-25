function isHTML5() {
    return !(!$("video").length);
}

function getVideo() {
    var html5 = $("video");
    
    return isHTML5() ? html5 : null;
}


function createUI() {
    var label = document.createElement('label');
    label.setAttribute('for', 'video-repeat');
    label.innerHTML = chrome.i18n.getMessage("ckbLabel");//' (\u6d17\u8166\u5faa\u74b0)';
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = function() {
        loopVideo();
    }
    checkbox.id = 'video-repeat';
    var container = document.createElement('div');
    container.appendChild(checkbox);
    container.appendChild(label);
    return container
}


function insertUI() {
    var sidebar = document.getElementById('watch-sidebar');
    var ui = createUI();
    if (sidebar) { //insert before sidebar
        ui.className = 'watch-module';
        sidebar.insertBefore(ui, sidebar.firstChild);
    }
    else { 
        ui.style.position = 'absolute';
        ui.style.top = '10px';
        ui.style.left = '10px';
        document.body.appendChild(ui);
    }
}

function init() {
    insertUI();
}

function loopVideo() {
    var video = getVideo();
    var player = video[0];
    
    if ($("#video-repeat").is(":checked")) {
        video.bind("ended", function () {
            player.play();
        });
    }
    else {
        video.unbind("ended");
    }
}


function main() {
    if (isHTML5()) {
        init();
    
        chrome.extension.sendRequest({
            method: "getLocalStorage", 
            key: "isRepeat"
        }, function(response) {
            console.log(response.data);
            if (response.data == "true") {
                // option: if the checkbox is checked initially.
                $("#video-repeat").attr("checked", true);
                loopVideo();
            }
        }); 
    }
}

setTimeout("main()", 2000);

