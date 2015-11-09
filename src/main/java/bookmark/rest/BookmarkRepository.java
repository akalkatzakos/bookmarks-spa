package bookmark.rest;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookmarkRepository extends MongoRepository<Bookmark, String> {

	List<Bookmark> findByFolder(String folder);

}