//imported libraries
import firebase from "../firebase";
import Loading from "./Loading";

//imported hooks
import { getDatabase, ref, set, get } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";



const ListWithKeys = () => {

    const [nameOfTheList, setNameOfTheList] = useState("Your list");
    const [budgetValue, setBudgetValue] = useState("0");
    const [listOfConcerts, setListOfConcerts] = useState([]);
    const [totalTicketPrice, setTotalTicketPrice] = useState();
    const [pageLoad, setPageLoad] = useState(true);
    const [displayTicket, setDisplayTicket] = useState();
    const [ticker, setTicker] = useState(0);
    const [viewTicket, setViewTicket] = useState([]);


    const { editID } = useParams();
    const ID = editID.replace(':', '');

    const IDRef = useRef(ID);






    // Display 'Loading' component on page load 
    useEffect(() => {
        const loadPage = async () => {
            await new Promise((event) => {
                setTimeout(() => { setPageLoad(false) }, 1500);
            });
        }
        setTimeout(() => {
            loadPage();
            setPageLoad(true);
        }, 500);
    }, []);

    //Function setting the states for displaying the data from the firebase
    const checkoutTheData = (name, budget, concerts) => {
        setNameOfTheList(name);
        setBudgetValue(budget);
        setListOfConcerts(concerts);
        setViewTicket(concerts);
    }

    // Setting the lenght of the displayed ticket array  
    const arrayLength = (currentEditList) => {
        setDisplayTicket(Array.from({ length: (currentEditList.budgetConcertContent.length) }, () => 1))
    }

    // Setting the value of the displayed ticket 
    const arrayValue = (currentList) => {
        const newDisplayTicket = currentList[0].budgetConcertContent.map(concert => concert.numberOfTickets);
        setDisplayTicket(newDisplayTicket);
    }

    // Pulling the concert information from Firebase
    useEffect(() => {

        if (displayTicket === undefined) {
            const correctID = IDRef.current
            const database = getDatabase(firebase);
            const dbRef = ref(database);

            get(dbRef).then((response) => {

                const allTheLists = response.val();
                const newState = [];
                for (let key in allTheLists) {
                    newState.push(allTheLists[key]);
                }

                const currentList = newState.filter((event) => {
                    if (event.editKey !== `${correctID}`) {
                        return null;
                    } else {
                        const currentEditList = event;
                        arrayLength(currentEditList);
                        // setRenderData(renderData.splice(0, 1, currentEditList.budgetConcertContent));
                        return currentEditList;
                    }
                })
                const myArrayFromFirebase = currentList;
                arrayValue(currentList);

                const nameFromList = myArrayFromFirebase[0].listname;
                const budget = myArrayFromFirebase[0].userBudget;
                const allChosenConcerts = myArrayFromFirebase[0].budgetConcertContent;


                const totalCost = allChosenConcerts.reduce((acc, concert) => {
                    const ticketCount = concert.numberOfTickets;
                    const ticketPrice = concert.maxPrice;
                    const costWithCounts = ticketCount * ticketPrice;
                    return acc + costWithCounts;
                }, 0);

                
                checkoutTheData(nameFromList, budget, allChosenConcerts);
                setTotalTicketPrice(totalCost);
                

            }).catch((error) => {
                console.log(error)
            })

        } else if (displayTicket !== undefined) {


            const correctID = IDRef.current
            const database = getDatabase(firebase);
            const dbRef = ref(database);

            get(dbRef).then((response) => {

                const allTheLists = response.val();
                const newState = [];
                for (let key in allTheLists) {
                    newState.push(allTheLists[key]);
                }

                const currentList = newState.filter((event) => {
                    if (event.editKey !== `${correctID}`) {
                        return null;
                    } else {
                        const currentEditList = event;
                        return currentEditList;
                    }
                })
                const myArrayFromFirebase = currentList;

                const allChosenConcerts = myArrayFromFirebase[0].budgetConcertContent;

                const totalCost = allChosenConcerts.reduce((acc, concert) => {
                    const ticketCount = displayTicket[allChosenConcerts.indexOf(concert)];
                    const ticketPrice = concert.maxPrice;
                    const costWithCounts = ticketCount * ticketPrice;
                    return acc + costWithCounts;
                }, 0);

                
                setTotalTicketPrice(totalCost);
                

            }).catch((error) => {
                console.log(error)
            })


        }
    }, [displayTicket])



    // Price Range Info 
    const priceRanges = [
        { label: 'Ticket 1000+ CAD', minPrice: 1001, maxPrice: Infinity, className: 'listItem3' },
        { label: 'Ticket below 1000 CAD', minPrice: 751, maxPrice: 1000, className: 'listItem3' },
        { label: 'Ticket below 750 CAD', minPrice: 501, maxPrice: 750, className: 'listItem2' },
        { label: 'Ticket below 500 CAD', minPrice: 251, maxPrice: 500, className: 'listItem1' },
        { label: 'Ticket below 250 CAD', minPrice: 0, maxPrice: 250, className: 'listItem0' },
    ];


    // Filtered Concert 
    const filteredConcerts = priceRanges.map(({ label, minPrice, maxPrice }) => (
        {
            label,
            concerts: listOfConcerts.filter(concert => concert.maxPrice >= minPrice && concert.maxPrice <= maxPrice)
        }
    ))


    // Increase Ticket Number
    const handleClickPlus = (maxPrice) => {
        for(let i = 0; i < viewTicket.length; i++){

            if (maxPrice === viewTicket[i].maxPrice){

                const plusTicketDisplay = displayTicket[i];
                const currentTicketDisplay = plusTicketDisplay + 1;
                displayTicket[i] = currentTicketDisplay;

                viewTicket[i].numberOfTickets = displayTicket[i];
                const newItemsDisplay = [...displayTicket]; // make a copy of the current array state
                newItemsDisplay.splice(`${i}`, 1, displayTicket[i])

            return setDisplayTicket(newItemsDisplay);
            }
        }
    }
    //
    // Decrease Ticket Number 
    const handleClickMinus = (maxPrice) => {
        for (let i = 0; i < viewTicket.length; i++) {
            if (maxPrice === viewTicket[i].maxPrice){

                if (viewTicket[i].numberOfTickets === 0){
                    return;
                } else {
                    const minusTicketDisplay = displayTicket[i];
                    const currentTicketDisplay = minusTicketDisplay - 1;
                    displayTicket[i] = currentTicketDisplay;

                    viewTicket[i].numberOfTickets = displayTicket[i];
                    const newItemsDisplay = [...displayTicket]; // make a copy of the current array state
                    newItemsDisplay.splice(`${i}`, 1, displayTicket[i])

                    return setDisplayTicket(newItemsDisplay);
                }
            }
        }
    }

    // Submit the updated data to Firebase 
    const handleClickSave = () => {
        const x = 0;
        const y = 1;
        const z = x + y;
        setTicker(z);
    }

    
    const displayingViewTicket = (maxPrice) => {
        for (let i = 0; i < viewTicket.length; i++){
            if (maxPrice === viewTicket[i].maxPrice){
                return viewTicket[i].numberOfTickets
            }
        }
    }
    // console.log(viewTicket);

    // Help submit information based on ticker change
    useEffect(() => {
        const correctID = IDRef.current

        if (ticker === 0) {
            return undefined;

        } else if (ticker === 1) {

            const database = getDatabase(firebase);
            const dbRef = ref(database);

            get(dbRef).then((response) => {

                if (response.exists()) {

                    const allLists = response.val();
                    const newArray = Object.keys(allLists); // extract the keys and store them in newArray
                    const currentState = [];

                    for (let key in allLists) {
                        currentState.push(allLists[key]);
                    }

                    const recentList = currentState.filter((event) => {
                        if (event.editKey !== `${correctID}`) {
                            return null;
                        } else {
                            const currentEditList = event;
                            return currentEditList;
                        }
                    });

                    

                    if (recentList.length > 0) {
                        for (let i = 0; i < recentList[0].budgetConcertContent.length; i++) {
                            recentList[0].budgetConcertContent[i].numberOfTickets = displayTicket[i]
                        }

                        for (let i = 0; i < newArray.length; i++) {
                            if (allLists[newArray[i]].editKey !== correctID) {
                                continue;
                            } else if (allLists[newArray[i]].editKey === correctID) {
                                return set(ref(database, `/${newArray[i]}`), recentList[0]);
                            }
                        }
                    } else {
                        console.log('recentList is empty or undefined');
                    }

                } else {
                    console.log("No data available")
                }
            }).catch((error) => {
                console.log(error)
            })
            setTicker(0);
        }
    }, [ticker, displayTicket])




    return (
        <>
            {pageLoad ? <Loading /> : (
                <>
                    <AnimatePresence>
                        <motion.section
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="wrapper viewDetaliedList"
                        >
                            <h2>{nameOfTheList}</h2>
                            <div className="listHeading">
                                <h3>Concert {totalTicketPrice.toFixed(2)} CAD </h3>
                                <div className="progressBar">
                                    <h3>vs</h3>
                                    <progress value={totalTicketPrice.toFixed(2)} max={budgetValue}></progress>
                                </div>
                                <h3>Budget {budgetValue} CAD</h3>
                            </div>
                            <ul>
                                <li className="listTags inView">
                                    <div className="listConcertTags">
                                        <p>Name</p>
                                        <p>Date</p>
                                        <p>City</p>
                                        <p>Location</p>
                                        <p>Price</p>
                                        <p>Total Price</p>
                                        <p>+ / -</p>
                                    </div>
                                </li>
                                {/* Filtering Chosen Ticket Array to render them on the page */}
                                {filteredConcerts.map(({ label, concerts }, index) => {
                                    if (concerts.length > 0) {
                                        return (

                                            <div key={label} className={priceRanges.find(range => range.label === label).className}>
                                                <h3>{label}</h3>
                                                {/* Mapping through details of the concert */}
                                                {concerts.map(({ name, eventDate, venueCity, venueName, maxPrice, numberOfTickets }, key) => (
                                                    <motion.li
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                        className="fBListInView"
                                                        key={key}
                                                    >
                                                        <p>{name}</p>
                                                        <p>{eventDate}</p>
                                                        <p>{venueCity}</p>
                                                        <p>{venueName}</p>
                                                        <p>{maxPrice} CAD x {displayingViewTicket(maxPrice)}</p>
                                                        <p>{`${(maxPrice * displayingViewTicket(maxPrice)).toFixed(2)} CAD`}</p>

                                                        <div className="listButtons">
                                                            <button onClick={() => handleClickPlus(maxPrice)}> + </button>
                                                            <button onClick={() => handleClickMinus(maxPrice)}> - </button>
                                                        </div>
                                                    </motion.li>
                                                ))}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                })}

                            </ul>
                            <Link to={`/listOfLists`}>
                                <button id="LOLButton">back</button>
                            </Link>
                            <button onClick={handleClickSave}>Save Changes</button>
                        </motion.section>
                    </AnimatePresence>
                </>
            )}
        </>
    )
}
export default ListWithKeys;