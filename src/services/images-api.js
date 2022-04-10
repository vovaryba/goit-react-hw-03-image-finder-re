function fetchImages(request, page, URL, API_KEY) {
  return fetch(
    `${URL}/?q=${request}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`No such ${request}, please try another one.`),
    );
  });
}

const imagesApi = { fetchImages };
export default imagesApi;
