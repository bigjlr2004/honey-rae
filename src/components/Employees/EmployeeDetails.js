import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { standardFetch } from "../ApiManager"

export const EmployeeDetails = () => {
    const { employeeId } = useParams()
    const [employee, updateEmployee] = useState({})

    useEffect(
        () => {
            standardFetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
                .then((data) => {
                    const singleEmployee = data[0]
                    updateEmployee(singleEmployee)
                })


        }
        , [employeeId])


    return (
        <div className="employee">
            <div>
                <header className="employee_header">{employee?.user?.fullName}</header>
                <div>Email: {employee?.user?.email}</div>
                <div>Specialty: {employee.specialty}</div>
                <div>Money: {employee.rate}</div>
                <footer className="employee_footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>
            </div>

        </div>
    )
}