package bookmark.rest;

import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;

import javax.inject.Inject;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {

	@Inject
	private BookmarkRepository bookmarkRepository;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<Bookmark>> getAllPolls() {
		Iterable<Bookmark> all = bookmarkRepository.findAll();
		return new ResponseEntity<>(all, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> createBookmark(@RequestBody Bookmark bookmar) {

		Bookmark saved = bookmarkRepository.save(bookmar);

		// Set the location header for the newly created resource
		HttpHeaders responseHeaders = new HttpHeaders();
		URI newPollUri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(saved.getId()).toUri();
		responseHeaders.setLocation(newPollUri);

		return new ResponseEntity<>(saved, responseHeaders, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{bookmarkId}", method = RequestMethod.GET)
	public ResponseEntity<?> getBookmark(@PathVariable String bookmarkId) {
		Bookmark p = bookmarkRepository.findOne(bookmarkId);
		return new ResponseEntity<>(p, HttpStatus.OK);
	}

	@RequestMapping(value = "/folder/{folderName}", method = RequestMethod.GET)
	public ResponseEntity<?> getAllInFolder(@PathVariable String folderName) {
		List<Bookmark> list = bookmarkRepository.findByFolder(folderName);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/{bookmarkId}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateBookmark(@RequestBody Bookmark bookmark,
			@PathVariable String bookmarkId) {
		// Save the entity
		Bookmark p = bookmarkRepository.save(bookmark);
		return new ResponseEntity<>(p, HttpStatus.OK);
	}

	@RequestMapping(value = "/{bookmarkId}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteBookmark(@PathVariable String bookmarkId) {
		bookmarkRepository.delete(bookmarkId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/folders", method = RequestMethod.GET)
	public ResponseEntity<?> getAllFolders() {
		Map<String, Long> values = bookmarkRepository.findAll().stream()
				.collect(groupingBy(Bookmark::getFolder, counting()));

		List<Folder> folders = new ArrayList<BookmarkController.Folder>();

		BiConsumer<? super String, ? super Long> consumer = (name, count) -> folders
				.add(new Folder(name, count));
		values.forEach(consumer);
		return new ResponseEntity<>(folders, HttpStatus.OK);
	}

	public static class Folder {
		public Folder(String name, Long count) {
			this.name = name;
			this.count = count;
		}
		String name;
		Long count;

		public String getName() {
			return name;
		}

		public Long getCount() {
			return count;
		}
	}
}
