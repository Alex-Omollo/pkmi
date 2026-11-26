export type Leader = {
  name: string;
  role?: string;
  photo: string; // filename in public/images/leadership/
  focus?: string; // optional CSS object-position, e.g. "center 10%"
};

export const leaders: Leader[] = [
  {
    name: "Rev. Doc. Joslyn Isigi",
    role: "Founder & Chair",
    photo: "joslynisingi.webp",
  },
  {
    name: "Rev. Dinah Buluma",
    role: "National Treasuer",
    photo: "dinahbulma.webp",
  },
  {
    name: "Rev. Florence Ommasaba",
    role: "Chair Vihiga County",
    photo: "florenceommasaba.webp",
  },
  {
    name: "Rev. Ziporah Muthama", 
    role: "", 
    photo: "ziporahmuthama.webp"},
  { name: "Rev. Carol Wayieko", role: "", photo: "carolwayieko.webp" },
  {
    name: "Rev. Naomi Wafula",
    role: "",
    photo: "naomiwafula.webp",
  },
  { name: "Rev. Mary Sunday", role: "", photo: "marysunday.webp" },
  { name: "Rev. Abigael Aoyi", role: "", photo: "abigaelaoyi.webp" },
  { name: "Rev. Eddah Chivile", role: "", photo: "eddahchivile.webp" },
  { name: "Rev. Doc. Leonida Makila", role: "", photo: "leonidamakila.webp" },
  { name: "Rev. Mable Atsango", role: "", photo: "mableatsango.webp" },
  { name: "Rev. Phoebe Mackenzie", role: "", photo: "phoebemackenzie.webp" },
  { name: "Rev. Irene Mido", role: "", photo: "irenemido.webp" },
  { name: "Bishop Euodia Gichana", role: "", photo: "euodiagichana.webp" },
  { name: "Bishop Janet Likavo", role: "", photo: "janetlikavo.webp" },
];

export const leaderSrc = (file: string) => `/images/leadership/${file}`;
