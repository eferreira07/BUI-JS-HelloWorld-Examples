var iconFont = "fa fa-thumbs-up";
var createIcon = "font awesome";
var appName = "MyIGlobalHeaderContextHelloWorld";
var appVersion = "1.0";
var modalURL = ".././my_content.html";
var modalTitle = "My Modal Window";


function MyIGlobalHeaderContext() {
	ORACLE_SERVICE_CLOUD.extension_loader.load(appName, appVersion).then(function(sdk){
		sdk.registerUserInterfaceExtension(function(IUserInterfaceContext){
			IUserInterfaceContext.getGlobalHeaderContext().then(function(IGlobalHeaderContext){
				IGlobalHeaderContext.getMenu().then(function(IGlobalHeaderMenu){
					let IGlobalHeaderMenuItem = IGlobalHeaderMenu.createMenuItem();
					IGlobalHeaderMenuItem.setLabel('Hello World');

					// Loading font awesome and setting up an icon.
					var icon = IGlobalHeaderMenu.createIcon(createIcon);
	                icon.setIconClass(iconFont);
					IGlobalHeaderMenu.addIcon(icon);

					// Handling the action when agent clicks in the menu item.
					IGlobalHeaderMenuItem.setHandler(function(IGlobalHeaderMenuItem)
						{												
	    						// Your program logic should be here.
	    						MyModalWindow();							
						});
					IGlobalHeaderMenu.addMenuItem(IGlobalHeaderMenuItem);
					IGlobalHeaderMenu.render();
					});
				});
			});
		});	
}

function MyModalWindow(){
	ORACLE_SERVICE_CLOUD.extension_loader.load(appName , appVersion)
	.then(function(extensionProvider)
		{
		extensionProvider.registerUserInterfaceExtension(function(IUserInterfaceContext)
			{
			IUserInterfaceContext.getModalWindowContext().then(function(IModalWindowContext)
				{
				var modalWindow = IModalWindowContext.createModalWindow();
				modalWindow.setTitle(modalTitle);
				modalWindow.setContentUrl(modalURL);
				modalWindow.render();
				});
			});
		});
}

new MyIGlobalHeaderContext();