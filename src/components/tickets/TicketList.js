import { useEffect, useState } from "react"
import {tickets} from "./tickets.css"
export const TicketList = () => {
    
const [tickets, setTickets] = useState([])
const [filteredTickets, setFiltered] = useState([])

const localHoneyUser = localStorage.getItem("honey_user")
const honeyUserObject = JSON.parse(localHoneyUser)

useEffect(
    () => {
       fetch(' http://localhost:8088/serviceTickets')
       .then(response=> response.json())
       .then((ticketArray) =>{

           setTickets(ticketArray)
       })
    }, []
)
useEffect (
    () => {
        if(honeyUserObject.staff) {
            setFiltered(tickets)
        } else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        }

    },
    [tickets]
)



    return (
    <>
        <h2>List of Tickets</h2>
        
        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => {
                        return <section key={ticket.id} className="ticket">
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "❕ " : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
    )
}

