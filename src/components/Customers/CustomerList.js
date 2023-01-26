import { useState, useEffect } from "react"
import { standardFetch } from "../ApiManager"
import { Customer } from "./Customer"
import "./Customer.css"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            standardFetch("http://localhost:8088/users?isStaff=false")
                .then((data) => {
                    setCustomers(data)
                })
        }, [])

    return (
        <>
            <div className="customers" >
                {customers.map((customer) => <Customer
                    key={`customer--${customer.id}`}
                    id={customer.id}
                    fullName={customer.fullName}
                    email={customer.email} />)}
            </div>
        </>
    )
}

