import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToPdf = (exercise) => {

    const doc = new jsPDF();
    let y = 30;

    // Title
    doc.setFontSize(16);
    doc.text(exercise.exercise.title || "Untitled Exercise", 10, 20);

    if (exercise.exercise.questions?.length > 0) {
        exercise.exercise.questions.forEach((question, qIndex) => {
            const answer = exercise.answers?.[qIndex] || "No answer";

            doc.setFontSize(12);
            const maxWidth = 180; // width limit for your page margins (approx A4 width minus margins)

            const questionLines = doc.splitTextToSize(`Q${qIndex + 1}: ${question}`, maxWidth);
            doc.text(questionLines, 10, y);
            y += questionLines.length * 7; // approx line height = 7

            const answerLines = doc.splitTextToSize(`Answer: ${answer}`, maxWidth);
            doc.text(answerLines, 12, y);
            y += answerLines.length * 7 + 5; // add some spacing after answer

            // Check for page break
            if (y > 270) {
                doc.addPage();
                y = 20;
            }

            // If content reaches bottom of page, add a new page
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });
    }

    window.open(doc.output("bloburl"), "_blank");
};
