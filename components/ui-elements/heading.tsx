import { PropsWithChildren } from "react"

const Heading = ({ children }: PropsWithChildren) => {
    return (
        <h2
            className='text-xl font-bold'
        >{children}</h2>
    )
}

export default Heading