import { useEffect, useState } from "react"
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
            {employees.map(employee => {
               return (


                  <div className="employee" key={`${employee.id}`}>
                     <div>
                        Name: {employee.fullName}
                     </div>
                     <div>
                        Email: {employee.email}
                     </div>
                  </div>

               )
            })}
         </div>
      </>
   )
}
