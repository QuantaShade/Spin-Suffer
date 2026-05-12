export type ChallengeCategory = "dare" | "truth" | "drink" | "wild" | "physical";

export interface Challenge {
  id: string;
  category: ChallengeCategory;
  en: string;
  ar: string;
  so: string;
}

export const CHALLENGES: Challenge[] = [
  // DARE
  { id: "d1", category: "dare", en: "Do 20 push-ups without stopping", ar: "اعمل ٢٠ تمرين ضغط بدون توقف", so: "Samee 20 taallo adoon joojin" },
  { id: "d2", category: "dare", en: "Speak in an accent for the next 3 rounds", ar: "تكلم بلهجة أجنبية للـ٣ جولات القادمة", so: "Ku hadal luqad kale 3 wareeg" },
  { id: "d3", category: "dare", en: "Do your best celebrity impression", ar: "قلّد مشهوراً بأفضل ما يمكنك", so: "Sawir caan ah ku raac" },
  { id: "d4", category: "dare", en: "Text the last person you called something embarrassing", ar: "أرسل رسالة محرجة لآخر شخص اتصلت به", so: "U dir fariin xishoodka leh qofkii ugu dambeeyay aad wacday" },
  { id: "d5", category: "dare", en: "Dance for 60 seconds with no music", ar: "ارقص لمدة ٦٠ ثانية بدون موسيقى", so: "Ciyaar 60 ilbiriqsi adoon muusig lahayn" },
  { id: "d6", category: "dare", en: "Let someone write a word on your forehead with a marker", ar: "اسمح لأحدهم أن يكتب كلمة على جبهتك", so: "U ogolow qof inuu ku qoro eray madaxaaga" },
  { id: "d7", category: "dare", en: "Do 10 jumping jacks right now", ar: "اعمل ١٠ قفزات الآن", so: "Samee 10 boodbood hadda" },
  { id: "d8", category: "dare", en: "Eat a spoonful of hot sauce", ar: "كُل ملعقة من الصلصة الحارة", so: "Cun qaado biyo kulul ah" },
  { id: "d9", category: "dare", en: "Call someone and sing them happy birthday", ar: "اتصل بشخص وغنّ له عيد ميلاد سعيد", so: "Wac qof oo u gaan gaan maalmaha dhalashada" },
  { id: "d10", category: "dare", en: "Do a plank for 45 seconds", ar: "اعمل بلانك لمدة ٤٥ ثانية", so: "Samee plank 45 ilbiriqsi" },

  // TRUTH
  { id: "t1", category: "truth", en: "What's the most embarrassing thing you've ever done?", ar: "ما أكثر شيء محرج فعلته في حياتك؟", so: "Maxay tahay waxyaabaha ugu xishoodka badan ee aad sameysey?" },
  { id: "t2", category: "truth", en: "Who in this room would you date?", ar: "من في هذه الغرفة يمكنك مواعدته؟", so: "Cidda gurfaha ku jirta aad la boqon lahayd?" },
  { id: "t3", category: "truth", en: "What's your biggest regret in life?", ar: "ما هو أكبر ندم في حياتك؟", so: "Maxay tahay waxyaabihii ugu waayeel badnaa ee aad ku socdaa noloshaada?" },
  { id: "t4", category: "truth", en: "Have you ever lied to get out of trouble?", ar: "هل كذبت يوماً للخروج من ورطة؟", so: "Ma been tiri markii la soo gaadhay dhibaato?" },
  { id: "t5", category: "truth", en: "What's a secret you've never told anyone here?", ar: "ما هو السر الذي لم تخبر به أحداً هنا؟", so: "Maxay tahay sirta aadan cidna u sheegin halkan?" },
  { id: "t6", category: "truth", en: "What's the weirdest dream you've had recently?", ar: "ما هو أغرب حلم رأيته مؤخراً؟", so: "Maxay tahay riyadii ugu yaab badnayd ee aad dhawaan ahayd?" },
  { id: "t7", category: "truth", en: "What's one thing you dislike about yourself?", ar: "ما الشيء الذي لا تحبه في نفسك؟", so: "Waa maxay shey aad iskaaga neceb tahay?" },
  { id: "t8", category: "truth", en: "Who was your first crush and what happened?", ar: "من كان حبك الأول وماذا حدث؟", so: "Cidda ugu horreysay ee aad jeclaatay maxaase dhacay?" },

  // DRINK
  { id: "dr1", category: "drink", en: "Drink a full glass of water in one go", ar: "اشرب كوباً كاملاً من الماء دفعة واحدة", so: "Cab kiish oo buuxa oo biyo ah hal mar" },
  { id: "dr2", category: "drink", en: "Take a sip from everyone's glass", ar: "خذ رشفة من كوب كل شخص", so: "Ka cab kaasooyinka dhammaan dadka" },
  { id: "dr3", category: "drink", en: "Down your entire drink right now", ar: "اشرب كل ما في كوبك الآن", so: "Cab wixii koobbagaaga ku jira hadda" },
  { id: "dr4", category: "drink", en: "Drink something you didn't pour yourself", ar: "اشرب شيئاً لم تصبّه بنفسك", so: "Cab wax aadan adigu buux galin" },

  // WILD
  { id: "w1", category: "wild", en: "The group invents your challenge — majority rules", ar: "المجموعة تخترع تحديك — الأغلبية تحكم", so: "Kooxdu waxay abuurtaa caqabadaada — aqlabiyadda ayaa xukuma" },
  { id: "w2", category: "wild", en: "Spin again — whatever you land on, do it twice", ar: "أدر مجدداً — مهما وقعت عليه افعله مرتين", so: "Wareejin mar labaad — wixii ku soo degta, laba jeer samee" },
  { id: "w3", category: "wild", en: "Give your challenge to anyone you choose", ar: "أعطِ تحديك لأي شخص تختاره", so: "Caqabadaada siiy qof kasta oo aad doorato" },
  { id: "w4", category: "wild", en: "Everyone votes on your punishment — no veto", ar: "الجميع يصوّت على عقوبتك — لا حق نقض", so: "Dhammaan dadku ciqaabta kugu codeeyaan — veto ma jirto" },
  { id: "w5", category: "wild", en: "Swap seats with the person to your right for the next 2 rounds", ar: "بادل مقاعد مع الشخص على يمينك للجولتين القادمتين", so: "Kuursiga is beddel qofka midigta kugu jira 2 wareeg" },

  // PHYSICAL
  { id: "p1", category: "physical", en: "Hold a wall sit for 30 seconds", ar: "احتفظ بجلسة الحائط لمدة ٣٠ ثانية", so: "Hay fadhiga gidaarka 30 ilbiriqsi" },
  { id: "p2", category: "physical", en: "Do 15 burpees without stopping", ar: "اعمل ١٥ بيربي بدون توقف", so: "Samee 15 burpee adoon joojin" },
  { id: "p3", category: "physical", en: "Hop on one foot for 20 seconds", ar: "القفز على قدم واحدة لمدة ٢٠ ثانية", so: "Ku boodbood lugta hal 20 ilbiriqsi" },
  { id: "p4", category: "physical", en: "Do the worm across the room", ar: "اعمل حركة الدودة عبر الغرفة", so: "Samee dhaqdhaqaaqa dixira gurfa ka dhex gudub" },
  { id: "p5", category: "physical", en: "Plank until someone else finishes their turn", ar: "ابق في وضع البلانك حتى ينتهي شخص آخر من دوره", so: "Ku sii jir plank ilaa qof kale uu wareeggiisa dhammeeyo" },
];

export const CATEGORY_COLORS: Record<ChallengeCategory, string> = {
  dare: "#ff146e",
  truth: "#ffffff",
  drink: "#3b82f6",
  wild: "#a855f7",
  physical: "#22c55e",
};

export const CATEGORY_LABELS: Record<ChallengeCategory, { en: string; ar: string; so: string }> = {
  dare: { en: "DARE", ar: "تحدٍ", so: "GEESI" },
  truth: { en: "TRUTH", ar: "حقيقة", so: "DHAB" },
  drink: { en: "DRINK", ar: "اشرب", so: "CAB" },
  wild: { en: "WILD", ar: "بري", so: "XOOG" },
  physical: { en: "PHYSICAL", ar: "جسدي", so: "JIREED" },
};

export function getRandomChallenge(exclude?: string): Challenge {
  const pool = exclude ? CHALLENGES.filter((c) => c.id !== exclude) : CHALLENGES;
  return pool[Math.floor(Math.random() * pool.length)];
}