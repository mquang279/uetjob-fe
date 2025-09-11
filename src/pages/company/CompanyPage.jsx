import { Button } from "antd"
import { useParams } from "react-router"
import { useGetCompanyById } from "../../hooks/company/useGetCompanyById"
import LoadingSpinner from "../../components/ui/LoadingSpinner"
import { Building2, Globe, MapPin, Plus, Users } from "lucide-react"
import { Component } from "react"
import CompanyLogo from "../../components/company/CompanyLogo"

const ComponentHeader = ({ title }) => {
    return (
        <div className="bg-[linear-gradient(90deg,rgba(20,20,20,1)_55%,rgba(110,21,25,1)_100%,rgba(0,212,255,1)_100%)] py-2 px-4 text-white rounded-t-lg text-lg font-semibold">
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
        <div className="company-page my-4">
            <div className="mx-20 grid min-h-20 grid-cols-3 gap-y-6 gap-x-6">
                <div className="col-span-full bg-[linear-gradient(90deg,rgba(20,20,20,1)_55%,rgba(110,21,25,1)_100%,rgba(0,212,255,1)_100%)] min-h-20 rounded-lg flex justify-between py-10 items-center px-10 gap-20">
                    <div className="company-logo h-20 w-20 lg:h-35 lg:w-35 bg-black">
                        <CompanyLogo company={company} />
                    </div>

                    <div className="company-info text-white flex-1">
                        <div className="text-2xl font-bold">{company.name}</div>
                        <div className="flex gap-4 py-3">
                            <div className="flex gap-2">
                                <Globe />
                                tuyendung.viettel.vn
                            </div>
                            <div className="flex gap-2">
                                <Building2 />
                                5000+ nhân viên
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Users />
                            4587 người theo dõi
                        </div>
                    </div>

                    <Button>
                        <Plus className="w-4 h-4" /> Theo dõi công ty
                    </Button>
                </div>

                <div className="col-span-2 min-h-20">
                    <div className="company-desc min-h-30 rounded-lg shadow-lg mb-8">
                        <ComponentHeader title="Giới thiệu công ty" />
                        <div className="p-4 whitespace-break-spaces text-sm">{company.description}</div>
                    </div>

                    <div className="jobs  min-h-40">
                        <ComponentHeader title="Tuyển dụng" />

                    </div>
                </div>

                <div className="col-span-1 rounded-lg shadow-lg h-fit">
                    <ComponentHeader title="Thông tin liên hệ" />
                    <div className="company-location px-3 py-2">
                        <p className="font-semibold flex gap-1 mb-1">
                            <MapPin />
                            Địa chỉ công ty
                        </p>
                        <p className="text-gray-700 text-sm">{company.address}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyPage