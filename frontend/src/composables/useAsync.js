import { ref } from 'vue'

export function useAsync(fn) {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  async function execute(...args) {
    loading.value = true
    error.value = null
    try {
      data.value = await fn(...args)
    } catch (e) {
      error.value = e.message || 'Erro ao carregar.'
    } finally {
      loading.value = false
    }
  }

  return { loading, error, data, execute }
}
