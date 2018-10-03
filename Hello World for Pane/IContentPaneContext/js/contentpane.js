/* In this sample code, I am using a variable to set function values. It helps to be consistent, and if you use the same value in different 
parts of your code, this is a best practice to help on the maintenance. Also, notice that I am passing the app name and version through a variable. 
You want to be consistent and keep the same name for the entire add-in, it will help you to identify errors when debug log is used.
As a best practice, use the same app name and version you add-in pkg (.zip)*/

var appName = "ContentPaneSampleCode";
var appVersion = "1.0";
var contentPaneName = "My Content Pane";
var contentPaneURL = '.././my_content.html';

function createContentPane() {
  ORACLE_SERVICE_CLOUD.extension_loader.load(appName , appVersion).then(function(sdk){
      sdk.registerUserInterfaceExtension(function(IUserInterfaceContext){
          
        // In order to create a Content Pane the code will call getContentPaneContext method.
          IUserInterfaceContext.getContentPaneContext().then(function(IContentPaneContext){

            //In this case, we are creating a content pane and I will give an Id for this content.
              IContentPaneContext.createContentPane('contentPaneSampleCode').then(function(IContentPane)
                  {
                      // With this function, the code is passing a name to show on the top of the content.
                      IContentPane.setName(contentPaneName);

                      // With this function, the code is passing the URL (embedded page) through a variable.
                      IContentPane.setContentUrl(contentPaneURL);
                  });
              });
          });
      }
  );
}

//JavaScript is a function program language. I like to create a function and call it in sequential order.
createContentPane();