ORACLE_SERVICE_CLOUD.extension_loader.load("Hello_World" , "1.0").then(function(sdk) {
    sdk.registerUserInterfaceExtension(function(userInterfaceContext) {

        // Like in other examples from userInterfaceContext the code is calling the Extension Bar method.
        userInterfaceContext.getStatusBarContext().then(function(IStatusBarContext) {
            
            /* I'm not using an existing Status Bar, but if you have an existing Status Bar and want 
            to reuse it to set a different a condition, you have to set the Id. Create your ide 
            for each custom Status Bar; you aren't allowed to use the standard menu in here.*/
            IStatusBarContext.getStatusBarItem("id").then(function(IStatusBarItem) {

                //Setting the Label and the content URL.
                IStatusBarItem.setContentUrl('.././my_content.html');
                IStatusBarItem.setLabel('Status Bar Item'); 
                IStatusBarItem.setVisible(true);
                
                //Definning the Width of the Status Bar.
                IStatusBarItem.setWidth('200');

                //Render is the last and most important part. Without this command your extension bar won't shouw up.
                IStatusBarItem.render();                                                
            });
        });
    });
});