export type GoogleReview = {
  id: string;
  name: string;
  rating: number;
  /** The card text. For an excerpt this is only the opening of the review. */
  text: string;
  /**
   * The complete review, shown in the dialog when it is known. Fill this in for
   * any entry with isExcerpt: true and the dialog will show the whole review
   * instead of repeating the shortened card text. Copy it from Google after
   * expanding that review's "More" link.
   */
  fullText?: string;
  isExcerpt: boolean;
  perspective?: string;
};

// Transcribed from the owner's supplied Google review screenshots.
// Text hidden behind Google's "More" is not reconstructed — those entries carry
// isExcerpt: true and render with a trailing ellipsis. Repeated screenshots are
// deduplicated. Ratings-only entries (no written comment) are not listed here
// because a card needs text to show. These are featured reviews, not the
// profile's total count.
//
// Display order: the first seven are the owner's requested running order
// (Shalini, Ashutosh, Khushi, Shivangi, Saanvi, Naman, Ambika); the rest follow
// in Google's own listing order.
export const googleReviews: GoogleReview[] = [
  {
    id: "shalini-varshney",
    name: "Shalini Varshney",
    rating: 5,
    text: "As a parent, I highly recommend Nikhil Sir. His mentorship, guidance, and genuine concern for my son's future have been truly invaluable. I had countless questions regarding academics, career opportunities, MBA admissions, and future",
    isExcerpt: true,
    perspective: "A parent's perspective",
  },
  {
    id: "ashutosh-rastogi",
    name: "ASHUTOSH RASTOGI",
    rating: 5,
    text: "Started as a student, I found a brother in Nikhil Sir, who supports me in every single step. Nikhil Sir truly contributed to what I am doing right now. If anyone is seeing this, God has sent you a direction, go for it! ❤️",
    isExcerpt: false,
  },
  {
    id: "khushi-agarwal",
    name: "khushi agarwal",
    rating: 5,
    text: "A huge thank you to Nikhil Sir and the Educate Me team for being such an important part of my MBA journey. Nikhil Sir helped me immensely with interview preparation through multiple mock sessions, detailed feedback, and by patiently",
    isExcerpt: true,
  },
  {
    id: "shivangi-srivastavaa",
    name: "Shivangi Srivastavaa",
    rating: 5,
    text: "I’m Shivangi, and I enrolled in the mentorship program for my MBA GDPI preparation. Looking back, it was one of the best decisions I made.",
    isExcerpt: true,
  },
  {
    id: "saanvi",
    name: "Saanvi",
    rating: 5,
    text: "Joining Educate Me for MBA interview preparation turned out to be one of the best decisions in my journey. The sessions were interactive, well-structured, and honestly felt more personal",
    isExcerpt: true,
  },
  {
    id: "naman-varshney",
    name: "Naman Varshney",
    rating: 5,
    text: "I joined educate me just after giving my cat sir help me immensely in my interview prep and how to tackle an interview it give me immense confidence and I was able to crack the interview sir also guided me which University and college is best for my future career path thank you sir for all your guidance",
    isExcerpt: false,
  },
  {
    id: "ambika-bhatnagar",
    name: "Ambika Bhatnagar",
    rating: 5,
    text: "Educate me is an institution of absolute guidance to bright kids who have challenges in deciding the right path for future in context to their caliber, passion and zeal.",
    isExcerpt: true,
  },
  {
    id: "pratyaksh-mehta",
    name: "Pratyaksh Mehta",
    rating: 5,
    text: "The team was professional, responsive, and made college admissions smooth and stress-free. Highly recommended",
    isExcerpt: false,
  },
  {
    id: "shiny",
    name: "Shiny",
    rating: 5,
    text: "I had a really positive experience with Educate Me. Nikhil Sir's guidance was incredibly helpful throughout the process. He explained everything patiently, cleared my doubts, and gave me the confidence to make informed decisions.",
    isExcerpt: true,
  },
  {
    id: "hardik-pahuja",
    name: "hardik pahuja",
    rating: 5,
    text: "I had a great experience with Educate Me during my admission process. The entire team was very helpful, supportive, and professional. They guided me at every step and made the admission process smooth and hassle-free. I really appreciate",
    isExcerpt: true,
  },
  {
    id: "akanksha-sharma",
    name: "Akanksha Sharma",
    rating: 5,
    text: "I had an excellent experience with Educate Me throughout my MBA admission journey. What stood out the most was their one-to-one career guidance, where the counselors took the time to understand my goals, strengths, and budget before",
    isExcerpt: true,
  },
  {
    id: "jitendra-kumar",
    name: "JITENDRA KUMAR",
    rating: 5,
    text: "This is a really great platform. I would especially like to thank Nikhil Sir for guiding me so well right from the beginning. Ever since I joined this platform, he and all the counselors have always been very supportive and have guided me",
    isExcerpt: true,
  },
  {
    id: "ishika-shukla",
    name: "Ishika Shukla",
    rating: 5,
    text: "I had a wonderful learning experience throughout this program. A special thanks to Nikhil Sir for being such an amazing mentor and guide. He was always supportive, approachable, and ready to help whenever I had any doubts.",
    isExcerpt: true,
  },
  {
    id: "ananya-singh",
    name: "Ananya Singh",
    rating: 5,
    text: "The mentorship program was very helpful and well-structured. The mentor nikhil sir was very supportive, approachable, and always ready to clear doubts. The guidance on preparation strategy, time management, and motivation made a big",
    isExcerpt: true,
  },
  {
    id: "sumit-gyawali",
    name: "Sumit Gyawali",
    rating: 5,
    text: "Had a great experience with Educate Me. Special thanks to Nikhil Sir for his encouragement, explanations, and career advice.",
    isExcerpt: false,
  },
  {
    id: "angel-jaswani",
    name: "Angel Jaswani",
    rating: 5,
    text: "Very helpful, kind, and supportive. They guided me through every step and made the whole process easy and stress-free. I’m really thankful for all the help and would definitely recommend their services to anyone looking for the right guidance.",
    isExcerpt: false,
  },
  {
    id: "tanishka-madaan",
    name: "Tanishka Madaan",
    rating: 5,
    text: "Had a good experience with this platform. They guided me during my counseling, cleared my doubts, and supported me throughout the process. It really helped me in making the right decision. Thanks to the team ❤️",
    isExcerpt: false,
  },
  {
    id: "janvi-gehija",
    name: "Janvi Gehija",
    rating: 4,
    text: "A very good platform. I would especially thank nikhil sir for the constant support and guidance. From the joining to the end nikhil sir and educate me team was in touch with all of us. If I m able to join my mba journey smoothly then its",
    isExcerpt: true,
  },
  {
    id: "paridhi-dodia",
    name: "Paridhi Dodia",
    rating: 5,
    text: "My experience with educate-me was really good the mentors helped me a lot to get a clear career path which made it really easy to make decision related to my future i am really thankful to educate-me and the mentors to provide me with a wonderful experience 😊",
    isExcerpt: false,
  },
  {
    id: "ayush-agrawal",
    name: "Ayush Agrawal",
    rating: 5,
    text: "Very good guidance excellent support from the teachers. It's a genuine and trustable educational platform",
    isExcerpt: false,
  },
  {
    id: "bhavya-vats",
    name: "Bhavya Vats",
    rating: 5,
    text: "Joining Educate Me has been one of the most valuable decisions I've made. Thanks to Nikhil Bhaiya, I not only secured admission to my MBA college but also underwent a complete transformation in my personality.",
    isExcerpt: true,
  },
  {
    id: "anmol-rinayat",
    name: "Cse022 - Anmol Rinayat",
    rating: 5,
    text: "Great counselling efforts by mentor and right career support most genuine options and honest feedback strongly recommend there mentorship program",
    isExcerpt: false,
  },
  {
    id: "tanish-sethi",
    name: "Tanish Sethi",
    rating: 5,
    text: "A very good experience with their counselling, regular sessions with amazing faculty",
    isExcerpt: false,
  },
  {
    id: "jinaansh-jain",
    name: "Jinaansh Jain",
    rating: 5,
    text: "They understood my problems and helped me in every way possible",
    isExcerpt: false,
  },
  {
    id: "gajendra-singh-tomar",
    name: "Gajendra Singh Tomar",
    rating: 5,
    text: "Had a great knowledge gaining mentoring session",
    isExcerpt: false,
  },
  {
    id: "chaitanya-sawarkar",
    name: "Chaitanya Sawarkar",
    rating: 5,
    text: "Great experience with nikhil sir so much things are learned from him Great mentor",
    isExcerpt: false,
  },
  {
    id: "aarjav-jain",
    name: "Aarjav Jain",
    rating: 5,
    text: "They guides well through uncertainty of choices, helps with communication required out there",
    isExcerpt: false,
  },
  {
    id: "hunky-fitness-junkie",
    name: "Hunky Fitness Junkie",
    rating: 5,
    text: "The counselling was smooth and literally genuine choices",
    isExcerpt: false,
  },
  {
    id: "vinay-tm",
    name: "Vinay TM",
    rating: 5,
    text: "Educate me really help me for my career growth.",
    isExcerpt: false,
  },
  {
    id: "aashi-gupta",
    name: "Aashi Gupta",
    rating: 5,
    text: "good platform for 12th pass confusing students to choose there college and also for there higher studies",
    isExcerpt: false,
  },
];
