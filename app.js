/* ================= DATA ================= */
const books = [
  { title: "A Court of Thorns and Roses", author: "Sarah J. Maas", genre: "fantasy", rating: 4.6,
    cover: "linear-gradient(135deg,#ff4fa3,#a855f7,#5b21b6)",
    synopsis: "When nineteen-year-old huntress Feyre kills a wolf in the woods, a beastlike creature arrives to demand retribution. She is taken to a magical land she only knew from legends." },
  { title: "Fourth Wing", author: "Rebecca Yarros", genre: "fantasy", rating: 4.7,
    cover: "linear-gradient(135deg,#f59e0b,#b45309)",
    synopsis: "At a dragon rider academy, Violet must bond with a dragon to survive — or die trying." },
  { title: "The Cruel Prince", author: "Holly Black", genre: "fantasy", rating: 4.6,
    cover: "linear-gradient(135deg,#a855f7,#4c1d95)",
    synopsis: "Mortal girl Jude must outwit the cruel faerie prince Cardan in the High Court of Faerie." },
  { title: "Throne of Glass", author: "Sarah J. Maas", genre: "fantasy", rating: 4.8,
    cover: "linear-gradient(135deg,#7c3aed,#312e81)",
    synopsis: "Assassin Celaena Sardothien is offered freedom if she competes to become the king's champion." },
  { title: "The Serpent & the Wings of Night", author: "Carissa Broadbent", genre: "fantasy", rating: 4.5,
    cover: "linear-gradient(135deg,#dc2626,#7f1d1d)",
    synopsis: "Vampire hunter Oraya enters a deadly tournament in the House of Night to survive." },
  { title: "Six of Crows", author: "Leigh Bardugo", genre: "fantasy", rating: 4.3,
    cover: "linear-gradient(135deg,#111827,#374151)",
    synopsis: "A crew of six outcasts plans an impossible heist in the Grisha world." },
  { title: "Shadow and Bone", author: "Leigh Bardugo", genre: "fantasy", rating: 4.6,
    cover: "linear-gradient(135deg,#fbbf24,#92400e)",
    synopsis: "Alina discovers a power that could save Ravka from the terrifying Shadow Fold." },
  { title: "It Ends With Us", author: "Colleen Hoover", genre: "romance", rating: 4.2,
    cover: "linear-gradient(135deg,#f472b6,#db2777)",
    synopsis: "Lily navigates love, heartbreak, and hard choices in this emotional romance." },
  { title: "Beach Read", author: "Emily Henry", genre: "romance", rating: 4.4,
    cover: "linear-gradient(135deg,#fca5a5,#ea580c)",
    synopsis: "Two rival authors swap genres for a summer of writing — and falling in love." },
  { title: "The Love Hypothesis", author: "Ali Hazelwood", genre: "romance", rating: 4.7,
    cover: "linear-gradient(135deg,#c084fc,#7e22ce)",
    synopsis: "A fake relationship between a Ph.D. student and a professor spirals into real feelings." },
  { title: "Twisted Love", author: "Ana Huang", genre: "romance", rating: 4.3,
    cover: "linear-gradient(135deg,#ef4444,#991b1b)",
    synopsis: "Alex and Ava's intense, dangerous attraction threatens to consume them both." },
  { title: "The Spanish Love Deception", author: "Elena Armas", genre: "romance", rating: 4.3,
    cover: "linear-gradient(135deg,#fb923c,#c2410c)",
    synopsis: "Catalina needs a fake date for her sister's wedding — and her nemesis volunteers." },
  { title: "Love on the Brain", author: "Ali Hazelwood", genre: "romance", rating: 4.3,
    cover: "linear-gradient(135deg,#60a5fa,#1d4ed8)",
    synopsis: "Rival neuroscientists are forced to work together, and sparks fly." },
  { title: "The Silent Patient", author: "Alex Michaelides", genre: "mystery", rating: 4.4,
    cover: "linear-gradient(135deg,#64748b,#1e293b)",
    synopsis: "A famous painter stops speaking after allegedly murdering her husband." },
  { title: "Verity", author: "Colleen Hoover", genre: "mystery", rating: 4.4,
    cover: "linear-gradient(135deg,#334155,#0f172a)",
    synopsis: "A struggling writer uncovers chilling secrets in her new client's manuscript." },
  { title: "One of Us Is Lying", author: "Karen M. McManus", genre: "mystery", rating: 4.2,
    cover: "linear-gradient(135deg,#22d3ee,#0e7490)",
    synopsis: "Five students walk into detention — only four come out alive." },
  { title: "The Housemaid", author: "Freida McFadden", genre: "mystery", rating: 3.2,
    cover: "linear-gradient(135deg,#a16207,#713f12)",
    synopsis: "A housemaid's new job reveals a household full of dark secrets." },
  { title: "Gone Girl", author: "Gillian Flynn", genre: "mystery", rating: 4.3,
    cover: "linear-gradient(135deg,#d97706,#78350f)",
    synopsis: "A wife disappears, and her husband becomes the prime suspect." },
  { title: "The Girl on the Train", author: "Paula Hawkins", genre: "mystery", rating: 4.4,
    cover: "linear-gradient(135deg,#0ea5e9,#0c4a6e)",
    synopsis: "An alcoholic woman may hold the key to a missing woman's case." },
];

/* one featured book per genre: Fantasy, Romance, Mystery */
const featuredBooks = [books[0], books[9], books[13]];

const rowsConfig = [
  { title: "Fantasy", genre: "fantasy" },
  { title: "Romance", genre: "romance" },
  { title: "Mystery", genre: "mystery" },
];

/* ================= STATE ================= */
let shelf = JSON.parse(localStorage.getItem("bookflix-shelf") || "[]");

/* ================= HELPERS ================= */
function stars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

let toastTimer;
function showToast(msg) {
  const toast = document.querySelector("[data-js-toast]");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

function addToShelf(book) {
  if (!book) return;
  if (!shelf.some(b => b.title === book.title)) {
    shelf.push(book);
    localStorage.setItem("bookflix-shelf", JSON.stringify(shelf));
    renderShelf();
  }
  showToast("Added to Shelf <3");
  const btn = document.querySelector("[data-js-add-shelf]");
  if (btn) {
    btn.textContent = "✓ Added <3";
    btn.disabled = true;
    btn.classList.add("added");
  }
}

function removeFromShelf(book) {
  shelf = shelf.filter(b => b.title !== book.title);
  localStorage.setItem("bookflix-shelf", JSON.stringify(shelf));
  renderShelf();
  showToast("Removed from Shelf");
}

/* ================= REAL COVERS (Open Library) ================= */
const coverCache = JSON.parse(localStorage.getItem("bookflix-covers") || "{}");

function getCurrent(book) {
  return books.find(b => b.title === book.title) || book;
}

function setCoverImage(coverEl, book) {
  coverEl.querySelector(".cover-img")?.remove();
  if (!book.coverImg) return;
  const img = document.createElement("img");
  img.className = "cover-img";
  img.src = book.coverImg;
  img.alt = book.title;
  img.onerror = () => img.remove();
  coverEl.appendChild(img);
}

async function fetchCovers() {
  for (const book of books) {
    if (coverCache[book.title]) {
      book.coverImg = coverCache[book.title];
      continue;
    }
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(book.title + " " + book.author)}&fields=cover_i&limit=1`
      );
      const data = await res.json();
      const coverId = data.docs?.[0]?.cover_i;
      if (coverId) {
        book.coverImg = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
        coverCache[book.title] = book.coverImg;
      }
    } catch { /* keep gradient */ }
    await new Promise(r => setTimeout(r, 150));
  }
  localStorage.setItem("bookflix-covers", JSON.stringify(coverCache));
  applyCovers();
}

function applyCovers() {
  document.querySelectorAll(".book-card").forEach(card => {
    const src = books.find(b => b.title.toLowerCase() === card.dataset.title);
    if (src?.coverImg) setCoverImage(card.querySelector(".book-cover"), src);
  });
  document.querySelectorAll(".hero-slide").forEach(slide => {
    const title = slide.querySelector(".hero-title").textContent;
    const src = books.find(b => b.title === title);
    if (src?.coverImg) setCoverImage(slide.querySelector(".hero-cover"), src);
  });
}

/* ================= RENDER ROWS ================= */
function renderRows() {
  const container = document.querySelector("#rows");
  container.innerHTML = "";

  rowsConfig.forEach(cfg => {
    const rowBooks = books.filter(b => b.genre === cfg.genre);
    const section = document.createElement("section");
    section.className = "row";
    section.dataset.genre = cfg.genre;

    const header = document.createElement("div");
    header.className = "row-header";
    header.innerHTML = `<h3>${cfg.title}</h3><a href="#" class="view-all">View All</a>`;
    const viewAll = header.querySelector(".view-all");

    viewAll.addEventListener("click", e => {
      e.preventDefault();
      const expanded = section.classList.toggle("expanded");
      viewAll.textContent = expanded ? "Show Less" : "View All";
      if (expanded) section.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    const trackWrap = document.createElement("div");
    trackWrap.className = "row-track-wrap";
    const track = document.createElement("div");
    track.className = "row-track";

    rowBooks.forEach(book => track.appendChild(makeCard(book)));

    const prev = document.createElement("button");
    prev.className = "scroll-arrow prev"; prev.textContent = "‹";
    prev.addEventListener("click", () => track.scrollBy({ left: -400, behavior: "smooth" }));
    const next = document.createElement("button");
    next.className = "scroll-arrow next"; next.textContent = "›";
    next.addEventListener("click", () => track.scrollBy({ left: 400, behavior: "smooth" }));

    trackWrap.append(prev, track, next);
    section.append(header, trackWrap);
    container.appendChild(section);
  });
}

function makeCard(book, removable) {
  const src = getCurrent(book);
  const card = document.createElement("div");
  card.className = "book-card";
  card.dataset.title = src.title.toLowerCase();
  card.dataset.author = src.author.toLowerCase();
  card.innerHTML = `
    <div class="book-cover" style="background:${src.cover}"><span class="cover-title">${src.title}</span></div>
    <p class="book-title">${src.title}</p>
    <p class="book-rating">${stars(src.rating)} ${src.rating.toFixed(1)}</p>`;

  if (src.coverImg) setCoverImage(card.querySelector(".book-cover"), src);

  card.addEventListener("click", () => openBook(src));

  if (removable) {
    const btn = document.createElement("button");
    btn.className = "remove-btn";
    btn.textContent = "✕";
    btn.addEventListener("click", e => {
      e.stopPropagation();
      removeFromShelf(src);
    });
    card.appendChild(btn);
  }
  return card;
}

/* ================= HERO CAROUSEL ================= */
function renderHero() {
  const slider = document.querySelector("[data-js-hero]");
  const dotsWrap = document.querySelector("[data-js-hero-dots]");
  if (!slider || !dotsWrap) return;
  slider.innerHTML = "";
  dotsWrap.innerHTML = "";

  let heroIndex = 0;
  let heroTimer;

  featuredBooks.forEach((book, i) => {
    const slide = document.createElement("div");
    slide.className = "hero-slide" + (i === 0 ? " active" : "");

    const cover = document.createElement("div");
    cover.className = "hero-cover";
    cover.style.background = book.cover;
    cover.innerHTML = `<span class="cover-title">${book.title}</span>`;
    if (book.coverImg) setCoverImage(cover, book);

    const info = document.createElement("div");
    info.className = "hero-info";
    info.innerHTML = `
      <p class="hero-tag">FEATURED BOOK</p>
      <h2 class="hero-title">${book.title}</h2>
      <p class="hero-author">by ${book.author}</p>
      <p class="hero-desc">${book.synopsis}</p>
      <div class="hero-buttons">
        <button class="btn btn-primary">▶ View Details</button>
        <button class="btn btn-outline">+ Add to Shelf</button>
      </div>`;

    info.querySelector(".btn-primary").addEventListener("click", () => openBook(book));
    info.querySelector(".btn-outline").addEventListener("click", () => addToShelf(book));

    slide.append(cover, info);
    slider.appendChild(slide);

    const dot = document.createElement("span");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goToHero(i));
    dotsWrap.appendChild(dot);
  });

  function goToHero(i) {
    heroIndex = i;
    document.querySelectorAll(".hero-slide").forEach((s, idx) => s.classList.toggle("active", idx === i));
    document.querySelectorAll("[data-js-hero-dots] .dot").forEach((d, idx) => d.classList.toggle("active", idx === i));
    resetTimer();
  }

  function nextHero() { goToHero((heroIndex + 1) % featuredBooks.length); }
  function resetTimer() { clearInterval(heroTimer); heroTimer = setInterval(nextHero, 6000); }

  const hero = document.querySelector(".hero");
  hero.addEventListener("mouseenter", () => clearInterval(heroTimer));
  hero.addEventListener("mouseleave", resetTimer);

  resetTimer();
}

/* ================= MY SHELF ================= */
function renderShelf() {
  const track = document.querySelector("[data-js-shelf]");
  const empty = document.querySelector("[data-js-shelf-empty]");
  if (!track || !empty) return;
  track.innerHTML = "";
  shelf.forEach(book => track.appendChild(makeCard(book, true)));
  empty.classList.toggle("hidden", shelf.length > 0);
}

/* ================= MODALS ================= */
const modals = document.querySelectorAll(".modal-overlay");
const detailModal = document.querySelector("[data-js-detail-modal]");
const profileModal = document.querySelector("[data-js-profile-modal]");
let currentBook = null;

function openModal(m) { if (m) m.classList.add("open"); document.body.classList.add("modal-open"); }
function closeModals() {
  modals.forEach(m => m.classList.remove("open"));
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-js-close-modal]").forEach(b => b.addEventListener("click", closeModals));
modals.forEach(m => m.addEventListener("click", e => { if (e.target === m) closeModals(); }));

function openBook(book) {
  if (!book) return;
  const src = getCurrent(book);
  currentBook = src;
  const detailCover = document.querySelector("[data-js-detail-cover]");
  detailCover.style.background = src.cover;
  detailCover.textContent = src.title;
  setCoverImage(detailCover, src);
  document.querySelector("[data-js-detail-title]").textContent = src.title;
  document.querySelector("[data-js-detail-author]").textContent = "by " + src.author;
  document.querySelector("[data-js-detail-genre]").textContent =
    src.genre[0].toUpperCase() + src.genre.slice(1);
  document.querySelector("[data-js-detail-rating]").textContent =
    stars(src.rating) + " " + src.rating.toFixed(1) + " / 5";
  document.querySelector("[data-js-detail-synopsis]").textContent = src.synopsis;

  const addBtn = document.querySelector("[data-js-add-shelf]");
  const onShelf = shelf.some(b => b.title === src.title);
  if (addBtn) {
    addBtn.textContent = onShelf ? "✓ Added <3" : "+ Add to Shelf";
    addBtn.disabled = onShelf;
    addBtn.classList.toggle("added", onShelf);
  }
  openModal(detailModal);
}

document.querySelector("[data-js-add-shelf]").addEventListener("click", () => {
  if (currentBook) addToShelf(currentBook);
  setTimeout(closeModals, 600);
});

/* profile */
document.querySelector("[data-js-profile]").addEventListener("click", () => {
  document.querySelector("[data-js-stat-shelf]").textContent = shelf.length;
  document.querySelector("[data-js-stat-lib]").textContent = books.length;
  openModal(profileModal);
});

/* ================= DROPDOWN ================= */
const dropdown = document.querySelector("[data-js-dropdown]").closest(".dropdown");
document.querySelector("[data-js-dropdown]").addEventListener("click", e => {
  e.stopPropagation();
  dropdown.classList.toggle("open");
});
document.addEventListener("click", e => { if (!dropdown.contains(e.target)) dropdown.classList.remove("open"); });

/* genre links (dropdown + mobile menu) */
document.querySelectorAll("[data-js-genre]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const row = document.querySelector(`.row[data-genre="${link.dataset.jsGenre}"]`);
    if (row) {
      if (!row.classList.contains("expanded")) {
        row.classList.add("expanded");
        row.querySelector(".view-all").textContent = "Show Less";
      }
      row.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    dropdown.classList.remove("open");
    mobileMenu.classList.remove("open");
  });
});

/* nav links → smooth scroll */
document.querySelectorAll("[data-js-nav]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.dataset.jsNav;
    let el = null;
    if (target === "home") el = document.querySelector(".hero");
    else if (target === "shelf") el = document.querySelector("#shelf");
    else el = document.querySelector(`.row[data-genre="${target}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    mobileMenu.classList.remove("open");
  });
});

/* ================= HAMBURGER / MOBILE MENU ================= */
const mobileMenu = document.querySelector("[data-js-mobile-menu]");
document.querySelector("[data-js-hamburger]").addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

/* ================= NAVBAR SOLID ON SCROLL ================= */
const navbar = document.querySelector("[data-js-navbar]");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

/* ================= SEARCH ================= */
const searchInput = document.querySelector("[data-js-search]");
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  document.querySelectorAll(".book-card").forEach(card => {
    const match = card.dataset.title.includes(q) || card.dataset.author.includes(q);
    card.classList.toggle("hidden", !match);
  });
  document.querySelectorAll(".row").forEach(row => {
    const visible = [...row.querySelectorAll(".book-card")].some(c => !c.classList.contains("hidden"));
    row.classList.toggle("hidden", !visible);
  });
});

/* ================= BOTTOM NAV (mobile) ================= */
document.querySelectorAll(".bottom-nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".bottom-nav-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const label = btn.textContent.trim().toLowerCase();
    if (label.includes("home")) window.scrollTo({ top: 0, behavior: "smooth" });
    else if (label.includes("search")) searchInput.focus();
    else if (label.includes("shelf")) document.querySelector("#shelf").scrollIntoView({ behavior: "smooth" });
    else if (label.includes("profile")) {
      document.querySelector("[data-js-stat-shelf]").textContent = shelf.length;
      document.querySelector("[data-js-stat-lib]").textContent = books.length;
      openModal(profileModal);
    }
  });
});

/* ================= KEYBOARD (Escape) ================= */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeModals();
    dropdown.classList.remove("open");
    mobileMenu.classList.remove("open");
  }
});

/* ================= INTRO ================= */
const intro = document.querySelector("[data-js-intro]");
const book = document.querySelector("[data-js-book]");
const logo = document.querySelector(".intro-logo");
let introDone = false;

function hideIntro() {
  if (introDone) return;
  introDone = true;
  intro.classList.add("hide");
  setTimeout(() => intro.remove(), 800);
}
setTimeout(() => book.classList.add("open"), 200);
setTimeout(() => logo.classList.add("show"), 1400);
setTimeout(hideIntro, 3200);
document.querySelector("[data-js-skip]").addEventListener("click", hideIntro);

/* ================= THEME ================= */
const root = document.documentElement;
const savedTheme = localStorage.getItem("bookflix-theme");
if (savedTheme) root.dataset.theme = savedTheme;
document.querySelector("[data-js-theme]").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("bookflix-theme", next);
});

/* ================= INIT ================= */
renderRows();
renderShelf();
renderHero();
fetchCovers();
