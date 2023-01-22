import { useState, useEffect } from "react"
import { TicketSearch } from "./TicketSearch"
import { TicketList } from "./TicketList"

export const TicketContainer = () => {
   const [searchTerms, setSearchTerms] = useState("")

   return (
      <>
         <TicketSearch setSearchTerms={setSearchTerms} />
         <TicketList searchTerms={searchTerms} />
      </>
   )

}