import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
import { tickets } from "./tickets.css"


export const TicketList = ({ searchTerms }) => {

    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)

    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


    useEffect(() => {
        const searchedTickets = tickets.filter(ticket => {
            return ticket.description.toLowerCase().startsWith(searchTerms.toLowerCase())
        })
        setFiltered(searchedTickets)
    }, [searchTerms])

    const getAllTickets = () => {
        fetch(' http://localhost:8088/serviceTickets?_embed=employeeTickets')
            .then(response => response.json())
            .then((ticketArray) => {

                setTickets(ticketArray)
            })
    }

    useEffect(
        () => {
            getAllTickets()

            fetch(' http://localhost:8088/employees?_expand=user')
                .then(response => response.json())
                .then((data) => {

                    setEmployees(data)
                })
        }, []
    )
    useEffect(
        () => {
            if (emergency) { //the user has clicked the Emergency Tickets button so we only show Emergency Tickets
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else { //allows the user to click the Show All button and the ticket display will go back to the default state of all tickets
                setFiltered(tickets)
            }
        }, [emergency]
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }

        },
        [tickets]
    )
    useEffect(
        () => {
            if (openOnly) {

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
                        <button onClick={() => { setEmergency(true) }} >Emergency Tickets</button>
                        <button onClick={() => { setEmergency(false) }} >All Tickets</button>

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
                            return (
                                <div key={`ticket--${ticket.id}`} className="ticket">
                                    <Ticket
                                        getAllTickets={getAllTickets}
                                        honeyUserObject={honeyUserObject}
                                        ticket={ticket}
                                        employees={employees} />
                                </div>
                            )
                        }

                    )
                }
            </article>
        </>
    )
}


