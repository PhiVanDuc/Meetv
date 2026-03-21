import useAgentFormDialog from "@/app/(dashboard)/agents/_hooks/use-form-dialog";

import Skeleton from "@/components/skeleton";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody } from "@/components/ui/dialog";

import { Dispatch, SetStateAction } from "react";

interface Props {
    id?: string,
    open: boolean,
    formType: FormType,
    onOpenChange: Dispatch<SetStateAction<boolean>>
}

export default function AgentFormDialog({ open, onOpenChange, formType, id }: Props) {
    const { title, description, IconButton, labelButton, isFetchingInitialData, form, mutation } = useAgentFormDialog({ open, formType, id });

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
                    {
                        isFetchingInitialData
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
                                        { mutation.isPending ? <Spinner /> : <IconButton /> }
                                        <span>{labelButton}</span>
                                    </Button>
                                </form>
                            )
                    }
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}