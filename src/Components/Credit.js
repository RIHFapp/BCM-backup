//imported hooks
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import iza from "../partials/asset/Iza.jpg";
import farhan from "../partials/asset/farhan.jpg";
import rana from "../partials/asset/rana.jpg";
import hoi from "../partials/asset/hoi.jpg";

const Credit = () => {
    // const credit = {
    //     hidden: { opacity: 1, scale: 0 },
    //     visible: {
    //       opacity: 1,
    //       scale: 1,
    //       transition: {
    //         delayChildren: 0.5,
    //         staggerChildren: 0.3
    //       }
    //     }
    //   };
      
    //   const item = {
    //     hidden: { y: 20, opacity: 0 },
    //     visible: {
    //       y: 0,
    //       opacity: 1
    //     }
    //   };
      
    return(
        <div className="wrapper styleDiv">
        <h1>Meet Our Wonderful team<i class="fa-solid fa-heart"></i></h1>
        <motion.ul
          className="credit"
          initial="hidden"
          animate="visible"
          >
            {/* {[0, 1, 2, 3].map((index) => ( */}
            <motion.li  className="team" 
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
            >
            <div className="teamPic t1">
                <img src={rana} alt="" className="m1"/>
                <div className="teamInfo">        
                <p><a className="RS" href="https://ranasoyakcodes.dev" target="_blank" rel="noopener noreferrer">Rana Soyak</a> </p>
                <p>main:Project Manger</p>
                <p>Api call</p>
                <p>Destureing problem</p>
                <p>Api, loading & error logic</p>
                </div>
            </div>
            
            <div className="teamPic t2">
                <img src={iza} alt="" className="m2"/>
                <div className="teamInfo">
                <p><a className="Iza" href="https://izacodes.me" target="_blank" rel="noopener noreferrer"> Iza Zamorska-Wasielak </a> </p>
                <p>main:UX/ Accessibility</p>
                <p>Firebase</p>
                <p>Gesturing problem, data analyze </p>
                <p>list pages logic</p>
                </div>
            </div>
            
            <div className="teamPic t3 ">
                <img src={hoi} alt="" className="m3"/>
                <div className="teamInfo">
                <p><a className="HW" href="https://hoi-jw.com" target="_blank" rel="noopener noreferrer"> Hoi Wong </a> </p>
                <p>Main:UX/UI</p>
                <p>Firebase</p>
                <p>data config, code Polishing</p>
                <p>all pages</p>
                </div>
            </div >
            
            <div className="teamPic t4 ">
                <img src={farhan} alt="" className="m4"/>
                <div className="teamInfo">
                <p> <a className="FS"href="https://farhandev.ca/" target="_blank" rel="noopener noreferrer"> Farhan Siddiqi </a> </p>
                <p>Main:Head Coder</p>
                <p>Main Controll of codes</p>
                <p>Dubugging</p>
                <p>all pages logic</p>
                </div>
            </div>
            
            </motion.li>
            
          </motion.ul>
          
          <Link to={`/`}>
          <button>Home</button>
          </Link>
      
        </div>
    )
}
export default Credit