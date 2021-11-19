using Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces.Services
{
    public interface ISexoService : IDisposable
    {
        Task<bool> Adicionar(Sexo fornecedor);
        Task<bool> Atualizar(Sexo fornecedor);
        Task<bool> Remover(Sexo sexo);
    }
}
