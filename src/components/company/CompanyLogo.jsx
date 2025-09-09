const CompanyLogo = ({ company }) => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg px-1">
            <img
                src={`http://localhost:8080/uploads/company/${company.id}.png`}
                alt={`${company.name} logo`}
                className="flex items-center justify-center bg-gray-100 rounded-lg px-1"
            />
        </div>
    )
}

export default CompanyLogo