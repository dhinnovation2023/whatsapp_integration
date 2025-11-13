import Linkify from "linkify-react"

const LinkifyText = ({
    text
}: {
    text: string,
}) => {

    return (
        <Linkify
            options={{
                target: "_blank",
                className: "text-blue-800"
            }}
        >{text}</Linkify>
    )
}

export default LinkifyText