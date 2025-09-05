import { useState } from "react"
import { Search } from "lucide-react"
import Button from "./button"

const SearchBar = () => {
    const [inputValue, setInputValue] = useState('')

    return (
        <div className="search-input flex gap-4">
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
    )
}

export default SearchBar