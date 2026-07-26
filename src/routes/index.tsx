import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Star,
  GitFork,
  Code2,
  Brain,
  BarChart3,
  ArrowDown,
  Download,
  Terminal,
  Database,
  Layers,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getGithubRepos } from "@/lib/github.functions";
import heroImage from "@/assets/hero-portfolio.jpg";

const reposQueryOptions = queryOptions({
  queryKey: ["github-repos", "ervndty"],
  queryFn: () => getGithubRepos(),
  staleTime: 1000 * 60 * 5,
});

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Ervin Aditya — Software Engineer, AI Engineer & Data Analyst",
      },
      {
        name: "description",
        content:
          "Portofolio Ervin Aditya: software engineer, AI engineer, dan data analyst. Lihat proyek-proyek terbaru dari GitHub.",
      },
      {
        property: "og:title",
        content: "Ervin Aditya — Software Engineer, AI Engineer & Data Analyst",
      },
      {
        property: "og:description",
        content:
          "Portofolio Ervin Aditya: software engineer, AI engineer, dan data analyst. Lihat proyek-proyek terbaru dari GitHub.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(reposQueryOptions);
  },
});

function Index() {
  const { data: repos } = useSuspenseQuery(reposQueryOptions);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="relative overflow-hidden">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection repos={repos} />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Navigation() {
  const navItems = [
    { label: "Tentang", href: "#about" },
    { label: "Keahlian", href: "#skills" },
    { label: "Proyek", href: "#projects" },
    { label: "Pengalaman", href: "#experience" },
    { label: "Kontak", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-foreground">
          ervndty
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ervndty"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 pb-24">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover opacity-30"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <Badge
          variant="secondary"
          className="mb-6 bg-secondary/50 px-4 py-1.5 text-xs font-medium text-secondary-foreground backdrop-blur"
        >
          Software Engineer · AI Engineer · Data Analyst
        </Badge>
        <h1 className="font-display text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Halo, saya <span className="text-gradient">Ervin Aditya</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Membangun sistem perangkat lunak yang scalable, mengembangkan solusi AI
          yang praktis, dan mengubah data menjadi insight yang bisa ditindaklanjuti.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#projects">
            <Button size="lg" className="gap-2 font-medium">
              <Code2 className="h-4 w-4" />
              Lihat Proyek
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline" className="gap-2 font-medium">
              <Mail className="h-4 w-4" />
              Hubungi Saya
            </Button>
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}

function AboutSection() {
  const highlights = [
    {
      icon: <Terminal className="h-5 w-5" />,
      title: "Software Engineer",
      text: "Merancang dan membangun aplikasi web serta mobile end-to-end — dari desain API, arsitektur layanan, sampai antarmuka yang rapi dan cepat.",
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI Engineer",
      text: "Membawa model machine learning ke produksi: chatbot, NLP, dan computer vision yang benar-benar dipakai pengguna, bukan berhenti di notebook.",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Data Analyst",
      text: "Mengolah data mentah menjadi cerita: eksplorasi, visualisasi, dan dashboard yang membantu keputusan diambil dengan dasar yang jelas.",
    },
  ];

  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-12 md:grid-cols-[auto_1fr]">
          <div className="relative mx-auto w-48 shrink-0 md:mx-0 md:w-64">
            <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-card shadow-2xl glow">
              <img
                src="https://avatars.githubusercontent.com/u/130417258?v=4"
                alt="Foto profil Ervin Aditya"
                className="h-full w-full object-cover"
                width={256}
                height={256}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-xl border border-border bg-card px-4 py-3 shadow-lg">
              <div className="font-display text-2xl font-bold text-foreground">32+</div>
              <div className="text-xs text-muted-foreground">Public Repositories</div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Tentang Saya
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Saya Ervin Aditya — seorang engineer yang tumbuh dari rasa penasaran: bagaimana
              sebuah ide bisa berubah menjadi produk yang dipakai orang. Perjalanan saya
              dimulai secara otodidak, lewat proyek-proyek kecil yang perlahan berkembang
              menjadi aplikasi full-stack, sistem AI, dan pekerjaan analisis data.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Hari ini saya bekerja di persimpangan tiga bidang: software engineering,
              AI engineering, dan data analytics. Kombinasi itu membuat saya bisa
              menemani sebuah produk dari hulu ke hilir — merancang sistemnya,
              menanamkan kecerdasan di dalamnya, lalu membaca datanya untuk tahu
              apa yang perlu diperbaiki berikutnya.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/Ervin Aditya -resume.pdf" download>
                <Button className="gap-2 font-medium">
                  <Download className="h-4 w-4" />
                  Unduh CV
                </Button>
              </a>
              <SocialLink href="https://github.com/ervndty" icon={<Github className="h-4 w-4" />} label="GitHub" />
              <SocialLink href="#" icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
              <SocialLink href="mailto:ervin@example.com" icon={<Mail className="h-4 w-4" />} label="Email" />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title} className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-2.5 text-primary">
                  {item.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


function SkillsSection() {
  const skills = [
    {
      icon: <Terminal className="h-6 w-6" />,
      title: "Software Engineering",
      description:
        "Membangun aplikasi dan layanan dengan arsitektur yang bersih, scalable, dan mudah dirawat.",
      tags: [
        "React",
        "NestJS",
        "Node.js",
        "Go",
        "Laravel",
        "FastAPI",
        "PostgreSQL",
        "Docker",
      ],
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Engineering",
      description:
        "Mengintegrasikan model machine learning, NLP, dan computer vision ke dalam produk nyata.",
      tags: [
        "TensorFlow",
        "Keras",
        "scikit-learn",
        "Context & Intent",
        "NLP",
        "Computer Vision",
        "Machine Learning",
        "Deep Learning",
      ],
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Data Analysis",
      description:
        "Mengolah, mengeksplorasi, dan memvisualisasikan data untuk menghasilkan keputusan berbasis data.",
      tags: [
        "Pandas",
        "NumPy",
        "Jupyter",
        "EDA",
        "Feature Extraction",
        "Visualization",
        "Dashboard",
        "SQL",
      ],
    },
  ];


  return (
    <section id="skills" className="scroll-mt-24 bg-hero px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tiga Bidang Keahlian
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Kombinasi skill teknikal yang memungkinkan saya menangani produk dari sisi
            backend, model AI, hingga analisis data.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <Card
              key={skill.title}
              className="group border-border bg-card/50 backdrop-blur transition-colors hover:border-primary/30 hover:bg-card"
            >
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary">
                  {skill.icon}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  {skill.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {skill.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-border/60 bg-background/60 text-xs text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ repos }: { repos: Awaited<ReturnType<typeof getGithubRepos>> }) {
  const displayedRepos = repos.slice(0, 12);

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Proyek Terbaru
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Beberapa repositori publik terbaru dari GitHub. Data diambil secara
              real-time dari profil saya.
            </p>
          </div>
          <a
            href="https://github.com/ervndty?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              Lihat Semua Repo
            </Button>
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayedRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RepoCard({ repo }: { repo: Awaited<ReturnType<typeof getGithubRepos>>[number] }) {
  return (
    <Card className="group flex flex-col border-border bg-card/60 transition-colors hover:border-primary/30 hover:bg-card">
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-semibold text-foreground">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              {repo.name}
            </a>
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
              aria-label={`Open ${repo.name} on GitHub`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {repo.description ?? "Tidak ada deskripsi."}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: languageColor(repo.language) }}
                />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" />
              {repo.forks_count}
            </span>
          </div>
          <span>{formatDate(repo.updated_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ExperienceSection() {
  const experiences = [
    {
      period: "Mei 2026 — Sekarang",
      role: "Quality Control (QC1 → QC2)",
      company: "PT. Morrigan Services · Freelance · Tegalrejo, Yogyakarta",
      description:
        "Menjaga kualitas dan integritas data field audit (mystery shopping) untuk klien retail dan perbankan, memastikan setiap laporan akurat, objektif, dan siap dikirim ke klien. Mulai sebagai QC1 [...]
      points: [
        "Memvalidasi jawaban kuesioner terhadap kriteria penilaian klien (compliant / non-compliant / not applicable) pada setiap poin observasi.",
        "Cross-check temuan tertulis dengan bukti pendukung (dokumentasi foto dan rekaman audio) untuk memastikan validitas data.",
        "Memverifikasi perhitungan durasi layanan dari rekaman audit sebagai dasar penilaian standar service time.",
        "Menyunting dan merapikan deskripsi temuan agar sesuai kondisi nyata serta standar penulisan pelaporan klien.",
        "Menjaga anonimitas auditor di seluruh dokumentasi laporan.",
        "Sebagai QC2: verifikasi lapis kedua output tim QC1, menjaga konsistensi scoring antar auditor, dan memberi feedback korektif terstruktur.",
      ],
      projects: ["Eiger (Retail) — QC1 & QC2", "Bank Mandiri (Perbankan) — QC1"],
      tags: ["Data Quality", "Audit", "Reporting", "Attention to Detail"],
      icon: <Layers className="h-5 w-5" />,
    },
    {
      period: "Nov 2025 — Feb 2026",
      role: "Backend Developer",
      company: "PT Sukses Kerja Mendunia · Apprentice · Caturtunggal, Sleman",
      description:
        "Merancang dan membangun HRIS multi-tenant menggunakan NestJS dengan pendekatan Modular Architecture, memastikan isolasi data dan skalabilitas untuk banyak perusahaan.",
      points: [
        "Mengarsitekturi dan mengembangkan HRIS multi-tenant dengan NestJS dan Modular Architecture untuk pemisahan logika bisnis antar perusahaan.",
        "Mengimplementasikan Role-Based Access Control (RBAC) untuk mengatur hak akses tiap peran pengguna di setiap tenant.",
        "Membangun sistem absensi berbasis foto dan GPS yang mampu membedakan check-in remote dan on-site (WFO).",
        "Mengoptimalkan skema database PostgreSQL dengan Prisma ORM untuk fitur absensi, manajemen shift, dan payroll yang terintegrasi.",
        "Menerapkan mekanisme isolasi data tenant demi keamanan dan integritas data sensitif tiap perusahaan.",
        "Melakukan containerization aplikasi dengan Docker untuk menstandarkan environment development tim.",
      ],
      projects: [],
      tags: ["NestJS", "PostgreSQL", "Prisma", "RBAC", "Docker", "Multi-tenant"],
      icon: <Database className="h-5 w-5" />,
    },
  ];

  return (
    <section id="experience" className="scroll-mt-24 bg-hero px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Perjalanan Karir
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Riwayat kerja dan proyek penting yang telah saya kerjakan, disusun
            secara kronologis.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-8 top-0 bottom-0 hidden w-px bg-border md:block" />
          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.period} className="relative md:pl-20">
                <div className="absolute left-[26px] top-3 hidden h-4 w-4 rounded-full border-2 border-primary bg-background md:block" />
                <Card className="border-border bg-card/60 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {exp.icon}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="w-fit border-border/60">
                        {exp.period}
                      </Badge>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {exp.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.projects.length > 0 && (
                      <div className="mt-5">
                        <h4 className="font-display text-sm font-semibold text-foreground">
                          Proyek
                        </h4>
                        <ul className="mt-2 space-y-1">
                          {exp.projects.map((project) => (
                            <li key={project} className="text-sm text-muted-foreground">
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-border/60 bg-background/60 text-xs text-muted-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Mari Berkolaborasi
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Tertarik untuk bekerja sama? Jangan ragu untuk menghubungi saya melalui
          email atau media sosial.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:ervin@example.com">
            <Button size="lg" className="gap-2">
              <Mail className="h-4 w-4" />
              Kirim Email
            </Button>
          </a>
          <a
            href="https://github.com/ervndty"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ervin Aditya. Dibangun dengan React, Tailwind, dan GitHub API.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ervndty"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:ervin@example.com"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
    >
      {icon}
      {label}
    </a>
  );
}

function languageColor(language: string) {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Go: "#00ADD8",
    Dart: "#00B4AB",
    PHP: "#4F5D95",
    HTML: "#e34c26",
    CSS: "#563d7c",
    "Jupyter Notebook": "#DA5B0B",
    Blade: "#f7523f",
  };
  return colors[language] ?? "#8b949e";
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
}
