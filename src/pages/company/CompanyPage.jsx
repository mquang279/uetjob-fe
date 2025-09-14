import { Button } from "antd"
import { useParams } from "react-router"
import { useGetCompanyById } from "../../hooks/company/useGetCompanyById"
import LoadingSpinner from "../../components/ui/LoadingSpinner"
import { Building2, Globe, MapPin, Plus, Users } from "lucide-react"
import { Component } from "react"
import CompanyLogo from "../../components/company/CompanyLogo"

const ComponentHeader = ({ title }) => {
    return (
        <div className="bg-gray-900 py-2 px-4 text-white rounded-t-lg text-lg font-semibold">
            {title}
        </div>
    )
}

const CompanyPage = () => {
    const { id } = useParams()
    const { data: company, isLoading, error } = useGetCompanyById(id)

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

    return (
        <div className="company-page">
            <div className="lg:px-20 flex flex-col lg:flex-row justify-between py-10 items-center px-10 gap-5 lg:gap-20 w-full relative">
                {/* Azure Depths Background */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
                    }}
                />
                <div className="company-logo h-30 w-30 lg:h-45 lg:w-45 bg-black relative z-10">
                    <CompanyLogo company={company} />
                </div>

                <div className="company-info text-white flex flex-col lg:flex-1 items-center lg:items-start justify-center relative z-10">
                    <div className="text-2xl font-bold">{company.name}</div>
                    <div className="flex-col flex items-center lg:items-start gap-4 py-3">
                        <div className="flex gap-3">
                            <Globe />
                            tuyendung.viettel.vn
                        </div>
                        <div className="flex gap-3">
                            <Building2 />
                            5000+ nhân viên
                        </div>
                        <div className="flex gap-3">
                            <Users />
                            4587 người theo dõi
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 relative z-10">
                    <button className="px-3 py-3 bg-gray-900 rounded-lg border text-white font-semibold">
                        Theo dõi công ty
                    </button>
                    <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold">
                        Đánh giá
                    </button>
                </div>
            </div>

            <div className="lg:grid lg:grid-cols-6 gap-8 mx-4 lg:mx-15 mt-6">
                <div className="lg:col-span-4">
                    <div className="company-desc rounded-lg shadow-lg mb-8">
                        <ComponentHeader title="Giới thiệu công ty" />
                        <div className="p-4 rounded-b-lg bg-white text-gray-900 whitespace-break-spaces text-sm">{company.description}</div>
                    </div>
                    <div className="jobs min-h-40">
                        <ComponentHeader title="Tuyển dụng" />
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <ComponentHeader title="Thông tin liên hệ" />
                    <div className="company-location bg-white text-gray-900 px-3 py-2 rounded-b-lg">
                        <p className="font-semibold flex gap-1 mb-1">
                            <MapPin />
                            Địa chỉ công ty
                        </p>
                        <p className="text-sm">{company.address}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CompanyPage