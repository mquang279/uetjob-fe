const CompanyLogo = ({ company }) => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg px-1">
            <img
                src={`http://localhost:9000/uetjob/company/${company.id}`}
                alt={`${company.name} logo`}
                className="flex items-center justify-center bg-gray-100 rounded-lg px-1"
            />
        </div>
    )
}

export default CompanyLogo