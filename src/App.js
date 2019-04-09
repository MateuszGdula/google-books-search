import React from 'react'
import styles from './App.module.scss'
import AppContext from './Context'
import Axios from 'axios'
import Form from './components/form/Form'
import SearchResults from  './components/search-results/SearchResults'

const initState = {
  books: [],
  request: "",
  isLoading: false,
  numberOfBooks: 0,
  infoText: "",
  errorText: ""
}

class App extends React.Component {

  state = {
    ...initState
  }

  
  buildQueryString = (e) => {
    {/* reset state and send new request when form parametrs is changed */}
    e.preventDefault();

    this.setState(initState);

    const q = `&q=${encodeURIComponent(document.querySelector("input[type=text]").value)}`;
    const orderBy = `&orderBy=${document.querySelector("input[type=radio]:checked").value}`;
    const queryString = `https://www.googleapis.com/books/v1/volumes?maxResults=10${q}${orderBy}`

    {/* save queryString to state and send request */}

    this.setState({
      isLoading: true,
      request: queryString
    })

    this.sendRequest(queryString)
    
  }


  sendRequest = (request) => {
  {/* send async request and set app state based on response, resend request on error */}

  Axios.get(request)
    .then(res => {
      
      if("items" in res.data){

        this.setState(prevState => ({
          books: [...prevState.books, ...res.data.items],
          isLoading: false,
          numberOfBooks: res.data.totalItems,
          infoText: `${res.data.totalItems} results found`
        }));

      } else {

        this.setState({
          isLoading: false,
          infoText: "No results found"
        });

      }
    })
    .catch( error => {
 
      this.setState({
        errorText: `Error: ${error.message}`
      })

      setTimeout(() => {
        this.sendRequest(request)
      }, 1000);
      
    })
  }

  getMoreData = () => {
    {/* return if there are no more books in google library or on waiting for response */}
    if(this.state.numberOfBooks === this.state.books.length || this.state.isLoading) return;

    {/* add start index to query bades on books array lenght */}
    const request = `${this.state.request}&startIndex=${this.state.books.length}`;

    this.setState({
      isLoading: true
    })

    this.sendRequest(request);
  }

  render() {

    const contextElements = {
      ...this.state,
      buildQueryString: this.buildQueryString
    }
    
    return (
      <AppContext.Provider value={ contextElements }>
        <div className={ styles.wrapper }>
          <h1>Google books search</h1>
          <Form />
          <SearchResults />
        </div>
      </AppContext.Provider>
    );
  };

  componentDidMount(){
    {/* get more data if window is scrolled to bottom */}
    window.addEventListener("scroll", () => {
        console.log(Math.round(window.innerHeight + window.scrollY) +1);
        console.log(document.body.offsetHeight);
        (Math.floor(window.innerHeight + window.scrollY) + 1) >= document.body.offsetHeight && this.getMoreData();
    }, false);
  };

}

export default App;