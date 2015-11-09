package bookmark.rest;

import org.springframework.data.annotation.Id;

public class Bookmark {

	private String name;
	private String url;
	private String folder;
	
	@Id
	private String id;
	
	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getFolder() {
		return folder;
	}

	public void setFolder(String folder) {
		this.folder = folder;
	}
	
	
	

}
