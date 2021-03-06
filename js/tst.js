function TheSocialTimes($scope, $http) {

    $scope.urls = urls;

    $scope.user_info = function(art) {
        console.log(art);
        console.log(extra_info[art]);
        return extra_info[art];
    };

    $scope.active_item = {};
    
    $scope.set_active_item = function(item) {
        $scope.active_item = item;
    }

    $scope.get_link_set = function() {

        var url = config.base_url + 'news/resolve';

        var data = $scope.urls;

        var request = $.ajax({
            url: url,
            type: "post",
            data: {urls: JSON.stringify(data)}
        });

        request.done(function(response) {
            $scope.articles = response;
            $scope.articles_loaded = true;

            $scope.$apply();

            var options = {
                itemWidth: 200, // Optional min width of a grid item
                autoResize: true, // This will auto-update the layout when the browser window is resized.
                container: $('#tiles'), // Optional, used for some extra CSS styling
                offset: 5, // Optional, the distance between grid items
                outerOffset: 20, // Optional the distance from grid to parent
                flexibleWidth: 350  // Optional, the maximum width of a grid item
            };

            // Get a reference to your grid items.
            var handler = $('#tiles li');

            // Call the layout function.
            handler.wookmark(options);

            $('.tooltip-demo').tooltip({
                selector: "[data-toggle=tooltip]",
                container: "body"
            });

        });

        request.fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.error("Ajax Error: " + textStatus, errorThrown);
        });

    };

    $scope.init = function() {
        $scope.get_link_set();
    };
}