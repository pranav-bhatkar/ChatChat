import React from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import { useConversations } from '../../contexts/ConversationsProviders';

const ListItemStyled = ({ c, index }) => {
  const { selectConversationIndex } = useConversations()
  const history = useHistory();
  const handleClick = (id, index) => {
    selectConversationIndex(index);
    history.push(`/chat/${id}`);
  }
  return (
    <>
         <motion.div className="w-full h-[75px] px-5 py-3 flex justify-between">
          <motion.div className="flex">
            <motion.div className="">
              <img 
                onClick={(e) => history.push(`/profile/${c.recipients._id}`)}
                className="w-14 h-14 overflow-hidden rounded-full object-cover" 
                src={c.recipients ? `${process.env.REACT_APP_API_URL}${c.recipients.avatar}` : null} 
                alt="avtar" />
            </motion.div>
            <motion.div onClick={(e) => handleClick(c._id, index)} className={`ml-4 ${c.lastmessage ? null : 'flex items-center justify-center font-bold' }`}>
              <motion.h4 className="text-slate-700 text-lg">{c.recipients.name}</motion.h4>
              {/*<motion.p className="text-green-500">online</motion.p>*/}
              { c.lastmessage && (<motion.p className="text-gray-500 text-xs mt-1 truncate w-48 text-ellipsis">{c.lastmessage}</motion.p> )}
              {/*<motion.div className="flex items-center mt-1">
                <i className="fas fa-check text-sm text-gray-400 mr-1"></i>
                <i className="fas fa-video text-sm text-gray-400 mr-1"></i>
                <motion.p className="text-slate-500 text-sm">Image</motion.p>
              </motion.div>*/}
            </motion.div>
          </motion.div>
          <motion.div>
            <motion.div className="flex justify-end">
              {c.time && ( <motion.p className="text-xs mb-2 text-slate-500">{c.time}</motion.p>)}
            </motion.div>
            <motion.div className="flex justify-end">
              { c.unReadCount && c.unReadCount!=="0" ? <motion.div className="w-6 h-6 rounded-full bg-slate-900 flex justify-center items-center">
                <motion.p className="text-xs text-white text-end">{ c.unReadCount!=="0" ? c.unReadCount : null}</motion.p>   
              </motion.div>: null }
            </motion.div>
          </motion.div>
        </motion.div>
    </>
  );
};

export default ListItemStyled;