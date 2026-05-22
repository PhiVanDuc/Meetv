import { CommandDialog, Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandSeparator, CommandGroup } from "@/components/ui/command"

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export default function DashboardCommand({open, onOpenChange}: Props) {
    return (
        <CommandDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <Command>
                <CommandInput placeholder="Type a command or search..." />

                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>

                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>Profile</CommandItem>
                        <CommandItem>Billing</CommandItem>
                        <CommandItem>Settings</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </CommandDialog>
    )
}
