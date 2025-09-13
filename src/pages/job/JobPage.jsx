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
        <div className="lg:grid lg:grid-cols-6 lg:gap-x-4 lg:px-30 
                            py-4 mx-2 flex flex-col gap-4 text-global-white">
            <JobHeader job={job} />
            <div className='col-span-2 row-span-2'>
                <CompanyInfo
                    company={company}
                    isLoading={companyLoading}
                    error={companyError}
                />
                <GeneralJobInfo job={job} />
            </div>
            <JobDescription job={job} />
        </div>
    )
}

export default JobPage