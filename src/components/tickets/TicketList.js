import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {tickets} from "./tickets.css"
export const TicketList = () => {
    
const [tickets, setTickets] = useState([])
const [filteredTickets, setFiltered] = useState([])
const [emergency, setEmergency] = useState(false)
const [openOnly,  updateOpenOnly] = useState(false)

const navigate = useNavigate()

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
        if(emergency) { //the user has clicked the Emergency Tickets button so we only show Emergency Tickets
            const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
            setFiltered(emergencyTickets)
        }
        else { //allows the user to click the Show All button and the ticket display will go back to the default state of all tickets
            setFiltered(tickets)
        }
    }, [emergency]
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
useEffect (
    () => {
        if(openOnly) {

            const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
        } else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
        }

    },
    [openOnly]

)



    return (
    <>
        {
            honeyUserObject.staff ? //if  honeyUserObject has a staff property set to true display the button
            <>
                <button onClick={ () => {setEmergency(true) } } >Emergency Tickets</button>
                <button onClick={ () => {setEmergency(false) } } >All Tickets</button>
            </>
               
               
            : <>
                <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
                <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
            </> 
        }
        
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


