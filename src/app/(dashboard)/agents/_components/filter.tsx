import useAgentFilter from "@/app/(dashboard)/agents/_hooks/use-filter"

import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

import ICONS from "@/consts/icons"
import { IAgentFilter } from "@/types/agent"

interface Props {
    filter?: IAgentFilter
}

export default function AgentFilter({filter}: Props) {
    const {currentFilter, handleChangeName, handleRefreshFilter, handleEnterSearchInput, isAppearRefreshButton} = useAgentFilter(filter)

    return (
        <div className="flex items-center gap-[5px] px-[3px] h-[42px] overflow-x-auto">
            <InputGroup className="w-fit min-w-[250px]">
                <InputGroupAddon>
                    <ICONS.SEARCH />
                </InputGroupAddon>

                <InputGroupInput
                    value={currentFilter.name}
                    onChange={handleChangeName}
                    onKeyDown={handleEnterSearchInput}
                    placeholder="Nhập tên agent . . ."
                />
            </InputGroup>

            {
                isAppearRefreshButton
                    && (
                        <Button
                            variant="outline"
                            onClick={handleRefreshFilter}
                        >
                            <ICONS.CHANGE />
                        </Button>
                    )
            }
        </div>
    )
}