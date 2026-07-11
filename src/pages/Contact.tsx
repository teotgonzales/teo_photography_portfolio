export function Contact() {
  return (
    <div className="about-contact-page section-fade">
      <section className="about-contact-layout" aria-labelledby="about-contact-title">
        <div className="about-contact-image-wrap">
          <img
            src="/images/contact/teo-contact-portrait.jpg"
            alt="Portrait of Teo Gonzales holding a camera"
            loading="lazy"
            decoding="async"
          />
        </div>
        <aside className="about-contact-copy">
          <h1 id="about-contact-title">Teo Gonzales</h1>
          <p>Photo + Creative Direction</p>
          <p>Los Angeles, CA</p>
          <p>
            <a href="mailto:teogonzalesphoto@gmail.com">teogonzalesphoto@gmail.com</a>
          </p>
        </aside>
      </section>
    </div>
  );
}
