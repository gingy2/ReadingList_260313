import React, { createContext, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Navi from './components/Navi';
import BookList from './components/BookList';

export const BookContext=createContext([]);

const App = () => {

  const [book, setBook]=useState([]); // 입력된

  return (
      <BookContext.Provider value={{book, setBook}}>
        <BrowserRouter>
          {/* <Navi/> */}
            <Routes>
              <Route path='/' element={<BookList/>}></Route>
            </Routes>
        </BrowserRouter>
      </BookContext.Provider>
  );
};

export default App;