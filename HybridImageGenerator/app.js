// DOM-Referenzen
let fontSizeEl, farBlurEl, nearStrengthEl, nearOpacityEl, autoNearEl;

// Canvas & Font
const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");
const FONT_STACK = '"American Typewriter","Courier Prime","Courier New",monospace';

// Hintergrund mit Fallback
let bgReady = false;
let bgTriedSecond = false;
const bgImage = new Image();
bgImage.onload = () => {
  bgReady = true;
  // Erst rendern, wenn Init fertig ist – zur Sicherheit checken wir auf DOM-Elemente
  if (document.getElementById("fontSize")) {
    renderCard();
    updatePreview();
  }
};
bgImage.onerror = () => {
  if (!bgTriedSecond) {
    bgTriedSecond = true;
    bgImage.src = "background.jpg";
  }
};
bgImage.src = "background_print.jpg";

// Parameter holen – NICHT mehr direkt auf fontSizeEl etc. vertrauen
function getParamsRaw() {
  const fontEl = fontSizeEl || document.getElementById("fontSize");
  const blurEl = farBlurEl || document.getElementById("farBlur");
  const nsEl   = nearStrengthEl || document.getElementById("nearStrength");
  const noEl   = nearOpacityEl || document.getElementById("nearOpacity");

  return {
    farText: document.getElementById("farText").value || "",
    nearText: document.getElementById("nearText").value || "",
    fontSize: parseInt((fontEl && fontEl.value) || "230", 10),
    farBlur: parseInt((blurEl && blurEl.value) || "15", 10),
    nearStrength: parseInt((nsEl && nsEl.value) || "40", 10) / 100,
    nearOpacity: parseInt((noEl && noEl.value) || "60", 10) / 100
  };
}

function getParams() {
  return getParamsRaw();
}

// Karte auf gewünschten Kontext rendern
function renderCardOnContext(targetCtx, farText, nearText, p) {
  const w = canvas.width;
  const h = canvas.height;

  targetCtx.save();
  targetCtx.setTransform(1, 0, 0, 1, 0, 0);
  targetCtx.clearRect(0, 0, w, h);
  targetCtx.fillStyle = "#ffffff";
  targetCtx.fillRect(0, 0, w, h);

  if (bgReady) {
    targetCtx.globalAlpha = 0.8;
    targetCtx.drawImage(bgImage, 0, 0, w, h);
    targetCtx.globalAlpha = 1.0;
  }
  targetCtx.restore();

  targetCtx.save();
  targetCtx.globalCompositeOperation = "overlay";
  targetCtx.globalAlpha = 0.12;
  targetCtx.fillStyle = "#ffffff";
  targetCtx.fillRect(0, 0, w, h);
  targetCtx.restore();

  const centerX = w / 2;
  const centerY = h / 2 + p.fontSize * 0.08;

  targetCtx.save();
  targetCtx.textAlign = "center";
  targetCtx.textBaseline = "middle";
  targetCtx.font = `900 ${p.fontSize}px ${FONT_STACK}`;
  targetCtx.fillStyle = "#111111";
  targetCtx.filter = `blur(${p.farBlur}px)`;
  targetCtx.fillText(farText, centerX, centerY);
  targetCtx.filter = "none";
  targetCtx.restore();

  if (nearText.trim() !== "") {
    drawNearHighPass(
      nearText,
      centerX,
      centerY,
      p.fontSize,
      p.nearStrength,
      p.nearOpacity,
      targetCtx
    );
  }
}

function renderCard() {
  const p = getParams();
  renderCardOnContext(ctx, p.farText, p.nearText, p);
  updatePreview();
}

// High-Pass für Nah-Wort
function drawNearHighPass(text, x, y, fontSize, strength, globalOpacity, targetCtx = ctx) {
  const w = canvas.width;
  const h = canvas.height;

  const cOrig = document.createElement("canvas");
  cOrig.width = w;
  cOrig.height = h;
  const octx = cOrig.getContext("2d");
  octx.fillStyle = "#ffffff";
  octx.fillRect(0, 0, w, h);
  octx.font = `900 ${fontSize}px ${FONT_STACK}`;
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  octx.fillStyle = "#000000";
  octx.fillText(text, x, y);

  const cBlur = document.createElement("canvas");
  cBlur.width = w;
  cBlur.height = h;
  const bctx = cBlur.getContext("2d");
  bctx.fillStyle = "#ffffff";
  bctx.fillRect(0, 0, w, h);
  bctx.filter = "blur(4px)";
  bctx.font = octx.font;
  bctx.textAlign = "center";
  bctx.textBaseline = "middle";
  bctx.fillStyle = "#000000";
  bctx.fillText(text, x, y);
  bctx.filter = "none";

  const origData = octx.getImageData(0, 0, w, h);
  const blurData = bctx.getImageData(0, 0, w, h);
  const outData = octx.createImageData(w, h);

  const od = origData.data;
  const bd = blurData.data;
  const out = outData.data;

  for (let i = 0; i < od.length; i += 4) {
    const origGray = (od[i] + od[i + 1] + od[i + 2]) / 3;
    const blurGray = (bd[i] + bd[i + 1] + bd[i + 2]) / 3;
    const edge = Math.abs(origGray - blurGray);
    const alpha = Math.max(0, Math.min(255, edge * (1 + strength * 2)));
    out[i] = 0;
    out[i + 1] = 0;
    out[i + 2] = 0;
    out[i + 3] = alpha;
  }

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = w;
  tempCanvas.height = h;
  const tctx = tempCanvas.getContext("2d");
  tctx.putImageData(outData, 0, 0);

  targetCtx.save();
  targetCtx.globalAlpha = globalOpacity;
  targetCtx.drawImage(tempCanvas, 0, 0);
  targetCtx.restore();
}

// Fern-Vorschau
function updatePreview() {
  const farCanvas = document.getElementById("previewFar");
  if (!farCanvas) return;

  const fctx = farCanvas.getContext("2d");
  const fw = farCanvas.width;
  const fh = farCanvas.height;

  fctx.clearRect(0, 0, fw, fh);

  const scale = Math.min(fw / canvas.width, fh / canvas.height);
  const drawW = canvas.width * scale;
  const drawH = canvas.height * scale;
  const dx = (fw - drawW) / 2;
  const dy = (fh - drawH) / 2;

  fctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, dx, dy, drawW, drawH);
}

// PNG-Export
function saveSingleCard() {
  try {
    renderCard();
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "hybrid-karte-A5.png";
    link.href = dataURL;
    link.click();
  } catch (e) {
    alert(
      "Export wird vom Browser blockiert.\n\n" +
      "Bitte die HTML-Datei über einen lokalen Webserver öffnen (z.B. python -m http.server)."
    );
  }
}

function saveA4Sheet() {
  try {
    const a4Canvas = document.createElement("canvas");
    a4Canvas.width = 2480;
    a4Canvas.height = 3508;
    const a4ctx = a4Canvas.getContext("2d");

    a4ctx.fillStyle = "#ffffff";
    a4ctx.fillRect(0, 0, a4Canvas.width, a4Canvas.height);

    renderCard();
    a4ctx.drawImage(canvas, 0, 0);

    const gap = 12;
    const y2 = canvas.height + gap;
    if (y2 + canvas.height <= a4Canvas.height) {
      a4ctx.drawImage(canvas, 0, y2);
    }

    const link = document.createElement("a");
    link.download = "hybrid-karte-DIN-A4-2xA5.png";
    link.href = a4Canvas.toDataURL("image/png");
    link.click();
  } catch (e) {
    alert(
      "Export wird vom Browser blockiert.\n\n" +
      "Bitte die HTML-Datei über einen lokalen Webserver öffnen (z.B. python -m http.server)."
    );
  }
}

// PDF-Export Standard
function drawBgRect(ctxBg, x, y, w, h) {
  ctxBg.save();
  ctxBg.fillStyle = "#ffffff";
  ctxBg.fillRect(x, y, w, h);
  if (bgReady) {
    ctxBg.globalAlpha = 0.8;
    ctxBg.drawImage(bgImage, x, y, w, h);
    ctxBg.globalAlpha = 1.0;
  }
  ctxBg.globalCompositeOperation = "overlay";
  ctxBg.globalAlpha = 0.12;
  ctxBg.fillStyle = "#ffffff";
  ctxBg.fillRect(x, y, w, h);
  ctxBg.restore();
}

function safeFileName(str) {
  return (str || "Hybrid")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9äöüÄÖÜß\-]/g, "")
    .substring(0, 40);
}

function savePdfA4() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("jsPDF konnte nicht geladen werden.");
    return;
  }
  const { jsPDF } = window.jspdf;

  const p = getParamsRaw();
  const cardW = canvas.width;
  const cardH = canvas.height;
  const gap = 12;

  const a4Canvas = document.createElement("canvas");
  a4Canvas.width = 2480;
  a4Canvas.height = 3508;
  const a4ctx = a4Canvas.getContext("2d");
  a4ctx.fillStyle = "#ffffff";
  a4ctx.fillRect(0, 0, a4Canvas.width, a4Canvas.height);

  renderCard();
  a4ctx.drawImage(canvas, 0, 0);

  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = cardW;
  tmpCanvas.height = cardH;
  const tmpCtx = tmpCanvas.getContext("2d");

  const p2 = {
    farText: p.farText,
    nearText: p.farText,
    fontSize: p.fontSize,
    farBlur: p.farBlur,
    nearStrength: p.nearStrength,
    nearOpacity: p.nearOpacity
  };
  renderCardOnContext(tmpCtx, p2.farText, p2.nearText, p2);

  const y2 = cardH + gap;
  a4ctx.drawImage(tmpCanvas, 0, y2);

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const imgData1 = a4Canvas.toDataURL("image/jpeg", 1.0);
  pdf.addImage(imgData1, "JPEG", 0, 0, 210, 297);

  const backCanvas = document.createElement("canvas");
  backCanvas.width = 2480;
  backCanvas.height = 3508;
  const backCtx = backCanvas.getContext("2d");
  backCtx.fillStyle = "#ffffff";
  backCtx.fillRect(0, 0, backCanvas.width, backCanvas.height);

  drawBgRect(backCtx, 0, 0, cardW, cardH);
  drawBgRect(backCtx, 0, y2, cardW, cardH);

  const imgData2 = backCanvas.toDataURL("image/jpeg", 1.0);
  pdf.addPage();
  pdf.addImage(imgData2, "JPEG", 0, 0, 210, 297);

  const far = document.getElementById("farText").value || "Hybrid";
  const fileName = "Hybrid-" + safeFileName(far) + ".pdf";
  pdf.save(fileName);
}

// automatische Nah-Wort-Erzeugung
const similarMap = {
  "a":"e","b":"h","c":"e","d":"cl","e":"c","f":"t","g":"q","h":"n","i":"l","j":"i","k":"h",
  "l":"i","m":"rn","n":"m","o":"a","p":"q","q":"p","r":"n","s":"z","t":"f","u":"v","v":"u",
  "w":"vv","x":"k","y":"v","z":"s",
  "ä":"a","ö":"o","ü":"u",
  "A":"E","B":"H","C":"E","D":"Cl","E":"C","F":"T","G":"Q","H":"N","I":"L","J":"I","K":"H",
  "L":"I","M":"RN","N":"M","O":"A","P":"Q","Q":"P","R":"N","S":"Z","T":"F","U":"V","V":"U",
  "W":"VV","X":"K","Y":"V","Z":"S",
  "Ä":"A","Ö":"O","Ü":"U"
};

function transformChar(ch) {
  return similarMap[ch] || ch;
}

function generateNearFromFar(str) {
  return str.split(/(\s+)/).map(token => {
    if (token.trim() === "") return token;
    const chars = Array.from(token);
    if (chars.length <= 2) return token;
    const first = chars[0];
    const last = chars[chars.length - 1];
    const middle = chars.slice(1, -1).map(transformChar).join("");
    return first + middle + last;
  }).join("");
}

// Slider-Anzeigen
function updateSliderLabel(id) {
  const slider = document.getElementById(id);
  const label = document.getElementById(id + "Val");
  if (slider && label) label.textContent = slider.value;
}

function updateAllSliderLabels() {
  ["fontSize","farBlur","nearStrength","nearOpacity"].forEach(updateSliderLabel);
}

// Kontext-Hinweis (unverändert)
function updateContextTip() {
  const tipBox = document.getElementById("contextTip");
  if (!tipBox) return;

  const fs = parseInt((fontSizeEl || document.getElementById("fontSize")).value, 10);
  const fb = parseInt((farBlurEl || document.getElementById("farBlur")).value, 10);
  const nsRaw = parseInt((nearStrengthEl || document.getElementById("nearStrength")).value, 10);
  const noRaw = parseInt((nearOpacityEl || document.getElementById("nearOpacity")).value, 10);
  const ns = nsRaw / 100;
  const no = noRaw / 100;
  const auto = autoNearEl && autoNearEl.checked;

  let lines = [];

  if (fs < 170) {
    lines.push("🔹 <b>Schriftgröße:</b> eher klein – geeignet für nahes Publikum, weniger Fernwirkung.");
  } else if (fs < 260) {
    lines.push("🔹 <b>Schriftgröße:</b> ausgewogen – gut für die meisten Bühnen- & Salon-Situationen.");
  } else {
    lines.push("🔹 <b>Schriftgröße:</b> sehr groß – starke Fernwirkung, ideal für größere Räume.");
  }

  if (fb < 8) {
    lines.push("🔹 <b>Fern-Unschärfe:</b> gering – Fern-Wort sehr klar, Nah-Wort könnte auf Distanz sichtbar werden.");
  } else if (fb < 15) {
    lines.push("🔹 <b>Fern-Unschärfe:</b> moderat – saubere Trennung zwischen Nah- und Fernsicht.");
  } else {
    lines.push("🔹 <b>Fern-Unschärfe:</b> stark – publikumsfreundlich, besonders bei größerem oder älterem Publikum.");
  }

  if (ns < 0.25) {
    lines.push("🔹 <b>Nah-Kanten:</b> sehr fein – subtiler Effekt, ganz nah evtl. schwer zu lesen.");
  } else if (ns < 0.5) {
    lines.push("🔹 <b>Nah-Kanten:</b> gut sichtbar – Nah-Wort klar, ohne die Fernwirkung zu stören.");
  } else {
    lines.push("🔹 <b>Nah-Kanten:</b> sehr kräftig – Nah-Wort dominiert stark, erhöhtes Risiko bei guter Sehschärfe.");
  }

  if (no < 0.35) {
    lines.push("🔹 <b>Deckkraft:</b> niedrig – sehr sicher, Nah-Wort tritt dezent hervor.");
  } else if (no < 0.6) {
    lines.push("🔹 <b>Deckkraft:</b> ausgewogen – guter Kompromiss aus Sicherheit & Lesbarkeit.");
  } else {
    lines.push("🔹 <b>Deckkraft:</b> hoch – Nah-Wort sehr präsent, Vorsicht bei Brillenträgern.");
  }

  let riskScore = 0;
  if (fb < 8) riskScore += 2;
  if (no > 0.6) riskScore += 2;
  if (ns > 0.5) riskScore += 1;

  let riskText;
  if (riskScore <= 1) {
    riskText = "🟢 <b>Risikostufe:</b> niedrig – sehr bühnensicher eingestellt.";
  } else if (riskScore <= 3) {
    riskText = "🟡 <b>Risikostufe:</b> mittel – gut, aber vorher mit Testperson ausprobieren.";
  } else {
    riskText = "🔴 <b>Risikostufe:</b> hoch – unbedingt mit Testpublikum prüfen, Brillenträger vermeiden.";
  }

  let useCase;
  if (fs > 260 && fb > 14) {
    useCase = "🎭 <b>Einsatz:</b> Große Bühne / größerer Raum.";
  } else if (fs > 200) {
    useCase = "🎭 <b>Einsatz:</b> Bühne oder Salon.";
  } else {
    useCase = "🎭 <b>Einsatz:</b> Wohnzimmer / Close-Up.";
  }

  let audience;
  if (no > 0.6 || ns > 0.5 || fb < 8) {
    audience = "👓 <b>Publikum:</b> Keine sehr sehstarken Zuschauer oder Brillenträger für den Nah-Zuschauer auswählen.";
  } else {
    audience = "👓 <b>Publikum:</b> Weitgehend sicher für gemischtes Publikum.";
  }

  let printTip;
  if (fb > 14) {
    printTip = "🖨️ <b>Druck:</b> Hoher Kontrast/Fotodruck sinnvoll, auf jeden Fall Testdruck machen.";
  } else {
    printTip = "🖨️ <b>Druck:</b> Standard-Farbdruck reicht meist aus, trotzdem Testdruck empfohlen.";
  }

  let presetTip = "";
  if (fb >= 10 && fb <= 17 && no >= 0.4 && no <= 0.65 && ns >= 0.25 && ns <= 0.55) {
    presetTip = "💾 <b>Preset-Tipp:</b> Diese Einstellung eignet sich gut als Bühnen-Preset – jetzt mit „Einstellungen exportieren“ sichern.";
  }

  if (auto) {
    lines.push("🔹 <b>Automatik:</b> Nah-Wort wird aus dem Fern-Wort erzeugt – ideal zum schnellen Experimentieren.");
  }

  let exportTip;
  if (riskScore <= 2 && fs >= 200) {
    exportTip = "📄 <b>Export-Empfehlung:</b> Für den Auftritt den DIN A4 PDF-Export nutzen (2×A5 Vorder/Rück).";
  } else {
    exportTip = "📄 <b>Export-Empfehlung:</b> Zuerst mit „Einzelkarte (PNG)“ einen Testdruck machen.";
  }

  tipBox.innerHTML =
    lines.join("<br>") +
    "<hr style='border:none;border-top:1px solid #ccc;margin:6px 0'>" +
    riskText + "<br>" +
    useCase + "<br>" +
    audience + "<br>" +
    printTip + (presetTip ? "<br>" + presetTip : "") + "<br>" +
    exportTip;
}

// Preset-Objekt
function getCurrentPresetObject() {
  const p = getParamsRaw();
  return {
    farText: document.getElementById("farText").value,
    nearText: document.getElementById("nearText").value,
    fontSize: p.fontSize,
    farBlur: p.farBlur,
    nearStrength: parseInt((nearStrengthEl || document.getElementById("nearStrength")).value, 10),
    nearOpacity: parseInt((nearOpacityEl || document.getElementById("nearOpacity")).value, 10),
    autoNear: autoNearEl && autoNearEl.checked
  };
}

// Preset Import/Export
function exportPreset() {
  const preset = getCurrentPresetObject();
  const json = JSON.stringify(preset);
  const field = document.getElementById("presetText");
  field.value = json;
  alert("Preset exportiert.\n\nDiesen Text kopieren und speichern.");
}

function importPreset() {
  const field = document.getElementById("presetText");
  if (!field.value.trim()) {
    alert("Kein Preset im Feld.");
    return;
  }
  let preset;
  try {
    preset = JSON.parse(field.value);
  } catch (e) {
    alert("Konnte Preset nicht lesen (ungültiges JSON).");
    return;
  }

  const farInput  = document.getElementById("farText");
  const nearInput = document.getElementById("nearText");

  if (preset.farText !== undefined) farInput.value = preset.farText;
  if (preset.nearText !== undefined) nearInput.value = preset.nearText;

  if (typeof preset.autoNear === "boolean") autoNearEl.checked = preset.autoNear;

  if (preset.fontSize !== undefined) fontSizeEl.value = preset.fontSize;
  if (preset.farBlur !== undefined) farBlurEl.value = preset.farBlur;
  if (preset.nearStrength !== undefined) nearStrengthEl.value = preset.nearStrength;
  if (preset.nearOpacity !== undefined) nearOpacityEl.value = preset.nearOpacity;

  updateAllSliderLabels();
  renderCard();
  updateContextTip();
}

// --- Preset-Sharing per URL-Token & QR-Code ---

function encodePresetToToken(presetObj) {
  const json = JSON.stringify(presetObj);
  const base64 = btoa(json);
  return encodeURIComponent(base64);
}

function decodePresetFromToken(token) {
  try {
    const base64 = decodeURIComponent(token);
    const json = atob(base64);
    return JSON.parse(json);
  } catch (e) {
    console.error("Konnte Preset-Token nicht dekodieren", e);
    return null;
  }
}

function generatePresetLink() {
  const preset = getCurrentPresetObject();
  const token = encodePresetToToken(preset);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?preset=${token}`;
}
function sharePresetLink() {
  const url = generatePresetLink();

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("Preset-Link wurde in die Zwischenablage kopiert.\n\nDiesen Link kannst du mit anderen teilen oder in deinen Notizen speichern.");
      })
      .catch(() => {
        // Fallback, wenn Clipboard-API blockiert ist
        prompt("Preset-Link (bitte manuell kopieren):", url);
      });
  } else {
    // Sehr alte Browser
    prompt("Preset-Link (bitte manuell kopieren):", url);
  }
}

// Test-PDF mit QR-Preset – QR-Code als JPEG in das PDF einbetten
function saveTestPresetPdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("jsPDF konnte nicht geladen werden.");
    return;
  }
  if (typeof QRCode === "undefined") {
    alert("QR-Code Bibliothek ist nicht geladen.");
    return;
  }

  const { jsPDF } = window.jspdf;

  // 1) Preset-Link erzeugen
  const presetUrl = generatePresetLink();
  console.log("Testkarten-PDF, Preset-URL:", presetUrl);

  // 2) Karte rendern und als JPEG holen
  renderCard();
  const cardImg = canvas.toDataURL("image/jpeg", 0.95);

  // 3) QR-Code in einem versteckten DIV erzeugen
  const qrDiv = document.createElement("div");
  qrDiv.style.position = "absolute";
  qrDiv.style.left = "-9999px";
  qrDiv.style.top = "0";
  document.body.appendChild(qrDiv);

  new QRCode(qrDiv, {
    text: presetUrl,
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.M
  });

  const srcCanvas = qrDiv.querySelector("canvas");
  if (!srcCanvas) {
    document.body.removeChild(qrDiv);
    alert("QR-Code konnte nicht erzeugt werden.");
    return;
  }

  // 4) QR-Canvas auf eigenes Canvas zeichnen und als JPEG exportieren
  const qrCanvas = document.createElement("canvas");
  qrCanvas.width = 256;
  qrCanvas.height = 256;
  const qctx = qrCanvas.getContext("2d");
  qctx.fillStyle = "#ffffff";
  qctx.fillRect(0, 0, 256, 256);
  qctx.drawImage(srcCanvas, 0, 0, 256, 256);

  const qrImgJpeg = qrCanvas.toDataURL("image/jpeg", 0.95);

  // Aufräumen
  document.body.removeChild(qrDiv);

  // 5) PDF-Seite aufbauen
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const pageHeight = 297;

  // Karte oben mittig
  const cardWidthMm = 190;
  const cardHeightMm = cardWidthMm * (canvas.height / canvas.width);
  const cardX = (pageWidth - cardWidthMm) / 2;
  const cardY = 10;
  pdf.addImage(cardImg, "JPEG", cardX, cardY, cardWidthMm, cardHeightMm);

  // QR-Code unten rechts
  const qrSizeMm = 40;
  const qrX = pageWidth - qrSizeMm - 15;
  const qrY = pageHeight - qrSizeMm - 30;
  pdf.addImage(qrImgJpeg, "JPEG", qrX, qrY, qrSizeMm, qrSizeMm);

  // 6) Textblock mit Beschreibung + aktuellen Werten
  const far = document.getElementById("farText").value || "Hybrid";
  const fsVal = parseInt((fontSizeEl || document.getElementById("fontSize")).value, 10);
  const fbVal = parseInt((farBlurEl   || document.getElementById("farBlur")).value, 10);
  const nsVal = parseInt((nearStrengthEl || document.getElementById("nearStrength")).value, 10);
  const noVal = parseInt((nearOpacityEl  || document.getElementById("nearOpacity")).value, 10);
  const auto  = autoNearEl && autoNearEl.checked;

  pdf.setFontSize(11);
  pdf.text("Testkarte mit Hybrid-Preset", 15, cardY + cardHeightMm + 15);
  pdf.setFontSize(9);
  pdf.text(`Fern-Wort: ${far}`, 15, cardY + cardHeightMm + 22);
  pdf.text("QR-Code scannen, um dieses Preset", 15, cardY + cardHeightMm + 32);
  pdf.text("im Hybrid-Karten-Generator zu laden.", 15, cardY + cardHeightMm + 37);

  // Parameter direkt mit draufdrucken
  let infoY = cardY + cardHeightMm + 47;
  pdf.text(
    `Schriftgröße: ${fsVal}   ·   Unschärfe Fern: ${fbVal}   ·   Stärke Nah-Kanten: ${nsVal}   ·   Deckkraft Nah: ${noVal}`,
    15,
    infoY
  );
  infoY += 4;
  pdf.text(
    `Automatik Nah-Wort: ${auto ? "AN (aus Fern-Wort erzeugt)" : "AUS (manuell eingegeben)"}`,
    15,
    infoY
  );

  // 7) Speichern
  const fileName = "Hybrid-Test-" + safeFileName(far) + ".pdf";
  pdf.save(fileName);
}



// Init
window.addEventListener("load", () => {
  const farInput  = document.getElementById("farText");
  const nearInput = document.getElementById("nearText");
  autoNearEl = document.getElementById("autoNear");

  fontSizeEl = document.getElementById("fontSize");
  farBlurEl = document.getElementById("farBlur");
  nearStrengthEl = document.getElementById("nearStrength");
  nearOpacityEl = document.getElementById("nearOpacity");

  const params = new URLSearchParams(window.location.search);
  const presetToken = params.get("preset");
  if (presetToken) {
    const obj = decodePresetFromToken(presetToken);
    if (obj) {
      if (obj.farText !== undefined) farInput.value = obj.farText;
      if (obj.nearText !== undefined) nearInput.value = obj.nearText;
      if (typeof obj.autoNear === "boolean") autoNearEl.checked = obj.autoNear;

      if (obj.fontSize !== undefined) fontSizeEl.value = obj.fontSize;
      if (obj.farBlur !== undefined) farBlurEl.value = obj.farBlur;
      if (obj.nearStrength !== undefined) nearStrengthEl.value = obj.nearStrength;
      if (obj.nearOpacity !== undefined) nearOpacityEl.value = obj.nearOpacity;
    }
  }

  if (!nearInput.value && autoNearEl.checked) {
    nearInput.value = generateNearFromFar(farInput.value);
  }

  farInput.addEventListener("input", () => {
    if (autoNearEl.checked) {
      nearInput.value = generateNearFromFar(farInput.value);
    }
    renderCard();
    updateContextTip();
  });

  nearInput.addEventListener("input", () => {
    autoNearEl.checked = false;
    renderCard();
    updateContextTip();
  });

  autoNearEl.addEventListener("change", () => {
    if (autoNearEl.checked) {
      nearInput.value = generateNearFromFar(farInput.value);
      renderCard();
    }
    updateContextTip();
  });

  document.getElementById("renderBtn").addEventListener("click", () => {
    renderCard();
    updateContextTip();
  });
  document.getElementById("saveBtn").addEventListener("click", saveSingleCard);
  document.getElementById("saveA4Btn").addEventListener("click", saveA4Sheet);
  document.getElementById("savePdfBtn").addEventListener("click", savePdfA4);
  const testBtn = document.getElementById("saveTestQrPdfBtn");
if (testBtn) {
  testBtn.addEventListener("click", () => {
    console.log("Testkarten-Button geklickt");
    saveTestPresetPdf();
  });
} else {
  console.warn("Button #saveTestQrPdfBtn nicht gefunden – ID in index.html prüfen.");
}

  document.getElementById("exportPresetBtn").addEventListener("click", exportPreset);
  document.getElementById("importPresetBtn").addEventListener("click", importPreset);
  document.getElementById("donateBtn").addEventListener("click", () => {
    window.open("https://www.paypal.com/paypalme/timholzhausen", "_blank", "noopener");
  });
const shareBtn = document.getElementById("sharePresetBtn");
if (shareBtn) {
  shareBtn.addEventListener("click", () => {
    sharePresetLink();
  });
}
  ["fontSize","farBlur","nearStrength","nearOpacity"].forEach(id => {
    const slider = document.getElementById(id);
    slider.addEventListener("input", () => {
      updateSliderLabel(id);
      renderCard();
      updateContextTip();
    });
  });

  updateAllSliderLabels();
  renderCard();
  updateContextTip();
});
