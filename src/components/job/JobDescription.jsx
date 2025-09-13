
const JobDescription = ({ job }) => {
    return (
        <div className="col-span-4 row-start-2 py-4 px-4 lg:px-9 bg-white rounded-lg shadow-2xl h-full">
            <h1 className='font-bold text-xl'>Chi tiết tuyển dụng</h1>
            <p className='text-justify whitespace-break-spaces text-sm'>{job.description}</p>
        </div>
    )
}

export default JobDescription