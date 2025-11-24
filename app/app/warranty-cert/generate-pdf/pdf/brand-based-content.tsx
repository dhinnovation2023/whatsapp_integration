import { generatePDFComponents } from '@/PDF/generatePDFComponents';
import { Text, View } from '@react-pdf/renderer'
import { DOMParser } from "xmldom";

const PDFBrandBasedContent = ({ htmlContent }: {
    htmlContent: string,
}) => {

    const htmlJson = new DOMParser().parseFromString(htmlContent);
    console.log(htmlJson)
    console.log(htmlContent)
    const pdfComponent = generatePDFComponents({ nodeJson: htmlJson as any })

    console.log("PDF Components")
    console.log(pdfComponent)

    return (
        <View>
            {pdfComponent}
        </View>
    )
}

export default PDFBrandBasedContent