import { useState, useMemo, useEffect } from "react"
import { useDebounce } from "use-debounce"

interface Parameters {
    value?: string,
    options: Option[],
    onSelect?: (value: string) => void,
    onSearch?: (value: string) => void
}

export default function useSelector({options, value, onSearch, onSelect}: Parameters) {
    const [searchValue, setSearchValue] = useState("")
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [searchValueDebounce] = useDebounce(searchValue, 500)

    useEffect(() => {
        if (onSearch) onSearch(searchValueDebounce)
    }, [searchValueDebounce, onSearch])

    const selectedOption = useMemo(
        () => options.find(option => option.value === value),
        [options, value]
    )

    const handleOpenDialog = () => setIsOpenDialog(true)

    const handleSelectOption = (option: Option) => {
        if (onSelect) {
            if (option.value === value) onSelect("")
            else onSelect(option.value)
        }

        setIsOpenDialog(false)
    }

    return {isOpenDialog, setIsOpenDialog, handleOpenDialog, searchValue, setSearchValue, selectedOption, handleSelectOption}
}