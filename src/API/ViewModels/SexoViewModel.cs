using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace API.ViewModels
{
    public class SexoViewModel
    {
        [Key]
        public int SexoId { get; set; }

        [DisplayName("Descrição")]
        [Required(ErrorMessage ="O campo {0} é obrigatório")]
        [StringLength(15,ErrorMessage ="O campo pode ter no máximo {1} caracteres")]
        public string Descricao { get; set; }
    }
}
