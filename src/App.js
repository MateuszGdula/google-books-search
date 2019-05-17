import React from 'react'
import styles from './App.module.scss'
import AppContext from './Context'
import Axios from 'axios'
import Form from './components/form/Form'
import SearchResults from  './components/search-results/SearchResults'

const getInitialState = () => ({
  books: [],
  requestString: "",
  isLoading: false,
  totalBooksNumber: 0,
  infoText: ""
});

class App extends React.Component {

  state = {
    ...getInitialState()
  }

  buildRequestString = (e) => {
    {/* reset state on new user inputs, build new request string and use it to get data from API */}
    e.preventDefault();
    this.setState(getInitialState());

    const endPoint = `https://www.googleapis.com/books/v1/volumes`;
    const userText = `&q=${encodeURIComponent(document.querySelector("input[type=text]").value)}`;
    const orderBy = `&orderBy=${document.querySelector("input[type=radio]:checked").value}`;

    const requestString = `${endPoint}?maxResults=10${userText}${orderBy}`
    
    this.setState({
      requestString
    })

    this.sendRequest(requestString)
  }


  sendRequest = (requestString) => {
  {/* send request by Axios and update the App state */}

  this.setState({
    isLoading: true
  });

  Axios.get(requestString)
    .then(res => {
      
      if("items" in res.data){

        this.setState(prevState => ({
          books: [...prevState.books, ...res.data.items],
          isLoading: false,
          totalBooksNumber: prevState.totalBooksNumber === 0 ? res.data.totalItems : prevState.totalBooksNumber,
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
        isLoading: false,
        infoText: `Error on loading data.`
      })

    })
  }

  getMoreData = () => {
    {/* get more data only if scroll possition is on the page bottom */}
    if(! ((Math.floor(window.innerHeight + window.scrollY) + 1) >= document.body.offsetHeight) ) return;

    {/* return if app get all books from google API, on waiting for response, on empty request string or on info text for */}
    if(this.state.totalBooksNumber === this.state.books.length ||
        this.state.isLoading ||
        this.state.requestString === "" ||
        this.state.infoText !== "") return;

    {/* build request string for next 10 books in google API */}
    const requestString = `${this.state.requestString}&startIndex=${this.state.books.length}`;

    this.sendRequest(requestString);
  }

  render() {
    {/* pass App state and buildRequestString method to AppContext */}
    const contextElements = {
      ...this.state,
      buildRequestString: this.buildRequestString
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
    window.addEventListener("scroll", this.getMoreData, false);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.getMoreData);
  }

}

export default App;