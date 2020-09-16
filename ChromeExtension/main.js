console.log('loading app..');
var createButton = document.getElementById('analyse');
createButton.addEventListener('click', function () { virustotal("https://www.example.com"); });

function doSomething() {
    console.log('click')
    var params = {
        active: true,
        currentWindow: true
    }
    chrome.tabs.query(params, gotTabs);
    function gotTabs(tabs) {
        msg = {
            txt: "some message"
        }
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }

}

//pro lot of info 500 requests a day
//con timedelay +- 25 se.
function urlscanio(suspect) {
    //The submission API allows you to submit a URL to be scanned and set some options for the scan.
    $.ajax({
        url: "https://urlscan.io/api/v1/scan/",
        type: "post",
        data: {
            "url": suspect,
            "visibility": "public",
            "ags": [
                "demotag1", "demotag2"
            ]
        },
        headers: {
            "API-Key": "e522f2de-1f6a-40bb-b3f8-11f6d3dd53c9"
        },
        dataType: "json",
        expected_update_period_in_days: 1,
        success: function (data) {
            console.info(data);

        }
    }).then(function (data) {
        chrome.alarms.create("delay", { when: Date.now() + 30000 })
        chrome.alarms.onAlarm.addListener(function (alarm) {
            $.ajax({
                url: "https://urlscan.io/api/v1/result/" + data.uuid + "/",
                type: "get",
                dataType: "json",
                expected_update_period_in_days: 1,
                success: function (data) {
                    console.log(data);
                }
            })
        })
    });

}


// con 4 requests / min
function virustotal(suspect) {
    $.ajax({
        url: "https://www.virustotal.com/vtapi/v2/url/scan",
        type: "post",
        data: {
            "apikey": '7711d3fd7ff92eba6e2fa00f7c78ffdc7eaff6771cdd402937b4e4c1d4e619f1',
            "url": suspect
            },
        dataType: "json",
        success: function (data) {
                console.info(data);
            }
        }).then(function(data){
            $.ajax({
                url: "https://www.virustotal.com/vtapi/v2/url/report",
                type: "get",
                data: {
                    "apikey": '7711d3fd7ff92eba6e2fa00f7c78ffdc7eaff6771cdd402937b4e4c1d4e619f1',
                    "resource": data.scan_id,
                    "allinfo": true
                    },
                dataType: "json",
                success: function (data) {
                    console.info(data);
                }
            })
        })
}

// Hybrid analysis??
//https://www.hybrid-analysis.com/docs/api/v2
