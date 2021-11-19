using Business.Interfaces.Repositories;
using Business.Interfaces.Services;
using Business.Models;
using System;
using System.Threading.Tasks;

namespace Business.Services
{
    public class SexoService : ISexoService
    {
        private ISexoRepository _sexoRepository;

        public SexoService(ISexoRepository sexoRepository)
        {
            _sexoRepository = sexoRepository;
        }

        public async Task<bool> Adicionar(Sexo sexo)
        {
            await _sexoRepository.Adicionar(sexo);
            return true;
        }

        public async Task<bool> Atualizar(Sexo sexo)
        {
            await _sexoRepository.Atualizar(sexo);
            return true;
        }

        public async Task<bool> Remover(Sexo sexo)
        {
            await _sexoRepository.Remover(sexo);
            return true;
        }

        public void Dispose()
        {
            _sexoRepository.Dispose();
        }
    }
}