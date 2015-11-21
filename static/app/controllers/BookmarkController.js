(function() {
	
	function BookmarkController($scope, $routeParams, BookmarkProvider) {
		$scope.bookmarkActive = true;
		$scope.bookmark = {};
		$scope.messages = [];
		$scope.add_bookmark_error = "";
		
		$scope.addBookmark = function(bookmark) {
			BookmarkProvider.addBookmark(bookmark, function (err, resp) {
	            if (err) {
	            	  if (err.code == "missing_name")
	                      $scope.add_bookmark_error = "Missing name for bookmark";
	                  else if (err.code == "missing_url")
	                      $scope.add_bookmark_error = "Missing url for bookmark";
	                  else if (err.code == "missing_folder")
	                      $scope.add_bookmark_error = "Missing folder for bookmark";
	                  else 
	                      $scope.add_bookmark_error = "A completely unexpected error occurred: " + err.code + " " + err.message;
	            } else {
	            	if (bookmark.id) {
	            		$scope.messages.push({
							type : 'success',
							msg : 'Bookmark updated!'
						});	
	            	} else {
	            		$scope.messages.push({
							type : 'success',
							msg : 'Bookmark created!'
						});
	            	}
	            	
					$scope.bookmark = {};
					$scope.add_bookmark_error = "";
					$scope.getFolders();
	            }
	        });
			

		};

		$scope.closeAlert = function(index) {
			$scope.messages.splice(index, 1);
		};

		$scope.getFolders = function() {
			BookmarkProvider.getFolders(function (err, folders) {
	            if (err) {
	            	$scope.messages.push({
						type : 'danger',
						msg : err.message
					});
	            } else {
	            	$scope.folders = folders;
	            }
	        });
		};

		$scope.getFolders();
		
		var getBookmarkIfIdExists = function() {
			var id = $routeParams.id;
			if (id != null) {
				BookmarkProvider.getBookmark(id, function (err, bookmark) {
		            if (err) {
		            	$scope.messages.push({
							type : 'danger',
							msg : err.message
						});
		            } else {
		            	$scope.bookmark = bookmark;
		            }
		        });
			}
		}
		
		
		$scope.startsWith = function (actual, expected) {
		    var lowerStr = (actual + "").toLowerCase();
		    return lowerStr.indexOf(expected.toLowerCase()) === 0;
		}
		
		getBookmarkIfIdExists();
		
		
	};

	bookmarkApp.controller('BookmarkController', BookmarkController);

})();
