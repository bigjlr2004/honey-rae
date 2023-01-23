import { Link } from "react-router-dom"

export const Employee = ({ id, fullName, email }) => {
    return (


        <div className="employee">
            <div>
                <Link to={`/employees/${id}`}>Name: {fullName}</Link>
            </div>
            <div>
                Email: {email}
            </div>
        </div>

    )

}