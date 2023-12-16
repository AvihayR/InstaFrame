const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <div className="icon-container">
        <svg aria-label="Search" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" {...props}>
            <title>Search</title>
            <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511"
                x2="22" y1="16.511" y2="22"></line>
        </svg>
    </div>
)

export default SearchIcon