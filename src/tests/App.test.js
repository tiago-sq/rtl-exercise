import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import generateNumber from '../helpers/generateNumber';

jest.mock('../helpers/generateNumber');

describe('Testes da aplicação', () => {
  test('1 - Conferir se o título "Par ou Ímpar" aparece na página.', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 1, name: /Par ou Ímpar/i });
    expect(title).toBeInTheDocument();
  });

  test('2 - Acessando a partir da Home a página About.', () => {    
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /Sobre/i });
    userEvent.click(link);
    const title = screen.getByRole('heading', { level: 1, name: /Sobre o Par ou Ímpar/i });
    expect(title).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });

  test('3 - Disparar a mensagem de "Página não encontrada" ao acessar uma rota inválida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/not-found');
    });
    const title = screen.getByRole('heading', { level: 1, name: /Página não encontrada!/i });
    expect(title).toBeInTheDocument();
  });

  test('4 - Validar a existência de 2 botões na tela.', () => {
    renderWithRouter(<App />);
    const btnPar = screen.getByTestId('par');
    const btnImpar = screen.getByTestId('impar');
    expect(btnPar).toBeInTheDocument();
    expect(btnImpar).toBeInTheDocument();
  });

  test('5 - Conferir se o jogo retorna a mensagem "Acertou" ao clicar na opção correta.', () => {
    generateNumber.mockReturnValue(2);
    renderWithRouter(<App />);
    const btnPar = screen.getByTestId('par');
    userEvent.click(btnPar);
    const text = screen.getByText(/Acertou/i);
    expect(text).toBeInTheDocument();    
  });

  test('6 - Conferir se o jogo retorna a mensagem "Errou" ao clicar na opção incorreta.', () => {
    generateNumber.mockReturnValue(2);
    renderWithRouter(<App />);
    const btnPar = screen.getByTestId('impar');
    userEvent.click(btnPar);
    const text = screen.getByText(/Errou/i);
    expect(text).toBeInTheDocument();  
  });

  test('7 - Conferir se um número é gerado na tela do jogo.', () => {
    generateNumber.mockReturnValue(123);
    renderWithRouter(<App />);
    const number = screen.getByTestId('number');
    expect(number).toHaveTextContent(123);
    expect(number).toBeInTheDocument();
  });
});