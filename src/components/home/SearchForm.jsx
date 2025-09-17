import { NavLink } from "react-router"
import SearchBar from "../ui/search-bar"
import { useActiveJobsCount } from "../../hooks/job/useActiveJobsCount"

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
    const { data: jobCount } = useActiveJobsCount()

    return (
        <div className="search-form w-full relative">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
                }}
            />
            <div className=" text-white w-full h-auto px-4 md:px-20 lg:px-60 py-16 2xl:py-32 2xl:px-90 relative z-10">
                <h1 className="text-2xl lg:text-3xl font-black">{jobCount} IT Jobs For
                    <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"> "Chất" </span> Developers</h1>
                <div className="py-4">
                    <SearchBar />
                </div>
                <div className="suggestion lg:flex gap-8 w-full items-center">
                    <p className="font-medium mb-4 lg:mb-0">Suggestions for you:</p>
                    <div className="suggestion-field flex gap-2 flex-wrap">
                        {SKILL_SUGGESTIONS.map((skill, index) =>
                            <NavLink href="" className="py-[6px] px-[12px] font-semibold border bg-white/5 shadow-lg border-[rgb(65,64,66)] rounded-3xl whitespace-nowrap hover:bg-gray-900 hover:text-white" key={index}>{skill}</NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchForm