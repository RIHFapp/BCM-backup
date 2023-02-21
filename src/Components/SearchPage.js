//imported libraries
import Sorry from "./Sorry";
import Loading from "./Loading";
import Swal from 'sweetalert2';
import axios from "axios";
import firebase from "../firebase";


//importing hooks
import { useState, useEffect } from "react";
import { ref, getDatabase, push } from "firebase/database"; 
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";



const SearchPage = (/* {pageLoad} */) => {
  // States for User Budget Information
  const [userListName, setUserListName] = useState('');
  const [userBudget, setBudgetInput] = useState('');
  // State for Concert Search
  const [artist, setArtist] = useState(null);
  const [city, setCity] = useState(null);
  const [checked, setChecked ] = useState(false);
  const [apiRes, setApiRes] = useState([]);

  const [addedList, setAddedList] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState (false);

  const [keyRef , setKeyRef] = useState({})
  const [displayTicket, setDisplayTicket] = useState([]);
  const [eK, setEK] = useState('');
  const [link, setLink] = useState('');
  const [budgetLoad, setBudgetLoad] = useState(false);
  const [concertSearchAppear, setConcertSearchAppear] = useState(false);
  const [concertResult, setConcertResult] = useState(false);
  const [myListAppear, setMyListAppear] = useState(false);

  

// 
  useEffect(() => {
    const loadPage = async() => {
      await new Promise ((event) => {
        setTimeout(()=> {setPageLoad(false)}, 2000); 
      });
    }
    setTimeout(()=> {
      loadPage();
      setPageLoad(true);
      setBudgetLoad(true);
    }, 500);
  }, [])


  // Renders user budget information when user clicks 
  const handleListConfig = (event) => {
    event.preventDefault();
    setUserListName(event.target.form[0].value);
    setBudgetInput(event.target.form[1].value);
    // setTimeout
    setConcertSearchAppear(true);
  }

  // Api submit button
  const handleSubmitConcert = (e) => {
    e.preventDefault();
    setArtist(e.target.form[0].value);
    setCity(e.target.form[1].value);
    setChecked(e.target.form[3].checked);
  }

  // On Search Page mount - trigger an API call based on input content availability.
  useEffect (() => {
    if (artist === null && city === null) {
      return;
    } else if (artist === 'undefined' && city === 'undefined') {
      setError(true);
    }
    else {
    setApiLoading(true);
    setError(false);
      axios({
        url: "https://app.ticketmaster.com/discovery/v2/events",
        params: {
          apikey: "15zZnInsCdU0ECUBEtwgFJsPOwjOlGWt",
          keyword: `${artist}`,
          countryCode:"CA",
          city: `${city}`,
          classificationName:"music"
        }
      }).then((res) => {
        const list = res.data._embedded.events.filter((event) => {
          if (checked === false) {
            return event;
          } else if (checked === true && event.priceRanges !== undefined) {
            return event;
          } else {
            return false; // return false if neither condition is true
          }
        });
        setApiRes(list); 
        setTimeout(() => {
          setApiLoading(false);
          setConcertResult(true);
          new Promise ((newRes) => {
              return newRes;
              })
              .then(() => {
                setApiLoading(true);
              })
              .then(() => {
                setTimeout(() => {
                  setApiLoading(false)
                }, 3000);
              });
        }, 1000)
      }).catch((err)=> {
          setApiLoading(false);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2000)
        }
    )}
  },[artist, city, checked])

  // user adds concert to their dynamic list 
  const handleAddConcert = (name, eventDate, venueCity, venueName, maxPrice, concertImg, key, numberOfTickets) => {
    const concertData = {
      name: name,
      eventDate: eventDate,
      venueCity: venueCity,
      venueName: venueName,
      maxPrice: maxPrice,
      image: concertImg,
      key: key,
      numberOfTickets: numberOfTickets
    }
    setAddedList([...addedList, concertData]);
    setDisplayTicket(Array.from({ length: (addedList.length + 1) }, () => 1))
    setMyListAppear(true);
  }

  //When pressed Submit - the information gets sent to Firebase
  const handleFirebaseConnection = () => {
    if (addedList.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please add items to your list',
      })
    } else if (userBudget === "" && userListName === "" && addedList.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please give you list a name',
      })
    } else {
      // Generate a random key for shearable and editable views
      const shareKey = uuidv4("budget");
      const editKey = uuidv4("edit");
      setEK(editKey);

      const timestamp = new Date().getTime();
      // Connect to Firebase
      const currentTime = timestamp;
      const database = getDatabase(firebase);
      const dbRef = ref(database);
      setKeyRef({
        shareKey,
        editKey,
        listname: userListName,
        userBudget: userBudget,
        budgetConcertContent: addedList,
        ListCreated: currentTime,
      })
      push(dbRef, keyRef);
      setLink(`/listWithKeys/:${eK}`)
    }
    
  };


  useEffect(() => {
    if (eK) {
      setLink(`/listWithKeys/:${eK}`);
    } else if (addedList.length > 0 && userBudget !== "" && userListName !== "" && !link) {





      setEK(keyRef.shareKey);
    }
 
  }, [keyRef.shareKey, addedList, userBudget, userListName, link, eK]);


  const handleClickMinus = (index) => {
    if (addedList[index].numberOfTickets === 0) {
      return;
    } else {

      const minusTicket = addedList[index].numberOfTickets;
      const currentTicket = minusTicket - 1;
      addedList[index].numberOfTickets = currentTicket;

      const newItems = [...displayTicket]; // make a copy of the current array state
      newItems.splice(`${index}`, 1, `${addedList[index].numberOfTickets}`)
      
      setDisplayTicket(newItems)
      return addedList[index].numberOfTickets;
    }
  }

  const handleClickPlus = (index) => {

    const plusTicket = addedList[index].numberOfTickets;
    const currentTicket = plusTicket + 1;
    addedList[index].numberOfTickets = currentTicket;
    
    const newItems = [...displayTicket]; // make a copy of the current array state
    newItems.splice(`${index}`, 1, `${addedList[index].numberOfTickets}`)
    setDisplayTicket(newItems)
    return addedList[index].numberOfTickets;
  }
  


    return(
      <>
      {/* Conditionally rendering the page based on loading or error state */}
      {error ? <Sorry /> : apiLoading ? <Loading/> : pageLoad ? <Loading /> : (
      // Your component code here
        <AnimatePresence>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{duration:0.5}}
          exit={{ opacity: 0 }}
          >
            { 
             <>
             { budgetLoad && (
                <section className="budgetSetup">
                  <div className="inputSection wrapper">
                    <h2>Create Your List!</h2>
                    <form action="submit">
                      {/* name of the list input */}
                      <label htmlFor="newName"></label>
                      <input
                        type="text"
                        id="newName"
                        placeholder="Name Of Your List" 
                        maxlength="16"
                        />
                      
                      {/* user's budget input */}
                      <label htmlFor="newBudget"></label>
                      <input
                        type="text"
                        id="newBudget"
                        placeholder="Your Budget" 
                        maxlength="7"
                        />
                      <div>
                        <button onClick={handleListConfig}>
                          Add List Name and Budget
                        </button>
                      </div>
                    </form>
                  </div>
                </section>
             )}
              { concertSearchAppear && (
                  <section className="concertSearch">
                    <form className="searchForm wrapper">
                      <p>Search for concerts by artist and your preferred city</p>
                        <div className="searchInput">
                          <label htmlFor="artist"></label>
                          <input 
                              className="artistSearch"
                              id="artist"
                              placeholder="Artist..."
                          />

                          <label htmlFor="city"></label>
                          <input 
                              className="citySearch"
                              id="city"
                              placeholder="Cities In Canada (e.g Toronto) "
                          />
                      </div>
                        <fieldset>
                          <label htmlFor="displayPricedConcerts">
                            Click to show only priced concerts
                          </label>
                          
                          <input
                            id="displayPricedConcerts"
                            className="displayPricedConcerts"
                            name="priceChoice"
                            type ="checkbox"
                            value="priced"
                          /> 

                        </fieldset>

                        <button onClick={handleSubmitConcert}>
                          Search 
                        </button>
                    </form>
                  </section>
                )
              }
              { concertResult && (
                  <section className="concertResults">
                      <div className="searchResultContainer">
                        
                        <ul className="searchResultList wrapper">
                        <h3>Upcoming concerts...</h3>
                        {!apiLoading && (
                              apiRes.map((concertInfo)=>{
                                const name = concertInfo.name; 
                                const eventDate = concertInfo.dates.start.localDate;
                                const venueCity = concertInfo._embedded.venues[0].city.name;
                                const venueName = concertInfo._embedded.venues[0].name;
                                let numberOfTickets = 1;
                                const maxPrice = concertInfo.priceRanges !== undefined
                                  ? concertInfo.priceRanges[0].max
                                  : 'To be announced';
                              
                                const concertImg = concertInfo.images[3].url;
                                const key = concertInfo.id;
                                return (
                              
                                  <li 
                                  key = {key}
                                  className="concertResponse wrapper">
                                    { 
                                      concertInfo.priceRanges !== undefined ? ( 
                                        <button
                                          onClick={() => { handleAddConcert(name, eventDate, venueCity, venueName, maxPrice, concertImg, key, numberOfTickets)}}> + </button>
                                      ) : null
                                    }
                                    <div className="concertListInfo">
                                      <span><p> {name} </p></span>
                                      <p> {eventDate} </p>
                                      <p> {venueCity} </p>
                                      <p> {venueName} </p>
                                      <span><p>${maxPrice}</p></span>
                                    </div>
                                    <div className="concertListImage">
                                      <img src ={concertImg} alt={`${name} concert poster`}></img>
                                    </div>
                                  </li>
                                )
                            })
                            )}
                        </ul>
                    </div>
                  </section>
                )
              }

              { myListAppear && (
                  <section className="userListofChoices">
                    <div className="myList wrapper">
                      <div className="userBudgetInfo">
                        <h2 className="userInput"> List: {userListName} </h2>
                        <h2 className="userInput"> Budget: {userBudget} CAD</h2>
                      </div>

                          <ul className="myConcert wrapper">
                          <h3>Selected Concerts</h3>
                            {addedList.map( (list, index) =>{
                              const { name, eventDate, venueCity, venueName, maxPrice, image, /* numberOfTickets */ } = list;
                              const totalPrice = maxPrice * displayTicket[index];
                              return(
                                <li key={index}>
                                  <div className="concertListInfo">
                                    <span><p>{name}</p></span>
                                    <p>{eventDate}</p>
                                    <p>{venueCity}</p>
                                    <p>{venueName}</p>
                                    <span><p>${totalPrice.toFixed(2)}CAD</p></span>
                                  </div>
                                  <div className="ticketNumber">



                                    <button onClick={() => { handleClickPlus(index) }}>+</button>
                                    <p>{displayTicket[index]}</p>
                                    <button onClick={() => { handleClickMinus(index)}}>-</button>
                                    
                                    

                                  </div>
                                  <div className="concertListImage">
                                    <img src={image} alt={`Poster of ${name}`} />
                                  </div>
                                </li>
                              )
                            })}

                            <Link to={`${link}`}>
                              <button onClick={handleFirebaseConnection}>
                                Submit
                              </button>
                            </Link>
                          </ul>
                      </div>
                  </section>
                )
              }
             </>
            }

          </motion.div>
        </AnimatePresence>
      )}
      </>
    )
}

export default SearchPage;