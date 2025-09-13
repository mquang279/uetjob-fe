import { CircleDollarSign, MapPin, Hourglass, Clock, Heart, Send, Building2, Pin, Briefcase, Users, UserStar, BriefcaseBusiness } from 'lucide-react';
import { mapJobLevel } from '../../utils/enumMappings';
import { useState } from 'react';

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
        <div className='location flex flex-col justify-center items-center gap-2 lg:flex-row'>
            <Icon className='bg-gray-900 fill-transparent px-1.5 py-1.5 rounded-2xl text-white w-8 h-8' />
            <div>
                <p className='lg:text-sm text-nowrap text-center lg:text-left'>{tag}</p>
                <p className='font-semibold text-nowrap text-center lg:text-left'>{info}</p>
            </div>
        </div>
    )
}

const JobHeader = ({ job }) => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveJob = () => {
        setIsSaved(!isSaved);
    };

    return (
        <div className="col-span-4 py-4 px-4 lg:px-9 lg:py-9 bg-white rounded-lg shadow-md h-fit">
            <div className="job-title text-2xl font-semibold">
                {job.title}
            </div>
            <div className='job-info text-xs lg:text-sm flex lg:gap-10 mt-4 justify-between lg:my-6'>
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
            <div className="end-date bg-gray-300 inline-block px-2 py-0.5 mb-2 rounded-md my-2 lg:my-2">
                <p className='flex gap-2 items-center text-sm'>
                    <Clock className='w-4 h-4' />
                    {job.endDate ? `Hạn nộp hồ sơ: ${new Date(job.endDate).toLocaleDateString('en-GB')}` : 'Không thời hạn'}
                </p>
            </div>
            <div className='flex gap-4 mt-2'>
                <button className='flex py-3 items-center gap-2 basis-5/6 justify-center bg-gray-900 text-white px-3 lg:py-2 flex-1 rounded-md text-sm font-bold hover:bg-gray-800'>
                    <Send className='w-4 h-4' />
                    <p>Ứng tuyển ngay</p>
                </button>
                <button
                    onClick={handleSaveJob}
                    className={`flex items-center gap-2 basis-1/6 justify-center px-3 py-2 rounded-md text-sm font-bold transition-colors ${isSaved
                        ? 'bg-gray-900 text-white ring ring-gray-900 hover:bg-gray-800'
                        : 'bg-white text-gray-900 ring ring-gray-900 hover:bg-gray-900 hover:text-white'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                    <p className='hidden lg:flex'>{isSaved ? 'Đã lưu' : 'Lưu tin'}</p>
                </button>
            </div>
        </div>
    )
}

export default JobHeader