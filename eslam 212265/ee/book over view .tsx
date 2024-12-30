import React from 'react';
import { useSelector } from 'react-redux';
import './BookOverview.css';

import { RootState } from '../../../redux/ReduxStore';
import { BookInformation } from '../BookInformation/BookInformation';

export const BookOverview: React.FC = () => {
  const bookState = useSelector((state: RootState) => state.book);
  const user = useSelector((state: RootState) => state.authentication.loggedInUser);

  return (
    <div className="book-overview">
      {bookState.currentBook && !bookState.loading && (
        <BookInformation book={bookState.currentBook} />
      )}
    </div>
  );
};
