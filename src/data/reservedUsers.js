// src/pages/data/reservedUsers.js
const reservedUsers = [
  // ====== SYSTEM / TECHNICAL ======
  "admin","root","system","superuser","administrator","support","helpdesk","test","guest","user",
  "owner","master","manager","operator","developer","coder","programmer","teacher","student","server",
  "database","sql","mysql","postgres","oracle","mongodb","hacker","anonymous","null","undefined",
  "void","default","unknown","reserved","superman","batman","spiderman","ironman","captain","thanos",
  "joker","god","allah","jesus","muhammad","prophet","imam","shaytan","devil",
 
  // ====== TECH COMPANIES ======
  
  "markzuckerberg","elonmusk","billgates","stevejobs","larrypage","sergeybrin","sundarpichai","satyanadella",
  "timcook","jeffbezos","jackdorsey","evanwilliams","bizstone","kevin systrom","miker krieger",
  "reedhastings","marissamayer","sherylsandberg","peterthiel","davidpackard","larryellison",
  "michaelbloomberg","richardbranson","howardschultz","travis kalanick","dara khosrowshahi",

  // ====== FOOTBALL LEGENDS ======
  "cristianoronaldo","cr7","lionelmessi","neymar","kylianmbappe","erlinghaaland","karimbenzema","lukamodric",
  "zlatanibrahimovic","paulpogba","kevindebruyne","sadiomane","mohamedsalah","robertlewandowski","sergioramos",
  "andresiniesta","xavi","ronaldinho","kaka","pele","maradona","johancruyff","georgebest","davidbeckham",
  "wayne rooney","stevengerrard","franklampard","thierryhenry","didier drogba",

  // ====== BOX / UFC ======
  "khabib","conormcgregor","israeladesanya","jonjones","mike tyson","muhammadali","floydmayweather",
  "mannypacquiao","tysonfury","anthonyjoshua","deontaywilder","canelo","usyk",

  // ====== ACTORS / HOLLYWOOD ======
  "bradpitt","leonardodicaprio","johnnydepp","tomhanks","robertdowneyjr","chrishemsworth","chrispratt",
  "scarlettjohansson","angelinajolie","margotrobbie","zendaya","ryanreynolds","ryangosling",
  "dwaynejohnson","therock","keanureeves","will smith","jackiechan","brucelee","arnoldschwarzenegger",
  "sylvesterstallone","vin diesel","jasonstatham","galgadot","benaffleck","henrycavill","tomholland",

  // ====== SINGERS ======
  "taylorswift", "odil","odilbek","","selenagomez","arianagrande","billieeilish","dualipa","beyonce","rihanna","ladygaga",
  "katyperry","justinbieber","shakira","adele","edsheeran","brunomars","drake","postmalone","weeknd",
  "eminem","50cent","kanyewest","travis scott","kendricklamar","jayz","lilwayne","nickiminaj","cardib",

  // ====== POLITICIANS ======
  "president","joebiden","donaldtrump","barackobama","georgebush","billclinton","hillaryclinton",
  "vladimirputin","xi jinping","kimjongun","emmanuelmacron","angela merkel","justintrudeau","rishisunak",
  "narendramodi","erdogan","lukashenko","basharalassad","netanyahu","shavkatmirziyoyev",

  // ====== BRANDS ======
  "apple","google","facebook","instagram","twitter","tiktok","youtube","snapchat","reddit","telegram",
  "whatsapp","viber","discord","slack","github","gitlab","bitbucket","stackoverflow","npm","nodejs",
  "react","angular","vue","svelte","django","flask","spring","dotnet","java","kotlin","swift","php",
  "ruby","golang","rust","typescript","csharp","cplusplus","html","css","json","xml","docker",
  "aws","azure","gcp","microsoft","sony","samsung","nintendo","intel","amd","nvidia","huawei","xiaomi",

  // ====== EXTRA CELEBS ======
  "oprahwinfrey","ellen","jimmyfallon","jamescorden","trevornoah","davidletterman","jayleno","stephencolbert",
  "mrbeast","pewdiepie","ninjashyper","pokimane","shroud","markiplier","jacksepticeye",

  // ====== ANIME ======
  "naruto","sasuke","sakura","kakashi","itachi","madara","boruto","minato","jiraiya","orochimaru","tsunade",
  "goku","vegeta","gohan","frieza","cell","buu","jiren","luffy","zoro","sanji","nami","usopp",
  "ichigo","rukia","aizen","ulquiorra","hisoka","gon","killua","kurapika","saitama","genos","fubuki",
     
  // ====== GAMES ======
  "minecraft","roblox","fortnite","pubg","valorant","csgo","dota","lol","apex","overwatch","warzone",
  "battlefield","cod","halo","fifa","pes","nba","ufc","gta","reddead","witcher","cyberpunk","assassinscreed",
   
  // ====== EXPAND (fillers) ======
  "elonmusk1","elonmusk2","elonmusk3","markzuckerberg1","markzuckerberg2","markzuckerberg3",
  "cr7_7","messi10",  "messi30","messi_psg","ronaldo7","ronaldo9","neymarjr","haaland9","benzema9",
  "drakeofficial","billieeilish99","taylorswift13","rihanna88","eminem2000","snoopdogg","icecube",
  "kevinhart","davechappelle","chrisrock","eddymurphy","robinwilliams","jimcarrey","adam sandler",
  "jenniferlawrence","emmawatson","danielradcliffe","rupertgrint","tomhardy","michaelbjorndan",
  "kobe","michaeljordan","shaquille","stephcurry","lebronjames","kevindurant","kyrieirving","giannis",
  "usainbolt","michaelphelps","rogerfederer","nadalfans","novakdjokovic","serenawilliams","venuswilliams",

  // Sho‘rva to‘ldirish uchun 1000 gacha random nomlar
  ...Array.from({ length: 300 }, (_, i) => `reservedname${i+1}`)
].map(u => u.toLowerCase());

export default reservedUsers;
