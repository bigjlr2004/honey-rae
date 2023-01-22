import { Outlet, Route, Routes } from "react-router-dom";
import { TicketContainer } from "../tickets/TicketContainer";
import { TicketForm } from "../tickets/TicketForm";
import { CustomerViews } from "./CustomerViews";
import { EmployeeViews } from "./EmployeeViews";

const localHoneyUser = localStorage.getItem("honey_user")
const honeyUserObject = JSON.parse(localHoneyUser);

export const ApplicationViews = () => {
	if (honeyUserObject.staff) {
		//return EmployeeViews
		return <EmployeeViews />
	} else {

		//Return CustomerViews	
		return <CustomerViews />

	}
}

