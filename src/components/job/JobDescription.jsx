
const JobDescription = ({ job }) => {
    return (
        <div className="col-span-3 row-span-2 py-4 px-9 bg-white shadow-lg rounded-md">
            <h1 className='font-bold text-xl'>Chi tiết tuyển dụng</h1>
            <p className='text-justify whitespace-break-spaces text-sm'>{job.description}</p>
        </div>
    )
}

export default JobDescription