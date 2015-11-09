(function() {
	
	function BookmarkProvider($http) {
		
		 this.getBookmark = function (id, callback) {
	            $http.get('http://localhost:8080/bookmarks/' + id)
	                .success(function (data, status, headers, conf) {
	                    callback(null, data);
	                })
	                .error(function (data, status, headers, conf) {
	                    callback(data);
	                });
	        };

        var URL_REGEXP = /^((?:http|ftp)s?:\/\/)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i;
		var addHttpIfUrlNotValid = function(value) {
			if (!URL_REGEXP.test(value) && URL_REGEXP.test('http://' + value)) {
				return 'http://' + value;
			} else {
				return value;
			}
		}
		
		
		this.addBookmark = function(bookmark, callback) {
			if (!bookmark.name)  return callback({ code: "missing_name" });
			else if (!bookmark.url) return callback({ code: "missing_url" });
			else if (!bookmark.folder) return callback({ code: "missing_folder" });
			bookmark.url = addHttpIfUrlNotValid(bookmark.url);
			$http.post('http://localhost:8080/bookmarks', bookmark)
            .success(function (data, status, headers, conf) {
                callback(null, data);
            })
            .error(function (data, status, headers, conf) {
                callback(data);
            });

		};
	
		this.getFolders = function(callback) {
			$http.get('http://localhost:8080/bookmarks/folders')
            .success(function (data, status, headers, conf) {
                callback(null, data);
            })
            .error(function (data, status, headers, conf) {
                callback(data);
            });	
		};	
		
		this.getBookmarksInFolder = function(name, callback) {
			$http.get('http://localhost:8080/bookmarks/folder/' + name)
            .success(function (data, status, headers, conf) {
                callback(null, data);
            })
            .error(function (data, status, headers, conf) {
                callback(data);
            });
		}
		
		this.deleteBookmark = function(bookmark, callback) {
			$http.delete('http://localhost:8080/bookmarks/' + bookmark.id)
            .success(function (data, status, headers, conf) {
                callback(null, data);
            })
            .error(function (data, status, headers, conf) {
                callback(data);
            });
		};

		
	};

	bookmarkApp.service('BookmarkProvider', BookmarkProvider);

})();
