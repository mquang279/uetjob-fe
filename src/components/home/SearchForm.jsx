import { NavLink } from "react-router"
import { useJobsCount } from "../../hooks/job/useJobsCount"
import SearchBar from "../ui/search-bar"

const SKILL_SUGGESTIONS = [
    'Java',
    'ReactJS',
    '.NET',
    'Tester',
    'PHP',
    'Business Analysis',
    'NodeJS',
    'Team Management'
]

const SearchForm = () => {
    const { data: jobCount } = useJobsCount()

    return (
        <div className="search-form bg-[linear-gradient(90deg,rgba(20,20,20,1)_55%,rgba(110,21,25,1)_100%,rgba(0,212,255,1)_100%)] text-white w-full h-auto px-[160px] py-[64px]">
            <h1 className="text-3xl font-black">{jobCount} IT Jobs For "Chất" Developers</h1>

            <SearchBar />

            <div className="suggestion flex gap-8 w-full items-center">
                <p className="font-medium">Suggestions for you:</p>
                <div className="suggestion-field flex gap-2 flex-wrap">
                    {SKILL_SUGGESTIONS.map((skill, index) =>
                        <NavLink href="" className="py-[6px] px-[12px] font-semibold border bg-black border-[rgb(65,64,66)] rounded-3xl whitespace-nowrap hover:bg-[#414042]" key={index}>{skill}</NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchForm