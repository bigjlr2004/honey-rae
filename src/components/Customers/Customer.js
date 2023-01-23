import { Link } from "react-router-dom"

export const Customer = ({ id, fullName, email }) => {
    return (
        <div className="customer">
            <div>
                <Link to={`/customers/${id}`}>Customer Name: {fullName}</Link>
            </div>
            <div>
                Customer Email: {email}
            </div>
        </div>

    )

}