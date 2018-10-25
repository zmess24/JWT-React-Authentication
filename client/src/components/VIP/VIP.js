import React from 'react';
import Header from '../common/Header/Header';

export default () => {
    return (
        <div>
            <Header text={"VIP YO"}/>
            <div className="row">
                <div className="column column-50 column-offset-25">
                    <img alt="party" src="https://media.giphy.com/media/hsBZfDG7wiWHu/giphy.gif"/>
                </div>
            </div>
        </div>
    )
};