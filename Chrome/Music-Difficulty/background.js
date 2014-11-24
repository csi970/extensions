chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            hostSuffix: 'musescore.com',
                            pathContains: 'scores'
                        },
                    })
                ],
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});
