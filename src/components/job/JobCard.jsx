import { Heart, Building2 } from 'lucide-react';
import { NavLink } from 'react-router';
import { useState } from 'react';
import CompanyLogo from '../company/CompanyLogo';


const CardInfo = ({ children }) => {
    return (
        <span className="card-info text-xs py-1.5 px-1.5 rounded-2xl bg-gray-200">
            {children}
        </span>
    )
}

const JobCard = ({ job }) => {
    const [like, setLike] = useState(false)

    if (!job) return null

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
        <div className="job-card bg-white rounded-lg inset-shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className='px-3 py-3'>
                <div className="job-header flex gap-3 items-start">
                    <NavLink to={`/jobs/${job.id}`} className="w-12 h-12">
                        {job.company ? (
                            <CompanyLogo company={job.company} />
                        ) : (
                            <Building2 className="w-6 h-6 text-black" />
                        )}
                    </NavLink>
                    <div className="job-name flex-1 flex flex-col min-w-0">
                        <NavLink to={`/jobs/${job.id}`} className='font-bold truncate' title={job.title}>{job.title}</NavLink>
                        <NavLink to={`/companies/${job.company.id}`} className='text-sm text-gray-600 truncate' title={job.company.name}>{job.company.name}</NavLink>
                    </div>
                    <button className='border-1 px-1 rounded-2xl text-red-500 hover:bg-red-100' onClick={() => setLike(!like)}>
                        <Heart className={`w-4 ${like ? 'fill-red-500' : ''}`} />
                    </button>
                </div>
                <div className="job-info mt-2 flex justify-between items-center">
                    <div className="info flex gap-2">
                        <CardInfo>{formatSalary(job.minSalary, job.maxSalary)}</CardInfo>
                        <CardInfo>{job.location}</CardInfo>
                    </div>
                    <CardInfo>
                        {job.endDate ?
                            <>Còn <span className="font-bold">{getDaysRemain(job.endDate)}</span> ngày để ứng tuyển</>
                            : <>Vô thời hạn</>}
                    </CardInfo>
                </div>
            </div>
        </div >
    )
}

export default JobCard