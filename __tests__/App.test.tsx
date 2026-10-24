import { render, screen } from '@testing-library/react-native';
import App from '../App';

test('a fresh application shows Login and offers local demo access', () => {
  render(<App />);
  expect(screen.getByRole('header', { name: 'Login' })).toBeVisible();
  expect(
    screen.getByRole('button', { name: 'Iniciar sesión de prueba' }),
  ).toBeVisible();
  expect(screen.queryByRole('header', { name: 'Home' })).toBeNull();
});
