import { NavLink } from 'react-router';
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import ErrorDisplay from '../../components/ui/ErrorDisplay'
import { CircleDollarSign, MapPin, Hourglass, Clock, Heart, Send, Building2, Pin, Briefcase, Users, UserStar, BriefcaseBusiness } from 'lucide-react';
import CompanyLogo from '../company/CompanyLogo';

const CompanyInfo = ({ company, isLoading, error }) => {
    if (isLoading) {
        return (
            <LoadingSpinner info={'Loading company information...'} />
        )
    }

    if (error) {
        return (
            <ErrorDisplay error={error} />
        )
    }

    if (!company) {
        return (
            <div className="bg-white rounded-md row-span-3 p-4 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-sm text-gray-500">No company info available</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-md p-4 shadow-lg h-fit">
            <NavLink to={`/companies/${company.id}`} className="company-name flex gap-4 items-center">
                {company ? (
                    <div className='w-20 h-20'>
                        <CompanyLogo company={company} />
                    </div>
                ) : (
                    <Building2 className="w-14 h-14 text-black flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                    <p
                        className='font-semibold text-md leading-tight'
                        style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal'
                        }}
                    >
                        {company.name}
                    </p>
                </div>
            </NavLink>
            <div className="company-info mt-3 text-sm grid grid-cols-3 gap-y-2">
                <p className='text-gray-700 whitespace-nowrap'> Lĩnh vực:</p>
                <span className='col-span-2'>Công nghệ</span>

                <p className='text-gray-700 whitespace-nowrap'>Quy mô:</p>
                <span className='col-span-2'>5000+ nhân viên</span>

                <p className='text-gray-700 whitespace-nowrap'>Địa điểm:</p>
                <span className='col-span-2'>{company.address}</span>
            </div>
        </div>
    )
}

export default CompanyInfo