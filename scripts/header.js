const domNode = document.getElementById('header');
const root = ReactDOM.createRoot(domNode);

root.render(
  <nav id="nav">
    <ul>
      <li><a href="index.html">About Me</a></li>
      <li><a href="Extracurricular.html">Interests</a></li>
      <li><a href="Projects.html">Projects</a></li>
      <li><a href="Resume.html">Resume</a></li>
      <li>
        <a href="https://github.com/aagr8868">
          <img src="images/githubIcon_small.png" style={{ paddingTop: "5px" }} />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/aarongrissom">
          <img src="images/linkedinIcon_small.png" style={{ paddingTop: "5px" }} />
        </a>
      </li>
    </ul>
  </nav>
);