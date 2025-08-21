
import { Heart, Building2 } from 'lucide-react';
import { Tag, Button } from 'antd';
import { NavLink } from 'react-router';


const CardInfo = ({ children }) => {
    return (
        <span className="card-info text-xs py-1.5 px-1.5 rounded-2xl bg-gray-200">
            {children}
        </span>
    )
}

const JobCard = ({ job }) => {
    if (!job) return null

    const formatSalary = (min, max) => {
        if (!min && !max) return "Negotiable"
        if (min === max) return `$${min.toLocaleString()}`
        return `$${min?.toLocaleString() || 'N/A'} - $${max?.toLocaleString() || 'N/A'}`
    }

    const getDaysAgo = (dateString) => {
        if (!dateString) return "Recently"

        const posted = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - posted)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) return "Today"
        if (diffDays === 1) return "1 day ago"
        if (diffDays < 7) return `${diffDays} days ago`
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
        return `${Math.ceil(diffDays / 30)} months ago`
    }

    return (
        <NavLink to={`/jobs/${job.id}`} className="job-card bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className='px-3 py-3'>
                <div className="job-header flex gap-3 items-start">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                        {job.company?.logo ? (
                            <img
                                src={job.company.logo}
                                alt={`${job.company.name} logo`}
                                className="w-10 h-10 object-cover rounded-lg"
                            />
                        ) : (
                            <Building2 className="w-6 h-6 text-black" />
                        )}
                    </div>
                    <div className="job-name">
                        <p className='font-bold'>{job.title}</p>
                        <p className='text-sm text-gray-600'>{job.company.name}</p>
                    </div>
                </div>
                <div className="job-info mt-2 flex justify-between">
                    <div className="info flex gap-2">
                        <CardInfo>{formatSalary(job.minSalary, job.maxSalary)}</CardInfo>
                        <CardInfo>{job.location}</CardInfo>
                    </div>
                    <p className='text-sm text-gray-600'>{getDaysAgo(job.createdAt)}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default JobCard