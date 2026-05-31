
const projects=[
{name:'Splitwise',tech:'Java, Spring Boot, MySQL'},
{name:'Parking Lot System',tech:'LLD, Strategy, Observer'},
{name:'Elevator System',tech:'Command, Observer'},
{name:'ATM System',tech:'Design Patterns, OOP'}
];
export default function App(){
return <div style={{background:'#0f172a',color:'white',fontFamily:'Arial',padding:'40px'}}>
<section><h1 style={{fontSize:'48px'}}>Raj Aaryan</h1>
<p>Software Engineer | Java Backend Developer</p>
<a href="/resume.pdf">Download Resume</a></section>

<h2>About</h2>
<p>BITS Pilani graduate with 3+ years of experience building backend systems using Java, Spring Boot, Kafka, Elasticsearch and AWS.</p>

<h2>Experience</h2>
<ul>
<li>Jio Platforms — Software Engineer</li>
<li>Samsung Electronics — Software Engineer Intern</li>
</ul>

<h2>Projects</h2>
{projects.map(p=><div key={p.name}><h3>{p.name}</h3><p>{p.tech}</p></div>)}

<h2>Skills</h2>
<p>Java • Spring Boot • Kafka • MySQL • Elasticsearch • AWS • Docker • System Design</p>

<h2>Achievements</h2>
<ul>
<li>MCN Scholarship (10 consecutive semesters)</li>
<li>Highest Rating at Jio Platforms</li>
</ul>

<h2>Contact</h2>
<p>Email: rajaryangpj@gmail.com</p>
<p>LinkedIn: linkedin.com/in/raj-aaryan-28484b159</p>
</div>
}
