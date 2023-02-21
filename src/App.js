import './App.scss';
import { Route, Routes } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// Componetns
import Nav from './Components/Nav';
import HomePage from "./Components/HomePage";
import ListWithKeys from './Components/ListWithKeys';
import ViewOnlyList from './Components/ViewOnlyList';
import SearchPage from './Components/SearchPage';
import ListOfTheLists from './Components/ListOfTheLists';
import ErrorPage from './Components/ErrorPage';
import BgOverlay from './Components/BgOverlay';
import Credit from './Components/Credit';
import Footer from './Components/Footer';

// import Loading from './Components/Loading';

function App() {


return (
  
  <div className="main">
    <BgOverlay />
      <Routes>
        <Route path="/" element= {  <HomePage /> }/>  
        <Route path="/searchPage" element= {  <SearchPage/> }/>  
        <Route path="/listOfLists" element= {  <ListOfTheLists />}/>  
        <Route path="/viewOnlyList/:shareID" element= {  <ViewOnlyList />}/>  
        <Route path="/listWithKeys/:editID" element= {  <ListWithKeys />}/>
        <Route path="/credit" element= {  <Credit/> }/> 
        <Route path='*' element={<ErrorPage />} />  
      </Routes>
    <Nav />
    <Footer />
  </div>
);
}




export default App;
