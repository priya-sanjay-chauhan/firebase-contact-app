import Navbar from "./components/Navbar"
import { FaSearch } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";

import AddAndUpdate from "./components/AddAndUpdate";
import ContactCard from "./components/ContactCard";
import useDisclose from "./hooks/useDisclose";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";


function App() {
  const [contacts, setContacts] = useState([]);

  const {isOpen,onOpen,onClose}=useDisclose()

  const filterContacts=(e)=>{
    const value=e.target.value;

    const contactsRef = collection(db, "contacts")
        // const contactSnapShot = await getDocs(contactsRef)

        // for page loading automatically
        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }
          )

          const filterContacts=contactLists.filter((contact)=> contact.name.toLowerCase().includes(value.toLowerCase()))
          setContacts(filterContacts)
          return filterContacts
        })
  }


  useEffect(() => {
    const getContacts = async () => {

      try {
        const contactsRef = collection(db, "contacts")
        // const contactSnapShot = await getDocs(contactsRef)

        // for page loading automatically
        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }
          )
          // console.log(contactLists)
          setContacts(contactLists)
          return contactLists
        })

      
      } catch (error) {
        console.log(error)
      }
    }
    getContacts()
  }, [])



  return (
    <>
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar />
      <div className="flex mb-2">
        <div className="relative flex flex-grow items-center">
          <FaSearch className="absolute ml-2 text-xl text-white" />
          <input onChange={filterContacts} className="h-10 flex-grow bg-transparent border border-white rounded-lg text-white pl-9" type="text" placeholder="Search Contact" />
        </div>
        <div className="flex">
          <AiFillPlusCircle className="text-5xl text-white cursor-pointer ml-2"  onClick={onOpen}/>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        { contacts.length <= 0 ? <NotFoundContact />
        : contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact}/>
        ))}
      </div>
    </div>
    <AddAndUpdate isOpen={isOpen} onClose={onClose}/>
    <ToastContainer position="bottom-center"/>
    </>
  )
}

export default App
