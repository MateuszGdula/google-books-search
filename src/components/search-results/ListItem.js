import React from 'react'
import styles from './ListItem.module.scss'
import PropTypes from 'prop-types';
import noCover from '../../assets/no-cover.jpg'


const ListItem = ({title, cover, description, link}) => (

    <li className={styles.listItem__wrapper}>

        <a href={ link } target="_blank" rel="noopener noreferrer">
            <img src={ cover.thumbnail || noCover } alt={title} className={styles.listItem__image} />
        </a>

        <div className={ styles.listItem__textWrapper }>
            <a href= { link } target="_blank" rel="noopener noreferrer">
                <h2 className={styles.listItem__title}>{ title }</h2>
            </a>
            <p className={styles.listItem__description}>
                { description.length > 200 ? `${description.slice(0, 200)}..` : description }
            </p>
        </div>

    </li>    
);

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    cover: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    description: PropTypes.string,
    link: PropTypes.string
};

ListItem.defaultProps = {
    cover: noCover,
    description: 'No description available.'
}

export default ListItem;