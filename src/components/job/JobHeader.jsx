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
        <div className='location flex gap-2 items-center'>
            <Icon className='bg-red-500 px-1 py-1 rounded-2xl text-red-500 w-8 h-8 fill-white' />
            <div>
                <p className='text-sm'>{tag}</p>
                <p className='font-semibold'>{info}</p>
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
                <button className='flex items-center gap-2 basis-5/6 justify-center bg-red-600 text-white px-3 py-2 flex-1 rounded-md text-sm font-bold hover:bg-red-700'>
                    <Send className='w-4 h-4' />
                    <p>Ứng tuyển ngay</p>
                </button>
                <button
                    onClick={handleSaveJob}
                    className={`flex items-center gap-2 basis-1/6 justify-center px-3 py-2 rounded-md text-sm font-bold transition-colors border ${isSaved
                        ? 'bg-red-600 text-white border-red-600 hover:bg-red-700'
                        : 'bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                    <p>{isSaved ? 'Đã lưu' : 'Lưu tin'}</p>
                </button>
            </div>
        </div>
    )
}

export default JobHeader