import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import Buttom from '../Buttom/Buttom';
import { nanoid } from 'nanoid';
// import './ation.scss';
export const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return (
            <li key={nanoid()} className="pagination-item dots">
              &#8230;
            </li>
          );
        }
        const extStyle = {
          marginLeft: 4,
          marginRight: 4,
        };
        const noActive =
          pageNumber !== currentPage
            ? {
                backgroundColor: '#f0f0f0',
                color: '#000',
              }
            : {
                backgroundColor: '#3A80BA',
                color: '#fff',
              };

        return (
          <Buttom
            key={pageNumber}
            content={pageNumber}
            extStyle={{ ...extStyle, ...noActive }}
            custumStyle="pag-item"
            onClick={() => onPageChange(pageNumber)}
          />
          // <li
          //   className={classnames('pagination-item', {
          //     selected: pageNumber === currentPage,
          //   })}
          //   onClick={() => onPageChange(pageNumber)}
          // >
          //   {pageNumber}
          // </li>
        );
      })}
      <li
        key={nanoid()}
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};
