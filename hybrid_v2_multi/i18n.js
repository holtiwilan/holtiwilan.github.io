// i18n.js – einfache Mehrsprachigkeit

window.I18N = {
  defaultLang: "de",
  translations: {
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
      "tooltip.farHalo": "Der Halo ist der weiche Schimmer um das Fern-Wort. Mehr Halo stabilisiert die Lesbarkeit aus der Distanz und ist ideal für größere oder ältere Publika. Wenig Halo sieht cleaner aus, erfordert aber eher kleinere Räume.",

      "label.nearStrength": "Stärke Nah-Kanten",
      "tooltip.nearStrength": "Wie stark die Kanten des Nah-Worts hervorstechen. Höhere Werte machen das Nah-Wort in der Nähe klarer, erhöhen aber die Gefahr, dass das Publikum etwas erahnt.",

      "label.nearOpacity": "Deckkraft Nah-Wort",
      "tooltip.nearOpacity": "Regelt, wie sichtbar das Nah-Wort insgesamt ist. Hohe Werte sind gut lesbar, erhöhen aber das Risiko, dass das Publikum etwas bemerkt.",

      "label.nearFill": "Nah-Füllung (Innen)",
      "tooltip.nearFill": "Steuert die graue Innenfläche des Nah-Worts. Mehr Füllung macht die Buchstaben körperlicher und besser lesbar aus der Nähe, aber auch etwas auffälliger.",

      "scale.small": "Klein",
      "scale.large": "Groß",
      "scale.low": "wenig",
      "scale.high": "stark",
      "scale.soft": "zart",
      "scale.strong": "kräftig",
      "scale.almostInvisible": "fast unsichtbar",
      "scale.visible": "deutlich",
      "scale.dark": "dunkel",
      "scale.bright": "hell",

      "section.background": "Hintergrund",
      "label.background": "Motiv auswählen",
      "background.hint":
        "Lege deine Hintergrundbilder als <b>background_print.jpg</b>, <b>background2.jpg</b>, <b>background3.jpg</b> usw. in den gleichen Ordner wie diese Seite.",

      "btn.render": "Erzeugen",
      "section.export": "Export",
      "btn.save.png": "Einzelkarte (PNG)",
      "btn.save.a4png": "DIN A4 – 2× A5 (PNG)",
      "btn.save.pdf": "DIN A4 – PDF (2×A5 Vorder/Rück)",
      "btn.save.testqr": "Testkarte mit QR (PDF)",
      "export.help":
        "• <b>Einzelkarte (PNG)</b>: eine A5-Vorderseite.<br>" +
        "• <b>DIN A4 – 2× A5 (PNG)</b>: zwei gleiche Vorderseiten untereinander.<br>" +
        "• <b>DIN A4 – PDF</b>: Seite 1 oben Hybridkarte, unten gleiche Karte mit Nah=Fern, Seite 2 zwei Rückseiten.<br>" +
        "• <b>Testkarte mit QR (PDF)</b>: Testkarte mit QR-Code, der dieses Preset wieder in der Web-App lädt.",

      "section.presets": "Preset Import/Export",
      "preset.placeholder": "Hier erscheinen deine Einstellungen als JSON, z.B. {'fontSize':230,...}",
      "btn.preset.export": "Einstellungen exportieren",
      "btn.preset.import": "Einstellungen importieren",
      "btn.preset.share": "Teilen (Link kopieren)",

      "section.support": "Unterstützen",
      "btn.donate": "Per PayPal spenden",
      "support.text": "Wenn dir der Hybrid-Karten-Generator hilft, freue ich mich über einen Kaffee 😊",

      "section.info": "Info & Anleitung",
      "info.text":
        "Hybrid-Karten Generator von <b>Tim Holzhausen</b>.<br>" +
        "Entwickelt zur praktischen Umsetzung des „100th Monkey“-Prinzips für Bühne, Salon und Wohnzimmer.",
      "info.link": "📄 PDF-Anleitung öffnen",
      "info.feedback": "Fragen oder Feedback? – Am besten zusammen mit ein paar Beispielen aus der Praxis schicken.",
      "version.text": "Version 2.0.0 · Multilingual",

      "previewMain.label": "Nah-Vorschau – Sicht des Zuschauers auf der Bühne",
      "section.previewFar": "Fern-Vorschau",
      "previewFar.caption": "Publikums-Sicht (verkleinert)",
      "section.hint": "Hinweis",

      "ctx.fontSize.small": "Schriftgröße klein – eher für Wohnzimmer und Nahbereich geeignet.",
      "ctx.fontSize.medium": "Schriftgröße ausgewogen – gut für die meisten Bühnen- & Salonsituationen.",
      "ctx.fontSize.large": "Schriftgröße groß – ideal für größere Entfernungen und älteres Publikum.",

      "ctx.blur.low": "Fern-Unschärfe gering – Fern-Wort wirkt sehr scharf, Nah-Wort sollte dann vorsichtig dosiert werden.",
      "ctx.blur.medium": "Fern-Unschärfe mittel – guter Kompromiss zwischen Stabilität und Verschleierung.",
      "ctx.blur.high": "Fern-Unschärfe hoch – sehr weicher Look, unbedingt vorher im Druck testen.",

      "ctx.halo.low": "Fern-Halo schwach – Bild wirkt cleaner, aber das Fern-Wort ist aus großer Distanz weniger stabil.",
      "ctx.halo.medium": "Fern-Halo ausgewogen – guter Glow für die meisten Publika, verbindet Lesbarkeit und Tarnung.",
      "ctx.halo.high": "Fern-Halo stark – Fern-Wort sehr stabil und kontrastreich, Nahbild dafür insgesamt etwas weicher.",

      "ctx.lightness.dark": "Fern-Wort dunkel – hoher Kontrast und sehr robuste Lesbarkeit, wirkt allerdings weniger „fein“.",
      "ctx.lightness.medium": "Fern-Wort mittelhell – weicher, eleganter Look, der gut mit den meisten Hintergründen harmoniert.",
      "ctx.lightness.bright": "Fern-Wort sehr hell – wirkt edel und luftig, aber unbedingt mit gedruckten Karten im Saal testen.",

      "ctx.nearStrength.low": "Nah-Kanten zart – das Nah-Wort verschmilzt stärker mit dem Hintergrund.",
      "ctx.nearStrength.medium": "Nah-Kanten mittel – guter Allround-Effekt, Nah-Wort klar, aber nicht zu hart.",
      "ctx.nearStrength.high": "Nah-Kanten kräftig – Nah-Wort sehr klar, für sensible Publikumssituationen vorsichtig einsetzen.",

      "ctx.opacity.low": "Deckkraft Nah-Wort niedrig – in der Nähe subtil, vom Publikum praktisch unsichtbar.",
      "ctx.opacity.medium": "Deckkraft Nah-Wort mittel – gute Balance zwischen Lesbarkeit für den Zuschauer und Sicherheit.",
      "ctx.opacity.high": "Deckkraft Nah-Wort hoch – sehr gut lesbar aus der Nähe, aber stärkeres Risiko, dass etwas auffällt.",

      "ctx.risk.low": "🔒 Risikostufe: niedrig – sehr bühnensicher eingestellt.",
      "ctx.risk.medium": "⚠️ Risikostufe: mittel – vor echtem Auftritt unbedingt im Saal testen.",
      "ctx.risk.high": "🚨 Risikostufe: hoch – eher nur zum Experimentieren oder für Testkarten verwenden.",

      "ctx.usecase.large": "🎭 Einsatz: Große Bühne oder Theater.",
      "ctx.usecase.medium": "🎩 Einsatz: Bühne oder Salon.",
      "ctx.usecase.small": "🪄 Einsatz: Wohnzimmer, Close-up oder sehr kleiner Raum.",

      "ctx.audience.careful": "👀 Publikum: Bitte auf Sitzabstand, Sehschärfe und Licht achten – eher vorsichtig einsetzen.",
      "ctx.audience.safe": "🙂 Publikum: Einstellungen sind für gemischtes Publikum gut geeignet.",

      "ctx.print.high": "🖨️ Druck: Hoher Kontrast oder starke Effekte – nach dem ersten Ausdruck sorgfältig prüfen.",
      "ctx.print.standard": "🖨️ Druck: Standard-Kontrast – für die meisten Drucker gut geeignet.",

      "ctx.preset.tip": "💡 Preset-Tipp: Diese Einstellung eignet sich gut als eigener Sweet-Spot. Jetzt mit „Einstellungen exportieren“ sichern.",
      "ctx.auto.on": "⚙️ Automatik: Nah-Wort wird aus dem Fern-Wort erzeugt – ideal zum schnellen Experimentieren.",

      "ctx.export.safe": "📦 Export-Empfehlung: Für den Auftritt den DIN A4 PDF-Export nutzen (2×A5 Vorder/Rück).",
      "ctx.export.test": "🧪 Export-Empfehlung: Erst Testkarten drucken (PNG oder Test-PDF mit QR) und in der echten Distanz überprüfen.",

      "pdf.test.title": "Testkarte für Hybrid-Preset",
      "pdf.test.farLabel": "Fern-Wort:",
      "pdf.test.line1": "Der QR-Code lädt genau diese Einstellungen wieder in der Web-App.",
      "pdf.test.line2": "Ideal, um Presets zu testen, zu archivieren oder mit Kollegen zu teilen.",
      "pdf.test.autoOn": "Automatik: Nah-Wort wird aus dem Fern-Wort generiert.",
      "pdf.test.autoOff": "Automatik: Nah-Wort ist manuell eingegeben."
    },

    en: {
      "app.title": "Hybrid Card",
      "lang.label": "Language:",
      "intro.text":
        "1. Enter the far word – the near word is automatically distorted.<br>" +
        "2. Adjust the sliders and check the preview.<br>" +
        "3. Use the export buttons for print-ready files.",

      "label.far": "Far word (audience)",
      "label.near": "Near word (spectator close-up)",
      "auto.text": "Generate near word automatically from far word",

      "section.fine": "Fine tuning",

      "label.fontSize": "Font size",
      "tooltip.fontSize": "Larger font works better for bigger rooms and older eyes, smaller font feels more intimate and close-up.",

      "label.farBlur": "Far-word blur",
      "tooltip.farBlur": "Controls how soft the far word appears. Too little blur makes the near word more obvious, too much blur makes the far word unstable.",

      "label.farColor": "Far-word brightness",
      "tooltip.farColor": "Controls how light or dark the far word appears. Brighter values feel softer and more modern, darker values more contrasty and bold.",

      "label.farHalo": "Far halo (glow)",
      "tooltip.farHalo": "The halo is the soft glow around the far word. More halo stabilises readability at a distance and is ideal for larger or older audiences. Less halo looks cleaner but works better in smaller rooms.",

      "label.nearStrength": "Near-edge strength",
      "tooltip.nearStrength": "Controls how strong the near-word edges are. Higher values make the near word clearer close up, but also increase the chance that the audience senses something.",

      "label.nearOpacity": "Near-word opacity",
      "tooltip.nearOpacity": "Controls how visible the near word is overall. High values read very clearly but make the secret more noticeable.",

      "label.nearFill": "Near fill (inside)",
      "tooltip.nearFill": "Controls the grey inner fill of the near word. More fill makes the letters more solid and readable close up, but also slightly more noticeable.",

      "scale.small": "Small",
      "scale.large": "Large",
      "scale.low": "low",
      "scale.high": "strong",
      "scale.soft": "soft",
      "scale.strong": "strong",
      "scale.almostInvisible": "almost invisible",
      "scale.visible": "clearly visible",
      "scale.dark": "dark",
      "scale.bright": "bright",

      "section.background": "Background",
      "label.background": "Choose artwork",
      "background.hint":
        "Place your background images as <b>background_print.jpg</b>, <b>background2.jpg</b>, <b>background3.jpg</b>, etc. in the same folder as this page.",

      "btn.render": "Generate",
      "section.export": "Export",
      "btn.save.png": "Single card (PNG)",
      "btn.save.a4png": "A4 – 2× A5 (PNG)",
      "btn.save.pdf": "A4 – PDF (2×A5 front/back)",
      "btn.save.testqr": "Test card with QR (PDF)",
      "export.help":
        "• <b>Single card (PNG)</b>: one A5 front side.<br>" +
        "• <b>A4 – 2× A5 (PNG)</b>: two identical fronts below each other.<br>" +
        "• <b>A4 – PDF</b>: page 1 hybrid on top, same card with near=far below, page 2 two backs.<br>" +
        "• <b>Test card with QR (PDF)</b>: test card with QR code that reloads this preset in the web app.",

      "section.presets": "Preset import/export",
      "preset.placeholder": "Your settings will appear here as JSON, e.g. {'fontSize':230,...}",
      "btn.preset.export": "Export settings",
      "btn.preset.import": "Import settings",
      "btn.preset.share": "Share (copy link)",

      "section.support": "Support",
      "btn.donate": "Donate via PayPal",
      "support.text": "If this hybrid card generator is useful to you, I’d be happy about a coffee 😊",

      "section.info": "Info & manual",
      "info.text":
        "Hybrid card generator by <b>Tim Holzhausen</b>.<br>" +
        "Developed to bring the “100th Monkey” principle to stage, parlour and living room.",
      "info.link": "📄 Open PDF manual",
      "info.feedback": "Questions or feedback? – Best send them together with a few real-world examples.",
      "version.text": "Version 2.0.0 · Multilingual",

      "previewMain.label": "Near preview – spectator’s view on stage",
      "section.previewFar": "Far preview",
      "previewFar.caption": "Audience view (scaled down)",
      "section.hint": "Hint",

      "ctx.fontSize.small": "Font size small – better for close-up and living room situations.",
      "ctx.fontSize.medium": "Font size medium – good for most parlour and small stage situations.",
      "ctx.fontSize.large": "Font size large – ideal for bigger distances and older eyes.",

      "ctx.blur.low": "Far blur low – far word appears sharp, use near word carefully.",
      "ctx.blur.medium": "Far blur medium – good balance between stability and camouflage.",
      "ctx.blur.high": "Far blur high – very soft look, make sure to test with your printed cards.",

      "ctx.halo.low": "Far halo low – clean look, but the far word is less stable at greater distances.",
      "ctx.halo.medium": "Far halo medium – good glow for most audiences, balances readability and masking.",
      "ctx.halo.high": "Far halo high – very stable far word, the overall image becomes a bit softer.",

      "ctx.lightness.dark": "Far word dark – high contrast and very robust readability, but less subtle.",
      "ctx.lightness.medium": "Far word mid grey – soft, elegant look that works with most backgrounds.",
      "ctx.lightness.bright": "Far word very bright – airy and refined, but should be tested carefully with real prints.",

      "ctx.nearStrength.low": "Near-edge strength low – near word blends more into the background.",
      "ctx.nearStrength.medium": "Near-edge strength medium – good all-round setting, clear but not too hard.",
      "ctx.nearStrength.high": "Near-edge strength high – very clear near word, use carefully with sensitive audiences.",

      "ctx.opacity.low": "Near-word opacity low – subtle close up, practically invisible for the audience.",
      "ctx.opacity.medium": "Near-word opacity medium – good balance between readability and safety.",
      "ctx.opacity.high": "Near-word opacity high – very readable close up, but also higher risk of detection.",

      "ctx.risk.low": "🔒 Risk level: low – very safe for stage use.",
      "ctx.risk.medium": "⚠️ Risk level: medium – test in the real room before performance.",
      "ctx.risk.high": "🚨 Risk level: high – mainly for experimenting and test cards.",

      "ctx.usecase.large": "🎭 Use: large stage or theatre.",
      "ctx.usecase.medium": "🎩 Use: parlour or small stage.",
      "ctx.usecase.small": "🪄 Use: living room, close-up, very small room.",

      "ctx.audience.careful": "👀 Audience: be careful with seating distance, eyesight and lighting.",
      "ctx.audience.safe": "🙂 Audience: settings are generally safe for mixed audiences.",

      "ctx.print.high": "🖨️ Print: high contrast or stronger effects – carefully inspect the first printed cards.",
      "ctx.print.standard": "🖨️ Print: standard contrast – should work on most printers.",

      "ctx.preset.tip": "💡 Preset tip: This setting works well as a personal sweet spot. Export it now to save.",
      "ctx.auto.on": "⚙️ Automatic: near word is generated from the far word – great for quick experiments.",

      "ctx.export.safe": "📦 Export recommendation: use the A4 PDF export (2×A5 front/back) for performance cards.",
      "ctx.export.test": "🧪 Export recommendation: print test cards first (PNG or test PDF with QR) and check in real distance.",

      "pdf.test.title": "Test card for hybrid preset",
      "pdf.test.farLabel": "Far word:",
      "pdf.test.line1": "The QR code reloads these exact settings in the web app.",
      "pdf.test.line2": "Great for testing, archiving and sharing presets.",
      "pdf.test.autoOn": "Automatic: near word is generated from the far word.",
      "pdf.test.autoOff": "Automatic: near word is entered manually."
    },

    fr: {
      "app.title": "Carte hybride",
      "lang.label": "Langue :",
      "intro.text":
        "1. Saisir le mot lointain – le mot proche est automatiquement modifié.<br>" +
        "2. Régler les curseurs et vérifier l’aperçu.<br>" +
        "3. Utiliser les boutons d’export pour des fichiers prêts à imprimer.",

      "label.far": "Mot lointain (public)",
      "label.near": "Mot proche (spectateur)",
      "auto.text": "Générer automatiquement le mot proche à partir du mot lointain",

      "section.fine": "Réglages fins",

      "label.fontSize": "Taille de police",
      "tooltip.fontSize": "Une police plus grande est mieux lisible pour les grandes salles et les yeux plus âgés, une police plus petite convient aux situations de proximité.",

      "label.farBlur": "Flou du mot lointain",
      "tooltip.farBlur": "Contrôle la douceur du mot lointain. Trop peu de flou rend le mot proche plus visible, trop de flou rend le mot lointain instable.",

      "label.farColor": "Luminosité du mot lointain",
      "tooltip.farColor": "Contrôle la clarté du mot lointain. Plus clair = rendu doux et moderne, plus sombre = contraste fort et plus marqué.",

      "label.farHalo": "Halo lointain (lueur)",
      "tooltip.farHalo": "Le halo est la lueur douce autour du mot lointain. Plus de halo stabilise la lisibilité à distance, idéal pour les grands ou vieux publics. Peu de halo donne un aspect plus « propre », plutôt pour les petites salles.",

      "label.nearStrength": "Force des contours proches",
      "tooltip.nearStrength": "Détermine à quel point les contours du mot proche ressortent. Des valeurs élevées rendent le mot proche très net, mais peuvent révéler quelque chose au public.",

      "label.nearOpacity": "Opacité du mot proche",
      "tooltip.nearOpacity": "Contrôle la visibilité globale du mot proche. Une opacité élevée le rend très lisible, mais augmente aussi le risque que le secret soit remarqué.",

      "label.nearFill": "Remplissage proche (intérieur)",
      "tooltip.nearFill": "Contrôle le remplissage gris à l’intérieur du mot proche. Plus de remplissage rend les lettres plus solides et lisibles de près, mais aussi un peu plus visibles.",

      "scale.small": "Petite",
      "scale.large": "Grande",
      "scale.low": "faible",
      "scale.high": "forte",
      "scale.soft": "doux",
      "scale.strong": "fort",
      "scale.almostInvisible": "presque invisible",
      "scale.visible": "bien visible",
      "scale.dark": "sombre",
      "scale.bright": "clair",

      "section.background": "Fond",
      "label.background": "Choisir le motif",
      "background.hint":
        "Place tes images de fond sous les noms <b>background_print.jpg</b>, <b>background2.jpg</b>, <b>background3.jpg</b>, etc. dans le même dossier que cette page.",

      "btn.render": "Générer",
      "section.export": "Export",
      "btn.save.png": "Carte seule (PNG)",
      "btn.save.a4png": "A4 – 2× A5 (PNG)",
      "btn.save.pdf": "A4 – PDF (2×A5 recto/verso)",
      "btn.save.testqr": "Carte test avec QR (PDF)",
      "export.help":
        "• <b>Carte seule (PNG)</b> : un recto A5.<br>" +
        "• <b>A4 – 2× A5 (PNG)</b> : deux rectos identiques l’un sous l’autre.<br>" +
        "• <b>A4 – PDF</b> : page 1, carte hybride en haut, même carte avec mot proche=mot lointain en bas, page 2, deux versos.<br>" +
        "• <b>Carte test avec QR (PDF)</b> : carte test avec un QR code qui recharge ce préréglage dans l’application web.",

      "section.presets": "Import/export de préréglages",
      "preset.placeholder": "Tes réglages apparaîtront ici en JSON, par ex. {'fontSize':230,...}",
      "btn.preset.export": "Exporter les réglages",
      "btn.preset.import": "Importer les réglages",
      "btn.preset.share": "Partager (copier le lien)",

      "section.support": "Soutenir",
      "btn.donate": "Donner via PayPal",
      "support.text": "Si le générateur de cartes hybrides t’est utile, un café me fera très plaisir 😊",

      "section.info": "Infos & mode d’emploi",
      "info.text":
        "Générateur de cartes hybrides par <b>Tim Holzhausen</b>.<br>" +
        "Conçu pour mettre le principe du « 100th Monkey » en pratique sur scène, en salon ou au salon.",
      "info.link": "📄 Ouvrir le mode d’emploi PDF",
      "info.feedback": "Questions ou retours ? – Le mieux est d’envoyer quelques exemples d’utilisation réelle.",
      "version.text": "Version 2.0.0 · Multilingue",

      "previewMain.label": "Aperçu proche – vue du spectateur sur scène",
      "section.previewFar": "Aperçu lointain",
      "previewFar.caption": "Vue du public (réduite)",
      "section.hint": "Conseil",

      "ctx.fontSize.small": "Taille de police petite – plutôt pour le salon ou la très courte distance.",
      "ctx.fontSize.medium": "Taille de police moyenne – bon compromis pour la plupart des situations.",
      "ctx.fontSize.large": "Taille de police grande – idéale pour les grandes distances et les yeux plus âgés.",

      "ctx.blur.low": "Flou lointain faible – le mot lointain est très net, le mot proche doit être utilisé avec précaution.",
      "ctx.blur.medium": "Flou lointain moyen – bon équilibre entre stabilité et dissimulation.",
      "ctx.blur.high": "Flou lointain fort – rendu très doux, à tester impérativement en impression.",

      "ctx.halo.low": "Halo lointain faible – image plus neutre, mais mot lointain moins stable à grande distance.",
      "ctx.halo.medium": "Halo lointain moyen – bonne lueur pour la plupart des publics.",
      "ctx.halo.high": "Halo lointain fort – mot lointain très stable, l’image devient un peu plus douce.",

      "ctx.lightness.dark": "Mot lointain sombre – fort contraste et lisibilité élevée, mais rendu moins discret.",
      "ctx.lightness.medium": "Mot lointain gris moyen – aspect doux et élégant qui fonctionne avec la plupart des fonds.",
      "ctx.lightness.bright": "Mot lointain très clair – très léger et raffiné, mais à tester attentivement après impression.",

      "ctx.nearStrength.low": "Contours proches faibles – le mot proche se fond davantage dans le fond.",
      "ctx.nearStrength.medium": "Contours proches moyens – bon réglage polyvalent.",
      "ctx.nearStrength.high": "Contours proches forts – mot proche très net, à utiliser avec prudence.",

      "ctx.opacity.low": "Opacité du mot proche faible – très discret de près, quasi invisible pour le public.",
      "ctx.opacity.medium": "Opacité du mot proche moyenne – bon compromis entre lisibilité et sécurité.",
      "ctx.opacity.high": "Opacité du mot proche forte – très lisible de près, mais risque accru de détection.",

      "ctx.risk.low": "🔒 Niveau de risque : faible – très sûr pour la scène.",
      "ctx.risk.medium": "⚠️ Niveau de risque : moyen – tester dans la salle avant la représentation.",
      "ctx.risk.high": "🚨 Niveau de risque : élevé – plutôt pour des essais et cartes de test.",

      "ctx.usecase.large": "🎭 Usage : grande scène ou théâtre.",
      "ctx.usecase.medium": "🎩 Usage : salon ou petite scène.",
      "ctx.usecase.small": "🪄 Usage : salon privé, close-up, petite salle.",

      "ctx.audience.careful": "👀 Public : faire attention à la distance, à la vue et à la lumière.",
      "ctx.audience.safe": "🙂 Public : réglages globalement sûrs pour un public mixte.",

      "ctx.print.high": "🖨️ Impression : contraste élevé ou effets forts – vérifier attentivement les premiers tirages.",
      "ctx.print.standard": "🖨️ Impression : contraste standard – fonctionne avec la plupart des imprimantes.",

      "ctx.preset.tip": "💡 Astuce préréglage : ce réglage fonctionne bien comme sweet spot personnel. Exporte-le maintenant pour le sauvegarder.",
      "ctx.auto.on": "⚙️ Automatique : le mot proche est généré à partir du mot lointain – idéal pour des essais rapides.",

      "ctx.export.safe": "📦 Recommandation d’export : utiliser l’export PDF A4 (2×A5 recto/verso) pour les cartes de spectacle.",
      "ctx.export.test": "🧪 Recommandation d’export : imprimer d’abord des cartes test (PNG ou PDF test avec QR) et vérifier à la vraie distance.",

      "pdf.test.title": "Carte test pour préréglage hybride",
      "pdf.test.farLabel": "Mot lointain :",
      "pdf.test.line1": "Le QR code recharge exactement ces réglages dans l’application web.",
      "pdf.test.line2": "Parfait pour tester, archiver et partager des préréglages.",
      "pdf.test.autoOn": "Automatique : le mot proche est généré à partir du mot lointain.",
      "pdf.test.autoOff": "Automatique : le mot proche est saisi manuellement."
    }, 
    es: {
  "app.title": "Carta híbrida",
  "lang.label": "Idioma:",
  "intro.text":
    "1. Introduce la palabra lejana: la palabra cercana se modifica automáticamente.<br>" +
    "2. Ajusta los controles y revisa las vistas previas.<br>" +
    "3. Usa las opciones de exportación para obtener archivos listos para imprimir.",

  "label.far": "Palabra lejana (público)",
  "label.near": "Palabra cercana (espectador)",
  "auto.text": "Generar automáticamente la palabra cercana a partir de la lejana",

  "section.fine": "Ajustes finos",

  "label.fontSize": "Tamaño de letra",
  "tooltip.fontSize": "Las letras grandes funcionan mejor en salas amplias o con espectadores mayores. Letras pequeñas son más sutiles y cercanas.",

  "label.farBlur": "Desenfoque de palabra lejana",
  "tooltip.farBlur": "Controla lo suave que aparece la palabra lejana. Muy poco desenfoque hace más visible la palabra cercana, demasiado la vuelve inestable.",

  "label.farColor": "Luminosidad de la palabra lejana",
  "tooltip.farColor": "Define si la palabra lejana es más oscura o más clara. Valores claros se ven más suaves, valores oscuros más contrastados.",

  "label.farHalo": "Halo de la palabra lejana (brillo)",
  "tooltip.farHalo": "El halo es el resplandor suave alrededor de la palabra lejana. Más halo mejora la lectura a distancia, menos halo da una imagen más limpia.",

  "label.nearStrength": "Fuerza de bordes cercanos",
  "tooltip.nearStrength": "Determina cuán marcados son los bordes de la palabra cercana. Valores altos la hacen más clara de cerca, pero aumentan el riesgo.",

  "label.nearOpacity": "Opacidad de la palabra cercana",
  "tooltip.nearOpacity": "Controla cuán visible es la palabra cercana en general. Mayor opacidad = mejor lectura, pero más riesgo.",

  "label.nearFill": "Relleno interior de la palabra cercana",
  "tooltip.nearFill": "Relleno gris dentro de la palabra cercana. Mejora la lectura de cerca, pero puede hacerla más perceptible.",

  "scale.small": "Pequeño",
  "scale.large": "Grande",
  "scale.low": "bajo",
  "scale.high": "alto",
  "scale.soft": "suave",
  "scale.strong": "fuerte",
  "scale.almostInvisible": "casi invisible",
  "scale.visible": "visible",
  "scale.dark": "oscuro",
  "scale.bright": "claro",

  "section.background": "Fondo",
  "label.background": "Seleccionar fondo",
  "background.hint":
    "Coloca tus imágenes de fondo como <b>background_print.jpg</b>, <b>background2.jpg</b>, <b>background3.jpg</b>, etc. en la misma carpeta que esta página.",

  "btn.render": "Generar",

  "section.export": "Exportar",
  "btn.save.png": "Carta individual (PNG)",
  "btn.save.a4png": "A4 – 2× A5 (PNG)",
  "btn.save.pdf": "A4 – PDF (2×A5 anverso/reverso)",
  "btn.save.testqr": "Carta de prueba con QR (PDF)",
  "export.help":
    "• <b>Carta individual (PNG)</b>: una tarjeta A5 frontal.<br>" +
    "• <b>A4 – 2× A5 (PNG)</b>: dos frentes idénticos en una hoja A4.<br>" +
    "• <b>A4 – PDF</b>: página 1 con la carta híbrida arriba y la versión segura abajo, página 2 con los reversos.<br>" +
    "• <b>Carta de prueba con QR (PDF)</b>: incluye un código QR que carga este preset en la web.",

  "section.presets": "Importar / Exportar presets",
  "preset.placeholder": "Aquí aparecerán tus ajustes como JSON, p. ej. {'fontSize':230,...}",
  "btn.preset.export": "Exportar ajustes",
  "btn.preset.import": "Importar ajustes",
  "btn.preset.share": "Compartir (copiar enlace)",

  "section.support": "Apoyar",
  "btn.donate": "Donar vía PayPal",
  "support.text": "Si este generador de cartas híbridas te resulta útil, agradeceré mucho un café ☕",

  "section.info": "Información y guía",
  "info.text":
    "Generador de cartas híbridas por <b>Tim Holzhausen</b>.<br>" +
    "Desarrollado para aplicar el principio del “100th Monkey” en escenario, salón o close-up.",
  "info.link": "📄 Abrir guía en PDF",
  "info.feedback": "¿Preguntas o comentarios? Idealmente acompáñalos con ejemplos reales.",
  "version.text": "Versión 2.0.0 · Multilingüe",

  "previewMain.label": "Vista cercana – espectador en el escenario",
  "section.previewFar": "Vista lejana",
  "previewFar.caption": "Vista del público (reducida)",
  "section.hint": "Consejo",

  "ctx.fontSize.small": "Tamaño pequeño – adecuado para close-up y salones pequeños.",
  "ctx.fontSize.medium": "Tamaño medio – buen equilibrio para la mayoría de situaciones.",
  "ctx.fontSize.large": "Tamaño grande – ideal para grandes distancias y público mayor.",

  "ctx.blur.low": "Desenfoque bajo – la palabra lejana es muy nítida; usar con cuidado.",
  "ctx.blur.medium": "Desenfoque medio – buen compromiso entre estabilidad y camuflaje.",
  "ctx.blur.high": "Desenfoque alto – aspecto muy suave, probar siempre con impresión real.",

  "ctx.halo.low": "Halo bajo – imagen más limpia, pero menor estabilidad a distancia.",
  "ctx.halo.medium": "Halo equilibrado – buena legibilidad para la mayoría del público.",
  "ctx.halo.high": "Halo fuerte – palabra lejana muy estable, imagen general más suave.",

  "ctx.lightness.dark": "Palabra lejana oscura – máximo contraste y seguridad.",
  "ctx.lightness.medium": "Palabra lejana gris – aspecto elegante y equilibrado.",
  "ctx.lightness.bright": "Palabra lejana clara – look ligero, probar siempre en sala real.",

  "ctx.nearStrength.low": "Bordes cercanos suaves – la palabra se mezcla con el fondo.",
  "ctx.nearStrength.medium": "Bordes cercanos equilibrados – configuración segura.",
  "ctx.nearStrength.high": "Bordes cercanos fuertes – muy clara de cerca, usar con cuidado.",

  "ctx.opacity.low": "Opacidad baja – sutil para el espectador, muy segura.",
  "ctx.opacity.medium": "Opacidad media – buen balance entre lectura y seguridad.",
  "ctx.opacity.high": "Opacidad alta – muy legible de cerca, mayor riesgo.",

  "ctx.risk.low": "🔒 Riesgo: bajo – muy seguro para escenario.",
  "ctx.risk.medium": "⚠️ Riesgo: medio – probar antes del espectáculo.",
  "ctx.risk.high": "🚨 Riesgo: alto – solo para pruebas.",

  "ctx.usecase.large": "🎭 Uso: teatro o escenario grande.",
  "ctx.usecase.medium": "🎩 Uso: escenario pequeño o salón.",
  "ctx.usecase.small": "🪄 Uso: close-up o sala muy pequeña.",

  "ctx.audience.careful": "👀 Público: cuidar distancia, luz y agudeza visual.",
  "ctx.audience.safe": "🙂 Público: adecuado para audiencia mixta.",

  "ctx.print.high": "🖨️ Impresión: alto contraste o efectos fuertes – revisar la primera copia.",
  "ctx.print.standard": "🖨️ Impresión: contraste estándar – compatible con la mayoría de impresoras.",

  "ctx.preset.tip": "💡 Consejo: este preset es un buen punto dulce. Guárdalo ahora.",
  "ctx.auto.on": "⚙️ Automático: la palabra cercana se genera desde la lejana.",

  "ctx.export.safe": "📦 Recomendado: usar el PDF A4 (2×A5 anverso/reverso) para actuaciones.",
  "ctx.export.test": "🧪 Recomendado: imprimir primero cartas de prueba.",

  "pdf.test.title": "Carta de prueba – preset híbrido",
  "pdf.test.farLabel": "Palabra lejana:",
  "pdf.test.line1": "El código QR recarga exactamente estos ajustes en la web.",
  "pdf.test.line2": "Ideal para probar, archivar y compartir presets.",
  "pdf.test.autoOn": "Automático: la palabra cercana se genera automáticamente.",
  "pdf.test.autoOff": "Automático: la palabra cercana fue introducida manualmente."
}

  },

  get(lang, key) {
    const dict = this.translations[lang] || this.translations[this.defaultLang];
    return dict[key] || this.translations[this.defaultLang][key] || "";
  }
};
