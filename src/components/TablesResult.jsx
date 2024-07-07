
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import React, { forwardRef } from "react";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TablesResult = forwardRef(({ result }, ref) => {
  const getImageDataUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const generatePDF = async () => {
    try {
      const docDefinition = {
        content: [
          { text: "Result", style: "header" },
          {
            style: "tableExample",
            table: {
              headerRows: 1,
              widths: [40, "*", "*", "*", "*", 100],
              body: [
                ["No", "Gambar", "Luas (cm²)", "Lebar (cm)", "Tinggi (cm)"],
                ...(await Promise.all(
                  result.map(async (item, index) => [
                    index + 1,
                    {
                      image: await getImageDataUrl(item.url),
                      width: 100,
                    },
                    item.luas.toFixed(2) + " cm",
                    item.lebar.toFixed(2) + " cm",
                    item.tinggi.toFixed(2) + " cm",
                  ])
                )),
              ],
            },
            layout: "lightHorizontalLines",
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          tableExample: {
            margin: [0, 5, 0, 15],
          },
        },
      };

      pdfMake.createPdf(docDefinition).download("result.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleDownload = (url, filename) => {
    saveAs(url, filename);
  };

  return (
    <div ref={ref} className="w-full  px-6 lg:px-32 md:px-6  dark:bg-black pb-12 dark:text-white text-center ">
      <hr className="border-t p-4 border-dashed" />

      <div className="mb-4">
        <button
          onClick={generatePDF}
          className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors text-xs lg:text-base md:text-base"
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faFilePdf} />
            <p>Cetak Pdf</p>
          </div>
        </button>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full bg-[#092306] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs lg:text-base md:text-base text-white">
          <thead className="bg-reen-800  text-white">
            <tr>
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">Gambar</th>
              <th className="py-2 px-4 border-b">Luas (cm)</th>
              <th className="py-2 px-4 border-b">Lebar (cm)</th>
              <th className="py-2 px-4 border-b">Tinggi (cm)</th>
              <th className="py-2 px-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-center">
                    <img
                      src={item.url}
                      alt={`Output ${index}`}
                      className="w-24 h-auto"
                    />
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  {item.luas.toFixed(2)} cm
                </td>
                <td className="py-2 px-4 border-b">
                  {item.lebar.toFixed(2)} cm
                </td>
                <td className="py-2 px-4 border-b">
                  {item.tinggi.toFixed(2)} cm
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => window.open(item.url, "_blank")}
                    className="text-white hover:underline mr-2"
                  >
                    Lihat
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(item.url, `result_${index}.png`)
                    }
                    className="text-white hover:underline mr-2"
                  >
                    Unduh
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default TablesResult;
