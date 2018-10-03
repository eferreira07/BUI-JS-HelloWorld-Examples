/*As mentioned in other posts, we want to keep the app name and app version consistent for each extension. 
Later, it will help us to better troubleshoot and read the logs provided by BUI Extension Log Viewer.*/

var appName = "UtilityExtension";
var appVersion = "1.0";

/*We have created this function in order to troubleshoot our extensions by reading the console logs. 
You don't want to have your extension tracing for all agents, so in this sample code, we are using a local storage 
to check whether the trace mode is on or off. In order to have the trace on, with the console object opened 
set a local item as follow; localStorage.setItem('debugMyExtension',true);*/

let myExtensions2log = function(e){
    if (localStorage.getItem('debugMyExtension') == 'true')
        window.console.log("[My Extension Log]: " + e);
}

/* Authentication is required to connect to Oracle Service Cloud APIs. This function results 
in the current session token and the REST API end-point, you don't want to have this information hard-coded.*/

let myAuthentication = new Promise(function(resolve, reject){
    ORACLE_SERVICE_CLOUD.extension_loader.load(appName,appVersion).then(function(extensionProvider){
		extensionProvider.getGlobalContext().then(function(globalContext){
                _urlrest = globalContext.getInterfaceServiceUrl("REST");
                _accountId = globalContext.getAccountId();

				globalContext.getSessionToken().then(
				   function(sessionToken){
                    resolve({'sessionToken': sessionToken,'restEndPoint': _urlrest, 'accountId': _accountId});
                });
                				
			});
		});
});

/* This function will receive a ROQL statement and will return the result. 
With this function, other extensions can send a ROQL statement and receive a JSON object as result.*/

let myROQLQuery = function(param){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
               
        myAuthentication.then(function(result){
            
            xhr.open("GET", result['restEndPoint'] + "/connect/latest/queryResults/?query=" + param, true);
            xhr.setRequestHeader("Authorization", "Session " + result['sessionToken']);
            xhr.setRequestHeader("OSvC-CREST-Application-Context", "UtilitiesExtension");
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var obj = JSON.parse(xhr.responseText);										
                        resolve(obj);
                    } else {
                        reject('myROQLQuery from Utilities Library has failed');
                    }
                  }
            }
            xhr.onerror = function (e) {
                console.error(xhr.statusText);
              };
            xhr.send();
        });
        
    });
}