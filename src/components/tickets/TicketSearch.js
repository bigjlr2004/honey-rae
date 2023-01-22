export const TicketSearch = ({ setSearchTerms }) => {
    return (
        <div>
            <input
                onChange={(event) => {
                    setSearchTerms(event.target.value)
                }}
                type="text"
                placeholder="Enter Search Terms" />
        </div>
    )
}