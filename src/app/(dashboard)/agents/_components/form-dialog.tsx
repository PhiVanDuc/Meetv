import useAgentFormDialog from "@/app/(dashboard)/agents/_hooks/use-form-dialog";

import Dialog from "@/components/dialog";
import Skeleton from "@/components/skeleton";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";

import { Dispatch, SetStateAction } from "react";

interface Props {
    id?: string,
    open: boolean,
    formType: FormType,
    onOpenChange: Dispatch<SetStateAction<boolean>>
}

export default function AgentFormDialog({ open, onOpenChange, formType, id }: Props) {
    const { title, description, isQueryAgentPending, form, mutation, IconButton, labelButton } = useAgentFormDialog({ open, onOpenChange, formType, id });

    return (
        <Dialog
            open={open}
            title={title}
            description={description}
            onOpenChange={onOpenChange}
        >
            {
                isQueryAgentPending
                    ? (
                        <Skeleton>
                            <Skeleton.Form>
                                <Skeleton.FormControl>
                                    <Skeleton.Label />
                                    <Skeleton.Input />
                                </Skeleton.FormControl>

                                <Skeleton.FormControl>
                                    <Skeleton.Label />
                                    <Skeleton.Input className="h-[100px]" />
                                </Skeleton.FormControl>

                                <Skeleton.Input />
                            </Skeleton.Form>
                        </Skeleton>
                    )
                    : (
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
                                                <FieldLabel>Tên agent</FieldLabel>

                                                <Input
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Nhập tên agent . . ."
                                                />

                                                { fieldState.invalid && <FieldError errors={[fieldState.error]} /> }
                                            </Field>
                                        )
                                    }}
                                />

                                <Controller
                                    name="instructions"
                                    control={form.control}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <Field>
                                                <FieldLabel>Chỉ dẫn</FieldLabel>

                                                <Textarea
                                                    {...field}
                                                    className="h-[200px]"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Nhập chỉ dẫn cho agent . . ."
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
                    )
            }
        </Dialog>
    )
}