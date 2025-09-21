import { NavLink } from "react-router"
import SearchBar from "../ui/search-bar"
import CompanyLogo from "../company/CompanyLogo"
import { Heart } from "lucide-react"

const JobSearchItem = ({ job }) => {
    const formatSalary = (min, max) => {
        if (!min && !max) return "Thỏa thuận"
        if (min === max) return `$${min.toLocaleString()}`
        return `$${min?.toLocaleString() || 'N/A'} - $${max?.toLocaleString() || 'N/A'}`
    }

    const getDaysRemain = (dateString) => {
        const posted = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - posted)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) return 1
        if (diffDays === 1) return 1
        if (diffDays < 7) return diffDays
        if (diffDays < 30) return Math.ceil(diffDays / 7)
        return Math.ceil(diffDays / 30)
    }

    return (
        <NavLink to={`/jobs/${job.id}`} className="bg-white rounded-md">
            <div className="flex gap-4 py-4 px-4">
                <NavLink to={`/companies/${job.company.id}`} className="w-25 h-25 border border-gray-200 rounded-md">
                    {job.company ? (
                        <CompanyLogo company={job.company} />
                    ) : (
                        <Building2 className="w-6 h-6 text-black" />
                    )}
                </NavLink>
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex w-full justify-between">
                        <p className="font-semibold">{job.title}</p>
                        <p className="font-semibold text-green-600">{formatSalary(job.minSalary, job.maxSalary)}</p>
                    </div>
                    <NavLink to={`/companies/${job.company.id}`} className="text-gray-700 text-sm font-semibold">{job.company.name}</NavLink>
                    <span className="bg-gray-200 w-fit px-2 py-1 text-xs rounded-xl">{job.location}</span>
                    <hr className="text-gray-200" />
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            {job.skills.map((skill, index) => (
                                <span className="text-xs font-medium text-gray-600" key={index}>{skill.name}</span>
                            ))}
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="text-sm text-gray-600 font-bold">Còn {getDaysRemain(job.endDate)} ngày để ứng tuyển</p>
                            <button className='border-1 px-1 rounded-2xl hover:bg-red-100'>
                                <Heart className={`w-4`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default JobSearchItem