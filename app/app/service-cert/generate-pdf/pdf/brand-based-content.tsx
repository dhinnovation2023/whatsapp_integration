import { generatePDFComponents } from '@/PDF/generatePDFComponents';
import { View } from '@react-pdf/renderer'
import { DOMParser } from "@xmldom/xmldom";

const PDFBrandBasedContent = ({ htmlContent }: {
    htmlContent: string,
}) => {

    const htmlJson = new DOMParser().parseFromString(htmlContent);
    const pdfComponent = generatePDFComponents({ nodeJson: htmlJson })

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                textAlign: "justify"
            }}
        >
            {pdfComponent}
        </View>
    )
}

export default PDFBrandBasedContent