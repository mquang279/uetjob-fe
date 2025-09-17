import { useEffect, useState } from "react"
import { Building2, Search } from "lucide-react"
import Button from "./button"
import { useSearchJob } from "../../hooks/job/useSearchJobs"
import { List, Skeleton } from 'antd';
import { NavLink } from 'react-router'
import CompanyLogo from "../company/CompanyLogo";
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState(0)
    const [jobs, setJobs] = useState([])

    const { data } = useSearchJob({
        page,
        pageSize: 5,
        keyword
    })

    useEffect(() => {
        if (data?.content) {
            if (page === 0) {
                setJobs(data.content)
            } else {
                setJobs(prevJobs => [...prevJobs, ...data.content])
            }
        }
    }, [data?.content, page])


    const formatSalary = (min, max) => {
        if (!min && !max) return "Thỏa thuận"
        if (min === max) return `$${min.toLocaleString()}`
        return `$${min?.toLocaleString() || 'N/A'} - $${max?.toLocaleString() || 'N/A'}`
    }

    return (
        <div className="search-input flex gap-4">
            <div className="flex-1 relative">
                <input
                    type="search"
                    placeholder="Enter keywork skill (Java, iOS,...), job title, company"
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value)
                        setPage(0)
                        setJobs([])
                    }}
                    className="bg-white text-black py-[11px] px-[16px] w-full rounded-md focus:outline-none"
                />
                {jobs && jobs.length !== 0 && <div className="absolute w-full bg-white rounded-lg px-4 mt-2 shadow-lg border z-50">
                    <InfiniteScroll
                        dataLength={jobs.length}
                        next={() => setPage(prev => prev + 1)}
                        hasMore={page < data?.totalPages - 1}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        height={400}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
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
                    </InfiniteScroll>
                </div>}
            </div>
            <button className="bg-white/10 text-white shadow-lg rounded-md flex font-bold items-center px-3 gap-4 md:px-10 lg:px-15">
                <Search />
                <p className="hidden md:flex">Search</p>
            </button>
        </div>
    )
}

export default SearchBar