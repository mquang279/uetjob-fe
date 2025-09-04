import { mapCandidateLevel, mapJobType } from '../../utils/enumMappings';
import { CircleDollarSign, MapPin, Hourglass, Clock, Heart, Send, Building2, Pin, Briefcase, Users, UserStar, BriefcaseBusiness } from 'lucide-react';

const GeneralJobInfo = ({ job }) => {
    return (
        <div className='bg-white rounded-md p-4 shadow-lg'>
            <div className='general-info'>
                <h1 className='font-bold text-xl'>Thông tin chung</h1>
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
            <div className="skills mt-4">
                <h1 className='font-bold text-xl'>Kỹ năng cần có</h1>
                <div className='skill-items flex flex-wrap gap-2 text-xs mt-1'>
                    {job.skills && job.skills.length > 0 ?
                        job.skills.map((skill, index) => {
                            console.log(skill);
                            return <span key={index} className='bg-gray-300 px-2 py-1 rounded-2xl whitespace-nowrap'>{skill.name}</span>;
                        }) :
                        <p>Không yêu cầu kỹ năng</p>
                    }
                </div>
            </div>
        </div >
    )
}

export default GeneralJobInfo