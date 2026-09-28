import fs from "fs";
import path from "path";
import { quizSets } from "../config/quizSets.js";
// URL única de toda la aplicación
import { SITE_BASE, SITE_URL } from "../config/siteConfig.js";


const root = process.cwd();

const distDir = path.join(root, "dist");
const quizzesDir = path.join(root, "public", "quizzes");



function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cleanText(text) {
  return String(text || "")
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

if (!fs.existsSync(distDir)) {
  console.error("ERROR: No existe la carpeta dist.");
  process.exit(1);
}

if (!Array.isArray(quizSets) || quizSets.length === 0) {
  console.error("ERROR: No hay quizSets definidos en quizSets.js.");
  process.exit(1);
}

// Recorremos todos los conjuntos de quizzes
for (const quizSet of quizSets) {
  const {
    id: setId,
    title: setTitle,
    quizzes,
  } = quizSet;

  if (!setId) {
    console.warn("AVISO: Un quizSet no tiene id. Se saltea.");
    continue;
  }

  if (!Array.isArray(quizzes)) {
    console.warn(
      `AVISO: El quizSet "${setId}" no tiene una lista de quizzes válida.`
    );
    continue;
  }

  const siteTitle = cleanText(setTitle) || setId;

  // Imagen general de la aplicación
  const shareImage = `${SITE_URL}/logo-titulo.png`;

  console.log(`\nProcesando colección: ${setId}`);

  for (const quizId of quizzes) {
    const jsonPath = path.join(
      quizzesDir,
      `${quizId}.json`
    );

    if (!fs.existsSync(jsonPath)) {
      console.warn(
        `AVISO: No existe ${jsonPath}. Se saltea ${quizId}.`
      );
      continue;
    }

    const quiz = JSON.parse(
      fs.readFileSync(jsonPath, "utf8")
    );

    const title = cleanText(quiz.title) || quizId;

    const comment =
      cleanText(quiz.comment) ||
      "Preguntas para repasar lo estudiado.";

    const pageTitle = `${title} — ${siteTitle}`;

    // Página que WhatsApp visita
    const pageUrl =
      `${SITE_URL}/share/${quizId}/`;

    // Página real del quiz dentro de React
    const quizUrl =
      `${SITE_BASE}/#/quizzes/${quizId}`;

    const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>${escapeHtml(pageTitle)}</title>

    <meta
      name="description"
      content="${escapeHtml(comment)}"
    />

    <!-- Open Graph / WhatsApp -->
    <meta property="og:type" content="website" />

    <meta
      property="og:title"
      content="${escapeHtml(title)}"
    />

    <meta
      property="og:description"
      content="${escapeHtml(comment)}"
    />

    <meta
      property="og:image"
      content="${escapeHtml(shareImage)}"
    />

    <meta
      property="og:url"
      content="${escapeHtml(pageUrl)}"
    />

    <meta
      property="og:site_name"
      content="Formación Cristiana"
    />

    <!-- Twitter / X -->
    <meta
      name="twitter:card"
      content="summary_large_image"
    />

    <meta
      name="twitter:title"
      content="${escapeHtml(title)}"
    />

    <meta
      name="twitter:description"
      content="${escapeHtml(comment)}"
    />

    <meta
      name="twitter:image"
      content="${escapeHtml(shareImage)}"
    />

    <!-- Redirección al quiz -->
    <meta
      http-equiv="refresh"
      content="0; url=${escapeHtml(quizUrl)}"
    />
  </head>

  <body>
    <p>Abriendo el quiz...</p>

    <script>
      window.location.replace("${quizUrl}");
    </script>
  </body>
</html>
`;

    const outputDir = path.join(
      distDir,
      "share",
      quizId
    );

    const outputFile = path.join(
      outputDir,
      "index.html"
    );

    fs.mkdirSync(outputDir, {
      recursive: true,
    });

    fs.writeFileSync(
      outputFile,
      html,
      "utf8"
    );

    console.log(
      `✓ ${quizId} → ${pageUrl}`
    );
  }
}

console.log(
  "\n✓ Todas las páginas de compartir fueron generadas."
);