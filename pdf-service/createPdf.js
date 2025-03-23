import PDFDocument from "pdfkit";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 7777;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

function createPdfResume(text) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    doc.fontSize(12).text(text, { align: "left" });
    doc.end();
  });
}

app.post("/generate-pdf", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ error: "Missing 'text' field in request body" });
    }
    console.log(text);
    const pdfBuffer = await createPdfResume(text);
    console.log("pdfBuffer: ");
    console.log(pdfBuffer);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`PDF Resume Service is running on port ${PORT}`);
});
