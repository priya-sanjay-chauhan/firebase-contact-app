import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import { TbEditCircle } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import AddAndUpdate from './AddAndUpdate';
import useDisclose from '../hooks/useDisclose';
import { toast } from 'react-toastify';

const ContactCard = ({ contact }) => {
  const {isOpen,onClose,onOpen}=useDisclose()

  const deleteBtn = async (id) => {
    try {
      // setContacts(contact.filter((contact)=> contact.id!==id))
      await deleteDoc(doc(db, "contacts", id))
      
      toast.success("Contact deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <div key={contact.id} className="flex h-[64px] justify-between bg-yellow items-center p-2 border rounded-lg">
      <div className="flex gap-2">
        <PiUserCircle className="text-orange text-4xl" />
        <div className="">
          <h2 className="font-bold">{contact.name}</h2>
          <p>{contact.email}</p>
        </div>
      </div>
      <div className="flex gap-[6px]">

        <TbEditCircle onClick={onOpen} className="text-3xl cursor-pointer" title="Edit" />
        <MdDelete onClick={() => deleteBtn(contact.id)} className="text-3xl cursor-pointer" title="delete" />
      </div>
    </div>
    <AddAndUpdate contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
  )
}

export default ContactCard