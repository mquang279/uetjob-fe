import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useGetJobById } from '../../hooks/job/useGetJobById'
import SearchForm from '../../components/home/SearchForm'
import SearchBar from '../../components/ui/search-bar'
import { CircleDollarSign, MapPin, Hourglass, Clock, Heart, Send } from 'lucide-react';
import Button from '../../components/ui/button'

const JobPage = () => {
    const { id } = useParams()
    const { data: job, isLoading, error } = useGetJobById(id)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading job details...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.734-.833-2.464 0L3.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Job not found</h3>
                    <p className="text-gray-600 mb-4">
                        {error.message || 'The job you are looking for does not exist or has been removed.'}
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
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
            <div className='bg-[linear-gradient(90deg,rgba(20,20,20,1)_55%,rgba(110,21,25,1)_100%,rgba(0,212,255,1)_100%)] text-white w-full px-36 py-4'>
                <SearchBar />
            </div>
            <div className="grid grid-cols-4 grid-rows-3 gap-4 px-20 py-4 mx-2">
                <div className="col-span-3 h-50 py-4 px-9 bg-gray-300 rounded-md">
                    <div className="job-title text-2xl font-semibold">
                        {job.title}
                    </div>
                    <div className='job-info flex gap-30 justify-between my-2'>
                        <div className='salary flex gap-2 items-center'>
                            <CircleDollarSign className='bg-red-500 px-1 py-1 rounded-2xl text-white w-8 h-8' />
                            <div>
                                <p className='text-sm'>Thu nhập</p>
                                <div className='font-semibold'>
                                    {job.minSalary && job.maxSalary
                                        ? `$${job.minSalary.toLocaleString()} - $${job.maxSalary.toLocaleString()}`
                                        : job.minSalary || job.maxSalary
                                            ? `$${(job.minSalary || job.maxSalary).toLocaleString()}`
                                            : 'Thỏa thuận'
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='location flex gap-2 items-center'>
                            <MapPin className='bg-red-500 px-1 py-1 rounded-2xl text-white w-8 h-8' />
                            <div>
                                <p className='text-sm'>Địa điểm</p>
                                <p className='font-semibold'>{job.location}</p>
                            </div>
                        </div>
                        <div className='experience flex gap-2 items-center'>
                            <Hourglass className='bg-red-500 px-1 py-1 rounded-2xl text-white w-8 h-8' />
                            <div>
                                <p className='text-sm'>Kinh nghiệm</p>
                                <p className='font-semibold'>{job.level || 'Not specified'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="end-date bg-amber-300 inline-block px-3 py-0.5 mb-2 rounded-md">
                        {job.endDate && <p className='flex gap-2 items-center'> <Clock className='w-4 h-4' /> Hạn nộp hồ sơ: {new Date(job.endDate).toLocaleDateString('en-GB')}</p>}
                    </div>
                    <div className='flex gap-4'>
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
                <div className="bg-blue-500 rounded-md row-span-3">

                </div>
                <div className="col-span-3 row-span-2 bg-red-800">

                </div>
            </div>
        </div>
    )
}

export default JobPage