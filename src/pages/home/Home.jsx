import JobDisplay from "../../components/home/JobDisplay"
import SearchForm from "../../components/home/SearchForm"

const HomePage = () => {

    return (
        <div className="home-page">
            <SearchForm />
            <JobDisplay />
        </div>
    )
}

export default HomePage