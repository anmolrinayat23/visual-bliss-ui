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
    fullText: "As a parent, I highly recommend Nikhil Sir. His mentorship, guidance, and genuine concern for my son's future have been truly invaluable. I had countless questions regarding academics, career opportunities, MBA admissions, and future placements, and Nikhil Sir answered every one of my queries with patience, honesty, and clarity.\n\nHis advice gave us the confidence to make the right decisions throughout this journey. I am sincerely grateful to Nikhil Sir for his unwavering support and guidance, and I wholeheartedly recommend him to every parent and student seeking reliable career counseling.",
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
    fullText: "A huge thank you to Nikhil Sir and the Educate Me team for being such an important part of my MBA journey. Nikhil Sir helped me immensely with interview preparation through multiple mock sessions, detailed feedback, and by patiently explaining every small concept. He also guided me in evaluating colleges and making informed application decisions. His mentorship gave me the confidence I needed, and I’m truly grateful for all the support throughout the process",
    isExcerpt: true,
  },
  {
    id: "shivangi-srivastavaa",
    name: "Shivangi Srivastavaa",
    rating: 5,
    text: "I’m Shivangi, and I enrolled in the mentorship program for my MBA GDPI preparation. Looking back, it was one of the best decisions I made.",
    fullText: "I’m Shivangi, and I enrolled in the mentorship program for my MBA GDPI preparation. Looking back, it was one of the best decisions I made.\n\nOver the course of five months, we covered everything—from group discussions, current affairs, extempore, and mock interviews to last-minute PI preparation. The guidance was practical, personalized, and always motivating.\n\nI still remember when Sir took my virtual interview at 11 PM, just a day before my BIMTECH interview. That level of dedication and commitment towards students is something I'll always be grateful for.\n\nThe preparation and confidence I gained through this program helped me convert calls from Welingkar, XIME, XISS, and other B-schools. The goodies they shared at the beginning of the course were a thoughtful gesture, but the real value was the constant mentorship, honest feedback, and unwavering support throughout the journey.\n\nThank you, Sir, for believing in me, pushing me to improve, and being there whenever I needed guidance. I truly appreciate all your efforts and would highly recommend this mentorship program to every MBA aspirant preparing for GDPI.",
    isExcerpt: true,
  },
  {
    id: "saanvi",
    name: "Saanvi",
    rating: 5,
    text: "Joining Educate Me for MBA interview preparation turned out to be one of the best decisions in my journey. The sessions were interactive, well-structured, and honestly felt more personal",
    fullText: "Joining Educate Me for MBA interview preparation turned out to be one of the best decisions in my journey.\nThe sessions were interactive, well-structured, and honestly felt more personal than a lot of in person classes I've attended.\nWhat stood out was how clearly the mentor explained things- breaking down complex concepts into something simple & relatable.\nI also got to interact with some wonderful peers along the way, which added a great collaborative energy to the whole experience.",
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
    fullText: "Educate me is an institution of absolute guidance to bright kids who have challenges in deciding the right path for future in context to their caliber, passion and zeal.\nNikhil and team have been always accessible, helpful and supportive to counsel in right direction and prepare for the best approachable option. Have always been clear and honest options available as per the situation and capabilities of students taking up their professional journey.\nThankyou so much. Shall be grateful for the support Educate-me extended in my daughter's college decision.",
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
    fullText: "I had a really positive experience with Educate Me. Nikhil Sir's guidance was incredibly helpful throughout the process. He explained everything patiently, cleared my doubts, and gave me the confidence to make informed decisions.\n\nThe counsellors are also very polite, friendly, and approachable. They were always supportive and made the entire experience smooth and comfortable. Overall, I'm grateful for their guidance and would definitely recommend Educate Me to anyone looking for reliable educational counselling.",
    isExcerpt: true,
  },
  {
    id: "hardik-pahuja",
    name: "hardik pahuja",
    rating: 5,
    text: "I had a great experience with Educate Me during my admission process. The entire team was very helpful, supportive, and professional. They guided me at every step and made the admission process smooth and hassle-free. I really appreciate",
    fullText: "I had a great experience with Educate Me during my admission process. The entire team was very helpful, supportive, and professional. They guided me at every step and made the admission process smooth and hassle-free. I really appreciate their quick response and excellent support. I highly recommend Educate Me to anyone looking for reliable guidance for their admission process. Thank you, Educate Me, for your wonderful support!",
    isExcerpt: true,
  },
  {
    id: "akanksha-sharma",
    name: "Akanksha Sharma",
    rating: 5,
    text: "I had an excellent experience with Educate Me throughout my MBA admission journey. What stood out the most was their one-to-one career guidance, where the counselors took the time to understand my goals, strengths, and budget before",
    fullText: "I had an excellent experience with Educate Me throughout my MBA admission journey. What stood out the most was their one-to-one career guidance, where the counselors took the time to understand my goals, strengths, and budget before suggesting the right MBA colleges. Instead of recommending the same options to everyone, they provided personalized college choices that offered the best balance of affordability, career growth, and ROI.",
    isExcerpt: true,
  },
  {
    id: "jitendra-kumar",
    name: "JITENDRA KUMAR",
    rating: 5,
    text: "This is a really great platform. I would especially like to thank Nikhil Sir for guiding me so well right from the beginning. Ever since I joined this platform, he and all the counselors have always been very supportive and have guided me",
    fullText: "This is a really great platform. I would especially like to thank Nikhil Sir for guiding me so well right from the beginning. Ever since I joined this platform, he and all the counselors have always been very supportive and have guided me at every step. They never let you feel like you’re alone or that you have no options left. Even after every failure, they help you see that there is always another opportunity and guide you toward the right path. Their support also helps you build your confidence and develop your personality\n\nOverall, it has been a wonderful experience for me, and I am truly grateful for all the guidance and support I have received.",
    isExcerpt: true,
  },
  {
    id: "ishika-shukla",
    name: "Ishika Shukla",
    rating: 5,
    text: "I had a wonderful learning experience throughout this program. A special thanks to Nikhil Sir for being such an amazing mentor and guide. He was always supportive, approachable, and ready to help whenever I had any doubts.",
    fullText: "I had a wonderful learning experience throughout this program. A special thanks to Nikhil Sir for being such an amazing mentor and guide. He was always supportive, approachable, and ready to help whenever I had any doubts.\n\nHis guidance, encouragement, and practical insights made the learning journey much more meaningful and enjoyable. I truly appreciate the time and effort he dedicated to helping us learn and grow.\n\nThank you, Nikhil Sir, for your constant support and motivation.",
    isExcerpt: true,
  },
  {
    id: "ananya-singh",
    name: "Ananya Singh",
    rating: 5,
    text: "The mentorship program was very helpful and well-structured. The mentor nikhil sir was very supportive, approachable, and always ready to clear doubts. The guidance on preparation strategy, time management, and motivation made a big",
    fullText: "The mentorship program was very helpful and well-structured. The mentor nikhil sir was very supportive, approachable, and always ready to clear doubts. The guidance on preparation strategy, time management, and motivation made a big difference in my learning. The study plan was practical, and the regular feedback helped me stay on track. I would definitely recommend this mentorship to anyone looking for the right direction in their courier’s",
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
    fullText: "A very good platform. I would especially thank nikhil sir for the constant support and guidance. From the joining to the end nikhil sir and educate me team was in touch with all of us. If I m able to join my mba journey smoothly then its all bcz of nikhil sir who believed in me and pushed me to go further with confidence from choosing college to preparing for interview and starting with the clg joining preparation he was constantly guided and supported me through mentorship sessions and guidance. And here i m pursuing my mba journey smoothly and happily. Grateful and thankfull to nikhil sir and educate me team",
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
    fullText: "Joining Educate Me has been one of the most valuable decisions I've made. Thanks to Nikhil Bhaiya, I not only secured admission to my MBA college but also underwent a complete transformation in my personality.\nThe guidance went far beyond college admissions. I gained confidence, improved my communication skills, developed a more professional mindset, and learned how to present myself better. Every session and every interaction added something meaningful to my growth.\nI'm genuinely grateful to Nikhil Bhaiya for his constant support, honest mentorship, and belief in his students. If you're planning to pursue an MBA and are looking for guidance that focuses on both your admission and your personal development, I wholeheartedly recommend Educate Me. It made a real difference in my journey, and I'm thankful to have been a part of it.",
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
