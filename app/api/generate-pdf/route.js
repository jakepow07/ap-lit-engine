import PDFDocument from "pdfkit";

export async function POST(req) {
  try {
    const result = await req.json();

    // Build PDF in memory
    const chunks = [];
    const doc = new PDFDocument({ margin: 60, size: "LETTER" });

    doc.on("data", (chunk) => chunks.push(chunk));

    await new Promise((resolve, reject) => {
      doc.on("end", resolve);
      doc.on("error", reject);

      const navy = "#0f2044";
      const gold = "#c9a84c";
      const gray = "#4a5568";

      // ── HEADER ──────────────────────────────────────────────
      doc.rect(0, 0, doc.page.width, 80).fill(navy);
      doc
        .fillColor("#ffffff")
        .fontSize(22)
        .font("Helvetica-Bold")
        .text("AP Literature Engine", 60, 24);
      doc
        .fillColor("rgba(255,255,255,0.6)")
        .fontSize(11)
        .font("Helvetica")
        .text("Study Packet — Generated Analysis", 60, 52);

      doc.moveDown(3);

      // ── HELPER: section heading ──────────────────────────────
      function sectionHeading(title) {
        doc.moveDown(0.5);
        doc
          .rect(60, doc.y, doc.page.width - 120, 28)
          .fill(navy);
        doc
          .fillColor("#ffffff")
          .fontSize(13)
          .font("Helvetica-Bold")
          .text(title, 72, doc.y - 22);
        doc.moveDown(0.8);
        doc.fillColor(gray).font("Helvetica").fontSize(11);
      }

      // ── HELPER: gold label ────────────────────────────────────
      function goldLabel(label) {
        doc.fillColor(gold).font("Helvetica-Bold").fontSize(10);
        doc.text(label.toUpperCase(), { continued: false });
        doc.fillColor(gray).font("Helvetica").fontSize(11);
      }

      // ── SYNOPSIS ────────────────────────────────────────────
      if (result.synopsis) {
        sectionHeading("Synopsis");
        doc.text(result.synopsis, 60, doc.y, {
          width: doc.page.width - 120,
          align: "justify",
        });
      }

      // ── CHARACTERS ──────────────────────────────────────────
      if (result.characters?.length) {
        sectionHeading("Major Characters");
        result.characters.forEach((char) => {
          doc
            .fillColor(navy)
            .font("Helvetica-Bold")
            .fontSize(11)
            .text(`${char.name}: `, { continued: true });
          doc
            .fillColor(gray)
            .font("Helvetica")
            .text(char.description);
          doc.moveDown(0.3);
        });
      }

      // ── THEMES ──────────────────────────────────────────────
      if (result.themes?.length) {
        sectionHeading("Key Themes");
        result.themes.forEach((t) => {
          doc
            .fillColor(navy)
            .font("Helvetica-Bold")
            .fontSize(11)
            .text(`${t.theme}: `, { continued: true });
          doc.fillColor(gray).font("Helvetica").text(t.explanation);
          doc.moveDown(0.3);
        });
      }

      // ── QUOTES ──────────────────────────────────────────────
      if (result.quotes?.length) {
        sectionHeading("Important Quotes");
        result.quotes.forEach((q) => {
          // Quote box
          const boxY = doc.y;
          const boxWidth = doc.page.width - 120;
          doc
            .rect(60, boxY, boxWidth, 4)
            .fill(gold);
          doc.moveDown(0.2);
          doc
            .fillColor(navy)
            .font("Helvetica-Oblique")
            .fontSize(12)
            .text(`"${q.quote}"`, 68, doc.y, { width: boxWidth - 16 });
          doc
            .fillColor(gray)
            .font("Helvetica")
            .fontSize(10)
            .text(`— ${q.speaker}`);
          doc.moveDown(0.2);
          doc.fontSize(11).text(q.significance, 68, doc.y, {
            width: boxWidth - 16,
          });
          doc.moveDown(0.6);
        });
      }

      // ── THESIS ──────────────────────────────────────────────
      if (result.thesis) {
        sectionHeading("Sample Thesis");
        doc
          .rect(60, doc.y, 4, 40)
          .fill(gold);
        doc
          .fillColor(navy)
          .font("Helvetica-Bold")
          .fontSize(12)
          .text(result.thesis, 74, doc.y - 36, {
            width: doc.page.width - 140,
          });
        doc.moveDown(1);
      }

      // ── FOOTER ──────────────────────────────────────────────
      const pageBottom = doc.page.height - 40;
      doc
        .rect(0, pageBottom, doc.page.width, 40)
        .fill(navy);
      doc
        .fillColor("rgba(255,255,255,0.4)")
        .fontSize(10)
        .font("Helvetica")
        .text("AP Literature Engine © 2026", 60, pageBottom + 14);

      doc.end();
    });

    const pdfBuffer = Buffer.concat(chunks);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="AP_Lit_Packet.pdf"',
      },
    });
  } catch (error) {
    console.error("Error in /api/generate-pdf:", error);
    return Response.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
