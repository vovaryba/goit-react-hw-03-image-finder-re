import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

class App extends Component {
  state = {
    request: '',
    page: 1,
  };

  handleFormSubmit = ({ request }) => {
    this.setState({ request });
  };

  render() {
    const { request, page } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery request={request} page={page} />
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

export default App;
