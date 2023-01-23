import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employee.css"
export const EmployeeList = () => {

   const [employees, setEmployees] = useState([])

   useEffect(
      () => {
         fetch('http://localhost:8088/users?isStaff=true')
            .then(response => response.json())
            .then((data) => {
               return setEmployees(data)
            })
      }, []
   )

   return (
      <>
         <div className="employees" >
            {employees.map(employee => <Employee
               key={`employee--${employee.id}`}
               id={employee.id}
               fullName={employee.fullName}
               email={employee.email} />)}
         </div>
      </>
   )
}
