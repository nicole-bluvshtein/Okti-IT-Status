type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Search services…"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default SearchBar
