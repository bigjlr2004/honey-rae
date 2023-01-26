import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { elephantPost, standardFetch } from "../ApiManager"

export const TicketEdit = () => {
    const { ticketId } = useParams()
    const navigate = useNavigate()

    const [ticket, updateTicket] = useState({
        description: "",
        emergency: ""
    })

    useEffect(
        () => {
            standardFetch(`http://localhost:8088/serviceTickets?id=${ticketId}`)
                .then((data) => {
                    const ticketObject = data[0]
                    updateTicket(ticketObject)
                })
        }, [])
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        elephantPost(`http://localhost:8088/serviceTickets/${ticketId}`, ticket, "PUT")
            .then(() => {
                setFeedback("Ticket Updated Back to Your Tickets")
            })
    }
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
            setTimeout(() => navigate("/tickets"), 1000)
        }
    }, [feedback])

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="ticketForm">
                <h2 className="ticketForm__title">Edit Service Ticket</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Brief description of problem"
                            value={ticket.description}
                            onChange={
                                (event) => {
                                    const copy = { ...ticket }
                                    copy.description = event.target.value
                                    updateTicket(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Emergency:</label>
                        <input type="checkbox"
                            value={ticket.emergency}
                            checked={ticket.emergency}
                            onChange={
                                (event) => {
                                    const copy = { ...ticket }
                                    copy.emergency = event.target.checked
                                    updateTicket(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Submit Ticket
                </button>
            </form>
        </>
    )
}