// app.js – Hybridkarten App mit Mehrsprachigkeit, Fern-Halo, Nah-Füllung und Background-Auswahl

let fontSizeEl, farBlurEl, farHaloEl, nearStrengthEl, nearOpacityEl, nearFillEl, autoNearEl;
let currentLang = window.I18N ? window.I18N.defaultLang : "de";

const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");

const FONT_STACK = '"American Typewriter","Courier Prime","Courier New",monospace';

// ---------- Hintergrund-Handling mit Auswahl ----------

let bgReady = false;
let bgImage = null;
let currentBgFile = "background_print.jpg";

function loadBackground(file) {
  bgReady = false;
  bgImage = new Image();
  bgImage.onload = () => {
    bgReady = true;
    renderCard();
  };
  bgImage.onerror = () => {
    bgReady = false;
    renderCard();
  };
  bgImage.src = file;
}

// ---------- Parameter lesen ----------

function getParamsRaw() {
  const fsEl = fontSizeEl || document.getElementById("fontSize");
  const fbEl = farBlurEl || document.getElementById("farBlur");
  const fhEl = farHaloEl || document.getElementById("farHalo");
  const nsEl = nearStrengthEl || document.getElementById("nearStrength");
  const noEl = nearOpacityEl || document.getElementById("nearOpacity");
  const nfEl = nearFillEl || document.getElementById("nearFill");

  return {
    farText: document.getElementById("farText").value || "",
    nearText: document.getElementById("nearText").value || "",
    fontSize: parseInt((fsEl && fsEl.value) || "230", 10),
    farBlur: parseInt((fbEl && fbEl.value) || "15", 10),
    farHalo: parseInt((fhEl && fhEl.value) || "60", 10) / 100,
    nearStrength: parseInt((nsEl && nsEl.value) || "40", 10) / 100,
    nearOpacity: parseInt((noEl && noEl.value) || "60", 10) / 100,
    nearFill: parseInt((nfEl && nfEl.value) || "40", 10) / 100
  };
}

function getParams() {
  return getParamsRaw();
}

// ---------- Zeichnen Fern-Wort mit Halo ----------

function drawFarTextWithHalo(targetCtx, text, x, y, fontSize, blur, haloStrength) {
  const halo = Math.max(0, Math.min(1, haloStrength || 0.6));
  const baseBlur = blur || 10;

  targetCtx.save();
  targetCtx.textAlign = "center";
  targetCtx.textBaseline = "middle";
  targetCtx.font = `900 ${fontSize}px ${FONT_STACK}`;

  // 1️⃣ großer, weicher Halo
  targetCtx.filter = `blur(${baseBlur * 2.0}px)`;
  targetCtx.fillStyle = `rgba(0,0,0,${0.15 + 0.25 * halo})`;
  targetCtx.fillText(text, x, y + fontSize * 0.02);

  // 2️⃣ Körper
  targetCtx.filter = `blur(${baseBlur * 1.1}px)`;
  targetCtx.fillStyle = `rgba(0,0,0,${0.35 + 0.25 * halo})`;
  targetCtx.fillText(text, x, y);

  // 3️⃣ Kern
  targetCtx.filter = `blur(${baseBlur * 0.6}px)`;
  targetCtx.fillStyle = `rgba(0,0,0,${0.5 + 0.3 * halo})`;
  targetCtx.fillText(text, x, y);

  targetCtx.filter = "none";
  targetCtx.restore();
}

// ---------- Render-Funktionen ----------

function renderCardOnContext(targetCtx, farText, nearText, p) {
  const w = canvas.width;
  const h = canvas.height;

  targetCtx.save();
  targetCtx.setTransform(1, 0, 0, 1, 0, 0);
  targetCtx.clearRect(0, 0, w, h);
  targetCtx.fillStyle = "#ffffff";
  targetCtx.fillRect(0, 0, w, h);

  if (bgReady && bgImage) {
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

  // Fern-Wort mit Halo
  drawFarTextWithHalo(
    targetCtx,
    farText,
    centerX,
    centerY,
    p.fontSize,
    p.farBlur,
    p.farHalo
  );

  // Nah-Wort (High-Pass + Füllung)
  if (nearText.trim() !== "") {
    drawNearHighPass(
      nearText,
      centerX,
      centerY,
      p.fontSize,
      p.nearStrength,
      p.nearOpacity,
      targetCtx,
      p.nearFill
    );
  }
}

function renderCard() {
  const p = getParams();
  renderCardOnContext(ctx, p.farText, p.nearText, p);
  updatePreview();
}

// High-Pass-Effekt für Nah-Wort + Innen-Füllung
function drawNearHighPass(text, x, y, fontSize, strength, globalOpacity, targetCtx = ctx, fillOpacity = 0) {
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

  // zusätzliche graue Innen-Füllung
  if (fillOpacity > 0) {
    targetCtx.save();
    targetCtx.globalAlpha = Math.max(0, Math.min(1, fillOpacity));
    targetCtx.filter = "blur(1.5px)";
    targetCtx.font = `900 ${fontSize}px ${FONT_STACK}`;
    targetCtx.textAlign = "center";
    targetCtx.textBaseline = "middle";
    targetCtx.fillStyle = "#777777";
    targetCtx.fillText(text, x, y);
    targetCtx.filter = "none";
    targetCtx.restore();
  }
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

// ---------- Export-Helper ----------

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

function drawBgRect(ctxBg, x, y, w, h) {
  ctxBg.save();
  ctxBg.fillStyle = "#ffffff";
  ctxBg.fillRect(x, y, w, h);
  if (bgReady && bgImage) {
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
    .substring(0, 50);
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
    farHalo: p.farHalo,
    nearStrength: p.nearStrength,
    nearOpacity: p.nearOpacity,
    nearFill: p.nearFill
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

// ---------- automatische Nah-Wort-Erzeugung ----------

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

// ---------- Slider-Anzeigen ----------

function updateSliderLabel(id) {
  const slider = document.getElementById(id);
  const label = document.getElementById(id + "Val");
  if (slider && label) label.textContent = slider.value;
}

function updateAllSliderLabels() {
  ["fontSize","farBlur","farHalo","nearStrength","nearOpacity","nearFill"].forEach(updateSliderLabel);
}

// ---------- Kontext-Hinweis ----------

function t(key) {
  return window.I18N.get(currentLang, key);
}

function updateContextTip() {
  const tipBox = document.getElementById("contextTip");
  if (!tipBox) return;

  const fs = parseInt((fontSizeEl || document.getElementById("fontSize")).value, 10);
  const fb = parseInt((farBlurEl || document.getElementById("farBlur")).value, 10);
  const fhRaw = parseInt((farHaloEl || document.getElementById("farHalo")).value, 10);
  const fh = fhRaw / 100;
  const nsRaw = parseInt((nearStrengthEl || document.getElementById("nearStrength")).value, 10);
  const noRaw = parseInt((nearOpacityEl || document.getElementById("nearOpacity")).value, 10);
  const ns = nsRaw / 100;
  const no = noRaw / 100;
  const auto = autoNearEl && autoNearEl.checked;

  let lines = [];

  if (fs < 170) {
    lines.push(t("ctx.fontSize.small"));
  } else if (fs < 260) {
    lines.push(t("ctx.fontSize.medium"));
  } else {
    lines.push(t("ctx.fontSize.large"));
  }

  if (fb < 8) {
    lines.push(t("ctx.blur.low"));
  } else if (fb < 15) {
    lines.push(t("ctx.blur.medium"));
  } else {
    lines.push(t("ctx.blur.high"));
  }

  if (fh < 0.35) {
    lines.push(t("ctx.halo.low"));
  } else if (fh < 0.7) {
    lines.push(t("ctx.halo.medium"));
  } else {
    lines.push(t("ctx.halo.high"));
  }

  if (ns < 0.25) {
    lines.push(t("ctx.nearStrength.low"));
  } else if (ns < 0.5) {
    lines.push(t("ctx.nearStrength.medium"));
  } else {
    lines.push(t("ctx.nearStrength.high"));
  }

  if (no < 0.35) {
    lines.push(t("ctx.opacity.low"));
  } else if (no < 0.6) {
    lines.push(t("ctx.opacity.medium"));
  } else {
    lines.push(t("ctx.opacity.high"));
  }

  let riskScore = 0;
  if (fb < 8) riskScore += 2;
  if (no > 0.6) riskScore += 2;
  if (ns > 0.5) riskScore += 1;
  if (fh < 0.35) riskScore += 1;

  let riskKey;
  if (riskScore <= 1) riskKey = "ctx.risk.low";
  else if (riskScore <= 3) riskKey = "ctx.risk.medium";
  else riskKey = "ctx.risk.high";

  let usecaseKey;
  if (fs > 260 && fb > 14) usecaseKey = "ctx.usecase.large";
  else if (fs > 200) usecaseKey = "ctx.usecase.medium";
  else usecaseKey = "ctx.usecase.small";

  let audienceKey;
  if (no > 0.6 || ns > 0.5 || fb < 8 || fh < 0.35) {
    audienceKey = "ctx.audience.careful";
  } else {
    audienceKey = "ctx.audience.safe";
  }

  let printKey;
  if (fb > 14 || fh > 0.7) {
    printKey = "ctx.print.high";
  } else {
    printKey = "ctx.print.standard";
  }

  let presetTip = "";
  if (fb >= 10 && fb <= 17 && no >= 0.4 && no <= 0.65 && ns >= 0.25 && ns <= 0.55 && fh >= 0.4 && fh <= 0.8) {
    presetTip = t("ctx.preset.tip");
  }

  if (auto) {
    lines.push(t("ctx.auto.on"));
  }

  let exportKey;
  if (riskScore <= 2 && fs >= 200) exportKey = "ctx.export.safe";
  else exportKey = "ctx.export.test";

  tipBox.innerHTML =
    lines.join("<br>") +
    "<hr style='border:none;border-top:1px solid #ccc;margin:6px 0'>" +
    t(riskKey) + "<br>" +
    t(usecaseKey) + "<br>" +
    t(audienceKey) + "<br>" +
    t(printKey) + (presetTip ? "<br>" + presetTip : "") + "<br>" +
    t(exportKey);
}

// ---------- Presets ----------

function getCurrentPresetObject() {
  const p = getParamsRaw();
  return {
    farText: document.getElementById("farText").value,
    nearText: document.getElementById("nearText").value,
    fontSize: p.fontSize,
    farBlur: p.farBlur,
    farHalo: parseInt((farHaloEl || document.getElementById("farHalo")).value, 10),
    nearStrength: parseInt((nearStrengthEl || document.getElementById("nearStrength")).value, 10),
    nearOpacity: parseInt((nearOpacityEl || document.getElementById("nearOpacity")).value, 10),
    nearFill: parseInt((nearFillEl || document.getElementById("nearFill")).value, 10),
    autoNear: autoNearEl && autoNearEl.checked,
    lang: currentLang || "de",
    background: currentBgFile || "background_print.jpg"
  };
}

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
  if (preset.lang && window.I18N.translations[preset.lang]) {
    currentLang = preset.lang;
    const langSelect = document.getElementById("langSelect");
    if (langSelect) langSelect.value = currentLang;
    setLanguage(currentLang);
  }

  if (preset.fontSize !== undefined) fontSizeEl.value = preset.fontSize;
  if (preset.farBlur !== undefined) farBlurEl.value = preset.farBlur;
  if (preset.farHalo !== undefined) farHaloEl.value = preset.farHalo;
  if (preset.nearStrength !== undefined) nearStrengthEl.value = preset.nearStrength;
  if (preset.nearOpacity !== undefined) nearOpacityEl.value = preset.nearOpacity;
  if (preset.nearFill !== undefined) nearFillEl.value = preset.nearFill;

  const bgSelect = document.getElementById("bgSelect");
  if (preset.background && bgSelect) {
    currentBgFile = preset.background;
    bgSelect.value = currentBgFile;
    loadBackground(currentBgFile);
  }

  updateAllSliderLabels();
  renderCard();
  updateContextTip();
}

// ---------- Preset-Sharing per URL ----------

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
        prompt("Preset-Link (bitte manuell kopieren):", url);
      });
  } else {
    prompt("Preset-Link (bitte manuell kopieren):", url);
  }
}

// ---------- Test-PDF mit QR ----------

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

  const presetUrl = generatePresetLink();

  renderCard();
  const cardImg = canvas.toDataURL("image/jpeg", 0.95);

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

  const qrCanvas = document.createElement("canvas");
  qrCanvas.width = 256;
  qrCanvas.height = 256;
  const qctx = qrCanvas.getContext("2d");
  qctx.fillStyle = "#ffffff";
  qctx.fillRect(0, 0, 256, 256);
  qctx.drawImage(srcCanvas, 0, 0, 256, 256);

  const qrImgJpeg = qrCanvas.toDataURL("image/jpeg", 0.95);
  document.body.removeChild(qrDiv);

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth = 210;
  const pageHeight = 297;

  const cardWidthMm = 190;
  const cardHeightMm = cardWidthMm * (canvas.height / canvas.width);
  const cardX = (pageWidth - cardWidthMm) / 2;
  const cardY = 10;
  pdf.addImage(cardImg, "JPEG", cardX, cardY, cardWidthMm, cardHeightMm);

  const qrSizeMm = 40;
  const qrX = pageWidth - qrSizeMm - 15;
  const qrY = pageHeight - qrSizeMm - 30;
  pdf.addImage(qrImgJpeg, "JPEG", qrX, qrY, qrSizeMm, qrSizeMm);

  const far = document.getElementById("farText").value || "Hybrid";
  const fsVal = parseInt((fontSizeEl || document.getElementById("fontSize")).value, 10);
  const fbVal = parseInt((farBlurEl || document.getElementById("farBlur")).value, 10);
  const fhVal = parseInt((farHaloEl || document.getElementById("farHalo")).value, 10);
  const nsVal = parseInt((nearStrengthEl || document.getElementById("nearStrength")).value, 10);
  const nfVal = parseInt((nearFillEl || document.getElementById("nearFill")).value, 10);
  const noVal = parseInt((nearOpacityEl || document.getElementById("nearOpacity")).value, 10);
  const auto  = autoNearEl && autoNearEl.checked;

  pdf.setFontSize(11);
  pdf.text(t("pdf.test.title"), 15, cardY + cardHeightMm + 15);
  pdf.setFontSize(9);
  pdf.text(`${t("pdf.test.farLabel")} ${far}`, 15, cardY + cardHeightMm + 22);
  pdf.text(t("pdf.test.line1"), 15, cardY + cardHeightMm + 32);
  pdf.text(t("pdf.test.line2"), 15, cardY + cardHeightMm + 37);

  let infoY = cardY + cardHeightMm + 47;
  const paramLine = `FontSize: ${fsVal}  ·  Blur: ${fbVal}  ·  Halo: ${fhVal}  ·  Edge: ${nsVal}  ·  Fill: ${nfVal}  ·  Opacity: ${noVal}`;
  pdf.text(paramLine, 15, infoY);
  infoY += 4;
  const autoText = auto ? t("pdf.test.autoOn") : t("pdf.test.autoOff");
  pdf.text(autoText, 15, infoY);

  const fileName = "Hybrid-Test-" + safeFileName(far) + ".pdf";
  pdf.save(fileName);
}

// ---------- Mehrsprachigkeit anwenden ----------

function setLanguage(lang) {
  if (!window.I18N || !window.I18N.translations[lang]) {
    lang = window.I18N ? window.I18N.defaultLang : "de";
  }
  currentLang = lang;
  document.documentElement.lang = lang;

  const root = document;

  root.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val) el.textContent = val;
  });

  root.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    const val = t(key);
    if (val) el.innerHTML = val;
  });

  root.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = t(key);
    if (val) el.setAttribute("placeholder", val);
  });

  root.querySelectorAll("[data-i18n-tip]").forEach(el => {
    const key = el.getAttribute("data-i18n-tip");
    const val = t(key);
    if (val) el.setAttribute("data-tip", val);
  });

  updateContextTip();
    // ✅ PDF-Link aktualisieren
  updateManualLink(lang);
}
function updateManualLink(lang) {
  const manualLink = document.getElementById("manualLink");
  if (!manualLink) return;

  manualLink.href = `Hybridkarten_Anleitung_${lang}.pdf`;
}
// ---------- Initialisierung ----------

window.addEventListener("load", () => {
  const farInput  = document.getElementById("farText");
  const nearInput = document.getElementById("nearText");
  autoNearEl = document.getElementById("autoNear");

  fontSizeEl = document.getElementById("fontSize");
  farBlurEl = document.getElementById("farBlur");
  farHaloEl = document.getElementById("farHalo");
  nearStrengthEl = document.getElementById("nearStrength");
  nearOpacityEl = document.getElementById("nearOpacity");
  nearFillEl = document.getElementById("nearFill");

  const langSelect = document.getElementById("langSelect");
  const bgSelect = document.getElementById("bgSelect");

  const params = new URLSearchParams(window.location.search);
  const presetToken = params.get("preset");
  let presetFromUrl = null;
  if (presetToken) {
    presetFromUrl = decodePresetFromToken(presetToken);
    if (presetFromUrl && presetFromUrl.lang && window.I18N.translations[presetFromUrl.lang]) {
      currentLang = presetFromUrl.lang;
    }
  } else {
    const storedLang = window.localStorage ? window.localStorage.getItem("hybrid_lang") : null;
    if (storedLang && window.I18N.translations[storedLang]) {
      currentLang = storedLang;
    } else {
      currentLang = window.I18N.defaultLang;
    }
  }

  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", () => {
      currentLang = langSelect.value;
      if (window.localStorage) {
        window.localStorage.setItem("hybrid_lang", currentLang);
      }
      setLanguage(currentLang);
    });
  }

  setLanguage(currentLang);

  if (bgSelect) {
    currentBgFile = bgSelect.value || "background_print.jpg";
    loadBackground(currentBgFile);
    bgSelect.addEventListener("change", () => {
      currentBgFile = bgSelect.value;
      loadBackground(currentBgFile);
    });
  } else {
    loadBackground(currentBgFile);
  }

  const farInputDefault = farInput.value || "Zauberstab";

  if (presetFromUrl) {
    if (presetFromUrl.farText !== undefined) farInput.value = presetFromUrl.farText;
    if (presetFromUrl.nearText !== undefined) nearInput.value = presetFromUrl.nearText;
    if (typeof presetFromUrl.autoNear === "boolean") autoNearEl.checked = presetFromUrl.autoNear;

    if (presetFromUrl.fontSize !== undefined) fontSizeEl.value = presetFromUrl.fontSize;
    if (presetFromUrl.farBlur !== undefined) farBlurEl.value = presetFromUrl.farBlur;
    if (presetFromUrl.farHalo !== undefined) farHaloEl.value = presetFromUrl.farHalo;
    if (presetFromUrl.nearStrength !== undefined) nearStrengthEl.value = presetFromUrl.nearStrength;
    if (presetFromUrl.nearOpacity !== undefined) nearOpacityEl.value = presetFromUrl.nearOpacity;
    if (presetFromUrl.nearFill !== undefined) nearFillEl.value = presetFromUrl.nearFill;

    if (presetFromUrl.background && bgSelect) {
      currentBgFile = presetFromUrl.background;
      bgSelect.value = currentBgFile;
      loadBackground(currentBgFile);
    }
  }

  if (!nearInput.value && autoNearEl.checked) {
    nearInput.value = generateNearFromFar(farInput.value || farInputDefault);
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
  document.getElementById("saveTestQrPdfBtn").addEventListener("click", saveTestPresetPdf);
  document.getElementById("exportPresetBtn").addEventListener("click", exportPreset);
  document.getElementById("importPresetBtn").addEventListener("click", importPreset);
  document.getElementById("sharePresetBtn").addEventListener("click", sharePresetLink);
  document.getElementById("donateBtn").addEventListener("click", () => {
    window.open("https://www.paypal.com/paypalme/timholzhausen", "_blank", "noopener");
  });

  ["fontSize","farBlur","farHalo","nearStrength","nearOpacity","nearFill"].forEach(id => {
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
