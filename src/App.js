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
// API KEY: "15zZnInsCdU0ECUBEtwgFJsPOwjOlGWt"


// pseudo code - Dsktop First 

// Main Component - App.js
  // Home Page 
  // Concert Search Page 
  // Budget List Page 

// on component mount

  // all pages have icon button to go to list
  // Changing in between pages - display loading page for 2 seconds. 

  // client will see index starter page 
      // has 3 components, feature, form, collection of recommendations 

      // images interaction are stretch goals, specifically for component 1 and 3 for load up
        // Have placeholder images for the concert image containers. 

      // form component 
        // contains name and budget input sections, onSubmit -> goes to 2nd module/view


    // 2nd module/view
        // has 2 components , form and list component 

        // form component has two inputs - artist and location 
          // onSubmit generates list - that filters out with inputs 
          // If the API call does not have a return based on the input, display error page? 
          // When API call is happening - display loading page for 3 seconds. 

        // list component - shows filtered concert options with should display relevant information (e.g. Performer, dates, venue, ticket price range).
          // each list has a plus button to add to saved list
          // a button to continue on to next view/module
        // has back button


    // 3rd module/view 
        // contains summary of list, can edit list and budget
        // visual indication of under budget, at budget, over budget
        // back button
        // publish button ?????? maybe
        // budget decorator - top - color indication -> on total price and total budget


    // 4th module/view ????
        // client review ?








