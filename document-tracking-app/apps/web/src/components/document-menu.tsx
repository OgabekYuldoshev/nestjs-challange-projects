import { Calendar, Check, ChevronsUpDown, CreditCard, Settings, Smile, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { cn } from '#/lib/utils'

import { Button } from './ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

const DocumentMenu = () => {
    const { id } = useParams<{ id: string }>()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const currentFramework = useMemo(() => {
        return frameworks.find((framework) => framework.value === id) || { label: '', value: '' }
    }, [id])


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {id
                        ? currentFramework.label
                        : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                className={framework.value === currentFramework.value ? 'bg-zinc-200' : ''}
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(current) => {
                                        console.log(current)
                                        navigate(`/dashboard/doc/${current}`)
                                        setOpen(false)
                                    }}
                                >
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default DocumentMenu
