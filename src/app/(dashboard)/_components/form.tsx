import useMeetingForm from "@/app/(dashboard)/_hooks/use-form"

import Avatar from "boring-avatars"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Selector from "@/components/core/selector"
import { Spinner } from "@/components/ui/spinner"
import { SkeletonMeetingForm } from "@/components/core/skeleton"
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent } from "@/components/ui/dialog"

interface Props {
    open: boolean,
    action: FormAction,
    meetingId?: string,
    onOpenChange: (open: boolean) => void
}

export default function MeetingForm({open, onOpenChange, action, meetingId}: Props) {
    const {form, title, description, button, queryAgents, agentsPagination, agentOptions, renderAgentOption, renderAgentSelectedOption, handleFilterAgent, handleSubmitMeetingForm, handleResetForm} = useMeetingForm({action, meetingId})

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={form.handleSubmit(handleSubmitMeetingForm)}
                    className="space-y-[15px]"
                >
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({field, fieldState}) => {
                                return (
                                    <Field>
                                        <FieldLabel>Tên cuộc họp</FieldLabel>

                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Nhập tên cuộc họp . . ."
                                        />

                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )
                            }}
                        />

                        <Controller
                            name="agentId"
                            control={form.control}
                            render={({field, fieldState}) => {
                                return (
                                    <Field>
                                        <FieldLabel>Agent</FieldLabel>

                                        <Selector
                                            value={field.value}
                                            options={agentOptions}
                                            onSelect={field.onChange}
                                            onSearch={handleFilterAgent}
                                            renderOption={renderAgentOption}
                                            isPending={queryAgents.isPending}
                                            selectPlaceholder="Lựa chọn agent"
                                            renderSelectedOption={renderAgentSelectedOption}
                                        />

                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )
                            }}
                        />
                    </FieldGroup>

                    <div className="flex gap-[5px]">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleResetForm}
                        >
                            <span>Làm mới</span>
                        </Button>

                        <Button
                            className="flex-1"
                            disabled={false}
                        >
                            {button.icon}
                            <span>{button.label}</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}