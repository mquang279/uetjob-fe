import { useState, useEffect } from "react"
import { Building2, Search } from "lucide-react"
import Button from "./button"
import { useSearchJob } from "../../hooks/job/useSearchJobs"
import { List } from 'antd';
import { NavLink } from 'react-router'
import CompanyLogo from "../company/CompanyLogo";

const SearchBar = () => {
    const [keyword, setKeyword] = useState('')

    const { data } = useSearchJob({
        page: 0,
        pageSize: 9,
        keyword
    })

    const formatSalary = (min, max) => {
        if (!min && !max) return "Thỏa thuận"
        if (min === max) return `$${min.toLocaleString()}`
        return `$${min?.toLocaleString() || 'N/A'} - $${max?.toLocaleString() || 'N/A'}`
    }

    const jobs = data?.content

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className="search-input flex gap-4">
            <div className="flex-1 relative">
                <input
                    type="search"
                    placeholder="Enter keywork skill (Java, iOS,...), job title, company"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="bg-white text-black py-[11px] px-[16px] w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                {jobs && <div className="absolute w-full bg-white rounded-lg px-4 mt-2 shadow-lg border z-50">
                    <List
                        itemLayout="horizontal"
                        dataSource={jobs}
                        renderItem={(item, index) => (
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12">
                                    <CompanyLogo company={item.company} />
                                </div>
                                <List.Item key={index} className="flex-1">
                                    <List.Item.Meta
                                        title={<NavLink to={`/jobs/${item.id}`} className='text-md font-bold text-base'>{item.title}</NavLink>}
                                        description={
                                            <div>
                                                <p>{item?.company.name}</p>
                                                <p className="text-green-600 text-xs font-bold">{formatSalary(item.minSalary, item.maxSalary)}</p>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            </div>
                        )}
                    />
                </div>}
            </div>
            <Button variant="primary" size="medium">
                <Search />
                Search
            </Button>
        </div>
    )
}

export default SearchBar