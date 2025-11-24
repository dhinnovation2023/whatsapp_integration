import { generatePDFComponents } from '@/PDF/generatePDFComponents';
import { View } from '@react-pdf/renderer'
import { DOMParser } from "xmldom";

const PDFBrandBasedContent = ({ htmlContent }: {
    htmlContent: string,
}) => {

    const htmlJson = new DOMParser().parseFromString(htmlContent);
    const pdfComponent = generatePDFComponents({ nodeJson: htmlJson })

    console.log("PDF Components")
    console.log(pdfComponent)

    return (
        <View>
            {pdfComponent}
        </View>
    )
}

export default PDFBrandBasedContent