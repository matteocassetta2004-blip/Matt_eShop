import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ExternalLink,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { useState } from "react";

import artigianoCover from "../assets/artigiano-cover.jpg";
import fiverrCover from "../assets/fiverr-cover.jpg";
import shopLogo from "../assets/matt-eshop-logo.png";
import shopBackground from "../assets/matt-eshop-background.png";
import { Button } from "../components/ui/button";

const LINKS = {
  products: "https://matteocassetta2004.systeme.io/341b0de7",
  fiverrInfo: "https://matteocassetta2004.systeme.io/a8d11c1b",
  fiverrAmazon: "https://www.amazon.it/dp/B0HL214BZH/ref=sr_1_1?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1IYPYE5N1NCHA&dib=eyJ2IjoiMSJ9.W0th2BBuG1cnKVVlYWc-_0JQIEcttNji23c7K4zKehog2uC2hVeGXrQGFOB9RNU7.Zx9dH_IfKJEQWJEx1g72VOzK6Vw5y5cnV9u1tnfaM6k&dib_tag=se&keywords=Fiverr+Ebook+-+Metodo+pratico+per+iniziare+a+guadagnare+online%3A+Guida+completa+%2B+Template+e+script+per+salire+al+Top.&qid=1790580633&sprefix=fiverr+ebook+-+metodo+pratico+per+iniziare+a+guadagnare+online+guida+completa+%2B+template+e+script+per+salire+al+top.%2Caps%2C142&sr=8-1",
  artigianoInfo: "https://sites.google.com/view/modulodordineartigiano-1/home-page",
  artigianoAmazon: "https://www.amazon.com/dp/B0HL85HWT9/ref=sr_1_1?crid=Z0QX4LXR9TS0&dib=eyJ2IjoiMSJ9.Td4INEC-dTMrYjYoW7xn2TDdcCsm2QwPCjL19E0W45c.PCk_C1LuUaRtB2G9x0U29lIUglJdFGS3LXyY7FwU9sU&dib_tag=se&keywords=Artigiano+aumentato+-+metodo+pratico+per+migliorare+la+qualit%C3%A0+del+lavoro&nsdOptOutParam=true&qid=1790670542&sprefix=artigiano+aumentato+-+metodo+pratico+per+migliorare+la+qualit%C3%A0+del+lavoro%2Caps%2C239&sr=8-1",
  privacy: "https://matteocassetta2004.systeme.io/adbe944f",
  terms: "https://matteocassetta2004.systeme.io/9e8dc6ab",
  chiSono: "https://sites.google.com/view/matt-eshop/home-page/chi-sono",
} as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Matt-eShop | Guide pratiche per lavorare e crescere" },
      {
        name: "description",
        content:
          "Scopri le guide pratiche di Matteo Cassetta dedicate a Fiverr e all'uso dell'intelligenza artificiale nel lavoro artigiano.",
      },
      { property: "og:title", content: "Matt-eShop | Guide pratiche" },
      {
        property: "og:description",
        content: "Due percorsi operativi, con esempi e materiali da adattare ai tuoi obiettivi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pillars = [
  { icon: BookOpen, title: "Guide operative", text: "Passaggi organizzati per trasformare le informazioni in azioni concrete." },
  { icon: Target, title: "Obiettivi chiari", text: "Ogni percorso affronta un problema specifico, senza divagazioni." },
  { icon: Sparkles, title: "Materiali pratici", text: "Esempi, modelli, prompt e script da personalizzare in base al contesto." },
];

const offerings = [
  { title: "Guide pratiche", text: "Passaggio per passaggio, focalizzate sull’azione immediata." },
  { title: "Template & Script pronti", text: "Materiali da copiare e personalizzare per partire subito." },
  { title: "Metodi aggiornati", text: "Strategie modellate sulle reali esigenze del mercato attuale." },
];

type ChatMessage = {
  text: string;
  type: "bot" | "user";
};

type ContactFormData = {
  nome: string;
  email: string;
  messaggio: string;
};

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Benvenuto! Sono l’assistente virtuale di Matt_eShop. Posso aiutarti con informazioni sui nostri prodotti e guidarti verso le risorse più adatte a te.",
      type: "bot",
    },
  ]);
  const [formData, setFormData] = useState<ContactFormData>({
    nome: "",
    email: "",
    messaggio: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const scrollToBottom = () => {
    const container = document.getElementById("chat-messages");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const addMessage = (text: string, type: ChatMessage["type"]) => {
    setMessages((prev) => [...prev, { text, type }]);
    scrollToBottom();
  };

  const simulateBotResponse = (userText: string) => {
    const lower = userText.toLowerCase();
    const wantsContact =
      lower.includes("contatto") ||
      lower.includes("acquista") ||
      lower.includes("amazon") ||
      lower.includes("info") ||
      lower.includes("ebook");

    setTimeout(() => {
      if (wantsContact && !contactSent) {
        addMessage(
          "Posso aiutarti con questo. Per ricevere informazioni personalizzate, lascia i tuoi dati qui sotto. Verrai ricontattato da Matt_eShop.",
          "bot"
        );
        setShowContactForm(true);
      } else if (!contactSent) {
        addMessage(
          "Ho ricevuto il tuo messaggio. Il nostro team di Matt_eShop ti risponderà appena possibile.",
          "bot"
        );
      }
    }, 700);
  };

  const sendQuickQuestion = (question: string) => {
    if (contactSent) return;
    addMessage(question, "user");
    simulateBotResponse(question);
  };

  const handleChatSend = (text: string) => {
    if (!text.trim() || contactSent) return;
    addMessage(text, "user");
    simulateBotResponse(text);
  };

  const handleFormChange = (
    key: "nome" | "email" | "messaggio",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    if (!formData.nome || !formData.email) {
      setFormError("Per favore, compila nome ed email.");
      return;
    }

    setSubmitting(true);
    // TODO: quando il backend sarà pronto, sostituire questo setTimeout con una fetch a chat-server.php
    setTimeout(() => {
      setSubmitting(false);
      setContactSent(true);
      setShowContactForm(false);
      setFormSuccess(true);
      addMessage(
        "✅ Grazie! La tua richiesta è stata ricevuta. Il team di Matt_eShop ti contatterà presto.",
        "bot"
      );
    }, 1000);
  };

  return (
    <>
      <main className="min-h-screen overflow-hidden bg-background text-foreground">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/92 backdrop-blur-xl">
          <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
            <a href="#inizio" className="flex shrink-0 items-center" aria-label="Matt-eShop, torna all'inizio">
              <img src={shopLogo} alt="Matt-eShop" className="h-14 w-[85px] object-contain sm:h-16 sm:w-[98px]" width={258} height={170} />
            </a>
            <nav className="hidden items-center gap-8 text-sm font-semibold md:flex" aria-label="Navigazione principale">
              <a className="nav-link" href="#metodo">Il metodo</a>
              <a className="nav-link" href="#guide">Le guide</a>
              <a className="nav-link" href="#chi-sono">Chi sono</a>
              <a className="nav-link" href="#trasparenza">Trasparenza</a>
            </nav>
            <Button asChild className="hidden md:inline-flex">
              <a href="#guide">Scopri le guide <ArrowDown aria-hidden="true" /></a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}>
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          {menuOpen && (
            <nav className="grid gap-1 border-t border-border bg-background px-5 py-4 md:hidden" aria-label="Navigazione mobile">
              <a onClick={closeMenu} className="mobile-link" href="#metodo">Il metodo</a>
              <a onClick={closeMenu} className="mobile-link" href="#guide">Le guide</a>
              <a onClick={closeMenu} className="mobile-link" href="#chi-sono">Chi sono</a>
              <a onClick={closeMenu} className="mobile-link" href="#trasparenza">Trasparenza</a>
            </nav>
          )}
        </header>

        <section id="inizio" className="relative flex min-h-[86svh] items-end pt-18">
          <img src={shopBackground} alt="" className="hero-photo absolute inset-0 h-full w-full object-cover" fetchPriority="high" aria-hidden="true" />
          <div className="hero-backdrop absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:pt-36">
            <div className="max-w-2xl lg:max-w-[42rem]">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                <span className="h-px w-10 bg-accent" /> GUIDE PRATICHE DI MATT-ESHOP
              </p>
              <h1 className="font-heading text-5xl font-bold leading-[1.08] text-hero-foreground sm:text-7xl">
                Matt-eShop
              </h1>
              <p className="mt-5 max-w-xl font-heading text-3xl font-semibold leading-tight text-hero-foreground sm:text-4xl lg:text-5xl">
                Risorse pratiche per migliorare la tua crescita economica
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-hero-muted sm:text-lg">
                Scopri ebook e guide pratiche pensati per aiutarti a sviluppare competenze, strategie e una mentalità orientata alla crescita economica. Ogni contenuto è progettato per offrirti strumenti concreti da applicare fin da subito.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="hero-cta h-12 px-6 text-base">
                  <a href="#guide">Esplora le guide <ArrowDown aria-hidden="true" /></a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="h-12 px-6 text-base">
                  <a href={LINKS.products} target="_blank" rel="noreferrer">Catalogo dettagliato <ExternalLink aria-hidden="true" /></a>
                </Button>
              </div>
            </div>
            <p className="mt-10 max-w-xl border-l border-accent pl-4 text-sm leading-6 text-hero-muted">
              Prima informati, poi scegli: ogni guida dispone di una pagina di approfondimento e di un collegamento diretto ad Amazon.
            </p>
          </div>
        </section>

        <section id="metodo" className="border-b border-border bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="eyebrow">Un approccio concreto</p>
                <h2 className="section-title mt-4">Leggere meno promesse.<br />Capire cosa fare.</h2>
              </div>
              <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
                {pillars.map(({ icon: Icon, title, text }, index) => (
                  <article key={title} className="bg-background p-7">
                    <div className="mb-8 flex items-start justify-between">
                      <Icon className="size-6 text-primary" strokeWidth={1.7} aria-hidden="true" />
                      <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="perche" className="border-b border-border bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="eyebrow">Il valore in concreto</p>
                <h2 className="section-title mt-4">Perché scegliere le guide di Matt-eShop</h2>
                <p className="mt-6 max-w-md leading-7 text-muted-foreground">
                  Oggetti di studio complessi trasformati in strategie semplici, chiare e subito applicabili. I nostri manuali digitali sono progettati per fornirti strumenti operativi senza teoria inutile, aiutandoti a sviluppare competenze concrete e costruire la tua crescita economica nel tempo.
                </p>
              </div>
              <div>
                <p className="font-heading text-xl font-bold sm:text-2xl">Cosa trovi nei nostri prodotti:</p>
                <div className="mt-7 grid gap-px overflow-hidden rounded-md border border-border bg-border">
                  {offerings.map(({ title, text }, index) => (
                    <article key={title} className="flex items-start gap-5 bg-background p-6 sm:gap-7 sm:p-7">
                      <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                      <div>
                        <h3 className="font-heading text-lg font-bold">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === NUOVA SEZIONE CHI SONO === */}
        <section id="chi-sono" className="border-b border-border bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div className="space-y-4">
                <p className="eyebrow">Chi sono</p>
                <h2 className="font-heading text-3xl font-bold sm:text-4xl">Dalla tecnologia alla formazione digitale</h2>
                <p className="leading-7 text-muted-foreground">
                  Mi chiamo Matteo e ho scelto di costruire il mio percorso professionale attorno a un obiettivo preciso: imparare, sperimentare e trasformare ciò che apprendo in strumenti pratici che possano essere realmente utili alle persone.
                </p>
                <p className="leading-7 text-muted-foreground">
                  Il mio percorso nasce dal mondo della tecnologia. In passato ho lavorato come tecnico informatico di primo livello, occupandomi di assistenza e attività tecniche legate all’informatica. È stata un’esperienza importante, perché mi ha insegnato ad affrontare i problemi in modo concreto, analizzarli e cercare soluzioni funzionali.
                </p>
                <p className="leading-7 text-muted-foreground">
                  A un certo punto ho deciso di lasciare quel percorso professionale per investire su una nuova direzione: formazione digitale, Intelligenza Artificiale, marketing e creazione di prodotti digitali.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-surface p-6 rounded-lg border border-border">
                  <h3 className="font-heading text-lg font-bold mb-3">Una scelta presa sul serio</h3>
                  <p className="leading-7 text-muted-foreground mb-4">
                    Non ho voluto limitarmi a guardare qualche video online e considerarmi preparato. Ho scelto di investire oltre 3.000€ nella mia formazione attraverso Corsi.it, studiando Intelligenza Artificiale, marketing digitale, copywriting, social media, lead generation, funnel, pubblicità online, pricing e strategia.
                  </p>
                  <p className="leading-7 text-muted-foreground">
                    Per me questa spesa rappresenta una scelta: investire su me stesso e sulle competenze che voglio utilizzare nel mio futuro professionale. Il mio obiettivo non è accumulare certificati da mostrare, ma trasformare quello che studio in conoscenze utilizzabili nella pratica.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              <div className="bg-surface p-6 rounded-lg border border-border">
                <h3 className="font-heading text-lg font-bold mb-3">Il mio focus: Intelligenza Artificiale e crescita digitale</h3>
                <p className="leading-7 text-muted-foreground">
                  Studio e utilizzo strumenti di AI per ricerca, analisi, produzione e ottimizzazione dei contenuti, copywriting, produttività e sviluppo di processi digitali. Considero l’AI uno strumento, non una scorciatoia: la vera competenza consiste nel saper fare le domande giuste, verificare le informazioni, confrontare le fonti e usare la tecnologia per arrivare a risultati più efficienti.
                </p>
              </div>
              <div className="bg-surface p-6 rounded-lg border border-border">
                <h3 className="font-heading text-lg font-bold mb-3">Marketing, strategia e comunicazione</h3>
                <p className="leading-7 text-muted-foreground">
                  Ho approfondito posizionamento del brand, copywriting direct response, funnel marketing, marketing automation, lead generation, pricing e offerta, Facebook Ads, Google Ads e social media marketing. L’obiettivo è comprendere come creare un prodotto, presentarlo, comunicarne il valore e costruire un’esperienza digitale semplice e comprensibile.
                </p>
              </div>
              <div className="bg-surface p-6 rounded-lg border border-border">
                <h3 className="font-heading text-lg font-bold mb-3">Perché creo ebook</h3>
                <p className="leading-7 text-muted-foreground">
                  Gli ebook nascono da questa filosofia: guide pratiche, comprensibili e orientate all’azione, che aiutano il lettore ad approfondire argomenti concreti e trasformare le informazioni in qualcosa di utilizzabile subito.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-surface p-6 rounded-lg border border-border">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2">
                  <p className="eyebrow">Trasparenza prima di tutto</p>
                  <h3 className="font-heading text-xl font-bold">Il mio impegno verso chi acquista</h3>
                  <p className="leading-7 text-muted-foreground">
                    Non mi presento come qualcuno che ha tutte le risposte o come un professionista con decenni di esperienza. Sono una persona che ha deciso di investire seriamente nella propria formazione, costruire competenze e metterle progressivamente in pratica. Quando acquisti un mio ebook, voglio che la fiducia nasca da chiarezza, trasparenza e qualità del contenuto.
                  </p>
                </div>
                <a href={LINKS.chiSono} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-primary border border-primary px-3 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
                  Leggi il profilo completo →
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-2 block">La mia formazione</p>
              <div className="space-y-3 text-sm leading-6 text-muted-foreground max-w-xl">
                <p className="font-semibold"><strong>Intelligenza Artificiale &amp; Produttività</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Corso fondamentale di Intelligenza Artificiale — ChatGPT, Claude, Gemini e Copilot — Roberto Pugliese, Corsi.it</li>
                  <li>Programmare con l’AI in Vibe Coding: Corso Fondamentale — Roberto Pugliese, Corsi.it</li>
                  <li>AI Copywriting: scrivi testi per vendere (anche se parti da zero) — Stefano De Carlo, Corsi.it</li>
                  <li>Produttività aziendale con l’AI: il corso pratico — Stefano De Carlo, Corsi.it</li>
                  <li>Customer Care AI — Stefano De Carlo, Corsi.it</li>
                </ul>
                <p className="font-semibold mt-2"><strong>Marketing, Social Media &amp; Strategia Aziendale</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Brand Positioning — Marco De Veglia, Corsi.it</li>
                  <li>Copywriting Direct Response — Luca Orlandini, Corsi.it</li>
                  <li>Funnel Marketing e Marketing Automation — Francesco Susca, Corsi.it</li>
                  <li>Lead Generation: il corso fondamentale — Valerio Apolloni, Corsi.it</li>
                  <li>Strategie di Pricing &amp; Offerta — Mimmo Mastronardi, Corsi.it</li>
                  <li>Facebook Ads — Anna D’Amico, Corsi.it</li>
                  <li>Social Media Marketing con certificato — Nicolò Scala, Corsi.it</li>
                  <li>Social per l’azienda — Giuliano Esposito, Corsi.it</li>
                  <li>Da zero a Google Ads Expert — Fabio Antichi, Corsi.it</li>
                </ul>
              </div>
              <p className="mt-4 leading-7 text-muted-foreground">
                Questa lista non rappresenta un punto di arrivo. È il punto di partenza. Continuo a studiare, sperimentare e mettere in pratica ciò che apprendo.
              </p>
            </div>
          </div>
        </section>

        <section id="guide" className="bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-14 flex flex-col justify-between gap-5 border-b border-border pb-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">La libreria</p>
                <h2 className="section-title mt-4">Scegli il percorso più vicino al tuo obiettivo.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">Puoi leggere tutti i dettagli prima di decidere oppure passare direttamente alla scheda Amazon.</p>
            </div>

            <ProductSection
              eyebrow="Lavoro online · Fiverr"
              title="Fiverr Ebook"
              subtitle="Metodo pratico per iniziare a guadagnare online"
              description={[
                "Una guida pratica che ti accompagna passo dopo passo nella creazione e nel posizionamento del tuo primo servizio su Fiverr, anche se parti da zero.",
                "A differenza delle solite guide teoriche, questo metodo è focalizzato sull’azione immediata: ti fornisce gli strumenti giusti per lanciare il tuo servizio, gestire i primi clienti e imparare mentre inizi ad attivare le tue prime entrate.",
              ]}
              pointsTitle="Perché questo metodo è diverso:"
              points={[
                { label: "Zero teoria astratta", text: "Trovi strategie semplici e applicabili fin da subito." },
                { label: "Materiali pronti", text: "Template e script da copiare e personalizzare per rispondere ai clienti." },
                { label: "Percorso guidato", text: "Dalla scelta del servizio alla gestione della trattativa." },
              ]}
              cover={fiverrCover}
              coverAlt="Copertina ufficiale del Fiverr Ebook di Matteo Cassetta"
              infoUrl={LINKS.fiverrInfo}
              amazonUrl={LINKS.fiverrAmazon}
              amazonLabel="Vai al libro su Amazon.it"
            />

            <ProductSection
              reverse
              eyebrow="Artigianato · Intelligenza artificiale"
              title="L’Artigiano Aumentato"
              subtitle="Integra l’Intelligenza Artificiale nel tuo lavoro"
              description={[
                "La guida pratica pensata per artigiani e piccole imprese che vogliono utilizzare l’intelligenza artificiale per semplificare la gestione quotidiana della propria attività.",
                "Trasforma i compiti ripetitivi e burocratici in processi rapidi e ordinati, senza rinunciare alla tua esperienza e al tuo tocco personale.",
              ]}
              pointsTitle="Cosa imparerai a fare:"
              points={[
                { label: "Risposte rapide", text: "Gestisci messaggi e richieste dei clienti in una frazione del tempo." },
                { label: "Preventivi chiari", text: "Prepara bozze di preventivo trasparenti e professionali in pochi minuti." },
                { label: "Organizzazione ed efficienza", text: "Riordina il lavoro quotidiano e valorizza i tuoi progetti." },
              ]}
              cover={artigianoCover}
              coverAlt="Copertina ufficiale del libro L’Artigiano Aumentato di Matteo Cassetta"
              infoUrl={LINKS.artigianoInfo}
              amazonUrl={LINKS.artigianoAmazon}
              amazonLabel="Vai al libro su Amazon.com"
            />
          </div>
        </section>

        <section id="trasparenza" className="bg-primary py-16 text-primary-foreground sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-12">
            <ShieldCheck className="size-11 text-accent" strokeWidth={1.5} aria-hidden="true" />
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Prima della scelta</p>
              <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">Informazioni chiare, senza risultati garantiti.</h2>
              <p className="mt-5 max-w-3xl leading-7 text-primary-muted">Le guide hanno finalità didattiche e informative. I risultati economici o commerciali non sono automatici: dipendono dall’applicazione personale, dall’esperienza, dal settore e dalle condizioni di mercato. Prezzi e disponibilità sono quelli mostrati da Amazon al momento della visita.</p>
            </div>
          </div>
        </section>

        <footer className="bg-footer py-10 text-footer-foreground">
          <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-heading text-xl font-bold">Matt-eShop</p>
              <p className="mt-2 max-w-md text-sm leading-6 text-footer-muted">Percorsi di miglioramento personale dedicati alla crescita economica e allo sviluppo personale.</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a className="footer-link" href={LINKS.privacy} target="_blank" rel="noreferrer">Privacy Policy</a>
              <a className="footer-link" href={LINKS.terms} target="_blank" rel="noreferrer">Termini e condizioni</a>
              <a className="footer-link" href="#inizio">Torna su</a>
            </div>
          </div>
        </footer>
      </main>

      {/* === CHAT WIDGET === */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <button
          onClick={() => setChatOpen(true)}
          className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
          aria-label="Apri chat assistente"
        >
          💬
        </button>

        {chatOpen && (
          <div className="fixed inset-0 z-[59] flex items-end justify-end p-4 pointer-events-none">
            <div className="w-full max-w-md pointer-events-auto flex flex-col h-[560px] border border-border bg-background rounded-xl shadow-2xl">
              <div className="bg-primary p-4 flex justify-between items-center">
                <span className="text-white font-semibold">🤖 Assistente Matt_eShop</span>
                <button onClick={() => setChatOpen(false)} className="text-white hover:opacity-80" aria-label="Chiudi chat">
                  ✕
                </button>
              </div>

              <div id="chat-messages" className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] p-3 rounded-lg ${
                      m.type === "bot"
                        ? "bg-primary/10 text-primary-foreground self-start rounded-bl-sm border border-primary/20"
                        : "bg-primary text-primary-foreground self-end rounded-br-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}

                {!contactSent && !showContactForm && (
                  <div className="flex flex-col gap-2 pt-2">
                    {[
                      "Quali ebook offrite e come possono aiutarmi a crescere?",
                      "Dove posso acquistare gli ebook su Amazon?",
                      "Cosa include il percorso di crescita personale?",
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => sendQuickQuestion(q)}
                        className="text-left border border-border rounded-full px-3 py-2 text-sm hover:bg-accent/50 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {showContactForm && !contactSent && (
                  <div className="p-4 space-y-3">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded">
                      <p className="text-xs font-semibold text-amber-800">
                        I tuoi dati servono solo a farti ricontattare da Matt_eShop
                      </p>
                      <a
                        href={LINKS.privacy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary underline underline-offset-4"
                      >
                        Leggi la privacy policy
                      </a>
                    </div>
                    <form onSubmit={handleFormSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground">Nome *</label>
                        <input
                          className="w-full border border-input rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          value={formData.nome}
                          onChange={(e) => handleFormChange("nome", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground">Email *</label>
                        <input
                          className="w-full border border-input rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          value={formData.email}
                          onChange={(e) => handleFormChange("email", e.target.value)}
                          type="email"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground">Messaggio</label>
                        <textarea
                          className="w-full border border-input rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          value={formData.messaggio}
                          onChange={(e) => handleFormChange("messaggio", e.target.value)}
                          rows={3}
                        />
                      </div>
                      {formError && (
                        <span className="text-destructive text-xs">{formError}</span>
                      )}
                      <button
                        disabled={submitting || contactSent}
                        className="w-full bg-primary text-white py-2 rounded disabled:opacity-60 transition-opacity"
                      >
                        {submitting ? "Invio in corso..." : "Invia richiesta"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="text-xs text-muted-foreground underline"
                      >
                        Annulla
                      </button>
                    </form>
                  </div>
                )}

                {formSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded text-green-800 text-xs text-center">
                    ✅ Richiesta inviata con successo. Ti ricontatteremo al più presto.
                  </div>
                )}

                <div className="p-4 border-t border-border flex gap-2">
                  <input
                    className="flex-1 border border-input rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
                    placeholder="Scrivi qui..."
                    disabled={contactSent}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const input = e.target as HTMLInputElement;
                        handleChatSend(input.value);
                        input.value = "";
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector(
                        "#chat-messages + div input"
                      ) as HTMLInputElement | null;
                      if (input) {
                        handleChatSend(input.value);
                        input.value = "";
                      }
                    }}
                    disabled={contactSent}
                    className="bg-primary text-white px-4 py-2 rounded disabled:opacity-60 transition-opacity"
                  >
                    Invia
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

type ProductPoint = {
  label: string;
  text: string;
};

type ProductSectionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string[];
  pointsTitle: string;
  points: ProductPoint[];
  cover: string;
  coverAlt: string;
  infoUrl: string;
  amazonUrl: string;
  amazonLabel: string;
  reverse?: boolean;
};

function ProductSection({
  eyebrow,
  title,
  subtitle,
  description,
  pointsTitle,
  points,
  cover,
  coverAlt,
  infoUrl,
  amazonUrl,
  amazonLabel,
  reverse = false,
}: ProductSectionProps) {
  return (
    <article className="grid items-center gap-10 border-b border-border py-14 first:pt-0 last:border-b-0 last:pb-0 lg:grid-cols-2 lg:gap-20 lg:py-24">
      <div className={reverse ? "lg:order-2" : undefined}>
        <div className="mx-auto w-full max-w-sm py-5">
          <div className="cover-stage relative mx-auto aspect-[0.563] max-w-[17rem]">
            <img className="h-full w-full object-cover shadow-book" src={cover} alt={coverAlt} loading="lazy" />
          </div>
        </div>
      </div>
      <div className={reverse ? "lg:order-1" : undefined}>
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl">{title}</h3>
        <p className="mt-3 font-heading text-xl font-semibold text-primary sm:text-2xl">{subtitle}</p>
        {description.map((paragraph) => (
          <p key={paragraph} className="mt-6 max-w-xl leading-7 text-muted-foreground">{paragraph}</p>
        ))}
        <p className="mt-8 font-heading text-lg font-bold sm:text-xl">{pointsTitle}</p>
        <ul className="mt-5 grid gap-3" aria-label={`Contenuti di ${title}`}>
          {points.map(({ label, text }) => (
            <li key={label} className="flex items-start gap-3 text-sm leading-6">
              <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><Check className="size-3" strokeWidth={3} aria-hidden="true" /></span>
              <span><span className="font-bold text-foreground">{label}:</span> {text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={amazonUrl} target="_blank" rel="noreferrer">{amazonLabel} <ExternalLink aria-hidden="true" /></a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={infoUrl} target="_blank" rel="noreferrer">Leggi tutti i dettagli <ArrowRight aria-hidden="true" /></a>
          </Button>
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">L’acquisto e le condizioni di vendita sono gestiti da Amazon.</p>
      </div>
    </article>
  );
}
