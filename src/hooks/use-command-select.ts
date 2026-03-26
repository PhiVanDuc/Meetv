"use client"

import { useEffect, useMemo, useRef, useState } from "react";

import parseInteger from "@/utils/parse-integer";

interface Parameters {
    value: string,
    options: Option[],
    onSelect?: (value: string) => void,
    onSearch?: (value: string) => void,
    pagination?: Omit<Pagination, "limit">
}

export default function useCommandSelect({ options, value, pagination, onSearch, onSelect }: Parameters) {
    const onSearchRef = useRef(onSearch);

    const [searchValue, setSearchValue] = useState("");
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const parsedPage = parseInteger(pagination?.page);
    const parsedTotalPages = parseInteger(pagination?.totalPages);

    const selectedOption = useMemo(
        () => options.find(option => option.value === value),
        [options, value]
    );

    useEffect(() => {
        onSearchRef.current = onSearch;
    }, [onSearch]);

    useEffect(() => {
        const debounceSearchValue = setTimeout(() => onSearchRef.current?.(searchValue), 500);
        return () => clearTimeout(debounceSearchValue);
    }, [searchValue]);

    const handleSelectOption = (option: Option) => {
        if (option.value === value) onSelect?.("");
        else onSelect?.(option.value);
        setIsOpenDialog(false);
    }

    return { isOpenDialog, setIsOpenDialog, searchValue, setSearchValue, selectedOption, parsedPage, parsedTotalPages, handleSelectOption }
}