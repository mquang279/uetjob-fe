import JobCard from '../job/JobCard'
import { ConfigProvider, Pagination } from 'antd';
import { useState } from 'react';
import { useGetActiveJobs } from '../../hooks/job/useGetActiveJobs';
import { useActiveJobsCount } from '../../hooks/job/useActiveJobsCount';

const JobDisplay = () => {
    const pageSize = 9
    const { data: jobCount } = useActiveJobsCount()
    const [page, setPage] = useState(1)
    const { data, isLoading, error } = useGetActiveJobs({ page: page - 1, pageSize })
    const jobs = data?.content || []

    if (error) {
        return (
            <div className="job-display">
                <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.734-.833-2.464 0L3.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Unable to load jobs
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {error.message || 'Something went wrong while fetching jobs. Please try again.'}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (!isLoading && (!jobs || jobs.length === 0)) {
        return (
            <div className="job-display">
                <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8zM12 14l9-5-9-5-9 5 9 5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No jobs found
                        </h3>
                        <p className="text-gray-600">
                            We couldn't find any jobs matching your criteria. Try adjusting your search filters.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="job-display">
            <div className="container mx-auto text-global-white px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                {!isLoading && jobs.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">
                            Việc làm tốt nhất
                        </h2>
                    </div>
                )}

                {/* Jobs Grid - 3 columns, responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {!isLoading && jobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                        />
                    ))}
                </div>

                {!isLoading && jobCount > 9 && (
                    <div className='mt-4'>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: 'black',
                                },
                            }}
                        >
                            <Pagination
                                align="center"
                                current={page}
                                onChange={(newPage) => setPage(newPage)}
                                total={jobCount}
                                pageSize={pageSize}
                                showSizeChanger={false}
                            />
                        </ConfigProvider>
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobDisplay