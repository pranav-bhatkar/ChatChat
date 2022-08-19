import * as React from 'react';
import ListItemStyled from '../../../components/chatstab/ListItem';
import { motion } from "framer-motion"
import { useConversations } from '../../../contexts/ConversationsProviders';

export default function ChatsTab({searchTerm}) {
  const [searchResults, setSearchResults] = React.useState([]);
  const { formattedConversations } = useConversations()

  React.useEffect(() => {
    const results = formattedConversations.filter(c =>
    c.recipients.name && c.recipients.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(results)
    setSearchResults(results);
    }, [searchTerm, formattedConversations]);
  return (
    <>
    <motion.div className="min-h-[400px]  w-full">
   { formattedConversations.length === 0 ? null
   :
   searchResults.length > 0 ? searchResults.map((c, index)=>( <ListItemStyled key={c._id} index={index}  c={c} /> )) : <p className="text-center text-salte-400 font-bold text-lg mt-">Nothing related {searchTerm}</p>}
     </motion.div>
</>
  );
}
