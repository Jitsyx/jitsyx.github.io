// Abre los diálogos de Privacidad / Términos que viven en el Footer.
export function openLegal(id) {
  document.getElementById(`legal-${id}`)?.showModal()
}
