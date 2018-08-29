// Pagination.jsx
import React from 'react';
import PropTypes from 'prop-types';
const Pagination3 = ({ onPageRequest, pagination }) => {
// If the back button should be enabled  
  const allowPrevious = pagination.current_page !== 1;
// If the next button should be enabled
  const allowNext = pagination.current_page !== total_pages;
// If we're on the first page
  const firstPage = pagination.current_page === 1;
// If we're on the last page
  const finalPage = current_page === total_pages;
// The index of the previous page
  const previousPage = current_page - 1;
// The index of the next page
  const nextPage = current_page + 1;
return (
    <ul className="pager">
      <li onClick={allowPrevious && onPageRequest(previousPage)}>
        <a>&larr; Previous</a>
      </li>
      <li>
        <div
          className="inline-block"
        >
          Displaying Results
          {firstPage ?
            1 :
            previousPage * max_per_page
          }
          to 
          {finalPage ?
            total_count :
            current_page * max_per_page
          }
          <strong>Total Results: {total_count}</strong>
        </div>
      </li>
      <li onClick={allowNext && onPageRequest(nextPage)}>
        <a>Next &rarr;</a>
      </li>
    </ul>
  );
}
Pagination3.propTypes = {
  onPageRequest: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    total_pages: PropTypes.number.isRequired,
    current_page: PropTypes.number.isRequired,
    total_count: PropTypes.number.isRequired,
    max_per_page: PropTypes.number.isRequired,
  }),
};