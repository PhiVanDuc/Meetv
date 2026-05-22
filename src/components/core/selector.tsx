"use client"

import useSelector from "@/hooks/use-selector"

import { Button } from "@/components/ui/button"
import { SkeletonSelectorOptions } from "@/components/core/skeleton"
import { CommandDialog, Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"

interface Props {
    value?: string,
    options: Option[],
    isPending?: boolean,
    selectPlaceholder?: string,
    searchPlaceholder?: string,
    paginatePlaceholder?: string,
    onSelect: (value: string) => void,
    onSearch?: (value: string) => void,
    renderOption: (option: Option) => React.ReactNode,
    renderSelectedOption: (option: Option) => React.ReactNode
}

export default function Selector({options, value, renderSelectedOption, renderOption, isPending, selectPlaceholder, searchPlaceholder, paginatePlaceholder, onSearch, onSelect, ...props}: Props) {
    const {isOpenDialog, setIsOpenDialog, handleOpenDialog, searchValue, setSearchValue, selectedOption, handleSelectOption} = useSelector({options, value, onSearch, onSelect})

    return (
        <>
            <Button
                {...props}
                type="button"
                variant="outline"
                onClick={handleOpenDialog}
            >
                {
                    selectedOption
                        ? renderSelectedOption(selectedOption)
                        : <span className="flex-1 text-[14px] text-muted-foreground text-left font-normal">{selectPlaceholder || "Lựa chọn các mục."}</span>
                }
            </Button>

            <CommandDialog
                open={isOpenDialog}
                onOpenChange={setIsOpenDialog}
            >
                <Command shouldFilter={!Boolean(onSearch)}>
                    <CommandInput
                        value={searchValue}
                        onValueChange={setSearchValue}
                        placeholder={searchPlaceholder || "Nhập để tìm kiếm . . ."}
                    />

                    <CommandList>
                        <CommandGroup
                            heading="Agents"
                            className="**:[[cmdk-group-items]]:space-y-[5px]"
                        >
                            {
                                options.map(option => {
                                    return (
                                        <CommandItem
                                            key={option.id}
                                            disabled={isPending}
                                            onSelect={() => handleSelectOption(option)}
                                        >
                                            {renderOption(option)}
                                        </CommandItem>
                                    )
                                })
                            }

                            {
                                isPending
                                    ? <SkeletonSelectorOptions />
                                    : <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    )
}