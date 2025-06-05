export default {
  testEnvironment: 'jsdom', // Simula un navegador para pruebas con DOM
  moduleFileExtensions: ['js', 'mjs'], // Soporte para módulos ES
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'], // Busca pruebas en __tests__ o con .test.js
};