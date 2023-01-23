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

