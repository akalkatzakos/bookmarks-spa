(function() {

	function ListBookmarkController($scope, $location, BookmarkProvider, $window) {
		$scope.listActive = true;
		$scope.messages = [];
		
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
		}

		$scope.deleteBookmark = function(bookmark) {
			var confirm = $window.confirm('Are you sure you want to delete bookmark [' + bookmark.name + '] ?');
		    if (confirm) {
		    	BookmarkProvider.deleteBookmark(bookmark, function (err, folders) {
		            if (err) {
		            	$scope.messages.push({
							type : 'danger',
							msg : err.message
						});
		            } else {
		            	$scope.getFolders();
						$scope.getBookmarksInFolder(bookmark.folder);
						$scope.messages.push({
							type : 'success',
							msg : 'Bookmark deleted!'
						});
		            }
		        });
		    }
			
		};
		
		$scope.closeAlert = function(index) {
			$scope.messages.splice(index, 1);
		};
		
		$scope.editBookmark = function(bookmark) {
			$location.path('/bookmark/' + bookmark.id);
		};
		
		$scope.getBookmarksInFolder = function(name) {
			BookmarkProvider.getBookmarksInFolder(name, function (err, bookmarks) {
	            if (err) {
	            	$scope.messages.push({
						type : 'danger',
						msg : err.message
					});
	            } else {
	            	$scope.folder = name;
					$scope.bookmarks = bookmarks;
	            }
	        });
		}

		
		$scope.getFolders();

	}
	;

	bookmarkApp.controller('ListBookmarkController', ListBookmarkController);

})();
