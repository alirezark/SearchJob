import axios from 'axios';
import urls from '@/api/urls';

class SearchService {
  getSearchResult(text, page, size) {
    return axios.post(urls.search_Job_Url, {
      text,
      page,
      size,
    });
  }

  getFilterResult({ ...filters }) {
    return axios.post(urls.filter_Job_Url, {
      ...filters,
    });
  }
}

export default new SearchService();
