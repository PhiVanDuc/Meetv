import useMeetingFormDialog from "@/app/(dashboard)/meetings/_hooks/use-form-dialog";

import Dialog from "@/components/dialog";
import Skeleton from "@/components/skeleton";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import CommandSelect from "@/components/command-select";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";

import { Dispatch, SetStateAction } from "react";

interface Props {
    id?: string,
    open: boolean,
    formType: FormType,
    onOpenChange: Dispatch<SetStateAction<boolean>>
}

export default function MeetingFormDialog({ open, onOpenChange, formType, id }: Props) {
    const { title, description, IconButton, labelButton, form, agentOptions, agentIsPending, handleSearch, agentPagination, setAgentPage, mutation } = useMeetingFormDialog({ open, onOpenChange, formType, id });

    return (
        <Dialog
            open={open}
            title={title}
            description={description}
            onOpenChange={onOpenChange}
        >
            <form
                autoComplete="off"
                className="space-y-[15px]"
                onSubmit={form.handleSubmit(() => mutation.mutate())}
            >
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            return (
                                <Field>
                                    <FieldLabel>Tên cuộc họp</FieldLabel>

                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Nhập tên cuộc họp . . ."
                                    />

                                    { fieldState.invalid && <FieldError errors={[fieldState.error]} /> }
                                </Field>
                            )
                        }}
                    />

                    <Controller
                        name="agentId"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            return (
                                <Field>
                                    <FieldLabel>Agent</FieldLabel>

                                    <CommandSelect
                                        value={field.value}
                                        options={agentOptions}
                                        isPending={agentIsPending}
                                        pagination={agentPagination}
                                        aria-invalid={fieldState.invalid}
                                        selectPlaceholder="Lựa chọn agent"
                                        paginatePlaceholder="Xem thêm agent"
                                        onSearch={value => handleSearch(value)}
                                        searchPlaceholder="Nhập tên agent . . ."
                                        onSelect={value => field.onChange(value)}
                                        onPaginate={value => setAgentPage(value)}
                                    />

                                    { fieldState.invalid && <FieldError errors={[fieldState.error]} /> }
                                </Field>
                            )
                        }}
                    />
                </FieldGroup>

                <div className="flex gap-[10px]">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        <span>Làm mới</span>
                    </Button>

                    <Button
                        className="flex-1"
                        disabled={mutation.isPending}
                    >
                        { mutation.isPending ? <Spinner /> : <IconButton /> }
                        <span>{labelButton}</span>
                    </Button>
                </div>
            </form>
        </Dialog>
    )
}