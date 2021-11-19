using System.Collections.Generic;

namespace Business.Models
{
    public class Sexo
    {
        public int SexoId { get; set; }
        public string Descricao { get; set; }

        public IEnumerable<Usuario> Usuarios { get; set; }
    }
}