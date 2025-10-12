import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const About = ({showFooter=true}) => {
  const team = [
    {
      name: "Sarah Chen, CEO",
      description: "Sarah brings over 15 years of experience in education leadership.",
      avatar: "SC"
    },
    {
      name: "David Lee, Head of Counseling",
      description: "David is a licensed counselor with a passion for student well-being.",
      avatar: "DL"
    },
    {
      name: "Emily Wong, Lead Educator",
      description: "Emily is an experienced educator specializing in personalized learning.",
      avatar: "EW"
    },
    {
      name: "Michael Tan, Head of Technology",
      description: "Michael leads our technology team, ensuring a seamless platform experience.",
      avatar: "MT"
    }
  ];

  const timeline = [
    { year: "2018", title: "Founded Educate Me", icon: "🎓" },
    { year: "2019", title: "Launched Online Platform", icon: "🚀" },
    { year: "2021", title: "Expanded Services", icon: "📈" },
    { year: "2023", title: "Reached 10,000 Students", icon: "🎉" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-vision-bg to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <Header />
      <main className="pt-16 relative z-10">
        <section className="py-20 px-6 bg-gradient-to-b from-background to-transparent">
          <div className="container mx-auto max-w-4xl text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              About Educate Me
            </h1>
            <p className="text-lg text-muted-foreground">
              Empowering students to achieve their full potential through personalized guidance and support.
            </p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="animate-fade-in group">
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mb-6 group-hover:w-32 transition-all duration-500"></div>
                <h2 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Educate Me was founded in 2018 by a group of passionate educators and counselors who recognized the need for a more personalized and accessible approach to education and student support. Our mission is to empower students to achieve their full potential by providing comprehensive guidance and resources throughout their academic journey.
                </p>
              </div>
              <div className="animate-fade-in [animation-delay:0.2s] group">
                <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary mb-6 group-hover:w-32 transition-all duration-500"></div>
                <h2 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">Vision & Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our vision is to be the leading platform for educational support, fostering a community where every student feels empowered to succeed. Our mission is to provide personalized guidance, resources, and mentorship to help students navigate their academic and career paths with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-background/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in">Meet Our Team</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card 
                  key={index} 
                  className="p-6 text-center group hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-border hover:border-primary/30 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-transparent group-hover:ring-primary/20 transition-all duration-300 group-hover:scale-110">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} animate-fade-in`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <Card className={`flex-1 p-6 group hover:shadow-xl transition-all duration-500 hover:scale-105 border border-border hover:border-primary/30 ${index % 2 === 0 ? 'text-right hover:-translate-x-2' : 'text-left hover:translate-x-2'}`}>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                      <p className="text-primary font-semibold">{item.year}</p>
                    </Card>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl z-10 shadow-lg hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer">
                      {item.icon}
                    </div>
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-b from-background/50 to-background backdrop-blur-sm">
          <div className="container mx-auto max-w-3xl text-center animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our team and help us empower students to achieve their dreams.
            </p>
            <Button size="lg" className="hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
              Join Our Mission
            </Button>
          </div>
        </section>
      </main>
     {showFooter && <Footer />}
    </div>
  );
};

export default About;
