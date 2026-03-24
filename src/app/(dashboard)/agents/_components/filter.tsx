import useAgentFilter from "@/app/(dashboard)/agents/_hooks/use-filter";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

import ICONS from "@/consts/icons";
import { AgentFilterFields } from "@/types/agent";

interface Props {
    filter: AgentFilterFields
}

export default function AgentFilter({ filter: propFilter }: Props) {
    const { filter, handleChangeName, handleKeyDownFilter, isOpenRefreshButton, handleClickReset } = useAgentFilter(propFilter);

    return (
        <div className="flex items-center px-[3px] h-[42px] gap-[10px] overflow-x-auto">
            <InputGroup className="w-fit min-w-[250px]">
                <InputGroupInput
                    value={filter.name}
                    onChange={handleChangeName}
                    onKeyDown={handleKeyDownFilter}
                    placeholder="Nhập tên agent . . ."
                />

                <InputGroupAddon>
                    <ICONS.SEARCH />
                </InputGroupAddon>
            </InputGroup>

            {
                isOpenRefreshButton
                    && (
                        <Button
                            variant="outline"
                            onClick={handleClickReset}
                        >
                            <ICONS.UPDATE />
                            <span>Làm mới</span>
                        </Button>
                    )
            }
        </div>
    )
}
