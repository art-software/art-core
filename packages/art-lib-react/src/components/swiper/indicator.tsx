import React from 'react';

interface IIndicator {
  pages: number;
  currentPage: number;
}

export default (props: IIndicator) => {
  const pages: JSX.Element[] = [];

  for (let i = 0; i < props.pages; i++) {
    pages.push(
      <li key={i} className={props.currentPage === i ? 'active' : ''}>{i}</li>
    );
  }

  return (
    <div className="swiper-indicator">
      <ul>
        {pages}
      </ul>
    </div>
  );
};