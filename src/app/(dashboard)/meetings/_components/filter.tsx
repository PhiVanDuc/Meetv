import useMeetingFilter from "@/app/(dashboard)/meetings/_hooks/use-filter";

import { Button } from "@/components/ui/button";
import CommandSelect from "@/components/command-select";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";

import ICONS from "@/consts/icons";
import { MeetingFilterFields } from "@/types/meeting";

interface Props {
    filter: MeetingFilterFields
}

export default function MeetingFilter({ filter: propFilter }: Props) {
    const { filter, meetingStatusOptions, handleChangeName, handleKeyDownName, handleSelectStatus, handleClickReset, isOpenRefreshButton } = useMeetingFilter(propFilter);

    return (
        <div className="flex items-center px-[3px] h-[42px] gap-[10px] overflow-x-auto">
            <InputGroup className="w-fit min-w-[250px]">
                <InputGroupAddon>
                    <ICONS.SEARCH />
                </InputGroupAddon>

                <InputGroupInput
                    value={filter.name}
                    onChange={handleChangeName}
                    onKeyDown={handleKeyDownName}
                    placeholder="Nhập tên cuộc họp . . ."
                />
            </InputGroup>

            <CommandSelect
                className="w-fit"
                value={filter.status}
                selectPlaceholder="Trạng thái"
                options={meetingStatusOptions}
                onSelect={value => handleSelectStatus(value)}
            />

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