import useAgentFormDialog from "@/app/(dashboard)/agents/_hooks/use-form-dialog";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody } from "@/components/ui/dialog";

import { Dispatch, SetStateAction } from "react";

import ICONS from "@/consts/icons";

interface Props {
    open: boolean,
    formType: FormType,
    onOpenChange: Dispatch<SetStateAction<boolean>>
}

export default function AgentFormDialog({ formType, open, onOpenChange }: Props) {
    const { title, description, form, mutation } = useAgentFormDialog(formType);

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

                <DialogBody>
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
                                            className="h-[100px]"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Nhập chỉ dẫn cho agent . . ."
                                        />

                                        { fieldState.invalid && <FieldError errors={[fieldState.error]} /> }
                                    </Field>
                                )
                            }}
                        />
                    </FieldGroup>

                    <Button
                        className="w-full"
                        disabled={mutation.isPending}
                    >
                        { mutation.isPending ? <Spinner /> : <ICONS.ADD /> }
                        <span>Thêm agent</span>
                    </Button>
                </form>
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}