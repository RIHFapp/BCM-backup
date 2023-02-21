import firebase from "../firebase";
import { getDatabase, ref, onValue, /* remove */ } from "firebase/database";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import { AnimatePresence, motion } from "framer-motion";
const ListWithKeys = () => {


const {editID} = useParams();
let ID = editID;
ID = ID.replace(':', '');


const [nameOfTheList, setNameOfTheList] = useState("Your list");
const [budgetValue, setBudgetValue] = useState("0");
const [listOfConcerts, setListOfConcerts] = useState([]);
const [totalTicketPrice, setTotalTicketPrice] = useState();


 const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    const loadPage = async() => {
      await new Promise ((event) => {
        
        setTimeout(()=> {setPageLoad(false)}, 1500); 
      });
    }
    setTimeout(()=> {
      loadPage();
      setPageLoad(true);
    }, 500);
  }, []);





//function setting the states for displaying the data from the firebase
const checkoutTheData = (name, budget, concerts)=> {
    setNameOfTheList(name);
    setBudgetValue(budget);
    setListOfConcerts(concerts);
}


useEffect( () => {

    const database = getDatabase(firebase);
    const dbRef = ref(database);


    onValue(dbRef, (response) => {
        const allTheLists = response.val();
   
        const newState = [];
        for (let key in allTheLists) {
            newState.push(allTheLists[key]);
        }

        const currentList = newState.filter((event)=>{
            if (event.editKey !== `${ID}`){
                return null;
            } else {
                const currentEditList = event;
                return currentEditList;
                //check it again!
            }
        })

        

        const myArrayFromFirebase = currentList;
        


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
    })  
}, [ID])


const priceRanges = [
    { label: 'Ticket 1000 CAD+', minPrice: 1001, maxPrice: Infinity, className: 'listItem3'},
    { label: 'Ticket below 1000 CAD', minPrice: 751, maxPrice: 1000 , className: 'listItem3' },
    { label: 'Ticket below 750 CAD', minPrice: 501, maxPrice: 750, className: 'listItem2' },
    { label: 'Ticket below 500 CAD', minPrice: 251, maxPrice: 500, className: 'listItem1' },
    { label: 'Ticket below 250 CAD', minPrice: 0, maxPrice: 250, className: 'listItem0' },
];
const filteredConcerts = priceRanges.map(({label, minPrice, maxPrice}) => ({
    label,
    concerts: listOfConcerts.filter(concert => concert.maxPrice >= minPrice && concert.maxPrice <= maxPrice)
}));

    return(
        <>  
            {pageLoad ? <Loading /> : ( 
            <>
                <AnimatePresence>
                    <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{duration:0.5}}
                    exit={{ opacity: 0 }}
                    className="wrapper viewDetaliedList"
                    >
                        <h2>{nameOfTheList}</h2>
                                <div className="listHeading">
                                    <h3>Concert {totalTicketPrice} CAD </h3>
                                    <div className="progressBar">
                                    <h3>vs</h3>
                                    <progress value={totalTicketPrice} max={budgetValue}></progress>
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
                                        </div>
                                        <div className="listButtonTags">
                                            <p>+ / -</p>
                                        </div>         
                                    </li>
                                
                                {filteredConcerts.map(({ label, concerts }) => {
                                if (concerts.length > 0) {
                                return (
                                    <div key={label} className={priceRanges.find(range => range.label === label).className}>
                                    <h3>{label}</h3>
                                    {concerts.map(({ index, name, eventDate, venueCity, venueName, maxPrice, numberOfTickets}, key) => (
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
                                        <p>{maxPrice.toFixed(2)} CAD x {numberOfTickets}</p>
                                        <p>{(maxPrice * numberOfTickets).toFixed(2)} CAD</p>
                                        <button> + </button>
                                        <button> - </button>
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
                    </motion.section>
                </AnimatePresence>
            </> 
            )}
        </>
    )
}
export default ListWithKeys;