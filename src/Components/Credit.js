//imported hooks
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import iza from "../partials/asset/Iza.jpg";
import farhan from "../partials/asset/farhan.jpg";
import rana from "../partials/asset/rana.jpg";
import hoi from "../partials/asset/hoi.jpg";

const Credit = () => {
    const credit = {
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
      
    return(
        <div className="wrapper styleDiv">
        <h1>Our Wonderful team</h1>
        <motion.ul
          className="credit"
          variants={credit}
          initial="hidden"
          animate="visible"
          >
            {[0, 1, 2, 3].map((index) => (
            <motion.li key={index} className="team" variants={item} >
            {index === 0 && <img src={rana} alt="graphic with tickets, comics style"/>}
            {index === 1 && <img src={iza} alt="concert's posters"/>}
            {index === 2 && <img src={hoi} alt="piggy bank drawing"/>}
            {index === 3 && <img src={farhan} alt="minimalistic graphics depicting a crowd of people having fun at a concert"/>}
            </motion.li>
            ))}
          </motion.ul>
          
          <Link to={`/`}>
          <button>Home</button>
          </Link>
      
        </div>
    )
}
export default Credit