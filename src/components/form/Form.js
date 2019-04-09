import React from 'react'
import styles from './Form.module.scss'
import AppContext from '../../Context'

const clickBtn =  () => {
    document.querySelector("button").click();
}

const Form = () => (
    <AppContext.Consumer>
        {(context) => (

        <form className={styles.form} onSubmit={ context.buildQueryString }>

            <div className="input-group">
                <span className="input-group-addon">Book title:</span>
                <input type="text" className="form-input" placeholder="..." required />
                <button className="btn btn-primary input-group-btn">
                    Search
                </button>
            </div>

            <div className="form-group">
                <label className="form-radio form-inline">
                    <input onChange={ clickBtn } type="radio" 
                    name="order" value="relevance" defaultChecked />
                    <i className="form-icon"></i> 
                    Order by relevance
                </label>
                <label className="form-radio form-inline">
                    <input onChange={ clickBtn } type="radio" 
                    name="order" value="newest" />
                    <i className="form-icon"></i> 
                    Order by newest
                </label>
            </div>

        </form>
        )}
    </AppContext.Consumer> 
);

export default Form;