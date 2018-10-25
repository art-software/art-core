import React from 'react';
export default (props) => {
    const pages = [];
    for (let i = 0; i < props.pages; i++) {
        pages.push(<li key={i} className={props.currentPage === i ? 'active' : ''}>{i}</li>);
    }
    return (<div className="swiper-indicator">
      <ul>
        {pages}
      </ul>
    </div>);
};
