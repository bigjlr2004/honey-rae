export const Employee = ({ id, fullName, email }) => {
    return (


        <div className="employee">
            <div>
                Name: {fullName}
            </div>
            <div>
                Email: {email}
            </div>
        </div>

    )

}