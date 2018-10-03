/* In this sample code, I am using a variable to set function values. It helps to be consistent, and if you use the same value in different 
parts of your code, this is a best practice to help on the maintenance. Also, notice that I am passing the app name and version through a variable. 
You want to be consistent and keep the same name for the entire add-in, it will help you to identify errors when debug log is used.
As a best practice, use the same app name and version you add-in pkg (.zip)*/

var appName = "Navigation&PopUpSampleCode";
var appVersion = "1.0";
var navigationItemLabel = "My Navigation Item";
var childLabel = "Open My Popup";
var myPopUpURL = ".././my_content.html";
var myPopUpTitle = "My Popup";
var myPopupName = "myPopupSampleCode";

//The following function creates the navigation item and a child item.
function createNavigationItem(){
	ORACLE_SERVICE_CLOUD.extension_loader.load(appName , appVersion).then(function(extensionProvider){
		extensionProvider.registerUserInterfaceExtension(function(IUserInterfaceContext){
			IUserInterfaceContext.getNavigationSetContext().then(function(INavigationSetContext){
				//From Navigation Set Context the code can get an existing Id. we are not using an existing id in this sample code.
				INavigationSetContext.getNavigationItem('id').then(function(INavigationItem){
					
					//Setting a label for the parent item.
					INavigationItem.setLabel(navigationItemLabel);

					//Creating a child item.
					var childNavigationItem1 = INavigationItem.createChildItem();

					//Setting a label to the child item.
					childNavigationItem1.setLabel(childLabel);

					//Handling an action to call the popup function that is defined later in this code.
					childNavigationItem1.setHandler(function(INavigationItem)
						{
							MyPopUp();							
						});

					//Don't forget to add the child to the parent item created early in this code.
					INavigationItem.addChildItem(childNavigationItem1);
					INavigationItem.render();
					});
				});
			});
		});
};

function MyPopUp(){
	//This part is always required to load BUI extension.
	ORACLE_SERVICE_CLOUD.extension_loader.load(appName , appVersion).then(function(extensionProvider){
		extensionProvider.registerUserInterfaceExtension(function(IUserInterfaceContext){
			
			//Popup is part of Use Interface Context.
			IUserInterfaceContext.getPopupWindowContext('id').then(function(IPopupWindowContext){
				
				//Creating popup windows and passing the popup name.
				let IPopupWindow = IPopupWindowContext.createPopupWindow(myPopupName);
				
				//Title you define the name that will appear in the popup header.
				IPopupWindow.setTitle(myPopUpTitle);

				//Using a custom content and passing as a parameter like we did in other posts.
				IPopupWindow.setContentUrl(myPopUpURL);

				//defining the height and width.
				IPopupWindow.setHeight('213px');
				IPopupWindow.setWidth('235px');
				IPopupWindow.render();
				});
			});
		});	
};

//even this add-in has two functions, we want to start the add-in by creating the navigation sets and the navigation will call popup when it is required.
createNavigationItem();