import * as React from "react";

//imported libraries
import Loading from "./Loading";
 
//imported hooks
import { useState , useEffect} from "react";
import { Link} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

//imported  placeholder images
import crowd from "../partials/asset/crowd.jpg";
import music from "../partials/asset/music.JPG";
import piggy from "../partials/asset/piggy.jpg";
import ticket from "../partials/asset/ticket.JPG"; 



const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

  

const Homepage = (props) => {
 
const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    const loadPage = async() => {
      await new Promise ((event) => {
        setTimeout(()=> {setPageLoad(false)}, 2000); 
      });
    }
    setTimeout(()=> {
      loadPage();
      setPageLoad(true);
    }, 0);
  }, [])
    return(
      <>
          {pageLoad ? <Loading /> : (
        <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{duration:0.6}}
          className="header"
          >
          <motion.section 
          className="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          transition={{ duration: 0.5, delay: 2 }}
          >
            <div className="featured wrapper">
              <h1> Concert Budget Master</h1>
              <p>Budget tight? Concerts too much?</p>
              <p>Let's get planning</p>
          </div>
          </motion.section>
          <motion.ul
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
          >
          {[0, 1, 2, 3].map((index) => (
          <motion.li key={index} className="item" variants={item} >
          {index === 0 && <img src={ticket} alt="graphic with tickets, comics style"/>}
          {index === 1 && <img src={music} alt="concert's posters"/>}
          {index === 2 && <img src={piggy} alt="piggy bank drawing"/>}
          {index === 3 && <img src={crowd} alt="minimalistic graphics depicting a crowd of people having fun at a concert"/>}
          </motion.li>
          ))}
          </motion.ul>
          <section className="enterID">
          <motion.form action="submit" 
          // initial={{ opacity: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 2 ,
            repeat: Infinity,
            repeatDelay: 2
          }}
          animate={{
            // opacity: 1,
            scale: [1, 1.05, 1, 1.05, 1],
            rotate: [0, 0, -5, 5, 0]
          }}
          >
          <div className="onLogin">
            <Link to={`/searchPage`}>
              <button>Create Your Budget List!</button>
            </Link>
          {/* commment up to prvent bugs */}

           </div>
          </motion.form>
         </section>

        </motion.div>
        </AnimatePresence>
    )}
    </>
    )
    
}

export default Homepage;
