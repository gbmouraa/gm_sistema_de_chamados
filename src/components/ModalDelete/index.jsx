function ModalDelete() {
  return (
    <div className="modal-logout">
      <div className="content">
        <span>Tem certeza que deseja excluir este chamado?</span>

        <div className="actions">
          <button className="default-btn">Sim, excluir chamado</button>
          <button className="btn-cancel">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
