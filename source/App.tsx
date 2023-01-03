
function App() {
  return (
    <>
      <h1>Pholeport - gerador de relatórios fotográficos</h1>
      <form id="form">
        <input id="kmz_file" type="file" accept=".kmz" />
        <input id="id_input" type="text" />
        <input id="titulo_input" type="text" />
        <input id="seguimento_input" type="text" />
        <input id="localidade_input" type="text" />
        <input id="site_abordagem_input" type="text" />
        <input id="versao_input" type="text" />
        <button type="submit">submit</button>
      </form>
      Summary: <strong id="summary"></strong>
    </>
  )
}

export default App
