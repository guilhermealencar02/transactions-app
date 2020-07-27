import React from 'react';

export default function Header() {
  const { titleH1, titleH2 } = styles;

  return (
    <header>
      <div className="container">
        <h1 className="center" style={titleH1}>
          Bootcamp Full Stack - Desafio Final
        </h1>
        <h3 className="center" style={titleH2}>
          Controle Financeiro Pessoal
        </h3>
      </div>
    </header>
  );
}

const styles = {
  titleH1: {
    fontSize: '30px',
    // fontFamily: 'fantasy',
  },

  titleH2: {
    fontSize: '30px',
  },
};
