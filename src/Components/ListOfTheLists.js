//imported libraries
import firebase from "../firebase";
import Loading from "./Loading";

//imported hooks
import {ref, getDatabase, onValue} from "firebase/database"; 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const ListOfTheLists = () => {

   const [lists, setLists] = useState([]);
   const [concertSum, setConcertSum] = useState([])
   const [concertCount, setConcertCount ] = useState([]);
   const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    const loadPage = async() => {
      await new Promise ((event) => {
        setTimeout(()=> {setPageLoad(false)}, 500); 
      });
    }
    setTimeout(()=> {
      loadPage();
      setPageLoad(true);
    }, 500);
  }, []);


useEffect( () => {

   
   const database = getDatabase(firebase);
   const dbRef = ref(database);

   onValue(dbRef, (response) => {
      console.log(response.val());
      const listsData = response.val();
      const newState = [];

      for (let key in listsData) {
         console.log(listsData[key]);
         newState.push(listsData[key]);
      }
      setLists(newState);
      //getting total cost amount for each budget
      const maxPriceArray = [];

      for (let i = 0; i  < newState.length; i++) {
          let totalListPrice = 0;
         for (let a = 0; a < newState[i].budgetConcertContent.length; a++){
            
            totalListPrice += newState[i].budgetConcertContent[a].maxPrice;
            totalListPrice = totalListPrice * 100;
            totalListPrice = Math.round(totalListPrice);
            totalListPrice = totalListPrice/100;
            totalListPrice.toFixed(2);

         }
         maxPriceArray.push(totalListPrice);
      }
      setConcertSum(maxPriceArray);

      // getting number of concerts for each budget
      let totalNumberOfConcerts = 0;
      const numberOfConcertsArray = [];

      for (let i = 0; i < newState.length; i++) {
         totalNumberOfConcerts = newState[i].budgetConcertContent.length;
         numberOfConcertsArray.push(totalNumberOfConcerts);
      }

      setConcertCount(numberOfConcertsArray);
   })

   }, [])

      return (
         <div className="all">
            {pageLoad ? <Loading /> : 
               (
                  <>
                  <AnimatePresence>
                  <motion.section className="wrapper listOfTheListsContainer"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{duration:0.5}}
                     exit={{ opacity: 0 }}
                  >
                     <h2> List of created list</h2> 
                     
                     <ul> {
                        lists.map((list, key) => {
                           const { listname, userBudget, shareKey, editKey ,ListCreated} = list;

                           const date = new Date(ListCreated)
                           const year = date.getFullYear();
                              const month = date.getMonth() + 1;
                              const day = date.getDate();
                              const formattedDateTime = `${year}-${month}-${day}`;
                           
                              return (
                              <motion.li 

                              key={key}
                              initial={{ opacity: 0, y: 50 }}
                              animate={{ opacity: 1, y: 0 ,
                                       borderRadius: ["5%", "75%", "10%", "50%", "25px"],
                              }}
                              exit={{ opacity: 0, y: -50 }}
                              transition={{ duration: 0.5, delay: key * 0.1 }}
                              className={`listItem${key % 3 + 1}`}
                              >
                                 <div className="fairBaseList">
                                 <p><span>List: </span>{listname}</p>
                                 <p><span>Budget: </span>{userBudget} CAD</p>
                                 <p></p>

                                 <p><span>Total Cost:</span> {concertSum[key]} CAD</p>
                                 <p><span>Total concerts:</span> {concertCount[key]}</p>
                                 <p><span>Created on:</span> {formattedDateTime}</p>

                                 </div>
                                 <div className="listButtons">
                                 <Link to={`/viewOnlyList/:${shareKey}`}>
                                    <button>View List</button>
                                 </Link>

                                 <Link to={`/listWithKeys/:${editKey}`}>
                                    <button>Edit List
                                       {/* <span>(with ID)</span> */}
                                       </button>
                                 </Link>
                                 </div>
                              </motion.li>
                              )
                           })
                           }               
                        <Link to={`/searchPage`}>
                        <motion.button id="LOLButton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{duration:0.5}}
                        exit={{ opacity: 0 }}
                        >
                           Create Another List
                           </motion.button>
                        </Link>
                     </ul>
                     
                  </motion.section>
                  
                  </AnimatePresence>
                  </>
               )
            }
         </div>
      )
}
export default ListOfTheLists;