import { Link } from "react-router-dom"
import { elephantPost, fetchDelete } from "../ApiManager";

export const Ticket = ({ ticket, honeyUserObject, employees, getAllTickets }) => {

    let assignedEmployee = null;
    if (ticket.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticket.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)

    }


    const userEmployee = employees.find(employee => employee.userId === honeyUserObject.id)

    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticket.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish">Finish</button>
        } else {
            return ""
        }

    }
    const deleteButton = () => {
        if (!honeyUserObject.staff) {
            return <button onClick={() => {
                return fetchDelete(`http://localhost:8088/serviceTickets/${ticket.id}`)
                    .then(() => {
                        getAllTickets()
                    })

            }} className="ticket__finish">Delete</button>
        } else {
            return ""
        }

    }
    const closeTicket = () => {
        const copy = {
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            datteCompleted: new Date()
        }
        return elephantPost(`http://localhost:8088/serviceTickets/${ticket.id}`, copy, "PUT")
            .then(response => response.json())
            .then(getAllTickets)
    }
    const toBeOrNotToBeButton = () => {
        if (honeyUserObject.staff) {
            return <button
                onClick={() => {
                    elephantPost(`http://localhost:8088/employeeTickets`, {
                        employeeId: userEmployee.id,
                        serviceTicketId: ticket.id
                    }, "POST")
                        .then(response => response.json())
                        .then(() => {
                            getAllTickets()
                        })

                }}
            >Claim</button>
        } else {
            return ""
        }
    }

    return <>

        <section key={`ticket--${ticket.id}`} className="ticket">
            <header>
                {
                    (honeyUserObject.staff)
                        ? `Ticket ${ticket.id}`
                        : <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
                }
            </header>
            <section>{ticket.description}</section>
            <section>Emergency: {ticket.emergency ? "🧨" : "No"}</section>
            <footer>
                {
                    ticket.employeeTickets.length
                        ? `Currently being worked on ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                        : toBeOrNotToBeButton()
                }
                {
                    canClose()
                }
                {
                    deleteButton()
                }
            </footer>
        </section>
    </>
}