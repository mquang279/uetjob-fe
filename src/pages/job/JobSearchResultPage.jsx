import { useSearchParams } from 'react-router'
import SearchBar from '../../components/ui/search-bar'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useSearchJob } from '../../hooks/job/useSearchJobs'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import ErrorDisplay from '../../components/ui/ErrorDisplay'
import JobSearchItem from '../../components/job/JobSearchItem'
import { Pagination } from 'antd'

const JobSearchResultPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const pageSize = 10

    const keyword = searchParams.get('keyword') || ''

    const { data, isLoading, error } = useSearchJob({
        page: page - 1,
        pageSize,
        keyword
    })

    const jobs = data?.content || []
    const totalPages = data?.totalPages || 0
    const totalJobs = data?.totalElements || 0

    console.log(jobs)

    if (isLoading) {
        return <LoadingSpinner info={"Loading jobs..."} />
    }

    if (error) {
        return <ErrorDisplay info={"Error when loading job"} />
    }


    return (
        <div className='job-result-page mb-6'>
            <div className='search-bar relative'>
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
                    }}
                />
                <div className='px-50 py-3 relative z-10 2xl:px-80'>
                    <SearchBar />
                </div>
            </div>

            <div className='px-15 mt-3 mx-20 2xl:mx-60'>
                <div className='flex gap-8'>
                    <div className='min-h-200 bg-red-500 '>
                        <h2>Lọc nâng cao</h2>
                    </div>

                    <div className='min-h-200 flex-1'>
                        <h1 className='font-semibold text-gray-700'>Tuyển dụng {totalJobs} việc làm {keyword}</h1>
                        <h2 className='font-bold'>Kết quả tìm kiếm</h2>
                        <div className='flex flex-col gap-4 my-3'>
                            {jobs.map((job, index) => (
                                <JobSearchItem key={index} job={job} />
                            ))}
                        </div>
                        <Pagination
                            align="center"
                            current={page}
                            onChange={(newPage) => setPage(newPage)}
                            total={totalJobs}
                            pageSize={pageSize}
                            showSizeChanger={false}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default JobSearchResultPage