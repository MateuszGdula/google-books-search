import React from 'react'
import AppContext from '../../Context'
import ListItem from './ListItem'

const SearchResults = () => ( 
    <AppContext.Consumer>
        {(context) => (
            <> 
                {/* render list depended on books array length */}
                <p>{context.infoText}</p>
                {context.books.length !== 0 ?
                (
                    <ul>
                        {
                        context.books.map((
                            { id, 
                            volumeInfo: { title, description, readingModes, imageLinks, infoLink }
                            }, index) =>(

                            <ListItem 
                                key={ id + index.toString() }
                                title={ title }
                                cover={ readingModes.image ? 
                                            ( "thumbnail" in imageLinks ? 
                                                imageLinks.thumbnail : 
                                                imageLinks.smallThumbnail)
                                            : undefined }
                                description={ description }
                                link={ infoLink }
                            />

                        ))}
                    </ul>
                ) : null
                }
                
                {/* render loading div on send request */}
                {
                context.isLoading ? 
                (
                    <div className="loading loading-lg"></div>
                ) : null
                }
            </>
        )}
    </AppContext.Consumer>
    
);

export default SearchResults;