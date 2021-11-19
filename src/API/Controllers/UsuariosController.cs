using API.ViewModels;
using AutoMapper;
using Business.Interfaces.Repositories;
using Business.Interfaces.Services;
using Business.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UsuariosController : Controller
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IUsuarioService _usuarioService;
        private readonly IMapper _mapper;

        public UsuariosController(IUsuarioRepository usuarioRepository, IUsuarioService usuarioService, IMapper mapper)
        {
            _usuarioRepository = usuarioRepository;
            _usuarioService = usuarioService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<UsuarioViewModel>> ObterTodos()
        {
            return _mapper.Map<IEnumerable<UsuarioViewModel>>(await _usuarioRepository.ObterTodosUsuariosSexo());
        }

        [HttpGet("{id:int}")]
        public async Task<UsuarioViewModel> ObterUsuario(int id)
        {
            return _mapper.Map<UsuarioViewModel>(await _usuarioRepository.ObterPorId(id));
        }

        [HttpGet]
        public async Task<IEnumerable<UsuarioViewModel>> BuscarUsuario(string nome, bool ativo)
        {
            return _mapper.Map<IEnumerable<UsuarioViewModel>>(await _usuarioRepository.ObterTodosUsuariosSexo()).Where(x => x.Nome.Contains(nome ?? "") && x.Ativo == ativo);
        }

        [HttpPost]
        public async Task<IActionResult> Adicionar([FromBody] UsuarioViewModel usuarioVireModel)
        {
            if (!ModelState.IsValid)
                return Json(new { error = true, messages = "Valide todos os campos" });

            if (usuarioVireModel.Nome.Length < 3)
                return Json(new { error = true, messages = "O campo Nome tem que ter no mínimo 3 caracteres" });

            usuarioVireModel.Ativo = true;

            await _usuarioService.Adicionar(_mapper.Map<Usuario>(usuarioVireModel));

            return Ok(new { error = false });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Atualizar(int id, UsuarioViewModel usuarioViewModel)
        {
            if (id != usuarioViewModel.UsuarioId)
            {
                return Json(new { error = false, messages = "O id informado não é o mesmo que foi passado na query" });
            }

            if (!ModelState.IsValid) return Json(new { error = false, messages = ModelState.Values.Select(x => x.Errors) });

            await _usuarioService.Atualizar(_mapper.Map<Usuario>(usuarioViewModel));

            return Ok(new { process = true });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var usuario = await _usuarioRepository.ObterPorId(id);

            if (usuario.UsuarioId != id) return Json(new { error = true, messages = "O id informado não é o mesmo que foi passado na query" });

            await _usuarioService.Remover(_mapper.Map<Usuario>(usuario));

            return Ok(new { process = true });
        }
    }
}