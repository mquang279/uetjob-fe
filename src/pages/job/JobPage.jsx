import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useGetJobById } from '../../hooks/job/useGetJobById'
import SearchBar from '../../components/ui/search-bar'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import ErrorDisplay from '../../components/ui/ErrorDisplay'
import { useGetCompanyById } from '../../hooks/company/useGetCompanyById'
import JobHeader from '../../components/job/JobHeader';
import JobDescription from '../../components/job/JobDescription';
import CompanyInfo from '../../components/job/CompanyInfo';
import GeneralJobInfo from '../../components/job/GeneralJobInfo'

const SearchHeader = () => {
    return (
        <div className='bg-[linear-gradient(90deg,rgba(20,20,20,1)_55%,rgba(110,21,25,1)_100%,rgba(0,212,255,1)_100%)] text-white w-full px-36 py-4'>
            <SearchBar />
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
                <GeneralJobInfo job={job} />
            </div>
        </div>
    )
}

export default JobPage