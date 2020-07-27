import React from 'react';

export default function Footer() {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Trabalho de Conclusão do Curso</h5>
            <p className="grey-text text-lighten-4">Bootcamp Online - Desenvolvedor Full Stack</p>
            <p className="grey-text text-lighten-4">IGTI – Instituto de Gestão e Tecnologia da Informação</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  target="_blank"
                  href="https://github.com/guilhermealencar02?tab=repositories"
                >
                  Github do Desenvolvedor
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" target="_blank" href="https://www.igti.com.br/">
                  IGTI
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2020 Guilherme Higino Alencar
          <a
            className="grey-text text-lighten-4 right"
            target="_blank"
            href="https://www.instagram.com/_guilherme_s7/"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  body: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },

  main: {
    flex: '1 0 auto',
  },
};
