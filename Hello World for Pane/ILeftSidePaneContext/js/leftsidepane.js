/* In this sample code, I am using a variable to set function values. It helps to be consistent, and if you use the same value in different 
parts of your code, this is a best practice to help on the maintenance. Also, notice that I am passing the app name and version through a variable. 
You want to be consistent and keep the same name for the entire add-in, it will help you to identify errors when debug log is used.
As a best practice, use the same app name and version you add-in pkg (.zip)*/

var iconFont = "fas fa-thumbs-up";
var createIcon = "font awesome";
var appName = "LeftSidePaneSampleCode";
var appVersion = "1.0";
var leftSidePaneURL = ".././my_content.html";
var leftSidePaneLabel = "My Left Side Pane";

function createLeftSidePane(){
    ORACLE_SERVICE_CLOUD.extension_loader.load("Hello_World" , "1.0").then(function(sdk) {
        sdk.registerUserInterfaceExtension(function(userInterfaceContext) {

            // Notice that the code is calling for the LeftSidePane here. this is the only difference between left and right side pane.
            userInterfaceContext.getLeftSidePaneContext().then(function(leftSidePaneContext) {

                /* I'm not using an existing Side Pane, but if you have an existing Side Pane and want 
                to reuse it to set a different a condition, you have to set the Id. Create your ide 
                for each custom Side Pane; you aren't allowed to use the standard menu in here.*/
                leftSidePaneContext.getSidePane("id").then(function(leftPanelMenu) {
                    
                    //Set Label and the content URL.
                    leftPanelMenu.setContentUrl(leftSidePaneURL);
                    leftPanelMenu.setLabel(leftSidePaneLabel);
                    
                    //Setting to be Visible, with that you will see a thumbs-up on the left side.
                    leftPanelMenu.setVisible(true);
                    
                    // Creating an icon
                    var icon = leftPanelMenu.createIcon(createIcon);
                    icon.setIconClass(iconFont);
                    leftPanelMenu.addIcon(icon);

                    //Render is the last and most important part. Without this command your side panel won't appear.
                    leftPanelMenu.render();
                });
            });
        });
    });    
}

//JavaScript is a function program language. I like to create a function and call it in sequential order.
createLeftSidePane();