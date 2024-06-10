import { Loader2 } from 'lucide-react'

const Splash = () => {
    return (
        <div className='w-full h-screen grid place-items-center'>
            <Loader2 size={32} className='animate-spin' />
        </div>
    )
}

export default Splash
