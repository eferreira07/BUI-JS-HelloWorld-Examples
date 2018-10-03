/* In this sample code, I am using a variable to set function values. It helps to be consistent, and if you use the same value in different 
parts of your code, this is a best practice to help on the maintenance. Also, notice that I am passing the app name and version through a variable. 
You want to be consistent and keep the same name for the entire add-in, it will help you to identify errors when debug log is used.
As a best practice, use the same app name and version you add-in pkg (.zip)*/

var iconFont = "fas fa-thumbs-up";
var createIcon = "font awesome";
var appName = "ExtensionBarSampleCode";
var appVersion = "1.0";
var extensionBarURL = ".././my_content.html";

function createExtentionBar(){
    ORACLE_SERVICE_CLOUD.extension_loader.load(appName , appVersion).then(function(sdk) {
        sdk.registerUserInterfaceExtension(function(userInterfaceContext) {

            // Like in other examples from userInterfaceContext the code is calling the Extension Bar method.
            userInterfaceContext.getExtensionBarContext().then(function(IExtensionBarContext) {

                /* I'm not using an existing Extension Bar, but if you have an existing Extesion Bar and want 
                to reuse it to set a different a condition, you have to set the Id. Create your ide 
                for each custom Extension Bar; you aren't allowed to use the standard menu in here.*/
                IExtensionBarContext.getExtensionBarItem("id").then(function(IExtensionBarItem) {

                    //Setting the content URL.
                    IExtensionBarItem.setContentUrl(extensionBarURL);

                    //Render is the last and most important part. Without this command your extension bar won't show up.
                    IExtensionBarItem.render();                                                
                });
            });
        });
    });    
}

//JavaScript is a function program language. I like to create a function and call it in sequential order.
createExtentionBar();

