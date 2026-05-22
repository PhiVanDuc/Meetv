import useAgentForm from "@/app/(dashboard)/agents/_hooks/use-form"

import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { SkeletonAgentForm } from "@/components/core/skeleton"
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent } from "@/components/ui/dialog"

interface Props {
    open: boolean,
    agentId?: string,
    action: FormAction,
    onOpenChange: (open: boolean) => void
}

export default function AgentForm({open, onOpenChange, action, agentId}: Props) {
    const {form, title, description, button, queryAgent, agentMutation, handleSubmitAgentForm, handleResetForm} = useAgentForm({action, agentId})

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

                {
                    (action === "update" && queryAgent.isPending)
                        ? <SkeletonAgentForm />
                        : (
                            <form
                                autoComplete="off"
                                className="space-y-[15px]"
                                onSubmit={form.handleSubmit(handleSubmitAgentForm)}
                            >
                                <FieldGroup>
                                    <Controller
                                        name="name"
                                        control={form.control}
                                        render={({field, fieldState}) => {
                                            return (
                                                <Field>
                                                    <FieldLabel>Tên agent</FieldLabel>

                                                    <Input
                                                        {...field}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="Nhập tên agent . . ."
                                                    />

                                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                </Field>
                                            )
                                        }}
                                    />

                                    <Controller
                                        name="instructions"
                                        control={form.control}
                                        render={({field, fieldState}) => {
                                            return (
                                                <Field>
                                                    <FieldLabel>Chỉ dẫn</FieldLabel>

                                                    <Textarea
                                                        {...field}
                                                        className="h-[100px]"
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="Nhập chỉ dẫn cho agent . . ."
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
                                        disabled={agentMutation.isPending}
                                    >
                                        {
                                            agentMutation.isPending
                                                ? <Spinner />
                                                : button.icon
                                        }

                                        <span>{button.label}</span>
                                    </Button>
                                </div>
                            </form>
                        )
                }
            </DialogContent>
        </Dialog>
    )
}