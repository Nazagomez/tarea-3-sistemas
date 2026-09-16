/**
 * Published mini-site and microservice URLs.
 * Relative paths work when the shell and mini-sites are served from the same static host.
 * API values are replaced with the real FaaS domains after each backend is deployed.
 */
export const booksSite = './books/';
export const authorsSite = './authors/';
export const publishersSite = './publishers/';
export const reviewsSite = './reviews/';

export const booksApi = 'https://tarea3-books-microservice.netlify.app';
export const authorsApi = 'https://tarea3-authors-microservice.nazagomez.workers.dev';
export const publishersApi = 'https://tarea3-publishers-microservice.vercel.app';
export const reviewsApi = 'https://tarea3-reviews-microservice.nazagomez.workers.dev';
