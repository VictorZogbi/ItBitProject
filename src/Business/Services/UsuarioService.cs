using Business.Interfaces.Repositories;
using Business.Interfaces.Services;
using Business.Models;
using System;
using System.Threading.Tasks;

namespace Business.Services
{
    public class UsuarioService : IUsuarioService
    {
        private IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<bool> Adicionar(Usuario usuario)
        {
            await _usuarioRepository.Adicionar(usuario);
            return true;
        }

        public async Task<bool> Atualizar(Usuario usuario)
        {
            await _usuarioRepository.Atualizar(usuario);
            return true;
        }

        public async Task<bool> Remover(Usuario usuario)
        {
            await _usuarioRepository.Remover(usuario);
            return true;
        }

        public void Dispose()
        {
            _usuarioRepository.Dispose();
        }
    }
}