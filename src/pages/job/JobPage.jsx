import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useGetJobById } from '../../hooks/job/useGetJobById'
import SearchBar from '../../components/ui/search-bar'
import { CircleDollarSign, MapPin, Hourglass, Clock, Heart, Send, Building2, Pin, Briefcase, Users, UserStar, BriefcaseBusiness } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import ErrorDisplay from '../../components/ui/ErrorDisplay'
import { useGetCompanyById } from '../../hooks/company/useGetCompanyById'
import { NavLink } from 'react-router';
import { mapCandidateLevel, mapJobType, mapJobLevel } from '../../utils/enumMappings';


const formatSalary = (minSalary, maxSalary) => {
    if (minSalary && maxSalary) {
        return `$${minSalary.toLocaleString()} - $${maxSalary.toLocaleString()}`
    } else if (minSalary || maxSalary) {
        return `$${(minSalary || maxSalary).toLocaleString()}`
    } else {
        return 'Thỏa thuận'
    }
}

const JobInfoItem = ({ tag, info, Icon }) => {
    return (
        <div className='location flex gap-2 items-center'>
            <Icon className='bg-red-500 px-1 py-1 rounded-2xl text-red-500 w-8 h-8 fill-white' />
            <div>
                <p className='text-sm'>{tag}</p>
                <p className='font-semibold'>{info}</p>
            </div>
        </div>
    )
}

const SearchHeader = () => {
    return (
        <div className='bg-[linear-gradient(90deg,rgba(20,20,20,1)_55%,rgba(110,21,25,1)_100%,rgba(0,212,255,1)_100%)] text-white w-full px-36 py-4'>
            <SearchBar />
        </div>
    )
}

const JobHeader = ({ job }) => {
    return (
        <div className="col-span-3 py-4 px-9 bg-white rounded-md shadow-lg">
            <div className="job-title text-2xl font-semibold">
                {job.title}
            </div>
            <div className='job-info flex gap-30 justify-between'>
                <JobInfoItem
                    tag='Thu nhập'
                    info={formatSalary(job.minSalary, job.maxSalary)}
                    Icon={CircleDollarSign}
                />
                <JobInfoItem
                    tag='Địa điểm'
                    info={job.location}
                    Icon={MapPin}
                />
                <JobInfoItem
                    tag='Kinh nghiệm'
                    info={mapJobLevel(job.level) || 'Không yêu cầu'}
                    Icon={Hourglass}
                />
            </div>
            <div className="end-date bg-gray-300 inline-block px-2 py-0.5 mb-2 rounded-md my-2">
                <p className='flex gap-2 items-center text-gray-800'>
                    <Clock className='w-4 h-4' />
                    {job.endDate ? `Hạn nộp hồ sơ: ${new Date(job.endDate).toLocaleDateString('en-GB')}` : 'Không thời hạn'}
                </p>
            </div>
            <div className='flex gap-4 mt-2'>
                <button className='flex items-center gap-2 justify-center bg-red-600 text-white px-3 py-2 flex-1 rounded-md text-sm font-bold hover:bg-red-700'>
                    <Send className='w-4 h-4' />
                    <p>Ứng tuyển ngay</p>
                </button>
                <button className='flex items-center gap-2 justify-center bg-white border-red-600 border px-3 py-2 rounded-md text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white'>
                    <Heart className='w-4 h-4' />
                    <p>Lưu tin</p>
                </button>
            </div>
        </div>
    )
}

const JobDescription = ({ job }) => {
    return (
        <div className="col-span-3 row-span-2 py-4 px-9 bg-white shadow-lg rounded-md">
            <h1 className='font-bold text-xl'>Chi tiết tuyển dụng</h1>
            <p className='text-justify'>{job.description}</p>
        </div>
    )
}

const CompanyInfo = ({ company, isLoading, error }) => {
    if (isLoading) {
        return (
            <LoadingSpinner info={'Loading company information...'} />
        )
    }

    if (error) {
        return (
            <ErrorDisplay error={error} />
        )
    }

    if (!company) {
        return (
            <div className="bg-white rounded-md row-span-3 p-4 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-sm text-gray-500">No company info available</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-md p-4 shadow-lg">
            <NavLink to={`/companies/${company.id}`} className="company-name flex gap-4 items-center">
                {company.logo ? (
                    <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                    />
                ) : (
                    <Building2 className="w-14 h-14 text-black flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                    <p
                        className='font-semibold text-md leading-tight'
                        style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal'
                        }}
                    >
                        {company.name}
                    </p>
                </div>
            </NavLink>
            <div className="company-info mt-3 text-sm grid grid-cols-3 gap-y-2">
                <p className='text-gray-700 whitespace-nowrap'> Lĩnh vực:</p>
                <span className='col-span-2'>Công nghệ</span>

                <p className='text-gray-700 whitespace-nowrap'>Quy mô:</p>
                <span className='col-span-2'>5000+ nhân viên</span>

                <p className='text-gray-700 whitespace-nowrap'>Địa điểm:</p>
                <span className='col-span-2'>{company.address}</span>
            </div>
        </div>
    )
}

const GeneralInfo = ({ job }) => {
    return (
        <div className='bg-white rounded-md p-4 shadow-lg'>
            <h1 className='font-bold'>Thông tin chung</h1>

            <div className="company-info mt-3 text-sm grid grid-cols-3 gap-y-4 gap-x-0">
                <UserStar className='bg-red-600 px-2 py-2 rounded-full text-white w-10 h-10' />
                <div className='col-span-2'>
                    <p className='text-gray-700'>Cấp bậc</p>
                    <p className='font-bold'>{mapCandidateLevel(job.candidateLevel) || 'Không yêu cầu'}</p>
                </div>

                <Users className='bg-red-600 px-2 py-2 rounded-full text-white w-10 h-10' />
                <div className='col-span-2'>
                    <p className='text-gray-700'>Số lượng tuyển</p>
                    <p className='font-bold'>{job.quantity} người</p>
                </div>

                <BriefcaseBusiness className='bg-red-600 px-2 py-2 rounded-full  text-white w-10 h-10' />
                <div className='col-span-2'>
                    <p className='text-gray-700'>Hình thức làm việc</p>
                    <p className='font-bold'>{mapJobType(job.jobType) || 'Không xác định'}</p>
                </div>
            </div>
        </div>
    )
}

const JobPage = () => {
    const { id } = useParams()
    const { data: job, isLoading: jobLoading, error: jobError } = useGetJobById(id)
    const { data: company, isLoading: companyLoading, error: companyError } = useGetCompanyById(job?.company?.id)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    if (jobLoading) {
        return (
            <LoadingSpinner info={'Loading job information...'} />
        )
    }

    if (jobError) {
        return (
            <ErrorDisplay error={jobError} />
        )
    }

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No job data available</h3>
                    <p className="text-gray-600">Unable to load job details.</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <SearchHeader />
            <div className="grid grid-cols-4 gap-y-6 gap-x-4 px-20 py-4 mx-2 bg-gray-100">
                <JobHeader job={job} />
                <CompanyInfo
                    company={company}
                    isLoading={companyLoading}
                    error={companyError}
                />
                <JobDescription job={job} />
                <GeneralInfo job={job} />
            </div>
        </div>
    )
}

export default JobPage