// i18n.js – einfache Mehrsprachigkeit (DE / EN / FR / ES)

window.I18N = {
  defaultLang: "de",
  translations: {

    /* =========================
       DEUTSCH
    ========================= */
    de: {
      "app.title": "Hybrid-Karte",
      "lang.label": "Sprache:",
      "intro.text":
        "1. Fern-Wort eingeben – Nah-Wort wird automatisch „verfremdet“.<br>" +
        "2. Regler einstellen und Vorschau prüfen.<br>" +
        "3. Mit den Export-Buttons druckfertige Dateien erzeugen.",

      "label.far": "Fern-Wort (Publikum)",
      "label.near": "Nah-Wort (Zuschauer nah)",
      "auto.text": "Nah-Wort automatisch aus Fern-Wort erzeugen",

      "section.fine": "Feineinstellung",

      "label.fontSize": "Schriftgröße",
      "tooltip.fontSize": "Größere Schrift ist für größere Räume und ältere Zuschauer besser lesbar, kleinere Schrift wirkt näher und subtiler.",

      "label.farBlur": "Unschärfe Fern-Wort",
      "tooltip.farBlur": "Steuert, wie weich das Fern-Wort wirkt. Zu wenig Unschärfe macht das Nah-Wort auffälliger, zu viel Unschärfe lässt das Fern-Wort verschwimmen.",

      "label.farColor": "Fern-Wort-Helligkeit",
      "tooltip.farColor": "Steuert, wie hell oder dunkel das Fern-Wort ist. Hellere Werte wirken weicher und moderner, dunkle Werte kontrastreicher und klassischer.",

      "label.farHalo": "Fern-Halo (Glüheffekt)",
      "tooltip.farHalo": "Der Halo ist der weiche Schimmer um das Fern-Wort. Mehr Halo stabilisiert die Lesbarkeit aus der Distanz.",

      "label.nearStrength": "Stärke Nah-Kanten",
      "tooltip.nearStrength": "Bestimmt, wie stark sich das Nah-Wort in der Nähe abzeichnet.",

      "label.nearOpacity": "Deckkraft Nah-Wort",
      "tooltip.nearOpacity": "Regelt, wie sichtbar das Nah-Wort für den Zuschauer ist.",

      "label.nearFill": "Nah-Füllung (Innen)",
      "tooltip.nearFill": "Graue Innenfläche des Nah-Worts – verbessert Nahlesbarkeit.",

      "section.background": "Hintergrund",
      "label.background": "Motiv auswählen",

      "btn.render": "Erzeugen",

      "section.export": "Export",
      "btn.save.png": "Einzelkarte (PNG)",
      "btn.save.a4png": "DIN A4 – 2× A5 (PNG)",
      "btn.save.pdf": "DIN A4 – PDF (2×A5 Vorder/Rück)",
      "btn.save.testqr": "Testkarte mit QR (PDF)",

      "section.presets": "Preset Import/Export",
      "btn.preset.export": "Einstellungen exportieren",
      "btn.preset.import": "Einstellungen importieren",
      "btn.preset.share": "Teilen (Link kopieren)",

      "section.support": "Unterstützen",
      "btn.donate": "Per PayPal spenden",

      "section.info": "Info & Anleitung",
      "info.link": "📄 PDF-Anleitung öffnen",

      "previewMain.label": "Nah-Vorschau – Sicht des Zuschauers auf der Bühne",
      "section.previewFar": "Fern-Vorschau",
      "previewFar.caption": "Publikums-Sicht (verkleinert)",
      "section.hint": "Hinweis",

      "pdf.test.title": "Testkarte für Hybrid-Preset",
      "pdf.test.farLabel": "Fern-Wort:"
    },

    /* =========================
       ENGLISH
    ========================= */
    en: {
      "app.title": "Hybrid Card",
      "lang.label": "Language:",
      "intro.text":
        "1. Enter the far word – the near word is automatically distorted.<br>" +
        "2. Adjust the sliders and check the preview.<br>" +
        "3. Use the export buttons for print-ready files.",

      "label.far": "Far word (audience)",
      "label.near": "Near word (spectator)",
      "auto.text": "Generate near word automatically",

      "section.fine": "Fine tuning",

      "label.fontSize": "Font size",
      "label.farBlur": "Far blur",
      "label.farColor": "Far word brightness",
      "label.farHalo": "Far halo (glow)",
      "label.nearStrength": "Near edge strength",
      "label.nearOpacity": "Near opacity",
      "label.nearFill": "Near fill",

      "section.background": "Background",

      "btn.render": "Generate",

      "section.export": "Export",
      "btn.save.png": "Single card (PNG)",
      "btn.save.a4png": "A4 – 2× A5 (PNG)",
      "btn.save.pdf": "A4 – PDF (2×A5 front/back)",
      "btn.save.testqr": "Test card with QR (PDF)",

      "section.info": "Info & manual",
      "info.link": "📄 Open PDF manual",

      "previewMain.label": "Near preview – spectator view",
      "section.previewFar": "Far preview",

      "pdf.test.title": "Test card for hybrid preset",
      "pdf.test.farLabel": "Far word:"
    },

    /* =========================
       FRANÇAIS
    ========================= */
    fr: {
      "app.title": "Carte hybride",
      "lang.label": "Langue :",

      "label.far": "Mot lointain (public)",
      "label.near": "Mot proche (spectateur)",

      "section.fine": "Réglages fins",

      "label.fontSize": "Taille de police",
      "label.farBlur": "Flou lointain",
      "label.farColor": "Luminosité du mot lointain",
      "label.farHalo": "Halo lointain",
      "label.nearStrength": "Contours proches",
      "label.nearOpacity": "Opacité du mot proche",
      "label.nearFill": "Remplissage intérieur",

      "btn.render": "Générer",

      "section.export": "Export",
      "btn.save.pdf": "PDF A4 (recto/verso)",

      "info.link": "📄 Ouvrir le manuel PDF",

      "previewMain.label": "Aperçu proche",

      "pdf.test.title": "Carte test – préréglage"
    },

    /* =========================
       ESPAÑOL ✅ NEU
    ========================= */
    es: {
      "app.title": "Carta híbrida",
      "lang.label": "Idioma:",
      "intro.text":
        "1. Introduce la palabra lejana – la palabra cercana se modifica automáticamente.<br>" +
        "2. Ajusta los controles y revisa la vista previa.<br>" +
        "3. Usa las opciones de exportación para imprimir.",

      "label.far": "Palabra lejana (público)",
      "label.near": "Palabra cercana (espectador)",
      "auto.text": "Generar automáticamente la palabra cercana",

      "section.fine": "Ajuste fino",

      "label.fontSize": "Tamaño de fuente",
      "tooltip.fontSize": "Fuentes grandes funcionan mejor en salas grandes y con público mayor.",

      "label.farBlur": "Desenfoque lejano",
      "tooltip.farBlur": "Controla lo suave que aparece la palabra lejana.",

      "label.farColor": "Brillo de la palabra lejana",
      "tooltip.farColor": "Define qué tan clara u oscura es la palabra lejana.",

      "label.farHalo": "Halo (resplandor)",
      "tooltip.farHalo": "Resplandor suave alrededor de la palabra lejana para mejorar la legibilidad.",

      "label.nearStrength": "Fuerza de bordes cercanos",
      "tooltip.nearStrength": "Cuánto destacan los bordes de la palabra cercana.",

      "label.nearOpacity": "Opacidad de la palabra cercana",
      "tooltip.nearOpacity": "Visibilidad general de la palabra cercana.",

      "label.nearFill": "Relleno interior cercano",
      "tooltip.nearFill": "Relleno gris interior para mejorar la lectura cercana.",

      "section.background": "Fondo",
      "label.background": "Elegir fondo",

      "btn.render": "Generar",

      "section.export": "Exportar",
      "btn.save.png": "Carta individual (PNG)",
      "btn.save.a4png": "A4 – 2× A5 (PNG)",
      "btn.save.pdf": "A4 – PDF (2×A5 anverso/reverso)",
      "btn.save.testqr": "Carta de prueba con QR (PDF)",

      "section.presets": "Presets",
      "btn.preset.export": "Exportar ajustes",
      "btn.preset.import": "Importar ajustes",
      "btn.preset.share": "Compartir (copiar enlace)",

      "section.info": "Información y guía",
      "info.link": "📄 Abrir manual en PDF",

      "previewMain.label": "Vista cercana – espectador en el escenario",
      "section.previewFar": "Vista lejana",
      "previewFar.caption": "Vista del público",

      "pdf.test.title": "Carta de prueba – preset híbrido",
      "pdf.test.farLabel": "Palabra lejana:"
    }
  },

  get(lang, key) {
    const dict = this.translations[lang] || this.translations[this.defaultLang];
    return dict[key] || this.translations[this.defaultLang][key] || "";
  }
};
