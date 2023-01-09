import react from '@vitejs/plugin-react'

export default {
  main: {
    build: {
      sourcemap: true,
      ssr: true,
    }
  },
  preload: {
    build: {
      sourcemap: true,
      ssr: true,
    }
  },
  renderer: {
    build: {
      plugins: [react()],
      sourcemap: true,
    }
  },
}