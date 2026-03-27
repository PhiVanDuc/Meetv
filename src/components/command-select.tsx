"use client"

import useCommandSelect from "@/hooks/use-command-select";

import Skeleton from "./skeleton";
import { Button } from "./ui/button";
import { Command, CommandDialog, CommandInput, CommandSeparator, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut } from "@/components/ui/command";

import { cn } from "@/libs/utils";
import ICONS from "@/consts/icons";

interface Props {
    value: string,
    options: Option[],
    className?: string,
    isPending?: boolean,
    selectPlaceholder?: string,
    searchPlaceholder?: string,
    paginatePlaceholder?: string,
    onSelect?: (value: string) => void,
    onSearch?: (value: string) => void,
    onPaginate?: (value: string) => void,
    pagination?: Omit<Pagination, "limit">
}

export default function CommandSelect({ options, value, pagination, isPending, selectPlaceholder, searchPlaceholder, paginatePlaceholder, className, onSelect, onSearch, onPaginate, ...props }: Props) {
    const { isOpenDialog, setIsOpenDialog, searchValue, setSearchValue, selectedOption, parsedPage, parsedTotalPages, handleSelectOption } = useCommandSelect({ options, value, pagination, onSearch, onSelect });

    return (
        <>
            <Button
                {...props}
                type="button"
                variant="outline"
                onClick={() => setIsOpenDialog(true)}
                className={cn(
                    "justify-between w-full font-normal text-muted-foreground hover:text-muted-foreground",
                    className
                )}
            >
                {
                    selectedOption
                        ? selectedOption.children
                        : <span>{selectPlaceholder || "Lựa chọn các mục."}</span>
                }
                
                <ICONS.SELECT className="shrink-0" />
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

                    <CommandSeparator alwaysRender />

                    <CommandList>
                        <CommandGroup>
                            {
                                options.map((option, index) => (
                                    <CommandItem
                                        key={option.id}
                                        disabled={isPending}
                                        onSelect={() => handleSelectOption(option)}
                                        className={cn(
                                            option.value === value && "bg-zinc-100!",
                                            index < options.length - 1 && "mb-[5px]"
                                        )}
                                    >
                                        {option.children}
                                    </CommandItem>
                                ))
                            }

                            {
                                isPending
                                    ? (
                                        <Skeleton>
                                            <Skeleton.FormControl className="space-y-[5px]">
                                                <Skeleton.Input className="h-[40px]" />
                                                <Skeleton.Input className="h-[40px]" />
                                                <Skeleton.Input className="h-[40px]" />
                                            </Skeleton.FormControl>
                                        </Skeleton>
                                    )
                                    : <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
                            }
                        </CommandGroup>
                    </CommandList>

                    {
                        (!isPending && pagination && parsedPage < parsedTotalPages)
                            && (
                                <>
                                    <CommandSeparator alwaysRender />

                                    <div className="p-[10px]">
                                        <Button
                                            variant="outline"
                                            onClick={() => onPaginate?.(`${parsedPage + 1}`)}
                                            className="w-full text-muted-foreground hover:text-zinc-800 font-normal"
                                        >
                                            <ICONS.UPDATE />

                                            {
                                                paginatePlaceholder
                                                    ? paginatePlaceholder
                                                    : "Xem thêm danh sách"
                                            }
                                        </Button>
                                    </div>
                                </>
                            )
                    }
                </Command>
            </CommandDialog>
        </>
    )
}