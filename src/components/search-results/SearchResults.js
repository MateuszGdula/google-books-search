import React from 'react'
import AppContext from '../../Context'
import ListItem from './ListItem'

const SearchResults = () => (

<AppContext.Consumer>
    {(context) => (
        <> 
            {/* render books list */}
            {
                context.books.length !== 0 ? (   
                    <>
                        <p>{context.totalBooksNumber} results found</p>
                        <ul>
                            {
                            context.books.map(({ id, volumeInfo }, index) =>(

                                <ListItem 
                                    key={ id + index.toString() }
                                    title={ volumeInfo.title }
                                    cover={ volumeInfo.imageLinks }
                                    description={ volumeInfo.description }
                                    link={ volumeInfo.infoLink }
                                />

                            ))}
                        </ul>
                    </>
                ) : null
            }

            {/* render information about no search results and errors */}
            {
                context.infoText ? (
                    <p>{context.infoText}</p>
                ) : null
            }

            {/* render loading div on send request */}
            {
                context.isLoading ? (
                    <div className="loading loading-lg"></div>
                ) : null
            }
        </>
    )}
</AppContext.Consumer>
    
);

export default SearchResults;