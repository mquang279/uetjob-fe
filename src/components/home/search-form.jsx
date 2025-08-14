import { useState } from "react"
import Button from "../ui/button"
import { Search } from "lucide-react"
import { NavLink } from "react-router"

const suggestions = [
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
    const [inputValue, setInputValue] = useState('')

    return (
        <div className="search-form bg-[linear-gradient(90deg,rgba(20,20,20,1)_55%,rgba(110,21,25,1)_100%,rgba(0,212,255,1)_100%)] text-white w-full h-auto px-[160px] py-[64px]">
            <h1 className="text-3xl font-black">IT Jobs For "Chất" Developers</h1>

            <div className="search-input flex gap-4 py-[32px]">
                <input
                    type="text"
                    placeholder="Enter keywork skill (Java, iOS,...), job title, company"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="bg-white text-black py-[11px] px-[16px] flex-1 min-w-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <Button variant="primary" size="medium">
                    <Search />
                    Search
                </Button>
            </div>

            <div className="suggestion flex gap-8 w-full items-center">
                <p className="font-medium">Suggestions for you:</p>
                <div className="suggestion-field flex gap-2 flex-wrap">
                    {suggestions.map((field, index) =>
                        <NavLink href="" className="py-[6px] px-[12px] font-semibold border bg-black border-[rgb(65,64,66)] rounded-3xl whitespace-nowrap hover:bg-[#414042]" key={index}>{field}</NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchForm