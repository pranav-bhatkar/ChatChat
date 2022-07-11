import React from "react";
import { motion, AnimatePresence } from "framer-motion"

const Model = ({ showModel, setShowModel, title, children }) => {
  const backdrop = {
    visible: { opacity: 1 },
    invisible: { opacity: 0 }
  }
  const model = {
    invisible: { 
      y: "-100vh",
      opacity: 0
    },
    visible: { 
      y: "200px",
      opacity: 1,
      transition: { delay: 0.5 }
    }
  }
  return (
    <AnimatePresence exitBeforeEnter>
     { showModel && (
      <motion.div className="absolute top-0 left-0 w-full h-screen bg-gray-900/50 transition-[0.5s]"
        variants={backdrop}
        initial="invisible"
        animate="visible"
      >
        <motion.div class="relative text-center w-[90%] mx-auto max-w-[400px] min-w-[300px] min-h-[300px] bg-slate-200 rounded-2xl shadow-xl py-6 px-4"
        variants={model}
        >
        <motion.div className="absolute top-5 right-5 text-2xl text-red-500 opacity-1">
        <ion-icon onClick={(e) => setShowModel(false) } name="close"></ion-icon>
        </motion.div>
        <h1 className="text-xl font-bold text-slate-600 mb-2" >{title}</h1>
        <motion.div className="py-2">
        {children}
        </motion.div>
        </motion.div>
      </motion.div>
       )
     }
    </AnimatePresence>
  );
};

export default Model;