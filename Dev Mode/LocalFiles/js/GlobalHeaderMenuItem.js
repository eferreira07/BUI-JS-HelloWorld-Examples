ORACLE_SERVICE_CLOUD.extension_loader.load("GlobalHeaderMenuItem", "1.0").then(function (sdk) {
    sdk.registerUserInterfaceExtension(function (IUserInterfaceContext) {
        IUserInterfaceContext.getGlobalHeaderContext().then(function (IGlobalHeaderContext) {
            IGlobalHeaderContext.getMenu('').then(function (IGlobalHeaderMenu) {
                var icon = IGlobalHeaderMenu.createIcon("font awesome");
                icon.setIconClass("fas fa-thumbs-up");
                IGlobalHeaderMenu.addIcon(icon);
                IGlobalHeaderMenu.setHandler(function (IGlobalHeaderMenu) {
                    alert('Hellow World!');
                });
                IGlobalHeaderMenu.render();
            });
        });
    });
});